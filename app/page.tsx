import SearchBar from "@/components/search-bar";
import Link from "next/link";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <h1 className="text-3xl font-bold">Github Profile Viewer</h1>
      <span className=" max-w-[50rem] text-center text-gray-500">
        This website is a dynamic web platform created with Next.js and NextUI
        that allows users to effortlessly explore GitHub profiles. Harnessing
        the power of the GitHub API, our site seamlessly retrieves and displays
        comprehensive information about any GitHub user.
        <br />
        <span className="text-sm font-extralight">
          The display of projects and gists is limited to 100.(for now)
        </span>
      </span>
      <SearchBar />
    </section>
  );
}
