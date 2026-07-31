import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Bangers } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
  preload: false,
});

const bangers = Bangers({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bangers",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  title: "Satwik Mishra — Friendly Neighborhood Developer",
  description:
    "Satwik Mishra is a computer science student and full-stack developer building AI systems, web applications, and interactive experiences.",
  openGraph: {
    title: "Satwik Mishra — Friendly Neighborhood Developer",
    description:
      "Computer Science student. Full-Stack Developer. AI Enthusiast. Explore the missions, powers and hero log of Satwik Mishra.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satwik Mishra — Friendly Neighborhood Developer",
    description:
      "Computer Science student. Full-Stack Developer. AI Enthusiast.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} ${bangers.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
      </head>
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
