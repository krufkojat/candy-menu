import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import "./globals.scss";
import React from "react";
import Providers from "@/components/providers/Providers";
import clsx from "clsx";

const lexend = Lexend({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Candy Menu",
  description:
    "Candy Menu - aplikacja do tworzenia interaktywnego menu restauracji online.",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => (
  <html lang="pl">
    <body className={clsx("bg-slate-50", lexend.className)}>
      <Providers>{children}</Providers>
    </body>
  </html>
);

export default RootLayout;
