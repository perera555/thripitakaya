"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookmarkCheck, BookmarkPlus, ChevronLeft, ChevronRight, Download, Headphones, BookOpenText, Minus, Plus, WifiOff } from "lucide-react";
import { getLegacy, getNeighbours, getRoot, getSegmented, getSuttaplex, type Block, type Neighbours, type ScTranslation, type Suttaplex } from "@/lib/sc";
import { LANGS, langLabel, type Lang } from "@/lib/i18n";
import { paliToSinhala, renderPali, type PaliScript } from "@/lib/pali";
import { usePref } from "@/lib/usePref";
import { downloadText, findSavedByUid, saveText, savedKey, type SavedText } from "@/lib/saved";
import { paliSpeech, useCloudVoice, type SpeechItem } from "@/lib/useSpeech";
import { videoKeysForUid } from "@/lib/data/texts";
import { useApp } from "./providers";
import { PlayerBar, usePlayer } from "./Player";
import { VideoGrid } from "./Video";
import { Section, Spinner } from "./ui";

type View = "translation" | "pali" | "both";
type Mode = "read" | "listen" | "readlisten";

const OUR = LANGS.map((l) => l.code) as string[];

function chooseTranslation(list: ScTranslation[], want: Lang): { lang: string; options: ScTranslation[]; fellBack: boolean } | null {
  const tr = list.filter((t) => !t.is_root && OUR.includes(t.lang));
  if (!tr.length) return null;
  const pickLang = tr.some((t) => t.lang === want) ? want : tr.some((t) => t.lang === "en") ? "en" : tr[0].lang;
  const options = tr.filter((t) => t.lang === pickLang).sort((a, b) => Number(b.segmented) - Number(a.segmented));
  return { lang: pickLang, options, fellBack: pickLang !== want };
}

