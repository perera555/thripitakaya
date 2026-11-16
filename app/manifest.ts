import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "ත්‍රිපිටකය · Tripitaka",
    short_name: "ත්‍රිපිටකය",
    description:
      "Read and listen to the Tipiṭaka, 547 Jātaka tales, Pirith, Paṭṭhāna and meditation — Sinhala, English, Tamil, Spanish.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    orientation: "any",
    background_color: "#0b0915",
    theme_color: "#0b0915",
    lang: "si",
    categories: ["books", "education", "lifestyle"],
    icons: [
      { src: "/pwa/icon-192", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/pwa/icon-512", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/pwa/maskable-512", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "පිරිත් · Pirith", url: "/pirith" },
      { name: "ජාතක කතා · Jātaka", url: "/jataka" },
      { name: "භාවනා · Meditation", url: "/meditation" },
    ],
  };
}
