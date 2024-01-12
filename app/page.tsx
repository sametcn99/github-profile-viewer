import Navbar from "@/components/Navbar";
import SearchBar from "@/components/Search";
import { Section, Text } from "@radix-ui/themes";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Section className="flex flex-col items-center justify-center gap-4 py-8  md:py-10 break-words text-center">
        <Text className="text-3xl font-bold">Github Profile Viewer</Text>
        <Text className="max-w-[50rem]">
          Welcome to the Github Profile Viewer, a dynamic web platform powered
          by Next.js and NextUI. Explore GitHub and Gist profiles effortlessly,
          utilizing the GitHub REST API to retrieve comprehensive information.
          Discover a user&apos;s coding journey and contributions to the
          open-source community.
        </Text>
        <SearchBar />
      </Section>
    </>
  );
}
