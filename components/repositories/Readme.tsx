"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getSiteUrl } from "@/lib/utils";
import { Box, Dialog } from "@radix-ui/themes";
import { GithubContext } from "@/app/context/context";
import { FaReadme } from "react-icons/fa6";

export default function Readme(url: any) {
  const [content, setContent] = useState<string | undefined>();
  useEffect(() => {
    fetch(url.url)
      .then((response) => response.text())
      .then((text) => setContent(text));
  }, [url]);

  if (content !== "404: Not Found") {
    return (
      <Dialog.Root>
        <Dialog.Trigger className="dialog-trigger">
          <FaReadme size={22} />
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Readme.md</Dialog.Title>
          <MarkdownPreview source={content} />
        </Dialog.Content>
      </Dialog.Root>
    );
  } else {
    return null;
  }
}
