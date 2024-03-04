import { getSortedPostsData } from "@/lib/utils/blog/getPosts";
import PostCard from "./post-card";
import { Heading, Separator } from "@radix-ui/themes";
import React from "react";

// Define and export the 'RenderPosts' component
export default function RenderPosts() {
  const posts = getSortedPostsData(); // Call the getSortedPostsData function to retrieve the sorted posts data.

  // Render each post as a 'PostCard' component separated by a 'Divider'
  return (
    <section className="flex w-full flex-col gap-4" id="blog-posts">
      <Heading as="h2" size="4" className="mb-4">
        Read more about GPV
      </Heading>
      {posts.map((post: BlogPost, index: number) => (
        <React.Fragment key={index}>
          <PostCard post={post} key={`${index}-post-card`} />
          <Separator size="4" key={`${index}-separator`} />
        </React.Fragment>
      ))}
    </section>
  );
}
