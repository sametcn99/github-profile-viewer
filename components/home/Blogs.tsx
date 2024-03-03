import { getSortedPostsData } from "@/lib/utils/blog/getPosts";
import PostCard from "./post-card";
import { Heading } from "@radix-ui/themes";

// Define and export the 'RenderPosts' component
export default function RenderPosts() {
  const posts = getSortedPostsData(); // Call the getSortedPostsData function to retrieve the sorted posts data.

  // Render each post as a 'PostCard' component separated by a 'Divider'
  return (
    <section className="flex flex-col gap-4">
      <Heading as="h2" size="4" className="mb-4">
        Read more about GPV
      </Heading>
      {posts.map((post: BlogPost, index: number) => (
        <div key={`${index}-post`}>
          <PostCard post={post} key={`${index}-post-card`} />
        </div>
      ))}
    </section>
  );
}
