"use client";
import { useEffect, useState } from "react"; // Import useState hook
import { useRouter } from "next/navigation";
import { getSiteUrl } from "@/lib/utils";
import { UserData } from "@/types/types";
import { Link, ScrollArea, TextField, Section, Avatar } from "@radix-ui/themes";
import RecommendedUsers from "./RecommendedUsers";

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
          `${getSiteUrl()}/api/github?option=search&username=${inputValue}`,
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
    <section className="static flex w-[15rem] flex-col items-center justify-center gap-5 md:w-[25rem] ">
      <TextField.Root size="1" className="w-full" aria-label="Search">
        <TextField.Input
          placeholder="Write user name"
          onKeyDown={handleKeyPress}
          onChange={handleChange}
        />
      </TextField.Root>
      {/* {data && data?.length > 0 ? (
        <ScrollArea type="always" scrollbars="vertical" style={{ height: 300 }}>
          {data.map((item: any, index: number) => (
            <Link
              href={`/${item.login}`}
              key={index}
              className="flex flex-row items-center rounded-3xl hover:bg-black hover:bg-opacity-50 gap-2 p-2 justify-start"
            >
              <Avatar
                size="3"
                fallback={item.login.charAt(0)}
                src={item.avatar_url || item.avatar_url}
              />
              <div className="flex flex-col text-start">
                <span className="text-xl font-bold"> {item.login}</span>
                <span> {item.type}</span>
              </div>
            </Link>
          ))}
        </ScrollArea>
      ) : (
        <RecommendedUsers/>
      )} */}
      <ScrollArea type="always" scrollbars="vertical" style={{ height: 400 }}>
        {data && data?.length > 0 ? (
          data.map((item: any, index: number) => (
            <Link
              href={`/${item.login}`}
              key={index}
              className="flex flex-row items-center justify-start gap-2 rounded-3xl p-2 hover:bg-black hover:bg-opacity-50"
            >
              <Avatar
                size="3"
                fallback={item.login.charAt(0)}
                src={item.avatar_url || item.avatar_url}
              />
              <div className="flex flex-col text-start">
                <span className="text-xl font-bold">{item.login}</span>
                <span>{item.type}</span>
              </div>
            </Link>
          ))
        ) : (
          <RecommendedUsers />
        )}
      </ScrollArea>
    </section>
  );
}
