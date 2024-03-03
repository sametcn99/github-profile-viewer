import RenderPosts from "@/components/home/Blogs";
import Features from "@/components/home/Features";
import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <RenderPosts />
    </>
  );
}
