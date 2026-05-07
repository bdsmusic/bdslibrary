import { Archivo, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap"
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap"
});

export const metadata = {
  title: "BDS Library | Music for Moving Images",
  description:
    "A brutalist contemporary music archive for advertising, film, branded content and sync.",
  metadataBase: new URL("https://bds-library.vercel.app")
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f4f1ea"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
