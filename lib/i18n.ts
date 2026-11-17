export type Lang = "si" | "en" | "ta" | "es";

/** Display order – Sinhala first. */
export const LANGS: { code: Lang; label: string; short: string; speech: string }[] = [
  { code: "si", label: "සිංහල", short: "සිං", speech: "si-LK" },
  { code: "en", label: "English", short: "EN", speech: "en-US" },
  { code: "ta", label: "தமிழ்", short: "த", speech: "ta-IN" },
  { code: "es", label: "Español", short: "ES", speech: "es-ES" },
];

export const DEFAULT_LANG: Lang = "si";

export type Localized = Record<Lang, string>;

export function pick(l: Localized | undefined, lang: Lang): string {
  if (!l) return "";
  return l[lang] || l.en || l.si || "";
}

const S = {
  appName: { si: "ත්‍රිපිටකය", en: "Tripitaka", ta: "திரிபிடகம்", es: "Tripitaka" },
  tagline: {
    si: "බුද්ධ වචනය කියවන්න, අසන්න, භාවනා කරන්න",
    en: "Read, listen to and practise the words of the Buddha",
    ta: "புத்தரின் வார்த்தைகளைப் படியுங்கள், கேளுங்கள், பயிலுங்கள்",
    es: "Lee, escucha y practica las palabras del Buda",
  },
  heroIntro: {
    si: "සම්පූර්ණ පාලි ත්‍රිපිටකය, ජාතක කතා 547, පිරිත්, සමන්ත පට්ඨානය, භාවනා සහ ධර්ම දේශනා — සිංහල, English, தமிழ், Español භාෂාවලින්.",
    en: "The complete Pāli Tipiṭaka, all 547 Jātaka tales, Pirith, Samanta Paṭṭhāna, meditation and Dhamma talks — in Sinhala, English, Tamil and Spanish.",
    ta: "முழு பாளி திரிபிடகம், 547 ஜாதகக் கதைகள், பிரித், சமந்த பட்டானம், தியானம் மற்றும் தர்ம உரைகள் — சிங்களம், ஆங்கிலம், தமிழ், ஸ்பானிஷ் மொழிகளில்.",
    es: "El Tipiṭaka pāli completo, los 547 Jātakas, Pirith, Samanta Paṭṭhāna, meditación y charlas del Dhamma — en cingalés, inglés, tamil y español.",
  },
  startReading: { si: "කියවීම අරඹන්න", en: "Start reading", ta: "படிக்கத் தொடங்குங்கள்", es: "Empezar a leer" },
  startMeditating: { si: "භාවනා කරන්න", en: "Meditate", ta: "தியானம் செய்யுங்கள்", es: "Meditar" },

  // navigation
  home: { si: "මුල් පිටුව", en: "Home", ta: "முகப்பு", es: "Inicio" },
  tipitaka: { si: "ත්‍රිපිටකය", en: "Tipiṭaka", ta: "திரிபிடகம்", es: "Tipiṭaka" },
  sutras: { si: "සූත්‍ර", en: "Suttas", ta: "சூத்திரங்கள்", es: "Suttas" },
  pirith: { si: "පිරිත්", en: "Pirith", ta: "பிரித்", es: "Pirith" },
  jataka: { si: "ජාතක කතා", en: "Jātaka Tales", ta: "ஜாதகக் கதைகள்", es: "Jātakas" },
  meditation: { si: "භාවනා", en: "Meditation", ta: "தியானம்", es: "Meditación" },
  patthana: { si: "සමන්ත පට්ඨානය", en: "Samanta Paṭṭhāna", ta: "சமந்த பட்டானம்", es: "Samanta Paṭṭhāna" },
  deshana: { si: "ධර්ම දේශනා", en: "Dhamma Talks", ta: "தர்ம உரைகள்", es: "Charlas del Dhamma" },
  install: { si: "ඇප් එක ස්ථාපනය", en: "Install app", ta: "செயலியை நிறுவு", es: "Instalar app" },
  more: { si: "තවත්", en: "More", ta: "மேலும்", es: "Más" },
  menu: { si: "මෙනුව", en: "Menu", ta: "பட்டியல்", es: "Menú" },
  language: { si: "භාෂාව", en: "Language", ta: "மொழி", es: "Idioma" },
  theme: { si: "තේමාව", en: "Theme", ta: "தோற்றம்", es: "Tema" },

  // section descriptions
  tipitakaDesc: {
    si: "විනය, සූත්‍ර, අභිධර්ම — සම්පූර්ණ පාලි කැනනය",
    en: "Vinaya, Sutta, Abhidhamma — the complete Pāli canon",
    ta: "வினயம், சூத்திரம், அபிதம்மம் — முழு பாளி நூல் தொகுப்பு",
    es: "Vinaya, Sutta, Abhidhamma — el canon pāli completo",
  },
  sutrasDesc: {
    si: "ජනප්‍රිය සූත්‍ර, දේශනා වීඩියෝ සමඟ",
    en: "Beloved discourses, with Dhamma talk videos",
    ta: "பிரபலமான சூத்திரங்கள், உரை காணொளிகளுடன்",
    es: "Discursos queridos, con vídeos de charlas",
  },
  pirithDesc: {
    si: "මහ පිරිත — පාලි පාඨය, අර්ථය, හඬ සහ සජ්ඣායනා",
    en: "Maha Pirith — Pāli text, meaning, voice and chanting",
    ta: "மகா பிரித் — பாளி உரை, பொருள், குரல், ஓதல்",
    es: "Maha Pirith — texto pāli, significado, voz y cantos",
  },
  jatakaDesc: {
    si: "බෝසතාණන් වහන්සේගේ පෙර ආත්ම භව කතා 547",
    en: "All 547 stories of the Bodhisatta's past lives",
    ta: "போதிசத்வரின் முற்பிறவிக் கதைகள் 547",
    es: "Las 547 historias de las vidas pasadas del Bodhisatta",
  },
  meditationDesc: {
    si: "ආනාපානසති, මෛත්‍රී සහ සියලු භාවනා — මඟපෙන්වීම, ටයිමරය, වීඩියෝ",
    en: "Ānāpānasati, Mettā and more — guidance, timer and videos",
    ta: "ஆனாபானசதி, மெத்தா மற்றும் பல — வழிகாட்டல், நேரம், காணொளிகள்",
    es: "Ānāpānasati, Mettā y más — guía, temporizador y vídeos",
  },
  patthanaDesc: {
    si: "අභිධර්මයේ ප්‍රත්‍යය 24 — පාඨය, අර්ථය, සජ්ඣායනා",
    en: "The 24 conditions of the Abhidhamma — text, meaning, chanting",
    ta: "அபிதம்மத்தின் 24 நிபந்தனைகள் — உரை, பொருள், ஓதல்",
    es: "Las 24 condiciones del Abhidhamma — texto, significado, canto",
  },
  deshanaDesc: {
    si: "භාෂාව අනුව තෝරාගත හැකි බණ දේශනා සහ භාවනා වීඩියෝ",
    en: "Sermons and guided meditations, filtered by language",
    ta: "மொழிவாரியாக தர்ம உரைகள் மற்றும் தியானக் காணொளிகள்",
    es: "Sermones y meditaciones guiadas, por idioma",
  },
  installDesc: {
    si: "Windows, Mac, iPhone, Android සඳහා ස්ථාපනය කරන්න",
    en: "Install on Windows, Mac, iPhone and Android",
    ta: "Windows, Mac, iPhone, Android இல் நிறுவுங்கள்",
    es: "Instala en Windows, Mac, iPhone y Android",
  },

  // reader
  read: { si: "කියවන්න", en: "Read", ta: "படி", es: "Leer" },
  listen: { si: "අසන්න", en: "Listen", ta: "கேள்", es: "Escuchar" },
  readListen: { si: "කියවමින් අසන්න", en: "Read + Listen", ta: "படித்துக் கேள்", es: "Leer + Escuchar" },
  translation: { si: "පරිවර්තනය", en: "Translation", ta: "மொழிபெயர்ப்பு", es: "Traducción" },
  pali: { si: "පාලි", en: "Pāli", ta: "பாளி", es: "Pāli" },
  both: { si: "දෙකම", en: "Both", ta: "இரண்டும்", es: "Ambos" },
  script: { si: "අක්ෂර", en: "Script", ta: "எழுத்து", es: "Escritura" },
  roman: { si: "රෝම", en: "Roman", ta: "ரோமன்", es: "Latino" },
  sinhalaScript: { si: "සිංහල", en: "Sinhala", ta: "சிங்களம்", es: "Cingalés" },
  translator: { si: "පරිවර්තක", en: "Translator", ta: "மொழிபெயர்ப்பாளர்", es: "Traductor" },
  textSize: { si: "අකුරු ප්‍රමාණය", en: "Text size", ta: "எழுத்து அளவு", es: "Tamaño" },
  loading: { si: "පූරණය වෙමින්…", en: "Loading…", ta: "ஏற்றுகிறது…", es: "Cargando…" },
  loadError: {
    si: "පාඨය ලබාගත නොහැකි විය. අන්තර්ජාල සම්බන්ධතාව පරීක්ෂා කරන්න.",
    en: "Couldn't load the text. Please check your internet connection.",
    ta: "உரையை ஏற்ற முடியவில்லை. இணைய இணைப்பைச் சரிபார்க்கவும்.",
    es: "No se pudo cargar el texto. Revisa tu conexión a internet.",
  },
  retry: { si: "නැවත උත්සාහ කරන්න", en: "Try again", ta: "மீண்டும் முயலவும்", es: "Reintentar" },
  fallbackNotice: {
    si: "මෙම පාඨය තවම {lang} භාෂාවට පරිවර්තනය වී නැත. {fallback} පෙන්වයි.",
    en: "This text isn't translated into {lang} yet. Showing {fallback}.",
    ta: "இந்த உரை இன்னும் {lang} மொழியில் மொழிபெயர்க்கப்படவில்லை. {fallback} காட்டப்படுகிறது.",
    es: "Este texto aún no está traducido al {lang}. Se muestra en {fallback}.",
  },
  noTranslation: {
    si: "මෙම පාඨයට පරිවර්තනයක් නැත — පාලි මූලය පෙන්වයි.",
    en: "No translation available — showing the Pāli original.",
    ta: "மொழிபெயர்ப்பு இல்லை — பாளி மூலம் காட்டப்படுகிறது.",
    es: "No hay traducción — se muestra el original pāli.",
  },
  previous: { si: "පෙර", en: "Previous", ta: "முந்தையது", es: "Anterior" },
  next: { si: "ඊළඟ", en: "Next", ta: "அடுத்தது", es: "Siguiente" },
  source: {
    si: "පාඨ මූලාශ්‍රය: SuttaCentral (පරිවර්තකයන්ගේ අවසරය අනුව)",
    en: "Text source: SuttaCentral (per each translator's licence)",
    ta: "உரை மூலம்: SuttaCentral (ஒவ்வொரு மொழிபெயர்ப்பாளரின் உரிமத்தின்படி)",
    es: "Fuente del texto: SuttaCentral (según la licencia de cada traductor)",
  },
  open: { si: "විවෘත කරන්න", en: "Open", ta: "திற", es: "Abrir" },
  readFull: { si: "සම්පූර්ණ පාඨය කියවන්න", en: "Read full text", ta: "முழு உரையைப் படி", es: "Leer texto completo" },

  // player
  play: { si: "වාදනය", en: "Play", ta: "இயக்கு", es: "Reproducir" },
  pause: { si: "විරාමය", en: "Pause", ta: "இடைநிறுத்து", es: "Pausa" },
  stop: { si: "නවත්වන්න", en: "Stop", ta: "நிறுத்து", es: "Detener" },
  speed: { si: "වේගය", en: "Speed", ta: "வேகம்", es: "Velocidad" },
  voice: { si: "හඬ", en: "Voice", ta: "குரல்", es: "Voz" },
  voiceOf: { si: "කියවන්නේ", en: "Reading", ta: "வாசிப்பது", es: "Leyendo" },
  nowReading: { si: "දැන් කියවමින්", en: "Now reading", ta: "இப்போது வாசிக்கிறது", es: "Leyendo ahora" },
  noVoice: {
    si: "මෙම උපාංගයේ {lang} හඬක් නැත. 👉 Microsoft Edge බ්‍රව්සරයෙන් විවෘත කරන්න (ස්වාභාවික සිංහල හඬ ඇත), නැතහොත් Android හි Google Text-to-Speech → සිංහල ස්ථාපනය කරන්න. පාඨය ඉහත කියවිය හැක.",
    en: "This device has no {lang} voice. 👉 Open the app in Microsoft Edge (it has natural Sinhala & Tamil voices), or on Android install Google Text-to-Speech → Sinhala. The text is still shown above.",
    ta: "இந்தச் சாதனத்தில் {lang} குரல் இல்லை. 👉 Microsoft Edge இல் திறக்கவும் (இயற்கையான தமிழ் குரல் உள்ளது), அல்லது Android இல் Google Text-to-Speech நிறுவவும்.",
    es: "Este dispositivo no tiene voz en {lang}. 👉 Abre la app en Microsoft Edge (tiene voces naturales), o en Android instala Google Text-to-Speech.",
  },
  noSpeech: {
    si: "මෙම බ්‍රව්සරය කථන (Text-to-Speech) සඳහා සහාය නොදක්වයි.",
    en: "This browser doesn't support speech playback.",
    ta: "இந்த உலாவி பேச்சு இயக்கத்தை ஆதரிக்கவில்லை.",
    es: "Este navegador no admite la reproducción de voz.",
  },
  listenWhat: { si: "අසන්නේ", en: "Listen to", ta: "கேட்பது", es: "Escuchar" },

  // video
  videos: { si: "වීඩියෝ", en: "Videos", ta: "காணொளிகள்", es: "Vídeos" },
  deshanaVideos: { si: "ධර්ම දේශනා වීඩියෝ", en: "Dhamma talk videos", ta: "தர்ம உரை காணொளிகள்", es: "Vídeos de charlas" },
  chantingVideos: { si: "පිරිත් සජ්ඣායනා", en: "Chanting", ta: "ஓதல்", es: "Cantos" },
  guidedVideos: { si: "මඟපෙන්වන භාවනා වීඩියෝ", en: "Guided meditation videos", ta: "வழிகாட்டும் தியானக் காணொளிகள்", es: "Meditaciones guiadas en vídeo" },
  openYouTube: { si: "YouTube හි විවෘත කරන්න", en: "Open on YouTube", ta: "YouTube இல் திற", es: "Abrir en YouTube" },
  moreOnYouTube: { si: "YouTube හි තවත් සොයන්න", en: "Find more on YouTube", ta: "YouTube இல் மேலும் தேடு", es: "Buscar más en YouTube" },
  captionsNote: {
    si: "උපසිරැසි (CC) ස්වයංක්‍රීයව සක්‍රිය වේ — වීඩියෝවේ ඇති විට ඔබගේ භාෂාවෙන්. YouTube හි ⚙ → Subtitles මඟින් ස්වයං-පරිවර්තනය තෝරාගත හැක.",
    en: "Subtitles (CC) turn on automatically — in your language when the video has them. Use ⚙ → Subtitles → Auto-translate on YouTube for other languages.",
    ta: "வசனங்கள் (CC) தானாக இயங்கும் — காணொளியில் இருந்தால் உங்கள் மொழியில். பிற மொழிகளுக்கு YouTube இல் ⚙ → Subtitles → Auto-translate.",
    es: "Los subtítulos (CC) se activan automáticamente — en tu idioma si el vídeo los tiene. Usa ⚙ → Subtítulos → Traducción automática en YouTube.",
  },
  allLanguages: { si: "සියලු භාෂා", en: "All languages", ta: "அனைத்து மொழிகள்", es: "Todos los idiomas" },
  all: { si: "සියල්ල", en: "All", ta: "அனைத்தும்", es: "Todo" },

  // jataka
  searchJataka: { si: "ජාතක කතා සොයන්න (නම හෝ අංකය)…", en: "Search tales (name or number)…", ta: "கதைகளைத் தேடுங்கள் (பெயர் அல்லது எண்)…", es: "Buscar (nombre o número)…" },
  nipata: { si: "නිපාතය", en: "Book", ta: "நிபாதம்", es: "Libro" },
  tales: { si: "කතා", en: "tales", ta: "கதைகள்", es: "historias" },
  showMore: { si: "තවත් පෙන්වන්න", en: "Show more", ta: "மேலும் காட்டு", es: "Mostrar más" },
  jatakaNote: {
    si: "ජාතක 547 ම පාලි ගාථා සහ ඒවායේ සිංහල අර්ථය (A.P. de Zoysa) සමඟ ඇප් එක තුළම ඇත. සම්පූර්ණ කතා විස්තරය English භාෂාවෙන් කියවිය හැක (භාෂාව → English).",
    en: "All 547 Jātakas: the canonical Pāli verses with Sinhala meaning (A.P. de Zoysa), and the full story in English. Tamil and Spanish readers see English.",
    ta: "547 ஜாதகங்களும்: பாளி பாடல்கள், சிங்களப் பொருள், முழுக் கதை ஆங்கிலத்தில்.",
    es: "Los 547 Jātakas: versos pāli con significado en cingalés, y la historia completa en inglés.",
  },
  jatakaVideos: { si: "සිංහල ජාතක කතා වීඩියෝ (YouTube)", en: "Sinhala Jātaka story videos (YouTube)", ta: "சிங்கள ஜாதகக் கதை காணொளிகள் (YouTube)", es: "Vídeos de Jātakas en cingalés (YouTube)" },

  // meditation
  howToPractise: { si: "පුහුණු වන ආකාරය", en: "How to practise", ta: "பயிற்சி செய்யும் முறை", es: "Cómo practicar" },
  guidedSession: { si: "හඬින් මඟපෙන්වන භාවනාව", en: "Voice-guided session", ta: "குரல் வழிகாட்டும் அமர்வு", es: "Sesión guiada por voz" },
  startGuided: { si: "මඟපෙන්වීම අරඹන්න", en: "Start guidance", ta: "வழிகாட்டலைத் தொடங்கு", es: "Iniciar guía" },
  timer: { si: "භාවනා ටයිමරය", en: "Meditation timer", ta: "தியான நேரமானி", es: "Temporizador" },
  minutes: { si: "මිනිත්තු", en: "min", ta: "நிமிடம்", es: "min" },
  start: { si: "අරඹන්න", en: "Start", ta: "தொடங்கு", es: "Iniciar" },
  reset: { si: "යළි සකසන්න", en: "Reset", ta: "மீட்டமை", es: "Reiniciar" },
  bell: { si: "සීනුව", en: "Bell", ta: "மணி", es: "Campana" },
  relatedSutta: { si: "අදාළ සූත්‍රය", en: "Related sutta", ta: "தொடர்புடைய சூத்திரம்", es: "Sutta relacionado" },
  sessionDone: { si: "සාධු! සාධු! සාධු!", en: "Sādhu! Sādhu! Sādhu!", ta: "சாது! சாது! சாது!", es: "¡Sādhu! ¡Sādhu! ¡Sādhu!" },
  step: { si: "පියවර", en: "Step", ta: "படி", es: "Paso" },

  // patthana
  paccayas24: { si: "ප්‍රත්‍යය 24", en: "The 24 conditions", ta: "24 நிபந்தனைகள்", es: "Las 24 condiciones" },
  chantUddesa: { si: "පච්චයුද්දේසය සජ්ඣායනා කරන්න", en: "Chant the Paccayuddesa", ta: "பச்சயுத்தேசத்தை ஓது", es: "Cantar el Paccayuddesa" },
  patthanaIntro: {
    si: "පට්ඨාන ප්‍රකරණය අභිධර්ම පිටකයේ සත්වන හා විශාලතම ග්‍රන්ථයයි. සියලු ධර්මයන් එකිනෙකට ප්‍රත්‍යය වන ආකාර 24 එහි දේශනා කෙරේ. ශ්‍රී ලංකාවේ “සමන්ත පට්ඨානය” ලෙස එය ආශිර්වාදය හා ආරක්ෂාව පතා සජ්ඣායනා කෙරේ.",
    en: "The Paṭṭhāna is the seventh and largest book of the Abhidhamma Piṭaka. It teaches the 24 ways in which all phenomena condition one another. In Sri Lanka it is chanted as the “Samanta Paṭṭhāna” for blessing and protection.",
    ta: "பட்டானம் அபிதம்ம பிடகத்தின் ஏழாவது மற்றும் மிகப்பெரிய நூல். எல்லா தம்மங்களும் ஒன்றையொன்று நிபந்தனைப்படுத்தும் 24 வழிகளை இது போதிக்கிறது. இலங்கையில் ஆசீர்வாதத்துக்கும் பாதுகாப்புக்கும் “சமந்த பட்டானம்” என ஓதப்படுகிறது.",
    es: "El Paṭṭhāna es el séptimo y más extenso libro del Abhidhamma Piṭaka. Enseña las 24 maneras en que todos los fenómenos se condicionan entre sí. En Sri Lanka se canta como «Samanta Paṭṭhāna» para bendición y protección.",
  },

  // pirith
  pirithIntro: {
    si: "පිරිත් (පරිත්ත) යනු ආරක්ෂාව, සෙත සහ සාමය පතා සජ්ඣායනා කරන බුද්ධ දේශනාවන්ය. එක් එක් පිරිත කියවන්න, අසන්න, හෝ සජ්ඣායනා වීඩියෝ නරඹන්න.",
    en: "Pirith (Paritta) are discourses of the Buddha chanted for protection, blessing and peace. Read each one, listen to it, or watch the chanting.",
    ta: "பிரித் (பரித்த) என்பது பாதுகாப்பு, ஆசீர்வாதம், அமைதிக்காக ஓதப்படும் புத்தரின் போதனைகள். ஒவ்வொன்றையும் படியுங்கள், கேளுங்கள், அல்லது ஓதலைப் பாருங்கள்.",
    es: "El Pirith (Paritta) son discursos del Buda que se cantan para protección, bendición y paz. Lee cada uno, escúchalo o mira el canto.",
  },
  fullPirith: { si: "සම්පූර්ණ පිරිත් සජ්ඣායනා", en: "Full Pirith chanting", ta: "முழு பிரித் ஓதல்", es: "Pirith completo cantado" },
  mahamevnawaPirith: { si: "මහමෙව්නාව පිරිත් සජ්ඣායනා", en: "Mahamevnāwa Pirith chanting", ta: "மகாமேவ்னாவ பிரித் ஓதல்", es: "Cantos Pirith de Mahamevnāwa" },
  mahamevnawaNote: {
    si: "මහමෙව්නාව භාවනා අසපුවේ පාළි - සිංහල අර්ථ සහිත පිරිත් සජ්ඣායනා.",
    en: "Pāli chanting with Sinhala meaning, from the Mahamevnāwa monasteries.",
    ta: "மகாமேவ்னாவ மடாலயங்களின் சிங்களப் பொருளுடன் கூடிய பாளி ஓதல்.",
    es: "Cantos en pāli con su significado en cingalés, de los monasterios Mahamevnāwa.",
  },
  copyrightNote: {
    si: "ඇප් එකේ නිර්මාණය හා කේතය. ත්‍රිපිටක පාඨ, පොත් සහ වීඩියෝ ඒවායේ මුල් හිමිකරුවන්ට අයත් වේ.",
    en: "App design & code. Scripture texts, books and videos belong to their respective owners.",
    ta: "செயலியின் வடிவமைப்பும் குறியீடும். உரைகள், நூல்கள், காணொளிகள் அவற்றின் உரிமையாளர்களுக்கு உரியவை.",
    es: "Diseño y código de la app. Los textos, libros y vídeos pertenecen a sus respectivos dueños.",
  },
  gatha: { si: "වන්දනා ගාථා", en: "Vandanā & Gāthā", ta: "வணக்கப் பாடல்கள்", es: "Vandanā y Gāthā" },
  gathaDesc: {
    si: "තෙරුවන් වන්දනා, බෝධි පූජා, රුවන්වැලි සෑය, දෙවියන්ට පින් දීම, ආටානාටිය — පාලි, අර්ථය, හඬ",
    en: "Triple Gem homage, Bodhi pūjā, Ruwanwelisaya, merit for devas, Āṭānāṭiya — Pāli, meaning, voice",
    ta: "மும்மணி வணக்கம், போதி பூஜை, ருவன்வெலிசாய, தேவர்களுக்குப் புண்ணியம் — பாளி, பொருள், குரல்",
    es: "Homenaje a la Triple Joya, Bodhi pūjā, Ruwanwelisaya, méritos para devas — pāli, significado, voz",
  },
  meaning: { si: "අර්ථය", en: "Meaning", ta: "பொருள்", es: "Significado" },
  playAll: { si: "සියල්ල අසන්න", en: "Play all", ta: "அனைத்தையும் கேள்", es: "Reproducir todo" },
  dedicationTitle: { si: "ධර්ම දානයකි 🙏", en: "A gift of Dhamma 🙏", ta: "ஒரு தர்ம தானம் 🙏", es: "Un regalo del Dhamma 🙏" },
  dedication: {
    si: "මෙම ඇප් එක ධර්ම දානයක් ලෙස සැමට නොමිලේ බෙදා හරිමි. මෙයින් ලැබෙන පින් මාගේ දෙමාපියන්ට, සහෝදර සහෝදරියන්ට නිදුක් නිරෝගී සුවය හා චිර ජීවනය පිණිස වේවා! අප අතරින් වෙන්ව ගිය සියලු දෙනාට නිර්වාණ සුවය පිණිස හේතු වේවා! සියලු දෙනාටම මේ පින් ලැබේවා!",
    en: "This app is offered free to everyone as a gift of Dhamma. May its merit bring my parents, brothers and sisters freedom from suffering, good health and long life. May it help all our departed loved ones reach Nibbāna. May everyone share in this merit!",
    ta: "இந்தச் செயலி தர்ம தானமாக அனைவருக்கும் இலவசமாக வழங்கப்படுகிறது. இதன் புண்ணியம் என் பெற்றோர், சகோதர சகோதரிகளுக்கு நோயற்ற நீண்ட ஆரோக்கிய வாழ்வைத் தருவதாக. மறைந்த எங்கள் அன்புக்குரியவர்கள் அனைவரும் நிப்பானம் அடைவார்களாக. அனைவரும் இந்தப் புண்ணியத்தைப் பெறுவார்களாக!",
    es: "Esta app se ofrece gratis a todos como un regalo del Dhamma. Que su mérito traiga a mis padres, hermanos y hermanas salud, bienestar y larga vida, y ayude a todos nuestros seres queridos fallecidos a alcanzar el Nibbāna. ¡Que todos compartan este mérito!",
  },
  bothShort: { si: "දෙකම", en: "Both", ta: "இரண்டும்", es: "Ambos" },
  settings: { si: "සැකසුම්", en: "Settings", ta: "அமைப்புகள்", es: "Ajustes" },
  translating: { si: "සිංහලට පරිවර්තනය වෙමින්…", en: "Translating…", ta: "மொழிபெயர்க்கிறது…", es: "Traduciendo…" },
  autoNote: {
    si: "මෙය English කතාවෙන් ස්වයංක්‍රීයව සිංහලට පරිවර්තනය කළ සම්පූර්ණ විස්තරයයි. මුල් පාලි ගාථා සහ A.P. de Zoysa සිංහල අර්ථය “පරිවර්තක” ලැයිස්තුවෙන් තෝරන්න.",
    en: "Full text machine-translated from English. Choose another translation in “Translator”.",
    ta: "ஆங்கிலத்திலிருந்து இயந்திர மொழிபெயர்ப்பு செய்யப்பட்ட முழு உரை. வேறு மொழிபெயர்ப்பை “மொழிபெயர்ப்பாளர்” இல் தேர்வு செய்யவும்.",
    es: "Texto completo traducido automáticamente del inglés. Elige otra traducción en «Traductor».",
  },
  downloadAudio: { si: "හඬ බාගන්න (MP3)", en: "Download audio (MP3)", ta: "ஒலியைப் பதிவிறக்கு (MP3)", es: "Descargar audio (MP3)" },
  saveOffline: { si: "නොබැඳිව සුරකින්න", en: "Save offline", ta: "ஆஃப்லைனில் சேமி", es: "Guardar sin conexión" },
  savedOk: { si: "සුරැකිණි ✓", en: "Saved ✓", ta: "சேமிக்கப்பட்டது ✓", es: "Guardado ✓" },
  download: { si: "බාගන්න", en: "Download", ta: "பதிவிறக்கு", es: "Descargar" },
  saved: { si: "සුරැකි පාඨ", en: "Saved texts", ta: "சேமித்த உரைகள்", es: "Textos guardados" },
  savedDesc: {
    si: "අන්තර්ජාලය නැතිවත් කියවිය හැකි ඔබ සුරැකි පාඨ",
    en: "Texts you saved — readable without internet",
    ta: "நீங்கள் சேமித்த உரைகள் — இணையம் இல்லாமலும் படிக்கலாம்",
    es: "Textos que guardaste — legibles sin internet",
  },
  noSaved: {
    si: "තවම සුරැකි පාඨ නැත. ඕනෑම පාඨයක “නොබැඳිව සුරකින්න” ඔබන්න.",
    en: "Nothing saved yet. Tap “Save offline” on any text.",
    ta: "இன்னும் எதுவும் சேமிக்கப்படவில்லை. எந்த உரையிலும் “ஆஃப்லைனில் சேமி” அழுத்தவும்.",
    es: "Aún no hay nada guardado. Pulsa «Guardar sin conexión» en cualquier texto.",
  },
  remove: { si: "ඉවත් කරන්න", en: "Remove", ta: "அகற்று", es: "Quitar" },
  offlineCopy: { si: "නොබැඳි පිටපත", en: "Offline copy", ta: "ஆஃப்லைன் நகல்", es: "Copia sin conexión" },
  videoNoDownload: {
    si: "YouTube වීඩියෝ බාගැනීමට YouTube ඉඩ නොදේ — YouTube ඇප් එකේ “Download” භාවිතා කරන්න.",
    en: "YouTube doesn't allow downloading its videos here — use “Download” in the YouTube app.",
    ta: "YouTube காணொளிகளை இங்கே பதிவிறக்க அனுமதி இல்லை — YouTube செயலியில் “Download” பயன்படுத்தவும்.",
    es: "YouTube no permite descargar sus vídeos aquí; usa «Descargar» en la app de YouTube.",
  },
  books: { si: "රේරුකානේ හිමියන්ගේ පොත්", en: "Rerukane Thero's Books", ta: "ரேருகானே தேரரின் நூல்கள்", es: "Libros de Rerukane Thera" },
  booksDesc: {
    si: "බෞද්ධයාගේ අත්පොත, පාරමිතා ප්‍රකරණය, අභිධර්ම මාර්ගය සහ තවත් පොත් 37 — නොමිලේ කියවන්න",
    en: "The Buddhist's Handbook, Pāramitā Prakaraṇaya, Path of Abhidhamma and 34 more — free to read",
    ta: "பௌத்தரின் கையேடு, பாரமிதா பிரகரணம், அபிதம்ம மார்க்கம் மற்றும் 34 நூல்கள் — இலவசமாகப் படிக்கலாம்",
    es: "El manual del budista, Pāramitā Prakaraṇaya, El camino del Abhidhamma y 34 más — lectura gratuita",
  },
  booksIntro: {
    si: "අතිපූජ්‍ය රේරුකානේ චන්දවිමල මහා නාහිමියන් (1897–1997) විසින් රචිත ධර්ම ග්‍රන්ථ. ශ්‍රී චන්දවිමල ධර්මපුස්තක සංරක්ෂණ මණ්ඩලය මගින් නොමිලේ ලබා දෙන නිල PDF පිටපත් මෙහි කියවිය හැක.",
    en: "Dhamma books written by Most Ven. Rerukane Chandawimala Mahā Nāyaka Thero (1897–1997). Read the official PDFs, made freely available by the Sri Chandawimala Dhamma Treatises Preservation Board.",
    ta: "மிக வணக்கத்திற்குரிய ரேருகானே சந்தவிமல மகா நாயக தேரர் (1897–1997) எழுதிய தர்ம நூல்கள். ஸ்ரீ சந்தவிமல தர்ம நூல் பாதுகாப்பு சபை இலவசமாக வழங்கும் அதிகாரப்பூர்வ PDF களைப் படியுங்கள்.",
    es: "Libros del Dhamma escritos por el Muy Ven. Rerukane Chandawimala Mahā Nāyaka Thera (1897–1997). Lee los PDF oficiales, ofrecidos gratuitamente por la Junta de Preservación de Tratados del Dhamma Sri Chandawimala.",
  },
  readBook: { si: "පොත කියවන්න", en: "Read book", ta: "நூலைப் படி", es: "Leer libro" },
  openPdf: { si: "PDF විවෘත කරන්න", en: "Open PDF", ta: "PDF திற", es: "Abrir PDF" },
  pages: { si: "පිටු", en: "pages", ta: "பக்கங்கள்", es: "páginas" },
  listenDesc: { si: "හැඳින්වීම අසන්න", en: "Listen to introduction", ta: "அறிமுகத்தைக் கேள்", es: "Escuchar la introducción" },
  booksVoiceNote: {
    si: "පොත් නිල PDF ලෙස පෙන්වයි. හඬින් ඇසීමට පහත හිමියන්ගේ දේශනා හා ශ්‍රව්‍ය පොත් භාවිත කරන්න.",
    en: "Books open as the official PDFs. To listen, use the Thero's sermons and audiobooks below.",
    ta: "நூல்கள் அதிகாரப்பூர்வ PDF ஆகத் திறக்கும். கேட்க, கீழே உள்ள தேரரின் உரைகளைப் பயன்படுத்துங்கள்.",
    es: "Los libros se abren como PDF oficiales. Para escuchar, usa los sermones y audiolibros del Thera abajo.",
  },
  sinhalaMeaning: { si: "සිංහල අර්ථය", en: "Sinhala meaning", ta: "சிங்களப் பொருள்", es: "Significado en cingalés" },
  paliText: { si: "පාලි පාඨය", en: "Pāli text", ta: "பாளி உரை", es: "Texto pāli" },

  // install
  installNow: { si: "දැන් ස්ථාපනය කරන්න", en: "Install now", ta: "இப்போது நிறுவு", es: "Instalar ahora" },
  installed: { si: "ඇප් එක ස්ථාපනය කර ඇත ✓", en: "App is installed ✓", ta: "செயலி நிறுவப்பட்டது ✓", es: "App instalada ✓" },
  offlineNote: {
    si: "ඔබ කියවූ පාඨ ස්වයංක්‍රීයව සුරැකෙන අතර අන්තර්ජාලය නැතිවත් නැවත කියවිය හැක.",
    en: "Texts you open are saved automatically, so you can read them again offline.",
    ta: "நீங்கள் திறக்கும் உரைகள் தானாகச் சேமிக்கப்படும்; இணையம் இல்லாமலும் மீண்டும் படிக்கலாம்.",
    es: "Los textos que abres se guardan automáticamente para leerlos sin conexión.",
  },
  browse: { si: "පිරික්සන්න", en: "Browse", ta: "உலாவு", es: "Explorar" },
  collections: { si: "එකතු", en: "collections", ta: "தொகுப்புகள்", es: "colecciones" },
  dark: { si: "අඳුරු", en: "Dark", ta: "இருள்", es: "Oscuro" },
  light: { si: "ආලෝක", en: "Light", ta: "ஒளி", es: "Claro" },
} satisfies Record<string, Localized>;

export type StringKey = keyof typeof S;

export function translate(key: StringKey, lang: Lang, vars?: Record<string, string>): string {
  let s: string = S[key][lang] ?? S[key].en;
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replaceAll(`{${k}}`, v);
  return s;
}

export function langLabel(code: string): string {
  return LANGS.find((l) => l.code === code)?.label ?? code;
}
