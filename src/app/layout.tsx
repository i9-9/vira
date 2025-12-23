import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SchemaMarkup } from "@/components/SEO/SchemaMarkup";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIRA Triunvirato - Proyecto Inmobiliario en Villa Urquiza | P&G Desarrollos",
  description: "Que tu vida vire a la comodidad que necesitás. VIRA, proyecto inmobiliario en Av. Triunvirato y Los Incas, Villa Urquiza. Amenidades premium, cocheras, gimnasio, terraza con parrilla y pileta. P&G Desarrollos Urbanos.",
  keywords: "VIRA Triunvirato, proyecto inmobiliario Villa Urquiza, departamentos Triunvirato, P&G Desarrollos, Villa Urquiza Buenos Aires, amenidades premium, cocheras, gimnasio, locales comerciales, apto profesional",
  authors: [{ name: "P&G Desarrollos Urbanos" }],
  creator: "P&G Desarrollos Urbanos",
  publisher: "P&G Desarrollos Urbanos",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vira.com.ar"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/favicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "VIRA Triunvirato - Proyecto Inmobiliario Premium en Villa Urquiza",
    description: "Que tu vida vire a la comodidad que necesitás. Nuevo proyecto inmobiliario en Av. Triunvirato y Los Incas. Amenidades premium, ubicación estratégica en Villa Urquiza.",
    url: "https://vira.com.ar",
    siteName: "VIRA Triunvirato",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://vira-zeta.vercel.app/images/seo/whatsapp.jpg",
        width: 1200,
        height: 630,
        alt: "VIRA Triunvirato - Proyecto Inmobiliario Villa Urquiza",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VIRA Triunvirato - Proyecto Inmobiliario Premium en Villa Urquiza",
    description: "Que tu vida vire a la comodidad que necesitás. Nuevo proyecto inmobiliario en Av. Triunvirato y Los Incas.",
    images: ["https://vira-zeta.vercel.app/images/seo/whatsapp.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "add-your-google-verification-code",
  },
  other: {
    "geo.region": "AR-B",
    "geo.placename": "Villa Urquiza, Buenos Aires",
    "geo.position": "-34.5965;-58.4448",
    "ICBM": "-34.5965, -58.4448",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <SchemaMarkup />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <WhatsAppButton />
      </body>
    </html>
  );
}
