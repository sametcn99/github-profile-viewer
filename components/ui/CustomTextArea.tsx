import React from "react";
import { Link, Text } from "@radix-ui/themes";
import { checkEmail, isGithubProfile, isUrl } from "@/lib/utils";

export default function CustomTextArea({
  text,
  logo,
}: {
  text: string;
  logo: React.ReactElement;
}) {
  // Split the text into words for processing
  const words = text.split(" ");

  return (
    <Text className="flex flex-row flex-wrap items-center gap-1 overflow-hidden break-words text-base font-normal md:break-normal">
      {logo}
      {words.map((word, index) => {
        const trimmedWord = word.trim();
        const isUrlWord = isUrl(trimmedWord);
        const isGithubProfileWord = isGithubProfile(trimmedWord);
        const isEmail = checkEmail(trimmedWord);

        if (isEmail) {
          // Render a mailto link for email addresses
          return (
            <Link key={index} href={`mailto:${trimmedWord}`} target="_blank">
              {trimmedWord}{" "}
            </Link>
          );
        }

        if (isUrlWord || isGithubProfileWord) {
          // Render a link for URLs or GitHub profiles
          const linkHref = isUrlWord
            ? trimmedWord
            : `https://githubprofileviewer.com/${trimmedWord.replace(/[^a-zA-Z0-9-]/g, "")}`;

          return (
            <Link key={index} href={linkHref} target="_blank">
              {trimmedWord}{" "}
            </Link>
          );
        } else {
          // Render plain text for non-special words
          return <Text key={index}>{word} </Text>;
        }
      })}
    </Text>
  );
}
