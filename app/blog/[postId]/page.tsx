import { notFound } from "next/navigation"; // Importing the function to show the "not found" page
import { getPostData, getSortedPostsData } from "@/lib/utils/blog/getPosts";
import { Card } from "@radix-ui/themes";
import getFormattedDate from "@/lib/utils";
import "./styles.css";
import { Metadata } from "next";

// Function to generate static page parameters
export function generateStaticParams() {
  const posts = getSortedPostsData(); // Getting sorted post data
  return posts.map((post) => ({
    postId: post.id, // Using the post's ID as a parameter
  }));
}

// Function to generate page metadata
export async function generateMetadata({
  params,
}: {
  params: { postId: string };
}): Promise<Metadata> {
  const posts = getSortedPostsData(); // Getting sorted post data
  const { postId } = params; // Extracting the post ID from parameters

  const post = posts.find((post) => post.id === postId); // Finding the post with the given ID

  if (!post) {
    return {
      title: "Post Not Found", // Using "Post Not Found" as the title if the post is not found
      description: "This post does not exist.", // Add a description for SEO
      keywords: [], // Add an empty tags array to avoid errors
    };
  }

  return {
    title: post.title, // Using the post's title as the title
    description: post.description,
    keywords: post.keywords, // Using the post's tags as the tags
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
    },
  };
}

// Main function to create the post page
export default async function Post({ params }: { params: { postId: string } }) {
  const posts = getSortedPostsData(); // Getting sorted post data
  const { postId } = params; // Extracting the post ID from parameters
  const page = posts.find((post) => post.id === postId); // Finding the post with the given ID
  if (!page) notFound(); // Displaying a 404 error if the post is not found
  const { title, date, contentHtml, author, keywords } =
    await getPostData(postId); // Fetching post data

  const pubDate = getFormattedDate(date); // Getting a formatted version of the date

  return (
    <div className="mt-10 flex min-h-screen w-full justify-center px-2">
      <Card>
        <article>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="font-thin">
            {pubDate} / Author: {author}
          </p>
          <article
            dangerouslySetInnerHTML={{ __html: contentHtml }}
            className="article"
          />
        </article>
      </Card>
    </div>
  );
}
