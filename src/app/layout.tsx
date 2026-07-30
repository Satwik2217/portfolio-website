import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Satwik Mishra — Full-Stack Developer & AI Engineer",
  description:
    "Satwik Mishra is a computer science student and developer building full-stack applications, AI systems, and interactive web experiences.",
  openGraph: {
    title: "Satwik Mishra — Full-Stack Developer & AI Engineer",
    description:
      "Satwik Mishra is a computer science student and developer building full-stack applications, AI systems, and interactive web experiences.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Satwik Mishra — Full-Stack Developer & AI Engineer",
    description:
      "Satwik Mishra is a computer science student and developer building full-stack applications, AI systems, and interactive web experiences.",
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="overflow-x-hidden antialiased">{children}</body>
    </html>
  );
}
