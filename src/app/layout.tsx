import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VIRA - Proyecto Inmobiliario en Villa Urquiza",
  description: "Descubre VIRA, un proyecto inmobiliario único en Villa Urquiza que combina diseño moderno, ubicación privilegiada y amenidades de primer nivel. Unidades de 1 a 4 ambientes, dúplex y locales comerciales.",
  keywords: "VIRA, proyecto inmobiliario, Villa Urquiza, departamentos, dúplex, locales comerciales, aptos profesionales, Buenos Aires",
  authors: [{ name: "VIRA Development" }],
  creator: "VIRA Development",
  publisher: "VIRA Development",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://vira.com.ar"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "VIRA - Proyecto Inmobiliario en Villa Urquiza",
    description: "Descubre VIRA, un proyecto inmobiliario único en Villa Urquiza que combina diseño moderno, ubicación privilegiada y amenidades de primer nivel.",
    url: "https://vira.com.ar",
    siteName: "VIRA",
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIRA - Proyecto Inmobiliario en Villa Urquiza",
    description: "Descubre VIRA, un proyecto inmobiliario único en Villa Urquiza que combina diseño moderno, ubicación privilegiada y amenidades de primer nivel.",
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