export function Reader({ uid, defaultView, extraVideos }: { uid: string; defaultView?: View; extraVideos?: string[] }) {
  const { lang, t } = useApp();
  const [plex, setPlex] = useState<Suttaplex | null>(null);
  const [blocks, setBlocks] = useState<Block[] | null>(null);
  const [root, setRoot] = useState<Block[] | null>(null);
  const [nav, setNav] = useState<Neighbours>({});
  const [error, setError] = useState(false);
  const [offline, setOffline] = useState<SavedText | null>(null);
  const [savedOk, setSavedOk] = useState(false);
  const [attempt, setAttempt] = useState(0);

  const [textLang, setTextLang] = usePref<string>("textLang", "");
  const want = (textLang || lang) as Lang;
  const [view, setView] = usePref<View>(`view`, defaultView ?? "both");
  const [script, setScript] = usePref<PaliScript>("script", lang === "si" ? "sinhala" : "roman");
  const [size, setSize] = usePref<number>("fontSize", 19);
  const [mode, setMode] = usePref<Mode>("mode2", "readlisten");
  const [author, setAuthor] = useState<string>("");
  const [listenTo, setListenTo] = useState<"translation" | "pali" | "both">("both");

  // 1. load suttaplex
  useEffect(() => {
    let live = true;
    setPlex(null);
    setError(false);
    setOffline(null);
    getSuttaplex(uid)
      .then((p) => live && setPlex(p))
      .catch(async () => {
        const s = await findSavedByUid(uid);
        if (!live) return;
        if (s) setOffline(s);
        else setError(true);
      });
    return () => {
      live = false;
    };
  }, [uid, attempt]);

  const choice = useMemo(() => (plex ? chooseTranslation(plex.translations, want) : null), [plex, want]);
  const current = choice?.options.find((o) => o.author_uid === author) ?? choice?.options[0];

  // 2. load texts
  useEffect(() => {
    if (!plex) return;
    let live = true;
    setBlocks(null);
    setRoot(null);
    const hasRoot = plex.translations.some((x) => x.is_root && x.lang === "pli");
    (async () => {
      try {
        if (current?.segmented) {
          const b = await getSegmented(uid, current.author_uid, current.lang);
          if (live) setBlocks(b);
        } else if (current) {
          const [legacy, r] = await Promise.all([
            getLegacy(uid, current.author_uid, current.lang),
            hasRoot ? getRoot(uid).catch(() => null) : Promise.resolve(null),
          ]);
          if (!live) return;
          setBlocks(legacy.blocks);
          setRoot(r);
          setNav(legacy.nav);
        } else if (hasRoot) {
          const r = await getRoot(uid);
          if (live) setBlocks(r);
        } else if (live) setBlocks([]);
        if (current?.segmented || !current) {
          const n = await getNeighbours(uid, current?.author_uid ?? "ms", current?.lang ?? "pli");
          if (live) setNav(n);
        }
      } catch {
        const s = await findSavedByUid(uid);
        if (!live) return;
        if (s) setOffline(s);
        else setError(true);
      }
    })();
    return () => {
      live = false;
    };
  }, [plex, current, uid]);

  const shownBlocks = offline ? offline.blocks : blocks;
  const shownRoot = offline ? offline.rootBlocks ?? null : root;
  const aligned = !!shownBlocks?.some((b) => b.pali && b.text);
  const hasPali = aligned || !!shownRoot?.length || !!shownBlocks?.some((b) => b.pali);
  const hasTrans = !!shownBlocks?.some((b) => b.text);
  const effView: View = !hasTrans ? "pali" : !hasPali ? "translation" : view;

  // Pāli list to show when not aligned
  const paliList = aligned ? shownBlocks : shownRoot ?? shownBlocks?.filter((b) => b.pali) ?? [];

  // speech
  const transLang = LANGS.find((l) => l.code === (offline?.lang ?? current?.lang))?.speech ?? "en-US";
  const [voicesReady, setVoicesReady] = useState<SpeechSynthesisVoice[]>([]);
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => setVoicesReady(window.speechSynthesis.getVoices());
    load();
    window.speechSynthesis.addEventListener("voiceschanged", load);
    return () => window.speechSynthesis.removeEventListener("voiceschanged", load);
  }, []);
  const cloud = useCloudVoice();
  const paliVoice = useMemo(() => paliSpeech(voicesReady, cloud), [voicesReady, cloud]);

  const speakTarget: "translation" | "pali" | "both" = effView === "pali" ? "pali" : effView === "translation" ? "translation" : listenTo;

  /** What the voice reads, in exactly the order the text appears on screen. */
  const speechSource = useMemo(() => {
    type Entry = { id: string; isPali: boolean; text: string; shown: string };
    const out: Entry[] = [];
    const P = (b: Block) => b.pali && out.push({ id: b.id, isPali: true, text: paliVoice.sinhala ? paliToSinhala(b.pali) : b.pali, shown: renderPali(b.pali, script) });
    const T = (b: Block) => b.text && b.kind !== "note" && out.push({ id: b.id, isPali: false, text: b.text, shown: b.text });
    const blocksT = shownBlocks ?? [];
    if (speakTarget === "pali") (paliList ?? []).forEach(P);
    else if (speakTarget === "translation") blocksT.forEach(T);
    else if (aligned) blocksT.forEach((b) => (P(b), T(b)));
    else ((paliList ?? []).forEach(P), blocksT.forEach(T));
    return out;
  }, [speakTarget, paliList, shownBlocks, aligned, paliVoice, script]);
  const items: SpeechItem[] = useMemo(
    () => speechSource.map((e) => ({ text: e.text, lang: e.isPali ? paliVoice.lang : transLang })),
    [speechSource, paliVoice, transLang],
  );
  const player = usePlayer(items);
  const currentEntry = player.playing || player.index > 0 ? speechSource[player.index] : undefined;
  const speakingId = currentEntry?.id;

  // keep the spoken block in view
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (mode !== "readlisten" || !speakingId || !player.playing) return;
    containerRef.current?.querySelector(`[data-id="${CSS.escape(speakingId)}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [speakingId, mode, player.playing]);

  const clickBlock = (id: string) => {
    if (mode !== "readlisten") return;
    const i = speechSource.findIndex((b) => b.id === id);
    if (i >= 0) player.start(i);
  };

  const title = plex?.original_title ?? offline?.title ?? uid;
  const sub = plex?.translated_title?.trim() || current?.title?.trim() || offline?.subtitle;
  const titleShown = lang === "si" || script === "sinhala" ? paliToSinhala(title) : title;

  const onSave = async () => {
    if (!shownBlocks) return;
    await saveText({
      key: savedKey(uid, current?.lang ?? "pli", current?.author_uid),
      uid,
      title,
      subtitle: sub ?? undefined,
      lang: current?.lang ?? "pli",
      author: current?.author,
      blocks: shownBlocks,
      rootBlocks: aligned ? undefined : shownRoot ?? undefined,
      savedAt: Date.now(),
    });
    setSavedOk(true);
    setTimeout(() => setSavedOk(false), 2500);
  };
  const onDownload = () => {
    if (!shownBlocks) return;
    const list = effView === "pali" ? (paliList ?? []) : shownBlocks;
    downloadText(`${uid}-${current?.lang ?? "pli"}.txt`, `${title}${sub ? " — " + sub : ""}`, list, effView !== "translation", (s) => renderPali(s, script));
  };

  if (error)
    return (
      <div className="card3d p-8 text-center">
        <WifiOff className="mx-auto mb-3 h-10 w-10 text-muted" />
        <p className="mb-4">{t("loadError")}</p>
        <button className="btn btn-gold" onClick={() => setAttempt((a) => a + 1)}>
          {t("retry")}
        </button>
      </div>
    );

  if (!plex && !offline) return <Spinner />;

  const videoKeys = [...videoKeysForUid(uid), ...(extraVideos ?? [])];

  return (
    <div>
      {/* Title */}
      <header className="mb-6 animate-rise text-center">
        {plex?.acronym && <p className="mb-2 text-sm font-semibold tracking-wider text-gold">{plex.acronym}</p>}
        <h1 className="text-3xl font-bold sm:text-4xl">
          <span className="text-gradient">{titleShown}</span>
        </h1>
        {sub && <p className="mt-2 text-lg text-muted">{sub}</p>}
        {current && (
          <p className="mt-1 text-sm text-muted">
            {langLabel(current.lang)} · {current.author}
          </p>
        )}
        {offline && (
          <p className="mt-2 inline-flex items-center gap-1 rounded-full bg-card-2 px-3 py-1 text-xs text-gold">
            <WifiOff className="h-3 w-3" /> {t("offlineCopy")}
          </p>
        )}
      </header>

      {/* Controls */}
      <div className="glass sticky top-[4.5rem] z-30 mb-6 space-y-3 rounded-2xl p-3 sm:top-[4.25rem]">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-full border border-line p-0.5" role="tablist">
            {([
              ["read", t("read"), BookOpenText],
              ["listen", t("listen"), Headphones],
              ["readlisten", t("readListen"), null],
            ] as const).map(([m, label, Icon]) => (
              <button key={m} role="tab" aria-selected={mode === m} onClick={() => setMode(m)} className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-semibold ${mode === m ? "bg-gradient-to-br from-gold-2 to-gold text-[#1d1205]" : "text-muted"}`}>
                {Icon && <Icon className="h-4 w-4" />}
                {label}
              </button>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-1">
            <button className="btn btn-ghost h-9 w-9 p-0" onClick={() => setSize(Math.max(14, size - 1))} aria-label={t("textSize")}>
              <Minus className="h-4 w-4" />
            </button>
            <button className="btn btn-ghost h-9 w-9 p-0" onClick={() => setSize(Math.min(30, size + 1))} aria-label={t("textSize")}>
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="no-scrollbar -mx-3 flex items-center gap-2 overflow-x-auto px-3">
          {hasPali && hasTrans &&
            (["both", "translation", "pali"] as View[]).map((v) => (
              <button key={v} className="chip" aria-pressed={effView === v} onClick={() => setView(v)}>
                {v === "both" ? `${t("pali")} + ${t("meaning")}` : t(v)}
              </button>
            ))}
          {hasPali && (
            <>
              <span className="mx-1 h-5 w-px bg-line" />
              <button className="chip" aria-pressed={script === "sinhala"} onClick={() => setScript("sinhala")}>
                {t("pali")} · සිංහල
              </button>
              <button className="chip" aria-pressed={script === "roman"} onClick={() => setScript("roman")}>
                {t("pali")} · Roman
              </button>
            </>
          )}
        </div>
        {plex && choice && (
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <label className="flex items-center gap-1.5">
              <span className="text-muted">{t("language")}</span>
              <select className="rounded-full border border-line bg-card-2 px-2 py-1" value={want} onChange={(e) => setTextLang(e.target.value)}>
                {LANGS.map((l) => {
                  const has = plex.translations.some((x) => !x.is_root && x.lang === l.code);
                  return (
                    <option key={l.code} value={l.code}>
                      {l.label}
                      {has ? "" : " —"}
                    </option>
                  );
                })}
              </select>
            </label>
            {choice.options.length > 1 && (
              <label className="flex items-center gap-1.5">
                <span className="text-muted">{t("translator")}</span>
                <select className="max-w-[12rem] rounded-full border border-line bg-card-2 px-2 py-1" value={current?.author_uid} onChange={(e) => setAuthor(e.target.value)}>
                  {choice.options.map((o) => (
                    <option key={o.author_uid} value={o.author_uid}>
                      {o.author}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <div className="ml-auto flex gap-2">
              <button className="btn btn-ghost px-3 py-1.5 text-sm" onClick={onSave} disabled={!shownBlocks}>
                {savedOk ? <BookmarkCheck className="h-4 w-4 text-gold" /> : <BookmarkPlus className="h-4 w-4" />}
                <span className="hidden sm:inline">{savedOk ? t("savedOk") : t("saveOffline")}</span>
              </button>
              <button className="btn btn-ghost px-3 py-1.5 text-sm" onClick={onDownload} disabled={!shownBlocks} aria-label={t("download")}>
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">{t("download")}</span>
              </button>
            </div>
          </div>
        )}
        {choice?.fellBack && (
          <p className="text-xs text-muted">{t("fallbackNotice", { lang: langLabel(want), fallback: langLabel(choice.lang) })}</p>
        )}
        {plex && !choice && <p className="text-xs text-muted">{t("noTranslation")}</p>}
        {mode !== "read" && effView === "both" && (
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">{t("listenWhat")}:</span>
            <button className="chip" aria-pressed={listenTo === "both"} onClick={() => setListenTo("both")}>
              {t("pali")} + {t("meaning")}
            </button>
            <button className="chip" aria-pressed={listenTo === "translation"} onClick={() => setListenTo("translation")}>
              {t("meaning")}
            </button>
            <button className="chip" aria-pressed={listenTo === "pali"} onClick={() => setListenTo("pali")}>
              {t("pali")}
            </button>
          </div>
        )}
        {mode === "readlisten" && <PlayerBar p={player} />}
      </div>

      {!shownBlocks ? (
        <Spinner />
      ) : mode === "listen" ? (
        <ListenView p={player} shown={speechSource[player.index]?.shown ?? ""} pali={!!speechSource[player.index]?.isPali} size={size} />
      ) : (
        <div ref={containerRef} className="reading mx-auto max-w-3xl" style={{ fontSize: size }}>
          {effView === "both" && !aligned ? (
            <div className="grid gap-8 lg:grid-cols-2">
              <div>
                <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gold">{t("paliText")}</h2>
                <Blocks list={paliList ?? []} show="pali" script={script} speakingId={currentEntry?.isPali ? speakingId : undefined} onClick={clickBlock} />
              </div>
              <div>
                <h2 className="mb-3 font-sans text-sm font-semibold uppercase tracking-wider text-gold">{current?.lang === "si" ? t("sinhalaMeaning") : t("meaning")}</h2>
                <Blocks list={shownBlocks} show="text" script={script} speakingId={currentEntry && !currentEntry.isPali ? speakingId : undefined} onClick={clickBlock} />
              </div>
            </div>
          ) : (
            <Blocks
              list={effView === "pali" ? (paliList ?? []) : shownBlocks}
              show={effView === "both" ? "both" : effView === "pali" ? "pali" : "text"}
              script={script}
              speakingId={speakingId}
              onClick={clickBlock}
            />
          )}
        </div>
      )}

      {/* prev / next */}
      {(nav.prev || nav.next) && (
        <div className="mx-auto mt-10 flex max-w-3xl justify-between gap-3">
          {nav.prev ? (
            <Link href={`/read/${nav.prev.uid}`} className="btn btn-ghost max-w-[48%] justify-start text-left text-sm">
              <ChevronLeft className="h-4 w-4 shrink-0" />
              <span className="truncate">{nav.prev.name?.trim() || nav.prev.uid}</span>
            </Link>
          ) : (
            <span />
          )}
          {nav.next && (
            <Link href={`/read/${nav.next.uid}`} className="btn btn-ghost max-w-[48%] justify-end text-right text-sm">
              <span className="truncate">{nav.next.name?.trim() || nav.next.uid}</span>
              <ChevronRight className="h-4 w-4 shrink-0" />
            </Link>
          )}
        </div>
      )}

      {videoKeys.length > 0 && (
        <Section title={t("deshanaVideos")}>
          <VideoGrid keys={videoKeys} />
        </Section>
      )}

      <p className="mx-auto mt-10 max-w-3xl text-center text-xs text-muted">
        {t("source")} · {uid}
      </p>
    </div>
  );
}

function Blocks({
  list,
  show,
  script,
  speakingId,
  onClick,
}: {
  list: Block[];
  show: "pali" | "text" | "both";
  script: PaliScript;
  speakingId?: string;
  onClick: (id: string) => void;
}) {
  return (
    <div className="space-y-4">
      {list.map((b) => {
        const pali = b.pali ? renderPali(b.pali, script) : undefined;
        const text = b.text;
        if ((show === "pali" && !pali) || (show === "text" && !text)) return null;
        const Tag = b.kind === "h" ? "h3" : "div";
        return (
          <Tag
            key={b.id}
            data-id={b.id}
            onClick={() => onClick(b.id)}
            className={`block ${b.kind === "h" ? "pt-2 text-center font-sans text-[1.15em] font-bold text-gold-2" : ""} ${b.kind === "note" ? "mt-8 border-t border-line pt-4 font-sans text-xs text-muted" : ""} ${speakingId === b.id ? "speaking" : ""}`}
          >
            {(show === "pali" || show === "both") && pali && <p className={`pali-text ${b.kind === "verse" ? "verse" : ""}`}>{pali}</p>}
            {(show === "text" || show === "both") && text && <p className={`${b.kind === "verse" ? "verse" : ""} ${show === "both" && pali ? "mt-1.5 text-[0.95em]" : ""}`}>{text}</p>}
          </Tag>
        );
      })}
    </div>
  );
}

function ListenView({ p, shown, pali, size }: { p: ReturnType<typeof usePlayer>; shown: string; pali: boolean; size: number }) {
  const { t } = useApp();
  return (
    <div className="scene mx-auto max-w-2xl">
      <div className="card3d relative overflow-hidden p-6 text-center sm:p-10" style={{ boxShadow: "var(--shadow), var(--glow)" }}>
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl animate-breathe" />
        <p className="relative mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">{t("nowReading")}</p>
        <div className="reading relative mx-auto mb-8 max-h-[45vh] min-h-[8rem] overflow-y-auto" style={{ fontSize: size + 3 }}>
          <p className={`${pali ? "pali-text" : ""} whitespace-pre-line`}>{shown}</p>
        </div>
        <PlayerBar p={p} big />
      </div>
    </div>
  );
}
