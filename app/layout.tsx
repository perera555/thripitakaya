import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import { Inter, Noto_Sans_Sinhala, Noto_Sans_Tamil, Noto_Serif, Noto_Serif_Sinhala } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { BottomNav, Header } from "@/components/Header";
import { ServiceWorker } from "@/components/ServiceWorker";
import { Footer } from "@/components/Footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin", "latin-ext"] });
const si = Noto_Sans_Sinhala({ variable: "--font-si", subsets: ["sinhala"] });
const siSerif = Noto_Serif_Sinhala({ variable: "--font-si-serif", subsets: ["sinhala"] });
const ta = Noto_Sans_Tamil({ variable: "--font-ta", subsets: ["tamil"] });
const serif = Noto_Serif({ variable: "--font-serif-latin", subsets: ["latin", "latin-ext"] });

export const metadata: Metadata = {
  title: { default: "ත්‍රිපිටකය · Tripitaka", template: "%s · ත්‍රිපිටකය" },
  description:
    "Read and listen to the complete Pāli Tipiṭaka, 547 Jātaka tales, Pirith, Samanta Paṭṭhāna and Buddhist meditation — in Sinhala, English, Tamil and Spanish.",
  applicationName: "Tripitaka",
  appleWebApp: { capable: true, title: "ත්‍රිපිටකය", statusBarStyle: "black-translucent" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0915" },
    { media: "(prefers-color-scheme: light)", color: "#fbf5ea" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="si"
      data-theme="dark"
      suppressHydrationWarning
      className={`${inter.variable} ${si.variable} ${siSerif.variable} ${ta.variable} ${serif.variable} antialiased`}
    >
      <head>
        {/* apply saved theme before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('tp.theme');if(t)document.documentElement.dataset.theme=t;var l=localStorage.getItem('tp.lang');if(l)document.documentElement.lang=l}catch(e){}`,
          }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <div className="ambient" />
        <Providers>
          <Suspense fallback={<div className="glass sticky top-0 z-40 h-16 border-x-0 border-t-0" />}>
            <Header />
          </Suspense>
          <main className="mx-auto w-full max-w-7xl flex-1 px-4 pb-28 pt-6 md:pb-12">{children}</main>
          <Footer />
          <Suspense fallback={null}>
            <BottomNav />
          </Suspense>
          <ServiceWorker />
        </Providers>
      </body>
    </html>
  );
}
