import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Github Profile Viewer",
    short_name: "GPV",
    dir: "auto",
    description:
      "This website is a dynamic web platform created with Next.js and NextUI that allows users to effortlessly explore GitHub profiles.",
    categories: ["personal project"],
    theme_color: "#2196f3",
    background_color: "#2196f3",
    display: "standalone",
    scope: "/",
    lang: "en-US",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/favicon.png",
        sizes: "300x300",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/favicon.png",
        sizes: "300x300",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512x512.png", // Add a new icon with 512x512 pixels
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
