/**
 * Roman (IAST-style) Pāli → Sinhala script transliteration.
 * Pāli in Sri Lanka has traditionally been written in Sinhala letters,
 * so this lets every Pāli text in the app be read in Sinhala script.
 */

const VOWELS: Record<string, [independent: string, sign: string]> = {
  a: ["අ", ""],
  "ā": ["ආ", "ා"],
  i: ["ඉ", "ි"],
  "ī": ["ඊ", "ී"],
  u: ["උ", "ු"],
  "ū": ["ඌ", "ූ"],
  e: ["එ", "ෙ"],
  o: ["ඔ", "ො"],
};

const ASPIRATES: Record<string, string> = {
  kh: "ඛ", gh: "ඝ", ch: "ඡ", jh: "ඣ", "ṭh": "ඨ", "ḍh": "ඪ", th: "ථ", dh: "ධ", ph: "ඵ", bh: "භ",
};

const CONSONANTS: Record<string, string> = {
  k: "ක", g: "ග", "ṅ": "ඞ", c: "ච", j: "ජ", "ñ": "ඤ", "ṭ": "ට", "ḍ": "ඩ", "ṇ": "ණ",
  t: "ත", d: "ද", n: "න", p: "ප", b: "බ", m: "ම", y: "ය", r: "ර", l: "ල", v: "ව",
  s: "ස", h: "හ", "ḷ": "ළ",
};

const NIGGAHITA = new Set(["ṁ", "ṃ", "ŋ"]);
const VIRAMA = "්";

export function paliToSinhala(input: string): string {
  const src = input.normalize("NFC");
  let out = "";
  let i = 0;
  while (i < src.length) {
    const ch = src[i].toLowerCase();
    const two = (ch + (src[i + 1] ?? "")).toLowerCase();

    let cons: string | undefined;
    if (ASPIRATES[two]) {
      cons = ASPIRATES[two];
      i += 2;
    } else if (CONSONANTS[ch]) {
      cons = CONSONANTS[ch];
      i += 1;
    }

    if (cons) {
      const next = (src[i] ?? "").toLowerCase();
      const v = VOWELS[next];
      if (v) {
        out += cons + v[1];
        i += 1;
      } else {
        out += cons + VIRAMA;
      }
      continue;
    }

    if (VOWELS[ch]) {
      out += VOWELS[ch][0];
      i += 1;
      continue;
    }
    if (NIGGAHITA.has(ch)) {
      out += "ං";
      i += 1;
      continue;
    }
    out += src[i];
    i += 1;
  }
  return out;
}

export type PaliScript = "roman" | "sinhala";

export function renderPali(text: string, script: PaliScript): string {
  return script === "sinhala" ? paliToSinhala(text) : text;
}
