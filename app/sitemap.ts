import { getSiteUrl } from "@/lib/utils";
import { getSortedPostsData } from "@/lib/utils/blog/getPosts";
import { MetadataRoute } from "next";

/**
 * Generates a sitemap for the site by fetching all posts data and returning a sitemap object.
 * The sitemap contains the home page url, all post urls with change frequency and priority set.
 */
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
