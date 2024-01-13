"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getSiteUrl } from "@/lib/utils";
import { Dialog } from "@radix-ui/themes";
import { GithubContext } from "@/app/context/context";

export default function Readme(username: any) {
  const [content, setContent] = useState<string | undefined>();
  const [markdownContent, setMarkdownContent] = useState("");
  const { repos, loading }: any = useContext(GithubContext);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `${getSiteUrl()}/api/github?option=readme&username=${
          username.username
        }`,
        {
          next: { revalidate: 3600 },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
      }

      const fetchedData = await response.json();
      setContent(fetchedData.data.download_url);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors as needed
    }
  };

  useEffect(() => {
    const findReadme = repos.reduce((foundRepo: any, repo: any) => {
      if (repo.name === username.username) {
        foundRepo = repo;
      }
      return foundRepo;
    }, null);

    if (findReadme) {
      console.log("readme file found");
      fetchData();
    } else {
      console.log("readme file not found");
    }
  }, [repos, username, username.username]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Add a null check for content
        if (content) {
          const response = await fetch(content);
          if (response.ok) {
            const data = await response.text();
            console.log(data);
            setMarkdownContent(data);
          } else {
            console.error("Failed to fetch content");
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };
    console.log(content);
    fetchData();
  }, [content]);

  if (markdownContent !== "") {
    return (
      <Dialog.Root>
        <Dialog.Trigger className="dialog-trigger">
          <span>Readme.md </span>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title>Readme.md</Dialog.Title>
          <MarkdownPreview source={markdownContent} />
        </Dialog.Content>
      </Dialog.Root>
    );
  } else {
    return null;
  }
}
