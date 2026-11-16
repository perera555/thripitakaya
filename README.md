# ත්‍රිපිටකය · Tripitaka

Read, listen to and practise the words of the Buddha — in **සිංහල, English, தமிழ், Español**.
A Next.js web app that installs like a native app on Windows, Mac, iPhone/iPad and Android (PWA).

## Features

| Section | What's inside |
| --- | --- |
| **Tipiṭaka** | The complete Pāli canon (Vinaya, Sutta, Abhidhamma), browsed live from SuttaCentral |
| **Reader** | Read · Listen · Read + Listen modes, Pāli in Sinhala or Roman script beside the translation, translator choice, highlighted spoken line, text size, save offline, download `.txt` |
| **Suttas** | Well-known discourses with Dhamma talk (deshanā) videos |
| **Pirith** | Maha Pirith (25 suttas) with Pāli + Sinhala meaning, voice, and Mahamevnāwa chanting |
| **Vandanā & Gāthā** | Triple Gem homage, Pansil, offerings, Bodhi vandanā, Solosmasthāna (incl. Ruwanwelisaya), jīvita pūjāva, Agrasrāvaka vandanā, Jaya Maṅgala, Āṭānāṭiya, merit for devas |
| **Jātaka** | All 547 tales — Pāli verses with Sinhala meaning, full stories in English |
| **Meditation** | Ānāpānasati, Mettā, Karuṇā, Muditā, Upekkhā, Buddhānussati, Maraṇasati, Kāyagatāsati, Vipassanā, walking — steps in 4 languages, voice guidance, bell timer, verified videos |
| **Samanta Paṭṭhāna** | The 24 conditions with meanings, chant player and the full Paccayaniddesa |
| **Rerukane Thero's books** | 37 books (Bauddhayāge Ath Pota, Pāramitā Prakaraṇaya …) from the official free library |
| **Dhamma talks** | Every video in the app, filterable by topic and language, subtitles on by default |
| **Saved** | Texts saved on the device, readable offline |

Every page has a **🔊 Listen** button. Voices come from the device's text-to-speech engine — for Sinhala
on Android install *Google Text-to-Speech*; on Windows/Mac/iOS add the language voice in system settings.

## Develop

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm start
```

Built with Next.js 16 (App Router, Cache Components), React 19 and Tailwind CSS 4.

## Deploy

Import the GitHub repository at <https://vercel.com/new> — no environment variables are needed.

## Sources & credits

- Texts: [SuttaCentral](https://suttacentral.net) (Mahāsaṅgīti Pāli; translations by Bhikkhu Sujato, A.P. de Zoysa and others, under each translator's licence).
- Jaya Maṅgala Gāthā Pāli: *A Chanting Guide*, Dhammayut Order ([dhammatalks.org](https://www.dhammatalks.org), CC BY-NC 4.0).
- Agrasrāvaka vandanā: *Punyopadeshaya* ([pitaka.lk](https://pitaka.lk)).
- Books: Sri Chandawimala Dhamma Treatises Preservation Board ([rerukanemahanahimi.lk](https://rerukanemahanahimi.lk)).
- Videos are embedded from YouTube and belong to their channels.

© 2026 Porage Thamara Dhanushka Perera — app design and code.
