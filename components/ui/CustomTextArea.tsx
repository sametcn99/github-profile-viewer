import { Link, Text } from "@radix-ui/themes";
import { isGithubProfile, isUrl } from "@/lib/utils";
import { MdOutlineWorkOutline } from "react-icons/md";
import React from "react";

export default function CustomTextArea({
  text,
  logo,
}: {
  text: string;
  logo: React.ReactElement;
}) {
  return (
    <Text className="flex flex-row flex-wrap items-center gap-1 overflow-hidden break-words text-base font-normal md:break-normal">
      {logo}
      {text.split(" ").map((word, index) => {
        const url = word.trim();
        const isUrlWord = isUrl(url);
        const isGithubProfileWord = isGithubProfile(url);

        if (isUrlWord || isGithubProfileWord) {
          return (
            <Link
              key={index}
              href={
                isUrlWord
                  ? url
                  : `https://githubprofileviewer.com/${url.replace(/[^a-zA-Z0-9-]/g, "")}`
              }
              target="_blank"
            >
              {url}{" "}
            </Link>
          );
        } else {
          return <Text key={index}>{word} </Text>;
        }
      })}
    </Text>
  );
}
