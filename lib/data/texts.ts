import type { Localized } from "@/lib/i18n";

export type TextItem = {
  uid: string;
  pali: string;
  name: Localized;
  desc?: Localized;
  videos?: string[];
};

const L = (si: string, en: string, ta: string, es: string): Localized => ({ si, en, ta, es });

/** Well-known suttas, each with Dhamma talks where available. */
export const SUTRAS: TextItem[] = [
  {
    uid: "sn56.11",
    pali: "Dhammacakkappavattanasutta",
    name: L("ධම්මචක්කප්පවත්තන සූත්‍රය", "Turning the Wheel of Dhamma", "தம்மசக்கப்பவத்தன சூத்திரம்", "Puesta en marcha de la Rueda del Dhamma"),
    desc: L("බුදුරජාණන් වහන්සේගේ පළමු දේශනාව — චතුරාර්ය සත්‍යය", "The Buddha's first sermon — the Four Noble Truths", "புத்தரின் முதல் போதனை — நான்கு உன்னத உண்மைகள்", "El primer sermón del Buda — las Cuatro Nobles Verdades"),
    videos: ["dhammacakka"],
  },
  {
    uid: "sn22.59",
    pali: "Anattalakkhaṇasutta",
    name: L("අනත්තලක්ඛණ සූත්‍රය", "The Characteristic of Not-Self", "அனத்தலக்கண சூத்திரம்", "La característica del no-yo"),
    desc: L("දෙවන දේශනාව — අනාත්ම ලක්ෂණය", "The second sermon — on not-self", "இரண்டாவது போதனை — அனாத்மா", "El segundo sermón — sobre el no-yo"),
    videos: ["anatta"],
  },
  {
    uid: "sn35.28",
    pali: "Ādittasutta",
    name: L("ආදිත්තපරියාය සූත්‍රය", "The Fire Sermon", "ஆதித்த சூத்திரம்", "El sermón del fuego"),
    desc: L("සියල්ල ගිනිගෙන දැවෙයි — රාග, ද්වේෂ, මෝහ ගින්නෙන්", "All is burning — with greed, hatred and delusion", "எல்லாம் எரிகிறது — ஆசை, வெறுப்பு, மயக்கத்தால்", "Todo arde — con codicia, odio e ignorancia"),
  },
  {
    uid: "dn22",
    pali: "Mahāsatipaṭṭhānasutta",
    name: L("මහා සතිපට්ඨාන සූත්‍රය", "The Great Discourse on Mindfulness", "மகா சதிபட்டான சூத்திரம்", "El gran discurso sobre la atención"),
    desc: L("නිවනට ඇති එකම මාර්ගය — සතර සතිපට්ඨානය", "The direct path — four foundations of mindfulness", "நேரடி வழி — நான்கு நினைவு அடித்தளங்கள்", "El camino directo — los cuatro fundamentos de la atención"),
    videos: ["satipatthana"],
  },
  {
    uid: "mn10",
    pali: "Satipaṭṭhānasutta",
    name: L("සතිපට්ඨාන සූත්‍රය", "Foundations of Mindfulness", "சதிபட்டான சூத்திரம்", "Fundamentos de la atención"),
    videos: ["satipatthana"],
  },
  {
    uid: "mn118",
    pali: "Ānāpānassatisutta",
    name: L("ආනාපානසති සූත්‍රය", "Mindfulness of Breathing", "ஆனாபானசதி சூத்திரம்", "Atención a la respiración"),
    desc: L("ආශ්වාස ප්‍රශ්වාසය ඇසුරෙන් නිවන් මඟ", "The path to awakening through the breath", "மூச்சின் வழியே விழிப்புக்கான பாதை", "El camino al despertar a través de la respiración"),
    videos: ["anapanasati"],
  },
  {
    uid: "snp2.4",
    pali: "Maṅgalasutta",
    name: L("මහා මංගල සූත්‍රය", "Discourse on Blessings", "மகா மங்கல சூத்திரம்", "Discurso de las bendiciones"),
    desc: L("උතුම් මංගල කරුණු 38", "The 38 highest blessings", "38 உயர்ந்த மங்கலங்கள்", "Las 38 bendiciones supremas"),
    videos: ["mangala"],
  },
  {
    uid: "snp2.1",
    pali: "Ratanasutta",
    name: L("රතන සූත්‍රය", "The Jewel Discourse", "ரதன சூத்திரம்", "Discurso de las joyas"),
    desc: L("විශාලා මහනුවර තුන් බිය දුරු කළ පිරිත", "The protection that ended Vesālī's three perils", "வேசாலியின் மூன்று அச்சங்களை நீக்கிய பாதுகாப்பு", "La protección que acabó con los tres peligros de Vesālī"),
    videos: ["ratana"],
  },
  {
    uid: "kp9",
    pali: "Karaṇīyamettasutta",
    name: L("කරණීය මෙත්ත සූත්‍රය", "Discourse on Loving-kindness", "கரணீய மெத்த சூத்திரம்", "Discurso del amor benevolente"),
    desc: L("සියලු සත්ත්වයන් කෙරෙහි අප්‍රමාණ මෛත්‍රිය", "Boundless love for all beings", "எல்லா உயிர்களிடமும் எல்லையற்ற அன்பு", "Amor ilimitado hacia todos los seres"),
    videos: ["mettaSutta", "metta"],
  },
  {
    uid: "an3.65",
    pali: "Kesamuttisutta (Kālāma)",
    name: L("කාලාම සූත්‍රය", "The Kālāma Discourse", "காலாம சூத்திரம்", "Discurso a los Kālāmas"),
    desc: L("ඇසූ පමණින් නොපිළිගෙන, ඔබම විමසා බලන්න", "Don't accept on hearsay — examine for yourself", "கேட்டதை மட்டும் ஏற்காதீர் — நீங்களே ஆராயுங்கள்", "No aceptes por lo oído — examínalo tú mismo"),
  },
  {
    uid: "dn31",
    pali: "Siṅgālasutta",
    name: L("සිඟාලෝවාද සූත්‍රය", "Advice to Sigālaka", "சிகாலோவாத சூத்திரம்", "Consejos a Sigālaka"),
    desc: L("ගිහි විනය — පවුල, මිතුරන්, සමාජය", "The layperson's code — family, friends, society", "இல்லறத்தாரின் ஒழுக்கம் — குடும்பம், நண்பர்கள், சமூகம்", "El código del laico — familia, amigos, sociedad"),
  },
  {
    uid: "snp1.6",
    pali: "Parābhavasutta",
    name: L("පරාභව සූත්‍රය", "Causes of Downfall", "பராபவ சூத்திரம்", "Causas de la ruina"),
  },
  {
    uid: "snp1.7",
    pali: "Vasalasutta",
    name: L("වසල සූත්‍රය", "Who Is an Outcast?", "வசல சூத்திரம்", "¿Quién es un paria?"),
  },
  {
    uid: "mn21",
    pali: "Kakacūpamasutta",
    name: L("කකචූපම සූත්‍රය", "The Simile of the Saw", "ககசூபம சூத்திரம்", "El símil de la sierra"),
  },
  {
    uid: "mn119",
    pali: "Kāyagatāsatisutta",
    name: L("කායගතාසති සූත්‍රය", "Mindfulness of the Body", "காயகதாசதி சூத்திரம்", "Atención al cuerpo"),
    videos: ["kayagatasati"],
  },
  {
    uid: "dn16",
    pali: "Mahāparinibbānasutta",
    name: L("මහා පරිනිබ්බාන සූත්‍රය", "The Buddha's Final Days", "மகா பரிநிப்பான சூத்திரம்", "Los últimos días del Buda"),
  },
  {
    uid: "dhp1-20",
    pali: "Dhammapada — Yamakavagga",
    name: L("ධම්මපදය — යමක වර්ගය", "Dhammapada — Pairs", "தம்மபதம் — இரட்டைகள்", "Dhammapada — Pares"),
  },
];

