"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { VList } from "virtua";
import { getSiteUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types/types";
import { Input } from "@/components/ui/input";
import Loading from "@/app/loading";

export default function FollowersOrFollowings({ username, option }: any) {
  const [data, setData] = useState<UserData[]>([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>("");
  const url = `${getSiteUrl()}/api/github?username=${username}&option=${option}&page=${page}`;
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status code: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (fetchedData.data.length > 0) setPage((prev) => prev + 1);
        if (data.length > 0) {
          setData((prevData) => [...prevData, ...fetchedData.data]);
        } else if (data.length === 0) {
          setData(fetchedData.data);
        }
        if (fetchedData.data.length === 0) {
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setLoading(false);
      }
    };
    fetchData();
    console.log(`Data length: ${data.length}\n Page: ${page}`);
  }, [username, page, url, data.length]);

  const filteredData = data.filter((item: UserData) =>
    item.login.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <>
      <Input
        aria-label="Search"
        placeholder="Filter by name"
        type="search"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <VList style={{ height: "50vh" }}>
        {loading && (
          <div className="flex w-full items-center justify-center">
            <Loading />
          </div>
        )}
        {Array.isArray(filteredData) && filteredData?.length > 0 ? (
          filteredData.map((item: UserData, index: number) => (
            <Link
              href={`/${item.login}`}
              key={index}
              className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-purple-950 "
            >
              <Avatar>
                <AvatarImage src={item.avatar_url || item.avatar_url} />
                <AvatarFallback>{item.login.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-xl font-bold"> {item.login}</span>
                <span> {item.type}</span>
              </div>
            </Link>
          ))
        ) : (
          <p>No matching data found.</p>
        )}
      </VList>
    </>
  );
}
