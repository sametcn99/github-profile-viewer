import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Github Profile Viewer",
    short_name: "Github Profile Viewer",
    dir: "auto",
    description:
      "Explore GitHub and Gist profile statistics effortlessly, utilizing the GitHub REST API to retrieve comprehensive information.",
    categories: ["personal"],
    theme_color: "#000000",
    background_color: "#000000",
    display: "standalone",
    scope: "/",
    lang: "en_US",
    start_url: "/",
    orientation: "portrait",
    icons: [
      {
        src: "/icons/icon300.png",
        sizes: "300x300",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon300.png",
        sizes: "300x300",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icons/icon512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
