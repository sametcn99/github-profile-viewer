"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  User,
} from "@nextui-org/react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Loading from "@/app/loading";
import FilterDataBar from "./FilterDataBar";

export default function ModalComponent({
  title,
  username,
  url,
  modalTitle,
}: any) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [data, setData] = useState<any[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`${url}&page=${page}`);
      if (!response.ok) {
        throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
      }
      const fetchedData = await response.json();

      if (Array.isArray(fetchedData) && fetchedData.length > 0) {
        setData((prevData) => {
          const newData = Array.isArray(fetchedData)
            ? fetchedData
            : [fetchedData];
          return [...prevData, ...newData];
        });

        setIsLoaded(true);
        setPage(page + 1);
      }
    } catch (error) {
      console.error("Veri alınamadı:", error);
    }
  }, [url, page]);

  useEffect(() => {
    if (isOpen === true) {
      fetchData();
    } else {
      setFilterValue("");
    }
  }, [isOpen, url, username, page, fetchData]);

  const filteredData = data
    ? data.filter((project) =>
        project.login.toLowerCase().includes(filterValue.toLowerCase()),
      )
    : null;

  return (
    <div title={modalTitle}>
      <div
        onClick={onOpen}
        className="m-0 bg-transparent p-0 hover:cursor-pointer hover:underline"
      >
        {title}
      </div>
      <>
        {Array.isArray(filteredData) && (
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
                    <FilterDataBar setFilterValue={setFilterValue} />
                    {isLoaded ? (
                      <ul className="space-y-2">
                        {Array.isArray(filteredData) &&
                        filteredData?.length > 0 ? (
                          filteredData.map((item: any, index: number) => (
                            <li key={index}>
                              <Link href={`/${item.login}`}>
                                <User
                                  className="flex w-full items-center justify-start p-2 hover:bg-blue-950 hover:bg-opacity-30 dark:hover:bg-black dark:hover:bg-opacity-30"
                                  key={index}
                                  name={item.login}
                                  description={item.type}
                                  avatarProps={{
                                    src: `${item.avatar_url}`,
                                  }}
                                />
                              </Link>
                            </li>
                          ))
                        ) : (
                          <p>No matching data found.</p>
                        )}
                      </ul>
                    ) : (
                      <Loading />
                    )}
                  </ModalBody>
                </>
              )}
            </ModalContent>
          </Modal>
        )}
      </>
    </div>
  );
}
