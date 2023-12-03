import { getSiteUrl } from "@/utils/utils";
import { useCallback, useEffect, useState } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import Loading from "@/app/loading";

export default function Readme(username: any) {
  const [content, setContent] = useState<string | undefined>();
  const [markdownContent, setMarkdownContent] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isLoaded, setIsLoaded] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `${getSiteUrl()}/api/readme?username=${username.username}`,
        {
          next: { revalidate: 3600 },
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
      }

      const fetchedData = await response.json();
      setContent(fetchedData.download_url);
      console.log(fetchedData.download_url);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors as needed
    }
  }, [username.username]);

  useEffect(() => {
    fetchData();
  }, [username.username]);

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
            setIsLoaded(true);
          } else {
            console.error("Failed to fetch content");
          }
        }
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchData();
  }, [content]);

  if (markdownContent !== "") {
    return (
      <div title={"Readme.md"}>
        <div
          onClick={onOpen}
          className="
          flex flex-col items-start justify-center rounded-lg bg-slate-100 p-2 
          transition-colors
          hover:cursor-pointer hover:bg-slate-200 dark:bg-zinc-900 hover:dark:bg-zinc-950"
        >
          <div>README.MD</div>
        </div>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          backdrop="opaque"
          size="5xl"
          placement="center"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Readme.md
                </ModalHeader>
                <ModalBody>
                  {isLoaded ? (
                    <>
                      <MarkdownPreview source={markdownContent} />
                    </>
                  ) : (
                    <Loading />
                  )}
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
    );
  }
}
