import { Heading, Section, Text } from "@radix-ui/themes";
import ChromeStore from "./ChromeStore";

export default function Hero() {
  return (
    <Section className="flex flex-col items-center justify-center gap-4 text-center ">
      <Heading
        size="9"
        className="bg-gradient-to-r from-blue-600 via-green-600 to-purple-600 bg-clip-text text-transparent"
      >
        Github Profile Viewer
      </Heading>
      <Text className="max-w-[50rem]">
        GitHub Profile Viewer provides comprehensive statistics of GitHub
        profiles, showcasing a user&apos;s coding journey and contributions to
        the open-source community. Powered by Next.js and Radix UI, this dynamic
        web platform utilizes the GitHub REST API to effortlessly retrieve and
        display information on GitHub and Gist profiles.
      </Text>
      <ChromeStore />
    </Section>
  );
}
