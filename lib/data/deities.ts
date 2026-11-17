import type { Localized } from "@/lib/i18n";
import type { Gatha } from "./gatha";

const L = (si: string, en: string, ta: string, es: string): Localized => ({ si, en, ta, es });

/** One card per deity: the traditional Pāli merit verses with a dedication naming that deity. */
type Deity = { slug: string; icon: string; si: string; siTo: string; en: string; ta: string; es: string; role: Localized };

const DEITIES: Deity[] = [
  { slug: "maha-brahma", icon: "🌟", si: "මහා බ්‍රහ්මයා", siTo: "සහම්පති මහා බ්‍රහ්මයාණන්ට", en: "Mahā Brahmā", ta: "மகா பிரம்மா", es: "Mahā Brahmā",
    role: L("බුදුරජාණන් වහන්සේට ධර්ම දේශනාවට ආරාධනා කළ මහා බ්‍රහ්මයා", "Who requested the Buddha to teach the Dhamma", "புத்தரைத் தர்மம் போதிக்க வேண்டியவர்", "Quien pidió al Buda enseñar el Dhamma") },
  { slug: "sakra", icon: "⚡", si: "ශක්‍ර දේවේන්ද්‍රයා", siTo: "ශක්‍ර දේවේන්ද්‍රයාණන්ට", en: "Sakra, lord of the devas", ta: "சக்ரன் — தேவேந்திரன்", es: "Sakra, señor de los devas",
    role: L("තව්තිසා දෙව්ලොව අධිපති, බුද්ධ ශාසනයේ ආරක්ෂකයා", "King of the Tāvatiṁsa heaven, protector of the Teaching", "தாவதிம்ச சொர்க்கத்தின் அரசர்", "Rey del cielo Tāvatiṁsa") },
  { slug: "vishnu", icon: "🪷", si: "ශ්‍රී විෂ්ණු දෙවියන්", siTo: "උපුල්වන් ශ්‍රී විෂ්ණු දෙවියන් වහන්සේට", en: "Viṣṇu (Upulvan)", ta: "விஷ்ணு (உபுல்வன்)", es: "Viṣṇu (Upulvan)",
    role: L("ලංකාවේ හා බුද්ධ ශාසනයේ ආරක්ෂක දෙවියන් ලෙස සැලකේ", "Revered in Sri Lanka as guardian of the island and the Teaching", "இலங்கையின் காவல் தெய்வம்", "Venerado como guardián de Sri Lanka") },
  { slug: "kataragama", icon: "🦚", si: "කතරගම දෙවියන්", siTo: "කතරගම දෙවියන් වහන්සේට", en: "the god of Kataragama", ta: "கதிர்காமக் கடவுள்", es: "el dios de Kataragama",
    role: L("කතරගම වැඩ සිටින, ලක්වාසීන් රකින දෙවියන්", "Guardian deity of Kataragama", "கதிர்காமத்தின் காவல் தெய்வம்", "Deidad guardiana de Kataragama") },
  { slug: "saman", icon: "⛰️", si: "සුමන සමන් දෙවියන්", siTo: "ශ්‍රී පාදස්ථානය රකින සුමන සමන් දෙවියන් වහන්සේට", en: "Saman", ta: "சமன் தெய்வம்", es: "Saman",
    role: L("ශ්‍රී පාද පුදබිමේ ආරක්ෂක දෙවියන්", "Guardian of Sri Pāda (Adam's Peak)", "ஸ்ரீ பாதத்தின் காவலர்", "Guardián de Sri Pāda") },
  { slug: "vibhishana", icon: "🏯", si: "විභීෂණ දෙවියන්", siTo: "විභීෂණ දෙවියන් වහන්සේට", en: "Vibhīṣaṇa", ta: "விபீஷணன்", es: "Vibhīṣaṇa",
    role: L("කැලණිය පුදබිමේ ආරක්ෂක දෙවියන්", "Guardian deity of Kelaniya", "களனியின் காவல் தெய்வம்", "Deidad guardiana de Kelaniya") },
  { slug: "pattini", icon: "🌸", si: "පත්තිනි දේවිය", siTo: "පත්තිනි දේවියන් වහන්සේට", en: "Goddess Pattini", ta: "பத்தினி தேவி", es: "la diosa Pattini",
    role: L("සෞඛ්‍යය හා පවුල් සුරකින දේවිය", "Goddess of health and protection of families", "ஆரோக்கியத்தின் தேவி", "Diosa de la salud y las familias") },
  { slug: "natha", icon: "🙏", si: "නාථ දෙවියන්", siTo: "නාථ දෙවියන් වහන්සේට", en: "Nātha", ta: "நாதர்", es: "Nātha",
    role: L("ලාංකේය සතර දේවාලවලින් එක් දෙවියන්", "One of the four guardian deities of Sri Lanka", "இலங்கையின் நான்கு காவல் தெய்வங்களில் ஒன்று", "Una de las cuatro deidades guardianas de Sri Lanka") },
  { slug: "dadimunda", icon: "🛡️", si: "දැඩිමුණ්ඩ දෙවියන්", siTo: "දැඩිමුණ්ඩ දෙවියන් වහන්සේට", en: "Däḍimuṇḍa", ta: "தெடிமுண்ட", es: "Däḍimuṇḍa",
    role: L("අළුත්නුවර දේවාලයේ ආරක්ෂක දෙවියන්", "Guardian deity of Aluthnuwara", "அளுத்நுவர காவல் தெய்வம்", "Deidad guardiana de Aluthnuwara") },
  { slug: "satara-waram", icon: "👑", si: "සතරවරම් දෙවිවරු", siTo: "ධතරට්ඨ, විරූළ්හක, විරූපක්ඛ, වෛශ්‍රවණ යන සතරවරම් දෙවිවරුන්ට", en: "the Four Great Kings", ta: "நான்கு மகாராஜர்கள்", es: "los Cuatro Grandes Reyes",
    role: L("සිව් දිශාව රකින දෙවි රජවරු", "Guardian kings of the four directions", "நான்கு திசைகளின் காவல் அரசர்கள்", "Reyes guardianes de las cuatro direcciones") },
  { slug: "gruha-devata", icon: "🏡", si: "ගෘහ හා ග්‍රාම දේවතාවන්", siTo: "අපේ නිවස, ගම, රට රකින සියලු ගෘහ දේවතා, ග්‍රාම දේවතා හා ආරක්ෂක දේවතාවන්ට", en: "the deities of home and village", ta: "வீடு, கிராம தெய்வங்கள்", es: "las deidades del hogar y la aldea",
    role: L("නිවස, ගම හා රට රකින දේවතාවෝ", "Devas who protect home, village and country", "வீடு, கிராமம், நாட்டைக் காக்கும் தேவர்கள்", "Devas que protegen el hogar, la aldea y el país") },
];

