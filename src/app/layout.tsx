import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/motion/SmoothScroll";


// Body face for long-form paragraphs.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});


// Default sans for the whole site.
const gopher = localFont({
  src: [
    { path: "../../public/assets/fonts/Gopher-Regular.woff", weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/Gopher-Bold.woff", weight: "500", style: "normal" },
    { path: "../../public/assets/fonts/Gopher-Black.woff", weight: "900", style: "normal" },
  ],
  variable: "--font-gopher",
  display: "swap",
});


// Script display face used for flourish headings (e.g. "Welcome to").
const redondo = localFont({
  src: [
    { path: "../../public/assets/fonts/RedondoAve-Regular.woff", weight: "400", style: "normal" },
    { path: "../../public/assets/fonts/RedondoAve-Bold.woff", weight: "700", style: "normal" },
  ],
  variable: "--font-redondo",
  display: "swap",
});


// Condensed display face used for large outlined headings.
const sofia = localFont({
  src: "../../public/assets/fonts/SofiaSansCondensed-Regular.ttf",
  variable: "--font-sofia",
  display: "swap",
});


export const metadata: Metadata = {
  title: "Luxury Fire Island Homes",
  description: "The sandier side of New York.",
};


export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${gopher.variable} ${redondo.variable} ${sofia.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
