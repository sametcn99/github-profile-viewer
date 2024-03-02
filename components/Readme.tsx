"use client";
import { useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Box, Button, Dialog, Text } from "@radix-ui/themes";
import { FaReadme } from "react-icons/fa6";

// Define the props type for the Readme component
interface ReadmeProps {
  url: string;
  children: React.ReactNode;
}

// The Readme component fetches and displays the content of a README.md file from a provided URL.
export default function Readme({ url, children }: ReadmeProps) {
  // State to hold the content of the README file
  const [content, setContent] = useState<string | null>(null);
  // State to track if there was an error fetching the README file
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    // Function to fetch the README content
    const fetchReadme = async () => {
      try {
        const response = await fetch(url);
        // Check if the response is not OK and throw an error
        if (!response.ok) {
          console.log(`Failed to fetch README.md: ${url}`);
        }
        const text = await response.text();
        // Check if the content is not the GitHub 404 message
        text === "404: Not Found" ? setError(true) : setContent(text);
      } catch (err) {
        // Catch any network or other errors and set the error state
        console.error(err);
        setError(true);
      }
    };

    // Call the fetch function
    fetchReadme();
  }, [url]);

  // If there was an error, return null to render nothing
  if (error) {
    return null;
  }

  // If content is available, render the Dialog with the README content
  return (
    <>
      {!error && content && (
        <Dialog.Root>
          <Dialog.Trigger className="dialog-trigger">
            <Box>
              <FaReadme size={22} />
              {children}
            </Box>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title className="flex flex-row justify-between w-full">
              <Dialog.Close>
                <Box className="flex flex-row items-center justify-between w-full gap-3">
                  <Text>README.md</Text>
                  <Button
                    variant="soft"
                    color="gray"
                    className="hover:cursor-pointer"
                  >
                    Close
                  </Button>
                </Box>
              </Dialog.Close>
            </Dialog.Title>
            {/* Use MarkdownPreview to render the markdown content */}
            <MarkdownPreview source={content || "No content available."} />
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
}
