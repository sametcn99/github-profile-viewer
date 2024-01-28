import { Section, Text } from "@radix-ui/themes";
import Rate from "../components/Rate";
import Link from "next/link";
import Image from "next/image";
import { Search } from "lucide-react";
import SearchBar from "@/components/Search";

export default function Home() {
  return (
    <>
      <Section className="flex flex-col items-center justify-center gap-4 break-words py-8 text-center md:py-10">
        <Text className="text-3xl font-bold">Github Profile Viewer</Text>
        <Text className="max-w-[50rem]">
          GitHub Profile Viewer provides comprehensive statistics of GitHub
          profiles, showcasing a user&apos;s coding journey and contributions to
          the open-source community. Powered by Next.js and Radix UI, this
          dynamic web platform utilizes the GitHub REST API to effortlessly
          retrieve and display information on GitHub and Gist profiles.
        </Text>
        <Rate />
        <Link
          href="https://chromewebstore.google.com/detail/gpv-opener/abgechjdbcnlcdcmhkaakobeoimjgkmb"
          target="_blank"
        >
          <Image
            width={180}
            height={40}
            src="/icons/chrome-extension-dark.png"
            alt="GPV Opener"
            className="shadow-md shadow-gray-700 transition-all duration-500 hover:scale-105"
            fetchPriority="high"
          />
        </Link>
      </Section>
    </>
  );
}
