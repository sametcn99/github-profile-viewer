import Navbar from "@/components/Navbar";
import SearchBar from "@/components/Search";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 text-white md:py-10 break-words text-center">
        <h1 className="text-3xl font-bold">Github Profile Viewer</h1>
        <span className="max-w-[50rem] text-center text-gray-400 ">
          Welcome to the Github Profile Viewer, a dynamic web platform powered
          by Next.js and NextUI. Explore GitHub and Gist profiles effortlessly,
          utilizing the GitHub REST API to retrieve comprehensive information.
          Discover a user&apos;s coding journey and contributions to the
          open-source community.
        </span>
        <SearchBar />
      </section>
    </>
  );
}
