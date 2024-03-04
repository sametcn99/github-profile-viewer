import MarkdownPreview from "@uiw/react-markdown-preview";
import { Box, Button, Dialog, Text } from "@radix-ui/themes";
import { FaReadme } from "react-icons/fa6";

// Define the props type for the Readme component
interface ReadmeProps {
  url: string;
  children: React.ReactNode;
}

const getData = async (url: string) => {
  try {
    const response = await fetch(url);
    // Check if the response is not OK and throw an error
    if (!response.ok) {
      console.log(`Failed to fetch README.md: ${url}`);
    }
    const text = await response.text();
    // Check if the content is not the GitHub 404 message
    if (text === "404: Not Found") {
      return null;
    }
    return text;
  } catch (err) {
    // Catch any network or other errors and set the error state
    console.error(err);
  }
};
// The Readme component fetches and displays the content of a README.md file from a provided URL.
export default async function Readme({ url, children }: ReadmeProps) {
  const data = await getData(url);

  // If content is available, render the Dialog with the README content
  return (
    <>
      {data && (
        <Dialog.Root>
          <Dialog.Trigger className="dialog-trigger">
            <Box>
              <FaReadme size={22} />
              {children}
            </Box>
          </Dialog.Trigger>
          <Dialog.Content>
            <Dialog.Title className="flex w-full flex-row justify-between">
              <Dialog.Close>
                <Box className="flex w-full flex-row items-center justify-between gap-3">
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
            <MarkdownPreview source={data || "No content available."} />
          </Dialog.Content>
        </Dialog.Root>
      )}
    </>
  );
}
