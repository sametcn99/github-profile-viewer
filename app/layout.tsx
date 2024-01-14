import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import { Analytics } from "@vercel/analytics/react";
import "@radix-ui/themes/styles.css";
const inter = Inter({ subsets: ["latin"] });
import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: {
    template: "%s | GPV",
    default: "Github Profile Viewer",
  },
  description:
    "Explore GitHub and Gist profiles effortlessly, utilizing the GitHub REST API to retrieve comprehensive information",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  width: "device-width",
  initialScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head></head>
      <body
        className={`${inter.className} flex min-h-screen w-full justify-center px-1 transition-all duration-1000 md:px-4`}
      >
        <Theme
          appearance="dark"
          accentColor="gray"
          grayColor="slate"
          radius="large"
        >
          <main className=" flex w-full flex-col gap-4 p-2 pt-4 transition-all duration-1000 sm:w-[30rem] md:w-[40rem] lg:w-[60rem] xl:w-[70rem]">
            <Navbar />
            {children}
          </main>
          {/* <ThemePanel /> */}
        </Theme>
        <Analytics />
      </body>
    </html>
  );
}
