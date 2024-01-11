"use client";
import { useCallback, useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getSiteUrl } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export default function Readme(username: any) {
  const [content, setContent] = useState<string | undefined>();
  const [markdownContent, setMarkdownContent] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${getSiteUrl()}/api/github?option=readme&username=${
          username.username
        }`,
        {
          next: { revalidate: 3600 },
        },
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
  }, [username.username]);

  useEffect(() => {
    fetchData();
  }, [fetchData, username.username]);

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
      <Dialog>
        <DialogTrigger className="dialog-trigger">
          <span>Readme.md </span>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Followers</DialogTitle>
          </DialogHeader>
          <MarkdownPreview source={markdownContent} />
        </DialogContent>
      </Dialog>
    );
  } else {
    return null;
  }
}
