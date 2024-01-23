import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import React from "react";
import { Analytics } from "@vercel/analytics/react";
import "@radix-ui/themes/styles.css";
const inter = Inter({ subsets: ["latin"] });
import { Theme } from "@radix-ui/themes";
import Navbar from "../components/Navbar";
import { getSiteUrl } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    template: "%s | GPV",
    default: "Github Profile Viewer",
  },
  description:
    "Explore GitHub and Gist profiles effortlessly, utilizing the GitHub REST API to retrieve comprehensive information.",
  applicationName: "Github Profile Viewer",
  keywords: "github profile viewer, github stats, github profile",
  creator: "sametcn99",
  publisher: "sametcn99",
  robots: "index, follow",
  openGraph: {
    title: {
      template: "%s | GPV",
      default: "Github Profile Viewer",
    },
    description:
      "Explore GitHub and Gist profiles effortlessly, utilizing the GitHub REST API to retrieve comprehensive information.",
    type: "website",
    url: getSiteUrl(),
    images: ["/icons/icon512.png"],
    locale: "en_US",
    siteName: "Github Profile Viewer",
    emails: "sametcn99@gmail.com",
  },
  icons: {
    icon: "/icons/icon512.png",
    shortcut: "/icons/icon512.png",
    apple: "/icons/icon512.png",
    username: "sametcn99",
  },
  twitter: {
    site: "Github Profile Viewer",
    title: "Github Profile Viewer",
    description:
      "Explore GitHub and Gist profiles effortlessly, utilizing the GitHub REST API to retrieve comprehensive information.",
    card: "summary_large_image",
    images: ["/icons/icon512.png"],
    creator: "sametcn99",
    creatorId: "@sametcn99",
  },
};

export const viewport: Viewport = {
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
        <SpeedInsights />
      </body>
    </html>
  );
}
