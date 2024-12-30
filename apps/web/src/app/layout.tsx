import type { ReactNode } from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bluesky Thingy",
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  fallback: [
    "ui-sans-serif",
    "system-ui",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
    "Noto Color Emoji",
  ],
});

interface RootLayoutProps {
  children: ReactNode;
  login: ReactNode;
}

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} dark antialiased`}>
      <body>
        <Providers>
          {props.children}
          {props.login}
        </Providers>
      </body>
    </html>
  );
}
