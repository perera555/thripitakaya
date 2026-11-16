import type { Lang } from "@/lib/i18n";

/**
 * YouTube videos. Every id was checked against YouTube's oEmbed endpoint
 * (exists + embedding allowed); titles and channel names are as YouTube reports them.
 */
export type Video = { id: string; title: string; by: string; lang: Lang; kind: "guided" | "talk" | "chant" };

const v = (id: string, lang: Lang, kind: Video["kind"], title: string, by: string): Video => ({ id, lang, kind, title, by });

export const VIDEOS: Record<string, Video[]> = {
  // ── Meditation ─────────────────────────────────────────────
  anapanasati: [
    v("m7haUfo1KTQ", "si", "guided", "Anapanasathi Bawanawa | ආනාපානසති භාවනාව | Meditation Guidence Sinhala", "විශ්වයෙන් එහා Wishwayen Eha"),
    v("pRTj98sYmwM", "si", "talk", "ආනාපානසති භාවනාව මුල සිට සරලව - අතිපූජ්‍ය කොත්මලේ කුමාරකස්සප ස්වාමින්වහන්සේ", "Paramaththa - Labunoruwakanda Forest Monastery"),
    v("48_u0ANu9gc", "si", "talk", "ආනාපානසති භාවනාව - කිරිබත්ගොඩ ඤාණානන්ද ස්වාමින්වහන්සේ", "Mahamevnawa Monastery Deutschland"),
    v("HGd1mh3o89s", "en", "guided", "Ajahn Thanissaro - Guided Meditation: Mindfulness of breathing (Ānāpānasati)", "Dhamma Talks at Dhammagiri"),
    v("gawNjICPNVc", "en", "guided", "Guided Breath Meditation - Ānāpānasati ~ Mindfulness of Breathing - Jayasara", "Samaneri Jayasāra - Wisdom of the Masters"),
    v("5jcKtyTBQ0M", "en", "guided", "Guided Ānāpānasati Meditation | Mindfulness of Breathing in the Buddha’s Teachings", "Dhamma Sharing with Ayya Brahmavara"),
    v("H-3Z_KJkLNg", "ta", "talk", "ஆனா பானா தியானம் செய்முறை விளக்கம் | aana pana sati meditation", "Tharcharbu vazhkai- தற்சார்பு வாழ்க்கை"),
    v("WXrTo5D3kbA", "es", "guided", "Anapanasati. Meditacion guiada del Seguimiento a la Respiracion", "Centro Budista Online"),
    v("P54BF82zrnM", "es", "guided", "Meditación Anapanasati (Vipassana) de 15 minutos con voz para principiantes", "toUnknown Español"),
    v("joC4v7qAkaw", "es", "guided", "Atención Plena a la Respiración (Anapanasati)", "Centro Budista De Cuernavaca"),
  ],
  metta: [
    v("Vuwn0uhtY-U", "si", "guided", "Maithree Bawanawa | මෛත්‍රී භාවනාව සහ මෛත්‍රිය පැතිරවීම | Meditation Guidence Sinhala", "විශ්වයෙන් එහා Wishwayen Eha"),
    v("30q3VIXmOuY", "si", "chant", "ආර්ය මෛත්‍රී භාවනාව (සියලු ක්ලේශයන් ප්‍රහාණය කිරීම සඳහා)", "Jethavanarama Viharaya (Dharmayai Obai)"),
    v("P7NarbJZKqE", "si", "talk", "මානසික දෝෂ දුරු කරන සිත සමාධිගත වන උත්තරීතර ගුණ දෙන මෛත්‍රී භාවනාව", "Dhaham tv"),
    v("prMX2s4XYbY", "si", "chant", "ආර්ය මෛත්‍රී භාවනාව", "LK CINAMA LAND"),
    v("ObCnqzg9kIU", "en", "guided", "Guided Metta Meditation with Thanissaro Bhikkhu", "Non-clinging Awareness"),
    v("URpsBRabUaU", "en", "guided", "Ajahn Santamano - Guided Metta Meditation", "Buddhism and Society"),
    v("NgfSjKOQbbI", "en", "guided", "Guided Metta - A Guided Meditation By Gil Fronsdal", "Mindfulness Exercises"),
    v("BnPNWk27wcI", "en", "guided", "#1 First Day Guided Metta Meditation with Bhante Kusala", "TWIM - Dhamma Sukha Meditation Center"),
    v("wMw6bdNN2Ck", "es", "guided", "Meditación Metta Bhavana o de la Bondad Amorosa - 12 minutos", "Pablo Gómez Psiquiatra"),
    v("Gkw52D0IvME", "es", "guided", "Meditación Guiada de Amor Bondadoso Metta", "Paramita"),
    v("a8tIByR4lBk", "es", "guided", "Meditación guiada METTA BHAVANA | Cultiva Amor y Bondad", "Sergio Huertas"),
  ],
  brahmavihara: [
    v("5e5KUbcezOc", "en", "guided", "Brahmavihara Meditation | Ayya Cittananda", "Karuna Buddhist Vihara"),
    v("-ZmxS-kAEIs", "en", "guided", "Guided Meditation: Cultivating Loving-Kindness, Compassion, Joy & Equanimity", "Cambridge Peace House"),
    v("Xz-BtVR-Xsw", "en", "talk", "Developing All 4 Divine Abodes: Metta, Karuna, Mudita, Upekkha | Ajahn Dhammasiha", "Dhamma Talks at Dhammagiri"),
  ],
  karuna: [v("5Yt4U5EIaiQ", "en", "guided", "Brahmavihāra Meditation - Compassion ~ Stephen Snyder", "Stephen Mugen Snyder, Roshi")],
  upekkha: [v("2i_BU-PAVZs", "en", "guided", "Guided Equanimity Meditation", "One Mind Dharma")],
  buddhanussati: [
    v("0XlmFN-VTjU", "si", "talk", "බුද්ධානුස්සති භාවනාව නිවැරදිව ආරම්භ කර ඉදිරියට වඩන අකාරය | ven na uyane ariyadhamma thero", "Niwanata Maga නිවනට මග"),
    v("3gQUDKNnVZE", "si", "talk", "බුද්ධානුස්සති භාවනාව මූලිකව | බෝගහපුර දේවමිත්ත ස්වාමින් වහන්සේ", "Jaya TV"),
    v("nlupBEVmayA", "en", "guided", "Buddhanussati Bhavana | Meditation for Beginners | Guided Sitting & Silent Practice", "Dhamma USA"),
    v("Pc6tEiJU__E", "en", "guided", "Akaliko Bhikkhu: Meeting the Buddha Guided Meditation", "Bhante Akaliko Bhikkhu"),
    v("QtD-bGWaABc", "en", "guided", "Reflecting on the qualities of the Buddha (Buddhanussati)", "Beth Upton"),
    v("1Trd1LoCX_Q", "en", "talk", "Four protective meditations - Part 1-2 Recollection of the Buddha", "BAUS Chuang Yen Monastery"),
  ],
  maranasati: [
    v("waXIdLtcpSg", "si", "talk", "Marananussathi Bawanawa - Nauyane Ariyadhamma Thero", "Nauyane Ariyadhamma Thero"),
    v("vH-dVGS6ki0", "si", "talk", "මරණානුස්සති භාවනාව - පුජ්‍ය සිලගම ඥානසිරි ස්වාමින්වහන්සේ", "සිත වඩමු"),
    v("3EYSu-OP0C4", "en", "talk", "Akaliko Bhikkhu: Maranasati or Mindfulness of Death", "Bhante Akaliko Bhikkhu"),
    v("AOK-ostAuW8", "en", "guided", "Bhikkhu Anālayo | maraṇasati · recollection of death", "Āgama Research Group"),
  ],
  kayagatasati: [
    v("6BAsd6mOvcw", "si", "talk", "Asuba Bawanawa (01) - Nauyane Ariyadhamma Thero", "Nauyane Ariyadhamma Thero"),
    v("xW5HxtEGDps", "si", "talk", "අසුභ භාවනාව - නවසීවථිකය - 02 - Ven. Na Uyane Ariyadhamma Thero", "Daham Alokaya"),
    v("PYnb6esL5wU", "si", "talk", "දස අසුභ භාවනාව Dasa Asubha meditation Rev. kithalagama sumedha", "Dhamma TV"),
    v("Cr1O2ZWYYaQ", "en", "guided", "Kāyagatāsati | Mindfulness Directed to the Body | Guided Meditation by Bhante Samitha", "Cambridge Peace House"),
    v("bueIyoFVvtU", "en", "guided", "Mindfulness Immersed in the Body | Kāyagatāsati Bhāvanā | Bhante Sumitta", "Dhamma USA"),
  ],
  vipassana: [
    v("dUfiKEpZel0", "si", "talk", "විදර්ශනා භාවනාවේ මූූලික කරුණු | Vidarshana Bhawana Mulika Karunu", "patisothagami"),
    v("A-91gAkTer0", "si", "talk", "විදර්ශනා භාවනාව නිවැරදිව වඩන්නේ කෙසේද? How to Do the Vidarshana Meditation Correctly", "vidarshana tv"),
    v("nAT2bFKz8ik", "en", "guided", "Guided Vipassana meditation — Bhante Sujiva", "Centro meditazione Pian dei Ciliegi"),
    v("877w4rQlKHo", "en", "guided", "Vipassana Guided Meditation - Insight Practice", "One Mind Dharma"),
    v("SxRrtXkoqE0", "ta", "talk", "வாழ்வை மாற்றும் விபாசனா தியானம் | ஆனா பானா சதி", "YOGIS RAJA"),
    v("_iYhAhAmXIM", "es", "guided", "Meditación Vipassana guiada en español · Observa tu mente con calma y claridad", "El Romancero Ayurveda"),
  ],
  walking: [
    v("BTCbsYSLea8", "si", "talk", "සක්මන් භාවනාව (සමථ & විදර්ශනා) මූලික කරුණු", "patisothagami"),
    v("I8tny_Jh7TU", "si", "talk", "සක්මන් භාවනාවට උපදෙස් - Bhante Jinalankara", "මග්ග"),
    v("mtDLRDWDRRY", "en", "guided", "Walking and Lying Down Meditation Instruction", "Theravada Buddhist Community Toronto"),
    v("HxGMVnY2ci8", "en", "talk", "Walking Meditation (Cankama) Training: Purpose, Objects, and Buddha’s Teachings", "Dhamma-Vinaya Patipada"),
  ],

  // ── Suttas: Dhamma talks (dharma deshana) ───────────────────
  mangala: [
    v("wokXZDzPIGc", "si", "talk", "Maha Mangala Sutta (මහා මංගල සූත්‍රය) ~ Ven. Kiribathgoda Gnanananda Thero", "Mahamevnawa"),
    v("d16yOffFKZs", "si", "talk", "මහාමංගල සුත්‍රය", "Appamado lk"),
    v("ExaYQ0b-ncw", "si", "talk", "මහා මංගල සූත්‍ර නිදාන කතාව", "MIDUMA SL"),
  ],
  ratana: [
    v("_sq7rY1eRIQ", "si", "chant", "විශාල මහනුවර තුන් බිය දුරු කල රතන සූත්‍ර දේශනාව | Rathana suthraya Seth pirith", "Samitha chathuranga"),
    v("kVBzq6Sj6mM", "si", "chant", "රතන සූත්‍රය - Rev. Morawaka Dhammarakkhitha Thero - Ratana Sutta Chanting", "Morawaka Dhammarakkhitha Thero"),
  ],
  mettaSutta: [
    v("rYW1ruWVebY", "en", "talk", "Karaniya Metta Sutta — Thanissaro Bhikkhu — Dhamma Talks", "Dhamma Talks by Thanissaro Bhikkhu"),
    v("5pygM3C9Uxo", "en", "talk", "A Dhamma Talk on the (Karaṇīya) Metta Sutta: “Discourse on Universal Love”", "Candana Bhikkhu"),
    v("u_i0VMH9524", "en", "chant", "Karaṇīya Metta Sutta: The Buddha’s Words on Lovingkindness ❖ Pāli & English Text", "Ajahn Anan Dhamma"),
  ],
  dhammacakka: [
    v("wtd5qdXymv0", "si", "talk", "Dhammacakkappavattana Sutta Deshanāwa — බුදු පියාණන් වහන්සේගේ පළමු ධර්මය දම්සක් සූත්‍රය", "Niwan Sitha-නිවන් සිත"),
    v("ukZHlgjF96M", "si", "chant", "ධම්මචක්කපවත්තන සූත්‍රය - Dhammacakkappavattana Sutta", "සබ්බදානං ධම්ම දානං ජිනාති"),
    v("JJozXm4Ew8s", "en", "talk", "SN 56.11. Dhammacakkappavattana Sutta: Setting in Motion of the Wheel of the Dhamma", "Buddhist Fellowship"),
    v("O2EFk9kyEpA", "en", "chant", "The Dhammacakkappavattana Sutta, chanted in Pali with Pali and English subtitles", "Ian V"),
  ],
  satipatthana: [
    v("vDBF-9O1XX4", "si", "talk", "සතිපට්ඨාන සූත්‍රය ඇසුරින් පවත්වනලද වස්සාන ධර්ම දේශනාව - Ven. Ilukegama Aththadassi Thero", "Path Nirvana"),
    v("_NHBBE4T_Bc", "si", "chant", "Maha Satipatthana Sutta Pali and Sinhala for bhavana | මහා සතිපට්ඨාන සූත්‍රය පාලි - සිංහල", "Kusala TV"),
    v("J2KwNDOHYnk", "si", "chant", "Maha sathipattana suthraya - මහා සතිපට්ඨාන සූත්‍රය", "Pirith Deshana - පිරිත් දේශනා"),
  ],
  anatta: [
    v("xQnfRmaCXrw", "si", "talk", "Anattalakkhana Sutta - අනත්තලක්ඛණ සූත්‍රය - Ven Kiribathgoda Gnanananda Thero", "Mewantha Somarathna"),
    v("W58bjdob82g", "si", "talk", "අනත්ත ලක්ඛණ සූත්‍රය - ධර්ම දේශනය - Bana - Dharma Deshana", "Pirith පිරිත්"),
    v("Q-3HqE5cAfs", "si", "talk", "අනත්ත ලක්ඛණ සූත්‍රය - Mankadawala Sudassana Himi", "Path Nirvana"),
  ],

  // ── Pirith ──────────────────────────────────────────────────
  mahamevnawa: [
    v("I2SyAG2TCSc", "si", "chant", "මහ පිරිත | මහමෙව්නාවේ පාළි - සිංහල පිරිත් සජ්ඣායනය", "Mahamevnawa"),
    v("xEl2PVXtY9A", "si", "chant", "Pirith Sajjhayanawa (පිරිත් සජ්ඣායනාව)", "Mahamevnawa"),
    v("T16tbFb_MKE", "si", "chant", "මහ පිරිත | මහමෙව්නාවේ පාළි - සිංහල පිරිත් සජ්ඣායනය (pali - sinhala)", "Namo Buddhaya!!! - නමෝ බුද්ධාය!!!"),
    v("WbuU9EaTofQ", "si", "chant", "Maha Piritha | මහ පිරිත | සිංහල පිරිත් සජ්ඣායනය | මහමෙව්නාව", "Around the world - ලොව වටා"),
    v("7C9Vztdhjfk", "si", "chant", "ධජග්ග පිරිත | Mahamevnawa Pirith Sinhala - සිංහල පිරිත් සජ්ඣායනය", "නිවන-Niwana"),
    v("9kieFhAfWwo", "si", "chant", "අංගුලිමාල පිරිත (මහමෙව්නාව) - Angulimala Piritha by Mahamevnawa", "Namo Buddhaya!!! - නමෝ බුද්ධාය!!!"),
    v("Ysk7QpKw34Q", "si", "chant", "අංගුලිමාල පිරිත | Angulimala Piritha", "Shraddha TV"),
  ],
  pirithFull: [
    v("bM_L3SLzElY", "si", "chant", "Thun Suthraya Full | තුන් සූත්‍රය | Seth Pirith", "නමෝ බුද්ධය!"),
    v("gDeXt2DRQiE", "si", "chant", "Pirith | Sinhala Pali FULL", "Budu Sasuna Bebalewa - බුදු සසුන බැබලේවා"),
    v("4wbb0XxU1CA", "si", "chant", "Jaya Piritha | Pirith | Seth Pirith", "Bawa kathara"),
  ],
  dhajagga: [v("7C9Vztdhjfk", "si", "chant", "ධජග්ග පිරිත | Mahamevnawa Pirith Sinhala", "නිවන-Niwana")],
  angulimala: [
    v("9kieFhAfWwo", "si", "chant", "අංගුලිමාල පිරිත (මහමෙව්නාව) - Angulimala Piritha by Mahamevnawa", "Namo Buddhaya!!! - නමෝ බුද්ධාය!!!"),
    v("Ysk7QpKw34Q", "si", "chant", "අංගුලිමාල පිරිත | Angulimala Piritha", "Shraddha TV"),
  ],

  // ── Pūjā & vandanā ──────────────────────────────────────────
  bodhiPuja: [
    v("0z4uNX50m-s", "si", "chant", "මහා බලසම්පන්න ආශිර්වාද බෝධි පූජාව | Maha Bala sampanna Ashirwadha Bodhi Puja", "Ape Seth Pirith"),
    v("fCLvTHD8lE8", "si", "chant", "Ashirwada Bodhi Puja - මහානුභාව ආශිර්වාද බෝධි පූජාව", "MethSith Suwa Arana - මෙත්සිත් සුව අරණ"),
    v("zeo7iyZ_gaM", "si", "chant", "ජය ශ්‍රී මහා බෝ සමිඳුන්ගෙ ආශිර්වාදාත්මක බෝධි පූජාව | Bodhi Pooja Kavi", "Any hub Tv"),
    v("By8F6HI_-CI", "si", "chant", "Bodhi Poojawa | බෝධි පූජාව", "Dharma Danaya"),
    v("DiAip65yuyE", "si", "chant", "අධිෂ්ඨාන බෝධි පූජාව", "Charuka Weerasekara"),
    v("0pSjZJCi1Ro", "si", "talk", "නිවැරැදිව බෝධි පූජාවක් තබන්නෙ මෙන්න මෙහෙමයි | Bodhi Pooja", "Ape Lakbima"),
  ],
  ruwanweli: [
    v("SpBLWvbiny8", "si", "chant", "රුවන්වැලි මහා සෑය වන්දනා ගාථාව | Ruwanwali Maha Seya Wandana Gatha", "Sadaham Thilina - සදහම් තිළිණ"),
    v("czbTaaMVGko", "si", "talk", "රුවන්වැලි මහා සෑයට නිවැරදිව ජීවිතය පූජා කරන ආකාරය", "දහම් සඳ - daham sanda"),
    v("Ska3wuHHSS0", "si", "chant", "රුවන්වැලි මහා සෑයට ජීවිත පූජා කරමින් කරන ආරාධනාව | Ruwanwali Maha Sa Jeewitha poojawa", "කිරි සිහිනයට ආදරයෙන් - Kiri Sihinayata Adaren"),
    v("MngOdGSR2sw", "si", "chant", "රුවන්වැලි මහා සෑ වන්දනා කවි", "සෝදමු සිත | SODAMU SITHA"),
  ],
  jayamangala: [
    v("Xx2iNLsPQJc", "si", "chant", "Jayamangala Gatha (ජයමංගල ගාථා) | Lyrical Video - Ven. Deraniyagala Dhammasara Thero", "The Buddhist"),
    v("uV8Q1zPJAK8", "si", "chant", "Jayamangala Gatha (Pali - Sinhala) - Nanda Malini | ජයමංගල ගාථා (පාලි - සිංහල)", "DinuraCreations for Sinhala Songs"),
    v("QkcxPG9VJ5g", "si", "chant", "Jayamangala gatha - ජයමංගල ගාථා", "Pirith Deshana - පිරිත් දේශනා"),
    v("geDnGjDjbLI", "si", "chant", "Jaya Mangala Gatha ජය මංගල අට්ඨ ගාථා", "Olu Style"),
    v("2Pxew_Atai0", "si", "chant", "Jayamangala Gatha (ජයමංගල ගාථා) - Saheli Gamage | Lyrical Video", "Saheli Gamage"),
  ],
  navagraha: [
    v("-f7zQdcZl0Y", "si", "chant", "ග්‍රහ අපල දුරු කරන නවගුණ ශාන්තිය | Nawagraha Shanthiya", "Sadaham Thilina - සදහම් තිළිණ"),
    v("g5EiPxe8PdA", "si", "chant", "නවග්‍රහ ශාන්තිය | Navagraha Santhiya", "සදහම් මණ්ඩපය Sadaham Mandapaya"),
    v("Cm4_hsmM8Tg", "si", "chant", "Nawagraha Shanthiya - නවග්‍රහ ශාන්තිය (MKS)", "MahakaluSinhalayo - මහාකළුසිංහලයෝ"),
    v("fRflT85mf7A", "si", "chant", "නවග්‍රහ ශාන්තිය / Nawagraha shanthiya / seth pirith", "ගුප්ත විද්‍යාව guptha vidyawa"),
  ],
  sanghaVandana: [v("jEmHbzIWF1Q", "si", "chant", "සංඝයා වහන්සේට වඳින ගාථාව සහ අර්ථය - සීලවන්තං", "Kaveesha Sarangi")],
  atanatiya: [
    v("9raIyjdOhmA", "si", "chant", "ආටානාටිය පිරිත | Atanatiya Suthraya", "Seth Piritha"),
    v("1bb5oVyXX5s", "si", "chant", "ආටානාටිය පිරිත | Atanatiya Suthraya", "Shraddha TV"),
    v("XC1ZSIC9Vvw", "si", "chant", "Atanatiya Piritha | ආටානාටිය පිරිත", "Sinhala Pirith Deshana"),
    v("fNKxCpsQNpo", "si", "chant", "Atanatiya Suthraya ආටානාටිය සූත්‍රය | Seth Pirith", "MahakaluSinhalayo - මහාකළුසිංහලයෝ"),
    v("1U9Aj0udq80", "si", "chant", "ආටානාටිය පිරිත | Atanatiya Suthraya", "Pin Potha ~ පින් පොත"),
    v("A9L9bCwQBuQ", "si", "talk", "ආටානාටිය නම් ආරක්ෂාව විස්තර කිරීම | Atanatiya suthraya", "දේව කතා - Dewa Katha"),
  ],
  galigamuwe: [
    v("qSBMbzU0rWs", "si", "talk", "Galigamuwe Gnanadeepa Thero | සංසාරේ ණය ගෙවන හැටි අමාරුයි පුතේ", "SANSARA ARANA | සංසාර අරණ"),
    v("5SIhGCU_H4Y", "si", "talk", "galigamuwe gnanadeepa thero | කර්මය පිළිබඳ දේශනාව", "බුද්ධ දේශනා budda deshana"),
    v("3p2oG4Su9UE", "si", "talk", "galigamuwe gnanadeepa thero | නිකිණි පොහොය", "බුද්ධ දේශනා budda deshana"),
    v("8rGOGVFbnl8", "si", "talk", "ඔබට ඉන්න ඉරිසියාකාරයෝ තරහාකාරයෝ හැමෝටම මේ දේ කරන්න | Galigamuwe Gnanadeepa Thero", "Pinwath oba පින්වත් ඔබ"),
    v("Y2KPCcZ7m3w", "si", "talk", "පව් කෝටියක් වෙලා තිබුනත් අද ඉදන් මේ දේවල් කරන්න ඔබට හරියනවා | Galigamuwe Gnanadeepa Thero", "Pinwath oba පින්වත් ඔබ"),
    v("RDo88kVgkag", "si", "talk", "සමහර හිතාගන්න බැරි තැන්වලදි ජිවිතය අවබෝධ වෙන්න පටන්ගන්නවා | galigamuwe gnanadeepa thero", "Vimukthiye Maga"),
    v("wIN-kpwzrRo", "si", "talk", "galigamuwe gnanadeepa thero | bana", "bana"),
  ],

  // ── Ven. Rerukane Chandawimala Thero ───────────────────────
  rerukane: [
    v("_zBGJY9IRdQ", "si", "talk", "රේරුකානේ චන්දවිමල මහ නා හිමිගේ අති දුර්ලභ ධර්ම දේශනාව", "river water"),
    v("ZWSkSgQuLTw", "si", "talk", "Rerukane chandavimala thero dharmadeshana by damsilu tv", "damsiluTV"),
    v("r7pQKliYDps", "si", "talk", "Rerukane Chandawimala Thero (රේරුකානේ චන්දවිමල හිමි)", "Dhamma TV"),
    v("6UWm4vSCC-0", "si", "talk", "Rerukane Chandawimala Maha Naayaka Thero", "බුදුන් වදාළ ධර්මය"),
    v("Z1-ZLzsdqLs", "si", "talk", "රේරුකානේ චන්දවිමල මහනාහිමි සමඟ සම්මුඛ සාකච්ඡාවක් | Interview", "කුසල් මග | Kusal Maga"),
    v("ko6WFXW3ZVw", "en", "talk", "1.1 Preface - Four Noble Truths - Bhante Rerukane Chandawimala (audiobook)", "Dhamma Audiobook Library"),
  ],

  // ── Paṭṭhāna ────────────────────────────────────────────────
  patthana: [
    v("QNpLc0EoOec", "si", "chant", "සමන්ත පට්ඨාන ධර්ම සජ්ඣායනාව | Pattana pali Chanting", "නුවර අපේ පන්සල - Nuwara Ape Pansala"),
    v("zplDTlidnuk", "si", "talk", "පූජ්‍ය කිරිබත්තුඩුවේ අරියදස්සන ස්වාමීන් වහන්සේ විසින් දේශිත පට්ඨාන දේශනාව", "Trendy Hub"),
    v("J4luI8VBLKs", "si", "talk", "පට්ඨාන දේශනාව (Pattana Deshanawa) - 2024-10-03", "Sakyamuni Sambuddha Vihara"),
    v("bFpyBqlb1eE", "si", "talk", "විශේෂ පට්ඨාන දේශනා සාකච්ඡාව - Ven. Thapowanaye Rathana Thero", "Dharma Sakachcha"),
    v("yJmks4MZeYY", "si", "talk", "උතුම් පට්ඨාන දේශනාව", "Ven Neethiyagama Chandima"),
    v("__QJDl-VbIA", "en", "chant", "Patthana Pali & English | The 24 types of causal conditioning | Sayadaw U Pandita", "Dharma Jeet Chakma"),
    v("9bby8y95zZw", "en", "chant", "All 24 Patthana", "Danny Chew"),
    v("zEKN99OpGsQ", "en", "chant", "Patthana chanting by Pa Auk Sayadaw", "amorshanti"),
    v("s7vQrQKO7ys", "en", "chant", "Patthana Pali Chanting By Sayadaw Revata With Pali Text", "Dhamma-Pāla Indonesia"),
    v("F5nqbNfysic", "en", "chant", "Abhidhamma Chants: Paṭṭhāna (Hetupaccayo)", "Buddhist Wisdom"),
  ],
};

