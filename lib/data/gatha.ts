import type { Localized } from "@/lib/i18n";

export type Gatha = {
  slug: string;
  group: "vandana" | "puja" | "devata" | "places" | "jaya";
  icon: string;
  title: Localized;
  /** Pāli in Roman script; one verse per array item, lines separated by \n. Rendered in Sinhala script on demand. */
  pali: string[];
  meaning: Localized;
  note?: Localized;
  readUid?: string;
  videos?: string[];
};

const L = (si: string, en: string, ta: string, es: string): Localized => ({ si, en, ta, es });

export const GATHA_GROUPS: { key: Gatha["group"]; name: Localized }[] = [
  { key: "vandana", name: L("තෙරුවන් වන්දනා", "Homage to the Triple Gem", "மும்மணி வணக்கம்", "Homenaje a la Triple Joya") },
  { key: "puja", name: L("පූජා ගාථා", "Offering verses", "பூஜை பாடல்கள்", "Versos de ofrenda") },
  { key: "places", name: L("පූජනීය ස්ථාන හා ශ්‍රාවක වන්දනා", "Sacred places & great disciples", "புனித இடங்களும் சீடர்களும்", "Lugares sagrados y grandes discípulos") },
  { key: "jaya", name: L("ජය මංගල හා ශාන්ති", "Victory blessings & shānthi", "வெற்றி ஆசீர்வாதங்கள்", "Bendiciones de victoria") },
  { key: "devata", name: L("දෙවි දේවතාවන්ට පින් දීම හා ආරක්ෂාව", "Devas: invitation, merit & protection", "தேவர்கள்: அழைப்பு, புண்ணியம், பாதுகாப்பு", "Devas: invitación, méritos y protección") },
];

