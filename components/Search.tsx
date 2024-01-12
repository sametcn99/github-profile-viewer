"use client";
import { useEffect, useState } from "react"; // Import useState hook
import { useRouter } from "next/navigation";
import { getSiteUrl } from "@/lib/utils";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { UserData } from "@/types/types";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<UserData[] | []>([]);
  const router = useRouter();

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      seachHandle();
    }
  };
  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const seachHandle = () => {
    router.push(`/${inputValue}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getSiteUrl()}/api/github?option=search&username=${inputValue}`
        );
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        setData(fetchedData.data.items);
        console.log(fetchedData.data.items);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };
    fetchData();
  }, [inputValue]);

  return (
    <section className="flex md:w-[25rem] flex-col items-center justify-center gap-5">
      <Input
        aria-label="Search"
        placeholder="write user name..."
        type="search"
        onKeyDown={handleKeyPress}
        onChange={handleChange}
        value={inputValue}
      />
      <div className="w-full">
        {data && data?.length > 0 ? (
          <>
            {data.map((item: any, index: number) => (
              <Link
                href={`/${item.login}`}
                key={index}
                className="flex flex-row items-start gap-2 rounded-2xl p-2 hover:bg-purple-950"
              >
                <Avatar>
                  <AvatarImage src={item.avatar_url || item.avatar_url} />
                  <AvatarFallback>{item.login.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col text-start">
                  <span className="text-xl font-bold"> {item.login}</span>
                  <span> {item.type}</span>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </section>
  );
}
