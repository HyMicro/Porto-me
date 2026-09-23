import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Neuton } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import BlindPullToggle from "@/components/ui/blind-pull-toggle";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const neuton = Neuton({
  weight: ["300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-neuton",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ahyad Izzuddin Syuhaiba | Game Developer, Programmer & UI/UX Designer",
  description: "Multidisciplinary digital creator bridging Unreal Engine 5 gameplay programming, system architecture (C++/Blueprint), and UI/UX design.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "dark h-full scroll-smooth antialiased",
        geistSans.variable,
        geistMono.variable,
        inter.variable,
        neuton.variable,
        "font-sans"
      )}
    >
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-x-hidden transition-colors duration-500"
      >
        <BlindPullToggle />
        {children}
      </body>
    </html>
  );
}

