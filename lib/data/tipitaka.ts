import type { Localized } from "@/lib/i18n";

export type Collection = { uid: string; pali: string; name: Localized };
export type Pitaka = { key: string; pali: string; name: Localized; desc: Localized; hue: number; collections: Collection[] };

const L = (si: string, en: string, ta: string, es: string): Localized => ({ si, en, ta, es });

export const PITAKAS: Pitaka[] = [
  {
    key: "vinaya",
    pali: "Vinayapiṭaka",
    hue: 25,
    name: L("විනය පිටකය", "Basket of Discipline", "வினய பிடகம்", "Cesta de la Disciplina"),
    desc: L("භික්ෂු භික්ෂුණී විනය නීති සහ ඒවායේ ඉතිහාසය", "Monastic rules for monks and nuns and their origins", "துறவிகளின் ஒழுக்க விதிகளும் அவற்றின் தோற்றமும்", "Reglas monásticas para monjes y monjas y su origen"),
    collections: [
      { uid: "pli-tv-bu-vb", pali: "Bhikkhuvibhaṅga", name: L("භික්ඛු විභංගය", "Monks' Rules & Analysis", "பிக்கு விபங்கம்", "Reglas de los monjes") },
      { uid: "pli-tv-bi-vb", pali: "Bhikkhunīvibhaṅga", name: L("භික්ඛුනී විභංගය", "Nuns' Rules & Analysis", "பிக்குனி விபங்கம்", "Reglas de las monjas") },
      { uid: "pli-tv-kd", pali: "Khandhaka", name: L("ඛන්ධකය", "The Chapters", "கந்தகம்", "Los Capítulos") },
      { uid: "pli-tv-pvr", pali: "Parivāra", name: L("පරිවාරය", "The Compendium", "பரிவாரம்", "El Compendio") },
      { uid: "pli-tv-bu-pm", pali: "Bhikkhupātimokkha", name: L("භික්ඛු පාතිමොක්ඛය", "Monks' Pātimokkha", "பிக்கு பாதிமொக்கம்", "Pātimokkha de monjes") },
      { uid: "pli-tv-bi-pm", pali: "Bhikkhunīpātimokkha", name: L("භික්ඛුනී පාතිමොක්ඛය", "Nuns' Pātimokkha", "பிக்குனி பாதிமொக்கம்", "Pātimokkha de monjas") },
    ],
  },
  {
    key: "sutta",
    pali: "Suttapiṭaka",
    hue: 45,
    name: L("සූත්‍ර පිටකය", "Basket of Discourses", "சூத்திர பிடகம்", "Cesta de los Discursos"),
    desc: L("බුදුරජාණන් වහන්සේගේ හා ශ්‍රාවකයන්ගේ දේශනා", "Teachings of the Buddha and his disciples", "புத்தர் மற்றும் சீடர்களின் போதனைகள்", "Enseñanzas del Buda y sus discípulos"),
    collections: [
      { uid: "dn", pali: "Dīghanikāya", name: L("දීඝ නිකාය", "Long Discourses", "தீக நிகாயம்", "Discursos largos") },
      { uid: "mn", pali: "Majjhimanikāya", name: L("මජ්ඣිම නිකාය", "Middle Discourses", "மஜ்ஜிம நிகாயம்", "Discursos medios") },
      { uid: "sn", pali: "Saṁyuttanikāya", name: L("සංයුත්ත නිකාය", "Linked Discourses", "சம்யுத்த நிகாயம்", "Discursos conectados") },
      { uid: "an", pali: "Aṅguttaranikāya", name: L("අංගුත්තර නිකාය", "Numbered Discourses", "அங்குத்தர நிகாயம்", "Discursos numéricos") },
      { uid: "kn", pali: "Khuddakanikāya", name: L("ඛුද්දක නිකාය", "Minor Collection", "குத்தக நிகாயம்", "Colección menor") },
    ],
  },
  {
    key: "abhidhamma",
    pali: "Abhidhammapiṭaka",
    hue: 280,
    name: L("අභිධර්ම පිටකය", "Basket of Higher Teaching", "அபிதம்ம பிடகம்", "Cesta de la Enseñanza Superior"),
    desc: L("සිත, චෛතසික, රූප, නිර්වාණ පිළිබඳ ගැඹුරු විග්‍රහය", "Systematic analysis of mind, matter and Nibbāna", "மனம், பொருள், நிப்பானம் பற்றிய முறையான பகுப்பாய்வு", "Análisis sistemático de la mente, la materia y el Nibbāna"),
    collections: [
      { uid: "ds", pali: "Dhammasaṅgaṇī", name: L("ධම්මසංගණී", "Enumeration of Phenomena", "தம்மசங்கணி", "Enumeración de fenómenos") },
      { uid: "vb", pali: "Vibhaṅga", name: L("විභංගය", "Book of Analysis", "விபங்கம்", "Libro del análisis") },
      { uid: "dt", pali: "Dhātukathā", name: L("ධාතුකථා", "Discussion of Elements", "தாதுகதா", "Discusión de elementos") },
      { uid: "pp", pali: "Puggalapaññatti", name: L("පුග්ගලපඤ්ඤත්ති", "Types of Persons", "புக்கலபஞ்ஞத்தி", "Tipos de personas") },
      { uid: "kv", pali: "Kathāvatthu", name: L("කථාවත්ථු", "Points of Controversy", "கதாவத்து", "Puntos de controversia") },
      { uid: "ya", pali: "Yamaka", name: L("යමකය", "The Pairs", "யமகம்", "Los Pares") },
      { uid: "patthana", pali: "Paṭṭhāna", name: L("පට්ඨානය", "Conditional Relations", "பட்டானம்", "Relaciones condicionales") },
    ],
  },
];

export function findCollection(uid: string): Collection | undefined {
  for (const p of PITAKAS) for (const c of p.collections) if (c.uid === uid) return c;
}
