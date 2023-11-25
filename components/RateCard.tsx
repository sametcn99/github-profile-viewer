"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { getSiteUrl } from "@/utils/utils";

export default function RateCard({ title, username, url, modalTitle }: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<[] | null>(null);

  //   // Function to traverse the object and format all "reset" fields
  //   const formatAllResets = (obj: any) => {
  //     for (const key in obj) {
  //       if (typeof obj[key] === "object" && obj[key] !== null) {
  //         formatAllResets(obj[key]);
  //       } else if (key === "reset" && typeof obj[key] === "number") {
  //         obj[key] = new Date(obj[key] * 1000).toISOString();
  //       }
  //     }
  //   };

  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${getSiteUrl()}/api/rate`);
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (fetchedData.error) {
          console.log(fetchedData.error);
        }
        //formatAllResets(fetchedData);
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
