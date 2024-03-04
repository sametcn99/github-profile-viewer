import { Heading, Section, Text } from "@radix-ui/themes";
import ChromeStore from "./ChromeStore";

export default function Hero() {
  return (
    <Section
      className="flex flex-col items-center justify-center gap-4 text-center"
      id="hero"
    >
      <Heading
        size="9"
        className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent"
      >
        Github Profile Viewer
      </Heading>
      <Text className="max-w-[50rem]">
        Explore GitHub and Gist profiles effortlessly, utilizing the GitHub REST
        API to retrieve comprehensive information.
      </Text>
      <ChromeStore />
    </Section>
  );
}
