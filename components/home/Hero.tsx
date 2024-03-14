import { Heading, Section, Text } from "@radix-ui/themes";
import ChromeStore from "./ChromeStore";
import Image from "next/image";

export default function Hero() {
  return (
    <Section
      className="flex flex-col items-center justify-center gap-4 text-center"
      id="hero"
    >
      <Heading size="9" className="animated-header">
        Github Profile Viewer
      </Heading>
      <Text className="max-w-[50rem]">
        Explore GitHub and Gist profiles effortlessly, utilizing the GitHub REST
        API to retrieve comprehensive information.
      </Text>
      <ChromeStore />
      <Image
        src="/icons/octocat.png"
        alt="octocat"
        width={350}
        height={350}
        className="absolute left-0 -z-10 hidden lg:block"
      />
    </Section>
  );
}
