import { getSiteUrl } from "@/lib/utils";
import { getSortedPostsData } from "@/lib/utils/blog/getPosts";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = getSortedPostsData();

  return [
    {
      url: "https://www.githubprofileviewer.com/",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...posts.map((post: BlogPost) => ({
      url: `${getSiteUrl()}/blog/${post.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as
        | "monthly"
        | "always"
        | "hourly"
        | "daily"
        | "weekly"
        | "yearly"
        | "never",
      priority: 1,
    })),
  ];
}
