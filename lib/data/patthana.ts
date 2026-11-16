import type { Localized } from "@/lib/i18n";

export type Paccaya = { pali: string; meaning: Localized };

const p = (pali: string, si: string, en: string, ta: string, es: string): Paccaya => ({
  pali,
  meaning: { si, en, ta, es },
});

/** The 24 conditions (paccaya) as listed in the Paccayuddesa of the Paṭṭhāna. */
export const PACCAYAS: Paccaya[] = [
  p("Hetupaccayo", "මූල හේතුව ලෙස උපකාර වීම", "Root condition", "வேர் நிபந்தனை", "Condición de raíz"),
  p("Ārammaṇapaccayo", "අරමුණ ලෙස උපකාර වීම", "Object condition", "பொருள் நிபந்தனை", "Condición de objeto"),
  p("Adhipatipaccayo", "අධිපති බවින් උපකාර වීම", "Predominance condition", "மேலாண்மை நிபந்தனை", "Condición de predominio"),
  p("Anantarapaccayo", "අතරක් නැතිව ඉක්බිති උපකාර වීම", "Proximity condition", "அண்மை நிபந்தனை", "Condición de proximidad"),
  p("Samanantarapaccayo", "මනාකොට අතරක් නැතිව උපකාර වීම", "Contiguity condition", "இடைவெளியின்மை நிபந்தனை", "Condición de contigüidad"),
  p("Sahajātapaccayo", "එකවර උපදීමෙන් උපකාර වීම", "Conascence condition", "உடன்தோற்ற நிபந்தனை", "Condición de conacimiento"),
  p("Aññamaññapaccayo", "අන්‍යෝන්‍ය වශයෙන් උපකාර වීම", "Mutuality condition", "பரஸ்பர நிபந்தனை", "Condición de mutualidad"),
  p("Nissayapaccayo", "ඇසුරු වීමෙන් උපකාර වීම", "Support condition", "ஆதார நிபந்தனை", "Condición de soporte"),
  p("Upanissayapaccayo", "බලවත් ඇසුරක් ලෙස උපකාර වීම", "Decisive support condition", "வலுவான ஆதார நிபந்தனை", "Condición de soporte decisivo"),
  p("Purejātapaccayo", "පෙර උපන් බැවින් උපකාර වීම", "Prenascence condition", "முன்தோற்ற நிபந்தனை", "Condición de prenacimiento"),
  p("Pacchājātapaccayo", "පසුව උපන් බැවින් උපකාර වීම", "Postnascence condition", "பின்தோற்ற நிபந்தனை", "Condición de posnacimiento"),
  p("Āsevanapaccayo", "නැවත නැවත පුරුදු වීමෙන් උපකාර වීම", "Repetition condition", "மீள்செயல் நிபந்தனை", "Condición de repetición"),
  p("Kammapaccayo", "කර්මය ලෙස උපකාර වීම", "Kamma condition", "கர்ம நிபந்தனை", "Condición de kamma"),
  p("Vipākapaccayo", "විපාකය ලෙස උපකාර වීම", "Kamma-result condition", "கர்மவிளைவு நிபந்தனை", "Condición de resultado"),
  p("Āhārapaccayo", "ආහාරය ලෙස උපකාර වීම", "Nutriment condition", "உணவு நிபந்தனை", "Condición de nutrimento"),
  p("Indriyapaccayo", "ඉන්ද්‍රිය ලෙස උපකාර වීම", "Faculty condition", "இந்திரிய நிபந்தனை", "Condición de facultad"),
  p("Jhānapaccayo", "ධ්‍යාන ලෙස උපකාර වීම", "Jhāna condition", "ஜான நிபந்தனை", "Condición de jhāna"),
  p("Maggapaccayo", "මාර්ගය ලෙස උපකාර වීම", "Path condition", "மார்க்க நிபந்தனை", "Condición de sendero"),
  p("Sampayuttapaccayo", "එක්ව යෙදීමෙන් උපකාර වීම", "Association condition", "சேர்க்கை நிபந்தனை", "Condición de asociación"),
  p("Vippayuttapaccayo", "වෙන්ව පැවතීමෙන් උපකාර වීම", "Dissociation condition", "பிரிவு நிபந்தனை", "Condición de disociación"),
  p("Atthipaccayo", "පැවතීමෙන් උපකාර වීම", "Presence condition", "இருப்பு நிபந்தனை", "Condición de presencia"),
  p("Natthipaccayo", "නොපැවතීමෙන් උපකාර වීම", "Absence condition", "இன்மை நிபந்தனை", "Condición de ausencia"),
  p("Vigatapaccayo", "පහව යාමෙන් උපකාර වීම", "Disappearance condition", "மறைவு நிபந்தனை", "Condición de desaparición"),
  p("Avigatapaccayo", "පහව නොයාමෙන් උපකාර වීම", "Non-disappearance condition", "மறையாமை நிபந்தனை", "Condición de no desaparición"),
];

/** SuttaCentral uid holding the Paccayuddesa + Paccayaniddesa (what is chanted as Samanta Paṭṭhāna). */
export const PATTHANA_UID = "patthana1.1";