/** The Maha Pirith (Catubhāṇavāra) and other common protective chants. */
export const PIRITH: TextItem[] = [
  { uid: "kp1", pali: "Saraṇattaya", name: L("තිසරණය", "The Three Refuges", "மும்மணி சரணம்", "Los Tres Refugios") },
  { uid: "kp2", pali: "Dasasikkhāpada", name: L("දස සික්ඛාපද", "The Ten Precepts", "பத்து ஒழுக்கங்கள்", "Los Diez Preceptos") },
  { uid: "snp2.4", pali: "Maṅgalasutta", name: L("මහා මංගල සූත්‍රය", "Discourse on Blessings", "மகா மங்கல சூத்திரம்", "Discurso de las bendiciones"), videos: ["mangala"] },
  { uid: "snp2.1", pali: "Ratanasutta", name: L("රතන සූත්‍රය", "The Jewel Discourse", "ரதன சூத்திரம்", "Discurso de las joyas"), videos: ["ratana"] },
  { uid: "kp9", pali: "Karaṇīyamettasutta", name: L("කරණීය මෙත්ත සූත්‍රය", "Loving-kindness", "கரணீய மெத்த சூத்திரம்", "Amor benevolente"), videos: ["mettaSutta"] },
  { uid: "an4.67", pali: "Khandhaparitta (Ahirāja)", name: L("ඛන්ධ පරිත්තය", "Protection of the Aggregates", "கந்த பரித்தம்", "Protección de los agregados") },
  { uid: "an11.15", pali: "Mettānisaṁsasutta", name: L("මෙත්තානිසංස සූත්‍රය", "The Benefits of Loving-kindness", "மெத்தானிசம்ஸ சூத்திரம்", "Los beneficios del amor benevolente") },
  { uid: "ja159", pali: "Moraparitta", name: L("මෝර පරිත්තය", "The Peacock's Protection", "மோர பரித்தம்", "Protección del pavo real") },
  { uid: "cp29", pali: "Vaṭṭakaparitta", name: L("වට්ටක පරිත්තය", "The Quail's Protection", "வட்டக பரித்தம்", "Protección de la codorniz") },
  { uid: "sn11.3", pali: "Dhajaggasutta", name: L("ධජග්ග සූත්‍රය", "The Banner's Crest", "தஜக்க சூத்திரம்", "La cima del estandarte"), videos: ["dhajagga"] },
  { uid: "dn32", pali: "Āṭānāṭiyasutta", name: L("ආටානාටිය සූත්‍රය", "The Āṭānāṭiya Protection", "ஆடானாடிய சூத்திரம்", "La protección Āṭānāṭiya") },
  { uid: "mn86", pali: "Aṅgulimālasutta", name: L("අංගුලිමාල සූත්‍රය", "With Aṅgulimāla", "அங்குலிமால சூத்திரம்", "Con Aṅgulimāla"), videos: ["angulimala"] },
  { uid: "sn46.14", pali: "Mahākassapabojjhaṅga", name: L("මහා කස්සප බොජ්ඣංග සූත්‍රය", "Awakening Factors (Kassapa)", "மகா கஸ்ஸப போஜ்ஜங்க சூத்திரம்", "Factores del despertar (Kassapa)") },
  { uid: "sn46.15", pali: "Mahāmoggallānabojjhaṅga", name: L("මහා මොග්ගල්ලාන බොජ්ඣංග සූත්‍රය", "Awakening Factors (Moggallāna)", "மகா மொக்கல்லான போஜ்ஜங்க சூத்திரம்", "Factores del despertar (Moggallāna)") },
  { uid: "sn46.16", pali: "Mahācundabojjhaṅga", name: L("මහා චුන්ද බොජ්ඣංග සූත්‍රය", "Awakening Factors (Cunda)", "மகா சுந்த போஜ்ஜங்க சூத்திரம்", "Factores del despertar (Cunda)") },
  { uid: "an10.60", pali: "Girimānandasutta", name: L("ගිරිමානන්ද සූත්‍රය", "With Girimānanda", "கிரிமானந்த சூத்திரம்", "Con Girimānanda") },
  { uid: "mn116", pali: "Isigilisutta", name: L("ඉසිගිලි සූත්‍රය", "At Isigili", "இசிகிலி சூத்திரம்", "En Isigili") },
  { uid: "sn56.11", pali: "Dhammacakkappavattanasutta", name: L("ධම්මචක්කප්පවත්තන සූත්‍රය", "Turning the Wheel of Dhamma", "தம்மசக்கப்பவத்தன சூத்திரம்", "La Rueda del Dhamma"), videos: ["dhammacakka"] },
  { uid: "dn20", pali: "Mahāsamayasutta", name: L("මහා සමය සූත්‍රය", "The Great Congregation", "மகா சமய சூத்திரம்", "La gran congregación") },
  { uid: "snp1.10", pali: "Āḷavakasutta", name: L("ආළවක සූත්‍රය", "Āḷavaka the Spirit", "ஆளவக சூத்திரம்", "Āḷavaka el espíritu") },
  { uid: "snp1.4", pali: "Kasibhāradvājasutta", name: L("කසීභාරද්වාජ සූත්‍රය", "Bhāradvāja the Farmer", "கசிபாரத்வாஜ சூத்திரம்", "Bhāradvāja el granjero") },
  { uid: "snp1.6", pali: "Parābhavasutta", name: L("පරාභව සූත්‍රය", "Causes of Downfall", "பராபவ சூத்திரம்", "Causas de la ruina") },
  { uid: "snp1.7", pali: "Vasalasutta", name: L("වසල සූත්‍රය", "Who Is an Outcast?", "வசல சூத்திரம்", "¿Quién es un paria?") },
  { uid: "mn141", pali: "Saccavibhaṅgasutta", name: L("සච්චවිභංග සූත්‍රය", "Analysis of the Truths", "சச்சவிபங்க சூத்திரம்", "Análisis de las verdades") },
  { uid: "sn2.9", pali: "Candaparitta", name: L("චන්ද පරිත්තය", "The Moon's Protection", "சந்த பரித்தம்", "Protección de la luna") },
  { uid: "sn2.10", pali: "Sūriyaparitta", name: L("සූරිය පරිත්තය", "The Sun's Protection", "சூரிய பரித்தம்", "Protección del sol") },
];

/** Related videos for any uid, from the curated lists. */
export function videoKeysForUid(uid: string): string[] {
  const keys = new Set<string>();
  for (const it of [...SUTRAS, ...PIRITH]) if (it.uid === uid || (uid === "snp1.8" && it.uid === "kp9")) it.videos?.forEach((k) => keys.add(k));
  if (uid === "patthana1.1" || uid.startsWith("patthana")) keys.add("patthana");
  return [...keys];
}