const PALI = [
  "Ākāsaṭṭhā ca bhummaṭṭhā, devā nāgā mahiddhikā;\nPuññaṁ taṁ anumoditvā, ciraṁ rakkhantu sāsanaṁ.",
  "Ākāsaṭṭhā ca bhummaṭṭhā, devā nāgā mahiddhikā;\nPuññaṁ taṁ anumoditvā, ciraṁ rakkhantu maṁ paraṁ.",
  "Ettāvatā ca amhehi, sambhataṁ puññasampadaṁ;\nSabbe devā anumodantu, sabbasampattisiddhiyā.",
];

export const DEITY_GATHAS: Gatha[] = DEITIES.map((d) => ({
  slug: `pin-${d.slug}`,
  group: "deities",
  icon: d.icon,
  title: L(`${d.si}ට පින් දීම`, `Merit for ${d.en}`, `${d.ta} — புண்ணியம்`, `Méritos para ${d.es}`),
  pali: PALI,
  meaning: L(
    `(${d.role.si})\n\n🙏 අප විසින් කරන ලද මේ සියලු කුසල් ${d.siTo} අනුමෝදන් වේවා! ${d.si} මේ පින් අනුමෝදන් වී, බුද්ධ ශාසනයද, අපද, අපේ පවුලේ සැමද, රටද බොහෝ කල් රකිත්වා! සියලු සම්පත් සිද්ධිය පිණිස අනුමෝදන් වෙත්වා!`,
    `(${d.role.en})\n\n🙏 May all the merit we have made go to ${d.en}. Rejoicing in this merit, may they long protect the Buddha's Teaching, us, our families and our country, for the fulfilment of every blessing!`,
    `(${d.role.ta})\n\n🙏 நாங்கள் செய்த இந்தப் புண்ணியம் ${d.ta} அவர்களுக்குச் சேர்வதாக. மகிழ்ந்து புத்த சாசனத்தையும் எங்களையும் எங்கள் குடும்பத்தையும் நாட்டையும் நீண்ட காலம் காப்பார்களாக!`,
    `(${d.role.es})\n\n🙏 Que todo el mérito que hemos hecho llegue a ${d.es}. ¡Que, regocijándose, protejan por mucho tiempo la Enseñanza, a nosotros, a nuestras familias y a nuestro país!`,
  ),
  note: L(
    "පාලි ගාථා: සාම්ප්‍රදායික පින් අනුමෝදනා ගාථා. දෙවියන් නම් කරන පින් දීම ශ්‍රී ලාංකේය සම්ප්‍රදායයි.",
    "Pāli: the traditional merit-sharing verses; naming the deity follows Sri Lankan tradition.",
    "பாளி: பாரம்பரிய புண்ணியப் பகிர்வுப் பாடல்கள்.",
    "Pāli: versos tradicionales de dedicación de méritos.",
  ),
}));
