"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getSiteUrl } from "@/utils/utils";

export default function RateCard({ username, url, modalTitle }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${getSiteUrl()}/api/rate`, {
          cache: "no-store",
        });
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (fetchedData.error) {
          console.log(fetchedData.error);
        }
        setData(fetchedData);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };
    fetchData();
  }, [url, username]);
  return (
    <div title={modalTitle}>
      <div
        onClick={onOpen}
        className="m-0  bg-transparent p-0 hover:cursor-pointer"
      >
        API Status
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        backdrop="opaque"
        size="sm"
        placement="center"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                API Rate
              </ModalHeader>
              <ModalBody className="select-text">
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