export const GATHAS: Gatha[] = [
  // ── Triple Gem ───────────────────────────────────────────
  {
    slug: "namaskara",
    group: "vandana",
    icon: "🙏",
    title: L("බුද්ධ නමස්කාරය", "Homage to the Buddha", "புத்த வணக்கம்", "Homenaje al Buda"),
    pali: ["Namo tassa bhagavato arahato sammāsambuddhassa.\nNamo tassa bhagavato arahato sammāsambuddhassa.\nNamo tassa bhagavato arahato sammāsambuddhassa."],
    meaning: L(
      "ඒ භාග්‍යවත් වූ, අර්හත් වූ, සම්මා සම්බුද්ධ වූ බුදුරජාණන් වහන්සේට මාගේ නමස්කාරය වේවා!",
      "Homage to the Blessed One, the Worthy One, the Fully Self-Awakened One!",
      "பகவானும், அருகதரும், முழுமையாகத் தானே விழிப்புற்றவருமான அவருக்கு வணக்கம்!",
      "¡Homenaje al Bienaventurado, el Digno, el Plenamente Autodespierto!",
    ),
  },
  {
    slug: "tisarana",
    group: "vandana",
    icon: "💎",
    title: L("තිසරණය", "The Three Refuges", "மும்மணி சரணம்", "Los Tres Refugios"),
    pali: [
      "Buddhaṁ saraṇaṁ gacchāmi.\nDhammaṁ saraṇaṁ gacchāmi.\nSaṅghaṁ saraṇaṁ gacchāmi.",
      "Dutiyampi buddhaṁ saraṇaṁ gacchāmi.\nDutiyampi dhammaṁ saraṇaṁ gacchāmi.\nDutiyampi saṅghaṁ saraṇaṁ gacchāmi.",
      "Tatiyampi buddhaṁ saraṇaṁ gacchāmi.\nTatiyampi dhammaṁ saraṇaṁ gacchāmi.\nTatiyampi saṅghaṁ saraṇaṁ gacchāmi.",
    ],
    meaning: L(
      "මම බුදුන් සරණ යමි. මම දහම් සරණ යමි. මම සඟුන් සරණ යමි. (දෙවනුවද, තෙවනුවද)",
      "I go for refuge to the Buddha, to the Dhamma, to the Saṅgha — for the second and third time too.",
      "நான் புத்தரைச் சரணடைகிறேன், தம்மத்தைச் சரணடைகிறேன், சங்கத்தைச் சரணடைகிறேன் — இரண்டாம், மூன்றாம் முறையும்.",
      "Tomo refugio en el Buda, en el Dhamma, en el Saṅgha — también por segunda y tercera vez.",
    ),
    readUid: "kp1",
  },
  {
    slug: "pansil",
    group: "vandana",
    icon: "🪷",
    title: L("පංච ශීලය", "The Five Precepts", "ஐந்து ஒழுக்கங்கள்", "Los Cinco Preceptos"),
    pali: [
      "Pāṇātipātā veramaṇī sikkhāpadaṁ samādiyāmi.\nAdinnādānā veramaṇī sikkhāpadaṁ samādiyāmi.\nKāmesu micchācārā veramaṇī sikkhāpadaṁ samādiyāmi.\nMusāvādā veramaṇī sikkhāpadaṁ samādiyāmi.\nSurāmerayamajjapamādaṭṭhānā veramaṇī sikkhāpadaṁ samādiyāmi.",
    ],
    meaning: L(
      "සතුන් මැරීමෙන් වැළකීම, නුදුන් දේ ගැනීමෙන් වැළකීම, වැරදි කාම සේවනයෙන් වැළකීම, බොරු කීමෙන් වැළකීම, මත්පැන් හා මත්ද්‍රව්‍යවලින් වැළකීම යන ශික්ෂාපද සමාදන් වෙමි.",
      "I undertake the training to refrain from killing, from stealing, from sexual misconduct, from false speech, and from intoxicants that cause heedlessness.",
      "உயிர்க்கொலை, திருட்டு, தவறான காம நடத்தை, பொய், கவனமின்மை தரும் போதைப்பொருட்கள் ஆகியவற்றிலிருந்து விலகும் பயிற்சியை ஏற்கிறேன்.",
      "Asumo el entrenamiento de abstenerme de matar, de robar, de la conducta sexual indebida, de mentir y de los intoxicantes que causan negligencia.",
    ),
  },
  {
    slug: "buddha-guna",
    group: "vandana",
    icon: "☸️",
    title: L("බුද්ධ ගුණ", "Qualities of the Buddha", "புத்த குணங்கள்", "Cualidades del Buda"),
    pali: ["Itipi so bhagavā arahaṁ sammāsambuddho vijjācaraṇasampanno sugato lokavidū anuttaro purisadammasārathi satthā devamanussānaṁ buddho bhagavāti."],
    meaning: L(
      "ඒ භාග්‍යවතුන් වහන්සේ අරහං, සම්මා සම්බුද්ධ, විජ්ජාචරණ සම්පන්න, සුගත, ලෝකවිදූ, අනුත්තර පුරිසදම්මසාරථී, දෙවි මිනිසුන්ගේ ශාස්තෘ, බුද්ධ, භගවා යන ගුණයෙන් යුක්ත සේක.",
      "Such indeed is the Blessed One: worthy, fully awakened, perfect in knowledge and conduct, well-gone, knower of the worlds, unsurpassed trainer of those to be tamed, teacher of gods and humans, awakened, blessed.",
      "அந்த பகவான் அருகதர், முழு விழிப்புற்றவர், ஞானத்திலும் ஒழுக்கத்திலும் நிறைவானவர், நன்கு சென்றவர், உலகங்களை அறிந்தவர், ஈடற்ற வழிகாட்டி, தேவர் மனிதர்களின் ஆசான், புத்தர், பகவான்.",
      "Así es el Bienaventurado: digno, plenamente despierto, perfecto en conocimiento y conducta, bien ido, conocedor de los mundos, guía insuperable, maestro de dioses y humanos, despierto, bendito.",
    ),
    videos: ["buddhanussati"],
  },
  {
    slug: "nava-arahadi",
    group: "vandana",
    icon: "🌟",
    title: L("නව අරහාදී බුදු ගුණ (අරහං බුදු ගුණය සහිතව)", "The nine qualities of the Buddha, one by one", "புத்தரின் ஒன்பது குணங்கள்", "Las nueve cualidades del Buda"),
    pali: [
      "Arahaṁ",
      "Sammāsambuddho",
      "Vijjācaraṇasampanno",
      "Sugato",
      "Lokavidū",
      "Anuttaro purisadammasārathi",
      "Satthā devamanussānaṁ",
      "Buddho",
      "Bhagavā",
    ],
    meaning: L(
      "1. අරහං — කෙලෙසුන්ගෙන් දුරු වූ, සියලු පූජාවන්ට සුදුසු, රහසින්වත් පව් නොකරන සේක. 2. සම්මාසම්බුද්ධෝ — තමන් වහන්සේම චතුරාර්ය සත්‍යය අවබෝධ කළ සේක. 3. විජ්ජාචරණසම්පන්නෝ — විද්‍යා අටෙන් හා චරණ පසළොසින් යුක්ත සේක. 4. සුගතෝ — යහපත් ගමනක් ඇති, නිවනට මනාව වැඩි සේක. 5. ලෝකවිදූ — සියලු ලෝකය දත් සේක. 6. අනුත්තරෝ පුරිසදම්මසාරථි — දමනය කළ යුත්තන් දමනය කරන අසමසම සාරථි සේක. 7. සත්ථා දේවමනුස්සානං — දෙවි මිනිසුන්ගේ ශාස්තෘ සේක. 8. බුද්ධෝ — චතුරාර්ය සත්‍යය අවබෝධ කර අනුන්ටද අවබෝධ කරවූ සේක. 9. භගවා — භාග්‍යවත් සේක.",
      "1. Arahaṁ — free from defilements, worthy of all offerings, doing no wrong even in secret. 2. Sammāsambuddho — awakened to the Four Noble Truths by himself. 3. Vijjācaraṇasampanno — endowed with the eight knowledges and fifteen kinds of conduct. 4. Sugato — gone well, to Nibbāna. 5. Lokavidū — knower of all worlds. 6. Anuttaro purisadammasārathi — unsurpassed trainer of those to be tamed. 7. Satthā devamanussānaṁ — teacher of gods and humans. 8. Buddho — awakened, and awakening others. 9. Bhagavā — the Blessed One.",
      "1. அரஹங் — மாசற்றவர், எல்லா வணக்கத்திற்கும் உரியவர். 2. ஸம்மாஸம்புத்தோ — தானே நான்கு உண்மைகளை உணர்ந்தவர். 3. விஜ்ஜாசரணஸம்பன்னோ — ஞானமும் ஒழுக்கமும் நிறைந்தவர். 4. ஸுகதோ — நன்கு சென்றவர். 5. லோகவிதூ — உலகங்களை அறிந்தவர். 6. அனுத்தரோ புரிஸதம்மஸாரதி — ஈடற்ற வழிகாட்டி. 7. ஸத்தா தேவமனுஸ்ஸானங் — தேவர் மனிதர்களின் ஆசான். 8. புத்தோ — விழிப்புற்றவர். 9. பகவா — பாக்கியவான்.",
      "1. Arahaṁ — libre de impurezas, digno de toda ofrenda. 2. Sammāsambuddho — despierto por sí mismo a las Cuatro Nobles Verdades. 3. Vijjācaraṇasampanno — perfecto en conocimiento y conducta. 4. Sugato — bien ido, al Nibbāna. 5. Lokavidū — conocedor de los mundos. 6. Anuttaro purisadammasārathi — guía insuperable. 7. Satthā devamanussānaṁ — maestro de dioses y humanos. 8. Buddho — despierto, que despierta a otros. 9. Bhagavā — el Bienaventurado.",
    ),
    videos: ["buddhanussati"],
  },
  {
    slug: "dhamma-guna",
    group: "vandana",
    icon: "📜",
    title: L("ධම්ම ගුණ", "Qualities of the Dhamma", "தம்ம குணங்கள்", "Cualidades del Dhamma"),
    pali: ["Svākkhāto bhagavatā dhammo sandiṭṭhiko akāliko ehipassiko opaneyyiko paccattaṁ veditabbo viññūhīti."],
    meaning: L(
      "භාග්‍යවතුන් වහන්සේ විසින් මනාව දේශනා කළ ධර්මය මෙලොවදීම දැකිය හැකි, කල් නොයවා විපාක දෙන, ‘ඇවිත් බලන්න’ යැයි කිව හැකි, තමා තුළට පමුණුවා ගත යුතු, නුවණැත්තන් විසින් තම තමා තුළ දත යුතු ධර්මයකි.",
      "The Dhamma is well taught by the Blessed One — visible here and now, immediate, inviting one to come and see, leading onward, to be known by the wise for themselves.",
      "பகவானால் நன்கு போதிக்கப்பட்ட தம்மம் — இங்கேயே காணக்கூடியது, காலம் தாழ்த்தாதது, ‘வந்து பாருங்கள்’ என அழைப்பது, முன்னேற்றுவது, ஞானிகள் தாமே அறிய வேண்டியது.",
      "El Dhamma está bien enseñado por el Bienaventurado: visible aquí y ahora, inmediato, que invita a venir y ver, que conduce hacia adelante, para ser conocido por los sabios por sí mismos.",
    ),
  },
  {
    slug: "sangha-guna",
    group: "vandana",
    icon: "🧡",
    videos: ["sanghaVandana"],
    title: L("සංඝ ගුණ", "Qualities of the Saṅgha", "சங்க குணங்கள்", "Cualidades del Saṅgha"),
    pali: [
      "Suppaṭipanno bhagavato sāvakasaṅgho,\nujuppaṭipanno bhagavato sāvakasaṅgho,\nñāyappaṭipanno bhagavato sāvakasaṅgho,\nsāmīcippaṭipanno bhagavato sāvakasaṅgho,\nyadidaṁ cattāri purisayugāni aṭṭha purisapuggalā,\nesa bhagavato sāvakasaṅgho,\nāhuneyyo pāhuneyyo dakkhiṇeyyo añjalikaraṇīyo,\nanuttaraṁ puññakkhettaṁ lokassāti.",
    ],
    meaning: L(
      "භාග්‍යවතුන් වහන්සේගේ ශ්‍රාවක සංඝයා මනා මඟට පිළිපන්නෝය, ඍජු මඟට පිළිපන්නෝය, නිවන් මඟට පිළිපන්නෝය, සුදුසු මඟට පිළිපන්නෝය. පුරුෂ යුගල සතරක්, පුද්ගලයන් අට දෙනෙක් වූ ඒ ශ්‍රාවක සංඝයා දුර සිට ගෙනෙන දේ පිළිගැනීමට, ආගන්තුක සත්කාරයට, දක්ෂිණාවට, ඇඳිලි බැඳ වැඳීමට සුදුසු, ලොවට අනුත්තර පින් කෙතකි.",
      "The Blessed One's community of disciples practises well, directly, wisely and properly — the four pairs, the eight kinds of noble persons. They are worthy of gifts, hospitality, offerings and reverent salutation: the unsurpassed field of merit for the world.",
      "பகவானின் சீடர் சங்கம் நன்றாக, நேராக, ஞானமாக, முறையாகப் பயில்கிறது — நான்கு இணைகள், எட்டு வகை உன்னதர்கள். அவர்கள் காணிக்கை, விருந்தோம்பல், தானம், வணக்கம் ஆகியவற்றுக்குத் தகுதியானவர்கள்: உலகின் ஈடற்ற புண்ணிய நிலம்.",
      "La comunidad de discípulos del Bienaventurado practica bien, rectamente, sabiamente y correctamente: los cuatro pares, los ocho tipos de personas nobles. Son dignos de ofrendas, hospitalidad, donaciones y saludo reverente: el insuperable campo de méritos del mundo.",
    ),
  },

  // ── Offerings ────────────────────────────────────────────
  {
    slug: "mal-puja",
    group: "puja",
    icon: "🌼",
    title: L("මල් පූජාව", "Offering flowers", "மலர் பூஜை", "Ofrenda de flores"),
    pali: [
      "Vaṇṇagandhaguṇopetaṁ, etaṁ kusumasantatiṁ;\nPūjayāmi munindassa, sirīpādasaroruhe.",
      "Pūjemi buddhaṁ kusumenanena, puññena metena ca hotu mokkhaṁ;\nPupphaṁ milāyāti yathā idaṁ me, kāyo tathā yāti vināsabhāvaṁ.",
    ],
    meaning: L(
      "පැහැයෙන්, සුවඳින් යුත් මේ මල් සමූහය මුනිඳුන්ගේ සිරිපා පියුම් වෙත පුදමි. මේ මලින් බුදුන් පුදමි; මේ පිනෙන් මට නිවන් ලැබේවා. මේ මල පරවී යන්නා සේ මාගේ කයද විනාශයට යයි.",
      "I offer these flowers, full of colour and fragrance, at the lotus feet of the Lord of Sages. With these flowers I honour the Buddha; by this merit may there be liberation. As these flowers fade, so too my body goes towards destruction.",
      "நிறமும் மணமும் கொண்ட இந்த மலர்களை முனிவர்களின் தலைவரின் தாமரைப் பாதங்களில் அர்ப்பணிக்கிறேன். இந்த மலர்களால் புத்தரை வணங்குகிறேன்; இந்தப் புண்ணியத்தால் விடுதலை கிடைப்பதாக. இந்த மலர்கள் வாடுவது போல் என் உடலும் அழிவை நோக்கிச் செல்கிறது.",
      "Ofrezco estas flores, llenas de color y fragancia, a los pies de loto del Señor de los Sabios. Con estas flores honro al Buda; por este mérito, que haya liberación. Así como estas flores se marchitan, así mi cuerpo va hacia su destrucción.",
    ),
  },
  {
    slug: "pahan-puja",
    group: "puja",
    icon: "🪔",
    title: L("පහන් පූජාව", "Offering light", "தீப பூஜை", "Ofrenda de luz"),
    pali: ["Ghanasārappadittena, dīpena tamadhaṁsinā;\nTilokadīpaṁ sambuddhaṁ, pūjayāmi tamonudaṁ."],
    meaning: L(
      "අඳුර දුරු කරන, දීප්තිමත්ව දැල්වෙන මේ පහනින්, තුන් ලොවට පහනක් වූ, අවිද්‍යා අඳුර දුරු කළ සම්බුදුන් පුදමි.",
      "With this brightly burning lamp that dispels darkness, I honour the Fully Awakened One, light of the three worlds, dispeller of darkness.",
      "இருளை நீக்கும் பிரகாசமாக எரியும் இந்தத் தீபத்தால், மூவுலகின் ஒளியும் இருளை அகற்றியவருமான சம்புத்தரை வணங்குகிறேன்.",
      "Con esta lámpara que arde brillante y disipa la oscuridad, honro al Plenamente Despierto, luz de los tres mundos, que disipa las tinieblas.",
    ),
  },
  {
    slug: "suvanda-puja",
    group: "puja",
    icon: "🌫️",
    title: L("සුවඳ දුම් පූජාව", "Offering incense", "தூப பூஜை", "Ofrenda de incienso"),
    pali: ["Gandhasambhārayuttena, dhūpenāhaṁ sugandhinā;\nPūjaye pūjanīyaṁ taṁ, pūjābhājanamuttamaṁ."],
    meaning: L(
      "සුවඳ ද්‍රව්‍යයෙන් යුත් සුවඳ දුමින්, පිදිය යුතු, පූජාවට උතුම් භාජනයක් වූ ඒ බුදුරජාණන් වහන්සේ පුදමි.",
      "With fragrant incense made of sweet-smelling substances, I honour the One worthy of honour, the supreme recipient of offerings.",
      "நறுமணப் பொருட்களால் ஆன நறுமண தூபத்தால், வணக்கத்திற்குரிய, பூஜைக்கு உன்னதமான அவரை வணங்குகிறேன்.",
      "Con incienso fragante de sustancias aromáticas, honro al que es digno de honor, el receptor supremo de ofrendas.",
    ),
  },

  // ── Sacred places & disciples ────────────────────────────
  {
    slug: "bodhi-vandana",
    group: "places",
    icon: "🌳",
    videos: ["bodhiPuja"],
    title: L("බෝධි වන්දනාව", "Homage to the Bodhi tree", "போதி வணக்கம்", "Homenaje al árbol Bodhi"),
    pali: [
      "Yassa mūle nisinnova, sabbāri vijayaṁ akā;\nPatto sabbaññutaṁ satthā, vande taṁ bodhipādapaṁ.",
      "Ime ete mahābodhi, lokanāthena pūjitā;\nAhampi te namassāmi, bodhirājā namatthu te.",
    ],
    meaning: L(
      "යම් බෝධියක් මුල වැඩහිඳ සියලු සතුරන් දිනා ශාස්තෲන් වහන්සේ සර්වඥතාවට පත් වූ සේක්ද, ඒ බෝධීන් වහන්සේ වඳිමි. ලෝකනාථයන් වහන්සේ විසින් පුදන ලද මේ මහා බෝධීන් වහන්සේට මමද නමස්කාර කරමි. බෝධිරාජයාණෙනි, ඔබට නමස්කාර වේවා!",
      "Seated at the root of this tree the Teacher conquered all foes and attained omniscience — I pay homage to that Bodhi tree. This great Bodhi was honoured by the Lord of the World; I too bow to you, O king of Bodhi trees.",
      "எந்த மரத்தின் அடியில் அமர்ந்து ஆசான் எல்லாப் பகைவரையும் வென்று முழு ஞானம் அடைந்தாரோ, அந்தப் போதி மரத்தை வணங்குகிறேன். உலக நாதரால் வணங்கப்பட்ட இந்த மகா போதியை நானும் வணங்குகிறேன்.",
      "Sentado al pie de este árbol, el Maestro venció a todos los enemigos y alcanzó la omnisciencia: rindo homenaje a ese árbol Bodhi. Este gran Bodhi fue honrado por el Señor del Mundo; yo también me inclino ante ti, rey de los árboles Bodhi.",
    ),
  },
  {
    slug: "jivita-puja",
    group: "places",
    icon: "🤍",
    title: L("රුවන්වැලි මහා සෑයට ජීවිත පූජාව", "Offering one's life at Ruwanwelisaya", "ருவன்வெலிசாயவில் வாழ்க்கையை அர்ப்பணித்தல்", "Ofrecer la vida en Ruwanwelisaya"),
    pali: [
      "Imāhaṁ bhagavā attabhāvaṁ tumhākaṁ pariccajāmi.\nImāhaṁ bhagavā attabhāvaṁ tumhākaṁ pariccajāmi.\nImāhaṁ bhagavā attabhāvaṁ tumhākaṁ pariccajāmi.",
    ],
    meaning: L(
      "භාග්‍යවතුන් වහන්ස, මම මේ ආත්මභාවය (මාගේ ජීවිතය) ඔබ වහන්සේට පූජා කරමි. — බුදුරජාණන් වහන්සේගේ ශාරීරික ධාතූන් වැඩ සිටින රුවන්වැලි මහා සෑය (සුවණ්ණමාලී චෛත්‍යය) ඉදිරියේ, ජීවිතය තෙරුවනට පූජා කර, සිල් රකිමින් ධර්මයේ හැසිරීමට අධිෂ්ඨාන කිරීම.",
      "Blessed One, I offer this self (my life) to you. — Before Ruwanwelisaya (the Suvaṇṇamāli Cetiya), which enshrines relics of the Buddha, devotees dedicate their life to the Triple Gem and resolve to keep precepts and live by the Dhamma.",
      "பகவானே, இந்த என் வாழ்க்கையை உங்களுக்கு அர்ப்பணிக்கிறேன். — புத்தரின் தாதுக்கள் உள்ள ருவன்வெலிசாய முன், வாழ்க்கையை மும்மணிக்கு அர்ப்பணித்து, ஒழுக்கத்துடன் தர்மத்தில் வாழ உறுதிகொள்ளுதல்.",
      "Bienaventurado, te ofrezco este ser (mi vida). — Ante Ruwanwelisaya (Suvaṇṇamāli Cetiya), que guarda reliquias del Buda, los devotos dedican su vida a la Triple Joya y deciden guardar los preceptos y vivir según el Dhamma.",
    ),
    note: L(
      "පාලි පාඨය: විසුද්ධිමාර්ගය (කර්මස්ථාන ග්‍රහණය). වීඩියෝවල පූජා කරන ආකාරය දැක්වේ.",
      "Pāli formula from the Visuddhimagga (taking up a meditation subject). The videos show how the offering is made.",
      "பாளி வாசகம்: விசுத்திமார்க்கம்.",
      "Fórmula pāli del Visuddhimagga.",
    ),
    videos: ["ruwanweli"],
  },
  {
    slug: "cetiya-vandana",
    group: "places",
    icon: "🛕",
    title: L("චෛත්‍ය වන්දනාව", "Homage to the stupas", "சைத்திய வணக்கம்", "Homenaje a las estupas"),
    pali: ["Vandāmi cetiyaṁ sabbaṁ, sabbaṭhānesu patiṭṭhitaṁ;\nSārīrikadhātu mahābodhiṁ, buddharūpaṁ sakalaṁ sadā."],
    meaning: L(
      "සියලු තැන්හි පිහිටි සියලු චෛත්‍යයන්ද, ශාරීරික ධාතූන්ද, මහා බෝධියද, සියලු බුද්ධ ප්‍රතිමාද නිතර වඳිමි.",
      "I always pay homage to every stupa established in every place, to the bodily relics, the great Bodhi tree, and every image of the Buddha.",
      "எல்லா இடங்களிலும் நிறுவப்பட்ட எல்லாச் சைத்தியங்களையும், உடல் தாதுக்களையும், மகா போதியையும், எல்லாப் புத்த உருவங்களையும் எப்போதும் வணங்குகிறேன்.",
      "Rindo siempre homenaje a toda estupa erigida en todo lugar, a las reliquias corporales, al gran árbol Bodhi y a toda imagen del Buda.",
    ),
  },
  {
    slug: "solosmasthana",
    group: "places",
    icon: "🏯",
    title: L("සොළොස්මස්ථාන වන්දනාව (රුවන්වැලි මහා සෑය සහිතව)", "Sixteen sacred places (incl. Ruwanwelisaya)", "பதினாறு புனித இடங்கள் (ருவன்வெலிசாய உட்பட)", "Dieciséis lugares sagrados (incl. Ruwanwelisaya)"),
    pali: [
      "Mahiyaṅgaṇaṁ nāgadīpaṁ, kalyāṇaṁ padalañchanaṁ;\nDivāguhaṁ dīghavāpiṁ, cetiyañca mutiyaṅgaṇaṁ.",
      "Tissamahāvihārañca, bodhiṁ maricavaṭṭiyaṁ;\nSuvaṇṇamālicetiyañca, thūpārāmaṁ bhayagiriṁ.",
      "Jetavanaṁ selacetiyaṁ, tathā kācaragāmakaṁ;\nEte soḷasaṭhānāni, ahaṁ vandāmi sabbadā.",
    ],
    meaning: L(
      "මහියංගණය, නාගදීපය, කැලණිය, ශ්‍රී පාදය, දිවා ගුහාව, දීඝවාපිය, මුතියංගණය, තිස්සමහා විහාරය, ශ්‍රී මහා බෝධිය, මිරිසවැටිය, රුවන්වැලි මහා සෑය (සුවණ්ණමාලී චෛත්‍යය), ථූපාරාමය, අභයගිරිය, ජේතවනාරාමය, සේල චෛත්‍යය, කතරගම කිරිවෙහෙර — යන මේ සොළොස් මහා ස්ථාන මම නිතර වඳිමි.",
      "Mahiyaṅgaṇa, Nāgadīpa, Kelaniya, Sri Pāda, Divāguhā, Dīghavāpi, Mutiyaṅgaṇa, Tissamahārāma, Sri Mahā Bodhi, Mirisaveṭiya, Ruwanwelisaya (Suvaṇṇamāli Cetiya), Thūpārāma, Abhayagiri, Jetavana, Sela Cetiya and Kataragama Kiri Vehera — these sixteen places I always revere.",
      "மகியங்கணை, நாகதீபம், களனி, ஸ்ரீ பாதம், திவாகுகை, தீகவாபி, முதியங்கணை, திஸ்ஸமகாவிகாரை, ஸ்ரீ மகா போதி, மிரிசவெட்டிய, ருவன்வெலிசாய (சுவண்ணமாலி சைத்தியம்), தூபாராமம், அபயகிரி, ஜேதவனம், சேல சைத்தியம், கதிர்காமம் கிரிவெஹெர — இந்தப் பதினாறு இடங்களையும் எப்போதும் வணங்குகிறேன்.",
      "Mahiyaṅgaṇa, Nāgadīpa, Kelaniya, Sri Pāda, Divāguhā, Dīghavāpi, Mutiyaṅgaṇa, Tissamahārāma, Sri Mahā Bodhi, Mirisaveṭiya, Ruwanwelisaya (Suvaṇṇamāli Cetiya), Thūpārāma, Abhayagiri, Jetavana, Sela Cetiya y Kataragama Kiri Vehera: estos dieciséis lugares venero siempre.",
    ),
    videos: ["ruwanweli"],
  },
  {
    slug: "sariputta",
    group: "places",
    icon: "🌕",
    title: L("සැරියුත් මහ තෙරුන් වන්දනාව", "Homage to Ven. Sāriputta", "சாரிபுத்த தேரர் வணக்கம்", "Homenaje al Ven. Sāriputta"),
    pali: [
      "Yo pabbaji jātisatāni pañca,\npahāya kāmāni manoramāni;\ntaṁ vītarāgaṁ susamāhitindriyaṁ,\nparinibbutaṁ vande sāriputtaṁ.",
      "Khantibalo paṭhavisamo na kuppati,\nna cāpi cittassa vasena vattati;\nanukampako kāruṇiko ca nibbuto,\nparinibbutaṁ vande sāriputtaṁ.",
      "Caṇḍālaputto yathā nagaraṁ paviṭṭho,\nnīcamano carati kapālahattho;\ntathā ayaṁ vicarati sāriputto,\nparinibbutaṁ vande sāriputtaṁ.",
    ],
    meaning: L(
      "ජාති පන්සියයක් මනරම් කාමයන් හැර පැවිදි වූ, රාගය නැති, මනාව සංසුන් ඉඳුරන් ඇති, පිරිනිවි සැරියුත් තෙරුන් වඳිමි. ඉවසීමේ බලය ඇති, පොළොව මෙන් නොකිපෙන, සිතේ වසඟයට නොයන, අනුකම්පා සහිත, කරුණාවන්ත, නිවුණු සැරියුත් තෙරුන් වඳිමි. කබලක් අතැතිව යටහත් සිතින් නුවරට පිවිසෙන චණ්ඩාල පුතෙකු මෙන් නිහතමානීව හැසිරුණු, පිරිනිවි සැරියුත් තෙරුන් වඳිමි.",
      "For five hundred lives he went forth, giving up delightful pleasures — free of passion, his senses well composed: I revere Sāriputta, who attained final Nibbāna. Strong in patience, like the earth he is never angered, nor ruled by his own mind; compassionate, kind and at peace. Like an outcast's son entering a town, humble, bowl in hand — so Sāriputta walked: I revere Sāriputta.",
      "ஐந்நூறு பிறவிகள் இனிய இன்பங்களைத் துறந்து துறவு பூண்ட, ஆசையற்ற, அடங்கிய புலன்களுடைய, பரிநிர்வாணம் அடைந்த சாரிபுத்தரை வணங்குகிறேன். பொறுமையின் வலிமையுடன் பூமிபோல் கோபமற்ற, கருணையும் அமைதியும் கொண்ட அவரை வணங்குகிறேன். கையில் பாத்திரத்துடன் பணிவுடன் நகருக்குள் நுழையும் ஏழையின் மகனைப் போல் நடந்த சாரிபுத்தரை வணங்குகிறேன்.",
      "Durante quinientas vidas renunció, dejando los placeres deleitables; libre de pasión, con los sentidos serenos: venero a Sāriputta, que alcanzó el Nibbāna final. Fuerte en paciencia, como la tierra nunca se enoja ni le domina su mente; compasivo, bondadoso y en paz. Como el hijo de un paria que entra humilde en la ciudad con su cuenco, así caminaba Sāriputta: lo venero.",
    ),
    note: L("මූලාශ්‍රය: පුණ්‍යෝපදේශය (pitaka.lk)", "Source: Punyopadeshaya (pitaka.lk)", "மூலம்: புண்யோபதேசய (pitaka.lk)", "Fuente: Punyopadeshaya (pitaka.lk)"),
  },
  {
    slug: "moggallana",
    group: "places",
    icon: "🌗",
    title: L("මුගලන් මහ තෙරුන් වන්දනාව", "Homage to Ven. Moggallāna", "மொக்கல்லான தேரர் வணக்கம்", "Homenaje al Ven. Moggallāna"),
    pali: [
      "Yo pabbaji jātisatāni pañca,\npahāya kāmāni manoramāni;\ntaṁ vītarāgaṁ susamāhitindriyaṁ,\nparinibbutaṁ vande moggallānaṁ.",
      "Khantibalo paṭhavisamo na kuppati,\nna cāpi cittassa vasena vattati;\nanukampako kāruṇiko ca nibbuto,\nparinibbutaṁ vande moggallānaṁ.",
      "Caṇḍālaputto yathā nagaraṁ paviṭṭho,\nnīcamano carati kapālahattho;\ntathā ayaṁ vicarati moggallāno,\nparinibbutaṁ vande moggallānaṁ.",
    ],
    meaning: L(
      "ජාති පන්සියයක් මනරම් කාමයන් හැර පැවිදි වූ, රාගය නැති, මනාව සංසුන් ඉඳුරන් ඇති, පිරිනිවි මුගලන් තෙරුන් වඳිමි. ඉවසීමේ බලය ඇති, පොළොව මෙන් නොකිපෙන, අනුකම්පා සහිත, කරුණාවන්ත, නිවුණු මුගලන් තෙරුන් වඳිමි. කබලක් අතැතිව යටහත් සිතින් නුවරට පිවිසෙන්නෙකු මෙන් නිහතමානීව හැසිරුණු, පිරිනිවි මුගලන් තෙරුන් වඳිමි.",
      "For five hundred lives he went forth, giving up delightful pleasures — free of passion, his senses well composed: I revere Moggallāna, who attained final Nibbāna. Strong in patience, like the earth he is never angered; compassionate, kind and at peace. Humble as one entering a town bowl in hand — so Moggallāna walked: I revere Moggallāna.",
      "ஐந்நூறு பிறவிகள் இன்பங்களைத் துறந்து துறவு பூண்ட, ஆசையற்ற, பரிநிர்வாணம் அடைந்த மொக்கல்லானரை வணங்குகிறேன். பொறுமையுடன் பூமிபோல் கோபமற்ற, கருணையுள்ள அவரை வணங்குகிறேன். பாத்திரத்துடன் பணிவுடன் நடந்த மொக்கல்லானரை வணங்குகிறேன்.",
      "Durante quinientas vidas renunció a los placeres; libre de pasión, con los sentidos serenos: venero a Moggallāna, que alcanzó el Nibbāna final. Fuerte en paciencia, como la tierra nunca se enoja; compasivo y en paz. Humilde como quien entra en la ciudad con su cuenco, así caminaba Moggallāna: lo venero.",
    ),
    note: L(
      "මූලාශ්‍රය: පුණ්‍යෝපදේශය (pitaka.lk). (එහි තුන්වන ගාථාවේ ‘සාරිපුත්තෝ’ ලෙස ඇත; මෙහි ‘මොග්ගල්ලානෝ’ ලෙස යොදා ඇත.)",
      "Source: Punyopadeshaya (pitaka.lk). (Its third verse reads ‘Sāriputto’; here it is given as ‘Moggallāno’.)",
      "மூலம்: புண்யோபதேசய (pitaka.lk).",
      "Fuente: Punyopadeshaya (pitaka.lk).",
    ),
  },

  // ── Victory & shānthi ───────────────────────────────────
  {
    slug: "jayamangala",
    group: "jaya",
    icon: "🏆",
    title: L("ජය මංගල අට්ඨ ගාථා", "Jaya Maṅgala Gāthā — the Buddha's victory blessings", "ஜய மங்கல காதை", "Jaya Maṅgala Gāthā — bendiciones de victoria"),
    pali: [
      "Bāhuṁ sahassamabhinimmita sāvudhantaṁ\nGrīmekhalaṁ udita ghora sasena māraṁ\nDānādi dhamma vidhinā jitavā munindo\nTaṁ tejasā bhavatu te jayamaṅgalaggaṁ.",
      "Mārātirekamabhiyujjhita sabba rattiṁ\nGhorampanāḷavaka makkhamathaddha yakkhaṁ\nKhantī sudanta vidhinā jitavā munindo\nTaṁ tejasā bhavatu te jayamaṅgalaggaṁ.",
      "Nāḷāgiriṁ gajavaraṁ atimattabhūtaṁ\nDāvaggi cakkamasanīva sudāruṇantaṁ\nMettambuseka vidhinā jitavā munindo\nTaṁ tejasā bhavatu te jayamaṅgalaggaṁ.",
      "Ukkhitta khaggamatihattha sudāruṇantaṁ\nDhāvanti yojana pathaṅgulimālavantaṁ\nIddhībhisaṅkhata mano jitavā munindo\nTaṁ tejasā bhavatu te jayamaṅgalaggaṁ.",
      "Katvāna kaṭṭhamudaraṁ iva gabbhinīyā\nCiñcāya duṭṭha vacanaṁ janakāya majjhe\nSantena soma vidhinā jitavā munindo\nTaṁ tejasā bhavatu te jayamaṅgalaggaṁ.",
      "Saccaṁ vihāya mati saccaka vāda ketuṁ\nVādābhiropita manaṁ ati andhabhūtaṁ\nPaññā padīpa jalito jitavā munindo\nTaṁ tejasā bhavatu te jayamaṅgalaggaṁ.",
      "Nandopananda bhujagaṁ vibudhaṁ mahiddhiṁ\nPuttena thera bhujagena damāpayanto\nIddhūpadesa vidhinā jitavā munindo\nTaṁ tejasā bhavatu te jayamaṅgalaggaṁ.",
      "Duggāha diṭṭhi bhujagena sudaṭṭha hatthaṁ\nBrahmaṁ visuddhi jutimiddhi bakābhidhānaṁ\nÑāṇāgadena vidhinā jitavā munindo\nTaṁ tejasā bhavatu te jayamaṅgalaggaṁ.",
      "Etāpi buddha jayamaṅgala aṭṭha gāthā\nYo vācano dinadine sarate matandī\nHitvānaneka vividhāni cupaddavāni\nMokkhaṁ sukhaṁ adhigameyya naro sapañño.",
    ],
    meaning: L(
      "1. ආයුධ දරණ දහසක් අත් මවාගෙන, ගිරිමේඛල ඇතු පිට නැගී, සේනාව සමඟ බිහිසුණු ලෙස ගුගුරමින් පැමිණි මාරයා මුනිඳුන් දාන පාරමිතාදී ධර්ම බලයෙන් දිනූ සේක. 2. මාරයාටත් වඩා දරුණුව මුළු රැයම සටන් කළ, ගුණමකු, තද සිත් ඇති ආළවක යක්ෂයා ඉවසීමෙන් දිනූ සේක. 3. මත් වූ, ලැව්ගින්නක්, චක්‍රායුධයක්, හෙණයක් මෙන් දරුණු නාළාගිරි ඇතා මෛත්‍රී ජලය ඉසීමෙන් දිනූ සේක. 4. කඩුව ඔසවාගෙන යොදුන් තුනක් පසුපස දිව ආ අංගුලිමාල ඍද්ධි බලයෙන් දිනූ සේක. 5. ගැබිනියක සේ උදරයේ ලී කැබැල්ලක් බැඳගෙන ජනයා මැද අපවාද කළ චිංචා මාණවිකාව ශාන්ත, සෞම්‍ය ක්‍රමයෙන් දිනූ සේක. 6. සත්‍යය හැර වාදයෙන් අන්ධ වූ සච්චක නිගණ්ඨයා ප්‍රඥා ප්‍රදීපයෙන් දිනූ සේක. 7. මහත් ඍද්ධි ඇති, මිථ්‍යා දෘෂ්ටික නන්දෝපනන්ද නාගරාජයා මුගලන් තෙරුන් ලවා ඍද්ධි උපදේශයෙන් දමනය කළ සේක. 8. මිථ්‍යා දෘෂ්ටියෙන් බැඳුණු බක බ්‍රහ්මයා ඥාන ඖෂධයෙන් දිනූ සේක. — ඒ තේජසින් ඔබට උතුම් ජය මංගලය වේවා! 9. මේ ජය මංගල ගාථා අට දිනපතා නොපසුබටව කියන, සිහි කරන නුවණැති තැනැත්තා නොයෙක් උපද්‍රව දුරු කර නිවන් සුවයට පැමිණේ.",
      "The Lord of Sages defeated: (1) Māra with a thousand armed arms on the elephant Girimekhala — through generosity and the perfections; (2) the arrogant ogre Āḷavaka — through endurance; (3) the maddened elephant Nāḷāgiri — by sprinkling the water of goodwill; (4) Aṅgulimāla with upraised sword — with mind-fashioned marvels; (5) Ciñcā's false accusation — with peaceful, gracious means; (6) Saccaka, blinded by argument — with the light of discernment; (7) the serpent Nandopananda — sending Moggallāna to tame him; (8) Baka the Brahmā — with words of knowledge. By the majesty of this, may you have the highest victory blessing! (9) One who recites or recalls these eight verses daily will overcome all obstacles and attain liberation and happiness.",
      "முனிவர் தலைவர் வென்றார்: (1) ஆயிரம் ஆயுதக் கைகளுடன் வந்த மாரனை — தானம் முதலிய குணங்களால்; (2) ஆணவ அரக்கன் ஆளவகனை — பொறுமையால்; (3) மதம் கொண்ட நாளாகிரி யானையை — அன்பு நீர் தெளித்து; (4) வாளுடன் துரத்திய அங்குலிமாலனை — அற்புத சக்தியால்; (5) சிஞ்சாவின் பொய்க் குற்றச்சாட்டை — அமைதியால்; (6) வாதத்தில் குருடான சச்சகனை — ஞான ஒளியால்; (7) நந்தோபநந்த நாகனை — மொக்கல்லானரை அனுப்பி; (8) பக பிரம்மனை — ஞானச் சொற்களால். இந்த மகிமையால் உங்களுக்கு உயர்ந்த வெற்றி மங்கலம் உண்டாவதாக! (9) இவற்றைத் தினமும் ஓதுபவர் தடைகளை வென்று விடுதலை அடைவார்.",
      "El Señor de los Sabios venció: (1) a Māra con mil brazos armados — mediante la generosidad; (2) al arrogante ogro Āḷavaka — con paciencia; (3) al elefante enloquecido Nāḷāgiri — rociando el agua de la benevolencia; (4) a Aṅgulimāla con la espada en alto — con prodigios de la mente; (5) la falsa acusación de Ciñcā — con medios serenos; (6) a Saccaka, cegado por la discusión — con la luz del discernimiento; (7) a la serpiente Nandopananda — enviando a Moggallāna; (8) a Baka el Brahmā — con palabras de conocimiento. ¡Por esta majestad, que tengas la suprema bendición de victoria! (9) Quien recite estos ocho versos a diario superará los obstáculos y alcanzará la liberación y la felicidad.",
    ),
    note: L(
      "පාලි පාඨය: A Chanting Guide (dhammatalks.org, CC BY-NC 4.0).",
      "Pāli text: A Chanting Guide, Dhammayut Order (dhammatalks.org, CC BY-NC 4.0).",
      "பாளி உரை: A Chanting Guide (dhammatalks.org).",
      "Texto pāli: A Chanting Guide (dhammatalks.org, CC BY-NC 4.0).",
    ),
    videos: ["jayamangala"],
  },
  {
    slug: "navagraha",
    group: "jaya",
    icon: "🪐",
    title: L("නවග්‍රහ ශාන්තිය", "Navagraha Shānthi (nine planets blessing)", "நவக்கிரக சாந்தி", "Navagraha Shānthi"),
    pali: [],
    meaning: L(
      "ග්‍රහ අපල දුරු කර සෙත පතා සිදු කරන ශ්‍රී ලාංකේය සාම්ප්‍රදායික ශාන්ති කර්මයකි. නව අරහාදී බුදු ගුණ සිහි කරමින් සජ්ඣායනා කෙරේ. පහත වීඩියෝවලින් අසන්න.",
      "A traditional Sri Lankan blessing chanted to ward off planetary misfortune, recalling the nine qualities of the Buddha. Listen in the videos below.",
      "கிரக தோஷங்களை நீக்க இலங்கையில் ஓதப்படும் பாரம்பரிய ஆசீர்வாதம். கீழே உள்ள காணொளிகளில் கேளுங்கள்.",
      "Bendición tradicional de Sri Lanka contra la mala fortuna planetaria, que recuerda las nueve cualidades del Buda. Escúchala en los vídeos.",
    ),
    note: L("මෙය ත්‍රිපිටකයේ ඇති පාඨයක් නොවේ; ජන සම්ප්‍රදායකි.", "This is a folk tradition, not a text of the Tipiṭaka.", "இது திரிபிடக உரை அல்ல; நாட்டுப்புற மரபு.", "Es una tradición popular, no un texto del Tipiṭaka."),
    videos: ["navagraha"],
  },

  // ── Devas ────────────────────────────────────────────────
  {
    slug: "devata-aradhana",
    group: "devata",
    icon: "✨",
    title: L("දේවතා ආරාධනාව", "Inviting the devas to listen", "தேவர்களை அழைத்தல்", "Invitación a los devas"),
    pali: ["Samantā cakkavāḷesu, atrāgacchantu devatā;\nSaddhammaṁ munirājassa, suṇantu saggamokkhadaṁ.\nDhammassavanakālo ayaṁ bhadantā.\nDhammassavanakālo ayaṁ bhadantā.\nDhammassavanakālo ayaṁ bhadantā."],
    meaning: L(
      "හාත්පස සක්වළවල සිටින දෙවිවරු මෙහි පැමිණෙත්වා! මුනිරජුන්ගේ, දෙව්ලොව හා නිවන් ලබා දෙන සද්ධර්මය අසත්වා! පින්වත්නි, මේ ධර්ම ශ්‍රවණය කරන කාලයයි.",
      "May the devas from all the world-systems around come here and listen to the true Dhamma of the King of Sages, which leads to heaven and liberation. Friends, this is the time for listening to the Dhamma.",
      "சுற்றிலும் உள்ள எல்லா உலகங்களிலிருந்தும் தேவர்கள் இங்கு வந்து, சொர்க்கத்தையும் விடுதலையையும் தரும் முனிவர் அரசரின் சத்தர்மத்தைக் கேட்பார்களாக. நண்பர்களே, இது தர்மம் கேட்கும் நேரம்.",
      "Que los devas de todos los sistemas de mundos vengan aquí y escuchen el verdadero Dhamma del Rey de los Sabios, que conduce al cielo y a la liberación. Amigos, este es el momento de escuchar el Dhamma.",
    ),
  },
  {
    slug: "atanatiya",
    group: "devata",
    icon: "🛡️",
    title: L("ආටානාටිය පිරිත — සතරවරම් දෙවියන් (අමනුෂ්‍ය උපද්‍රවවලින් ආරක්ෂාව)", "Āṭānāṭiya Paritta — the Four Great Kings (protection from non-human harm)", "ஆடானாடிய பரித்தம் — நான்கு மகாராஜர்கள்", "Āṭānāṭiya Paritta — los Cuatro Grandes Reyes"),
    pali: [
      "Appasannehi nāthassa, sāsane sādhusammate;\namanussehi caṇḍehi, sadā kibbisakāribhi.",
      "Parisānañca catassannaṁ, ahiṁsāya ca guttiyā;\nyaṁ desesi mahāvīro, parittaṁ taṁ bhaṇāma he.",
    ],
    meaning: L(
      "සත්පුරුෂයන් පිළිගත් ලෝකනාථයන්ගේ ශාසනය කෙරෙහි නොපැහැදුණු, සැමදා පව් කරන චණ්ඩ අමනුෂ්‍යයන්ගෙන් සිව්වනක් පිරිසට හිංසා නොවීම පිණිස හා ආරක්ෂාව පිණිස මහාවීරයන් වහන්සේ යම් පිරිතක් දේශනා කළ සේක්ද, ඒ පිරිත අපි කියමු. (සතරවරම් දෙවිවරුන් — ධතරට්ඨ, විරූළ්හක, විරූපක්ඛ, වෙස්සවණ — බුදුරජුන්ට පිළිගැන්වූ ආරක්ෂාව; සම්පූර්ණ පාඨය ආටානාටිය සූත්‍රයේ ඇත.)",
      "For the protection and safety of the fourfold assembly from fierce non-human beings who have no faith in the Lord's teaching, esteemed by the good, and who always do evil — let us recite the protection that the Great Hero taught. (This protection was offered to the Buddha by the Four Great Kings — Dhataraṭṭha, Virūḷhaka, Virūpakkha and Vessavaṇa; the full text is in the Āṭānāṭiya Sutta.)",
      "நல்லோர் போற்றும் நாதரின் போதனையில் நம்பிக்கையற்ற, எப்போதும் தீமை செய்யும் கொடிய மனிதரல்லாதவர்களிடமிருந்து நால்வகைச் சபையின் பாதுகாப்புக்காக மகாவீரர் போதித்த பரித்தத்தை ஓதுவோம். (நான்கு மகாராஜர்கள் புத்தருக்கு அளித்த பாதுகாப்பு; முழு உரை ஆடானாடிய சூத்திரத்தில் உள்ளது.)",
      "Para la protección y seguridad de la cuádruple asamblea frente a seres no humanos feroces, sin fe en la enseñanza del Señor estimada por los buenos y que siempre hacen el mal, recitemos la protección que enseñó el Gran Héroe. (Ofrecida al Buda por los Cuatro Grandes Reyes; el texto completo está en el Āṭānāṭiya Sutta.)",
    ),
    readUid: "dn32",
    videos: ["atanatiya"],
  },
  {
    slug: "deva-anumodana",
    group: "devata",
    icon: "🌤️",
    title: L("දෙවියන්ට පින් දීම", "Sharing merit with the devas", "தேவர்களுக்குப் புண்ணியம் பகிர்தல்", "Compartir méritos con los devas"),
    pali: [
      "Ākāsaṭṭhā ca bhummaṭṭhā, devā nāgā mahiddhikā;\nPuññaṁ taṁ anumoditvā, ciraṁ rakkhantu sāsanaṁ.",
      "Ākāsaṭṭhā ca bhummaṭṭhā, devā nāgā mahiddhikā;\nPuññaṁ taṁ anumoditvā, ciraṁ rakkhantu desanaṁ.",
      "Ākāsaṭṭhā ca bhummaṭṭhā, devā nāgā mahiddhikā;\nPuññaṁ taṁ anumoditvā, ciraṁ rakkhantu maṁ paraṁ.",
    ],
    meaning: L(
      "අහසෙහි සිටින්නා වූද, පොළොවෙහි සිටින්නා වූද, මහත් ඍද්ධි ඇති දෙවියෝද නාගයෝද මේ පින අනුමෝදන් වී, බොහෝ කල් බුද්ධ ශාසනය රකිත්වා! ධර්ම දේශනාව රකිත්වා! මාද අන් අයද රකිත්වා!",
      "May the devas and nāgas of great power, dwelling in the sky and on the earth, rejoice in this merit and long protect the Teaching, the Dhamma talk, and me and others.",
      "வானிலும் பூமியிலும் வாழும் பெரும் சக்தி கொண்ட தேவர்களும் நாகர்களும் இந்தப் புண்ணியத்தில் மகிழ்ந்து, நீண்ட காலம் சாசனத்தையும், தர்ம உரையையும், என்னையும் பிறரையும் காப்பார்களாக.",
      "Que los devas y nāgas de gran poder, que moran en el cielo y en la tierra, se regocijen en este mérito y protejan por mucho tiempo la Enseñanza, la charla del Dhamma, y a mí y a los demás.",
    ),
  },
  {
    slug: "ettavata",
    group: "devata",
    icon: "🌈",
    title: L("සියලු දෙවියන්ට පින් අනුමෝදනාව", "Merit for all devas", "எல்லாத் தேவர்களுக்கும் புண்ணியம்", "Méritos para todos los devas"),
    pali: ["Ettāvatā ca amhehi, sambhataṁ puññasampadaṁ;\nSabbe devā anumodantu, sabbasampattisiddhiyā."],
    meaning: L(
      "මෙතෙක් අප විසින් රැස් කළ පින් සම්පත, සියලු සම්පත් සිද්ධිය පිණිස සියලු දෙවියෝ අනුමෝදන් වෙත්වා!",
      "May all the devas rejoice in the merit we have gathered so far, for the fulfilment of every blessing.",
      "இதுவரை நாங்கள் சேர்த்த புண்ணியச் செல்வத்தில், எல்லா நலன்களும் நிறைவேற, எல்லாத் தேவர்களும் மகிழ்வார்களாக.",
      "Que todos los devas se regocijen en el mérito que hemos reunido hasta ahora, para el cumplimiento de toda bendición.",
    ),
  },
  {
    slug: "pin-dima",
    group: "devata",
    icon: "💧",
    title: L("මියගිය ඥාතීන්ට පින් දීම", "Merit for departed relatives", "மறைந்த உறவினர்களுக்குப் புண்ணியம்", "Méritos para los familiares difuntos"),
    pali: ["Idaṁ vo ñātīnaṁ hotu, sukhitā hontu ñātayo.\nIdaṁ vo ñātīnaṁ hotu, sukhitā hontu ñātayo.\nIdaṁ vo ñātīnaṁ hotu, sukhitā hontu ñātayo."],
    meaning: L(
      "මේ පින ඔබ ඥාතීන්ට වේවා! ඥාතීහු සුවපත් වෙත්වා!",
      "May this merit go to our relatives. May our relatives be happy!",
      "இந்தப் புண்ணியம் எங்கள் உறவினர்களுக்குச் சேர்வதாக. உறவினர்கள் மகிழ்ச்சியாக இருப்பார்களாக!",
      "Que este mérito sea para nuestros familiares. ¡Que nuestros familiares sean felices!",
    ),
    readUid: "kp7",
  },
];
