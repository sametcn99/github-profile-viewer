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

export default function ModalComponent({
  title,
  username,
  url,
  modalTitle,
}: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<[] | null>(null);
  const [error, setError] = useState<string | null>(null); // New state for error message
  const [isLoading, setIsLoading] = useState(true);
  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${url}`);
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (fetchedData.error) {
          // If there is an error in the data, set the error state
          setError(fetchedData.error);
        }
        setData(fetchedData);
        setIsLoading(false);
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
        {title}
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
                {modalTitle}
              </ModalHeader>
              <ModalBody>
                <ul className="space-y-2">
                  {Array.isArray(data) &&
                    data.map((item: any, index: number) => (
                      <li key={index}>
                        <Link href={`/${item.login}`}>
                          <User
                            key={index}
                            name={item.login}
                            description={item.type}
                            avatarProps={{
                              src: `${item.avatar_url}`,
                            }}
                          />
                        </Link>
                      </li>
                    ))}
                </ul>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
