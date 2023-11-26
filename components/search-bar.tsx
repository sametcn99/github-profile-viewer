"use client";
import { SearchIcon } from "@/components/icons";
import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react"; // Import useState hook
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { getSiteUrl } from "@/utils/utils";
import SearchCard from "./search-card";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<[] | null>(null);
  const router = useRouter();

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      seachHandle();
    }
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleSearchClick = () => {
    seachHandle();
  };

  const seachHandle = () => {
    router.push(`/${inputValue}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getSiteUrl()}/api/search?username=${inputValue}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };
    fetchData();
  }, [inputValue]);

  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <Input
        aria-label="Search"
        classNames={{
          inputWrapper: "bg-default-100 w-[20rem]",
          input: "text-sm",
        }}
        endContent={
          <SearchIcon className="pointer-events-none flex-shrink-0 text-base text-default-400" />
        }
        labelPlacement="outside"
        placeholder="write user name..."
        type="search"
        onKeyPress={handleKeyPress}
        onChange={handleChange}
        value={inputValue}
      />
      {data && <SearchCard data={data} />}
      <Button className="ml-2 w-9" onClick={handleSearchClick}>
        Search
      </Button>
    </section>
  );
}
