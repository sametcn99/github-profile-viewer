import RecommendedUsers from "@/components/RecommendedUsers";
import SearchBar from "@/components/Search";
import { Section, Text } from "@radix-ui/themes";

export default function Home() {
  return (
    <>
      <Section className="flex flex-col items-center justify-center gap-4 break-words  py-8 text-center md:py-10">
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
