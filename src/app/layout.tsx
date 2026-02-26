import { Metadata } from "next";

import { Inter, Roboto, JetBrains_Mono, Tangerine } from "next/font/google";
import "./globals.css";

import LenisProvider from "../components/providers/LenisProvider";
import { tr } from "motion/react-client";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["300", "400", "500", "600", "700"],
});

const tangerine = Tangerine({
  subsets: ["latin"],
  variable: "--font-tangerine",
  weight: ["400", "700"]
});

export const metadata: Metadata = {
  title: {
    template: "%s | rsd.exe",
    default: "rsd.exe",
  },
  // metadataBase: new URL("'https://acme.com'"),
  description: "Portfolio of rsd.exe",
  keywords: ["rsd.exe", "portfolio", "web developer", "web designer", "full stack developer", "full stack designer", "sde aspirer", "sde aspirant", "ml engineer", "ml engineer aspirer", "ml engineer aspirant", "agentic ai engineer", "agentic ai engineer aspirer", "agentic ai engineer aspirant", "builder", "entrepreneur" ],
  authors: [
    {
      name: "Sudharshan R",
      url: "https://acme.com"
    },
  ],
  creator: "Sudharshan R",
  publisher: "Sudharshan R",
  category: "portfolio",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  appLinks: {
    web: {
      url: "/og-_web_image.png",
      should_fallback: true,
    }
  },
  twitter: {
    card: "summary_large_image",
    title: "rsd.exe",
    description: "Portfolio of rsd.exe",
    creator: "@SudharshanR",
    images: [
      {
        url: "/og-image.png",
        alt: "rsd.exe Logo",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    }
  },
  openGraph: {
    title: "rsd.exe",
    description: "Portfolio of rsd.exe",
    type: "website",
    locale: "en_US",
    siteName: "rsd.exe",
    images: [
      {
        url: "/og-image.png",
        alt: "rsd.exe Logo",
      },
    ],
  },
  icons: {
    // icon: [
    //   { url: '/icon.png' },
    //   new URL('/icon.png', 'https://example.com'),
    //   { url: '/icon-dark.png', media: '(prefers-color-scheme: dark)' },
    // ],
    // apple: [
    //   { url: '/apple-icon.png' },
    //   { url: '/apple-icon-x3.png', sizes: '180x180', type: 'image/png' },
    // ],
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`
          ${roboto.variable}
          ${inter.variable}
          ${jetbrainsMono.variable}
          ${tangerine.variable}
          antialiased
        `}
      >
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