export function videosFor(keys: string[] | undefined): Video[] {
  if (!keys) return [];
  const seen = new Set<string>();
  const out: Video[] = [];
  for (const k of keys) for (const vid of VIDEOS[k] ?? []) if (!seen.has(vid.id)) (seen.add(vid.id), out.push(vid));
  return out;
}

export const VIDEO_TOPICS: { key: string; label: Record<Lang, string> }[] = [
  { key: "anapanasati", label: { si: "ආනාපානසති", en: "Ānāpānasati", ta: "ஆனாபானசதி", es: "Ānāpānasati" } },
  { key: "metta", label: { si: "මෛත්‍රී", en: "Mettā", ta: "மெத்தா", es: "Mettā" } },
  { key: "brahmavihara", label: { si: "බ්‍රහ්ම විහරණ", en: "Brahmavihāra", ta: "பிரம்மவிகாரம்", es: "Brahmavihāra" } },
  { key: "buddhanussati", label: { si: "බුද්ධානුස්සති", en: "Buddhānussati", ta: "புத்தானுஸ்ஸதி", es: "Buddhānussati" } },
  { key: "maranasati", label: { si: "මරණානුස්සති", en: "Maraṇasati", ta: "மரணானுஸ்ஸதி", es: "Maraṇasati" } },
  { key: "kayagatasati", label: { si: "අසුභ / කායගතාසති", en: "Kāyagatāsati", ta: "காயகதாசதி", es: "Kāyagatāsati" } },
  { key: "vipassana", label: { si: "විදර්ශනා", en: "Vipassanā", ta: "விபஸ்ஸனா", es: "Vipassanā" } },
  { key: "walking", label: { si: "සක්මන්", en: "Walking", ta: "நடை", es: "Caminando" } },
  { key: "dhammacakka", label: { si: "ධම්මචක්ක", en: "Dhammacakka", ta: "தம்மசக்கம்", es: "Dhammacakka" } },
  { key: "anatta", label: { si: "අනත්තලක්ඛණ", en: "Anattalakkhaṇa", ta: "அனத்தலக்கண", es: "Anattalakkhaṇa" } },
  { key: "satipatthana", label: { si: "සතිපට්ඨාන", en: "Satipaṭṭhāna", ta: "சதிபட்டானம்", es: "Satipaṭṭhāna" } },
  { key: "mangala", label: { si: "මංගල සූත්‍රය", en: "Maṅgala Sutta", ta: "மங்கல சூத்திரம்", es: "Maṅgala Sutta" } },
  { key: "ratana", label: { si: "රතන සූත්‍රය", en: "Ratana Sutta", ta: "ரதன சூத்திரம்", es: "Ratana Sutta" } },
  { key: "mettaSutta", label: { si: "කරණීය මෙත්ත සූත්‍රය", en: "Karaṇīya Metta Sutta", ta: "கரணீய மெத்த சூத்திரம்", es: "Karaṇīya Metta Sutta" } },
  { key: "mahamevnawa", label: { si: "මහමෙව්නාව පිරිත්", en: "Mahamevnāwa Pirith", ta: "மகாமேவ்னாவ பிரித்", es: "Pirith Mahamevnāwa" } },
  { key: "pirithFull", label: { si: "පිරිත්", en: "Pirith", ta: "பிரித்", es: "Pirith" } },
  { key: "patthana", label: { si: "පට්ඨාන", en: "Paṭṭhāna", ta: "பட்டானம்", es: "Paṭṭhāna" } },
  { key: "rerukane", label: { si: "රේරුකානේ හිමි", en: "Rerukane Thero", ta: "ரேருகானே தேரர்", es: "Rerukane Thera" } },
  { key: "galigamuwe", label: { si: "ගලිගමුවේ හිමි", en: "Galigamuwe Thero", ta: "கலிகமுவே தேரர்", es: "Galigamuwe Thera" } },
  { key: "bodhiPuja", label: { si: "බෝධි පූජා", en: "Bodhi Pūjā", ta: "போதி பூஜை", es: "Bodhi Pūjā" } },
  { key: "ruwanweli", label: { si: "රුවන්වැලි මහා සෑය", en: "Ruwanwelisaya", ta: "ருவன்வெலிசாய", es: "Ruwanwelisaya" } },
  { key: "jayamangala", label: { si: "ජය මංගල ගාථා", en: "Jaya Maṅgala", ta: "ஜய மங்கல", es: "Jaya Maṅgala" } },
  { key: "navagraha", label: { si: "නවග්‍රහ ශාන්තිය", en: "Navagraha Shānthi", ta: "நவக்கிரக சாந்தி", es: "Navagraha" } },
  { key: "atanatiya", label: { si: "ආටානාටිය", en: "Āṭānāṭiya", ta: "ஆடானாடிய", es: "Āṭānāṭiya" } },
];
