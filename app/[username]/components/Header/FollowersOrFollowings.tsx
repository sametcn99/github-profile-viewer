"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { VList } from "virtua";
import { fetchContact, getSiteUrl } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types/types";
import { Input } from "@/components/ui/input";
import Loading from "@/app/loading";

export default function FollowersOrFollowings({ username, option }: any) {
  const [data, setData] = useState<UserData[]>([]);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repositoryData = await fetchContact(username, option);
        setData(repositoryData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
      }
    };
    fetchData();
  }, [option, username]); // Empty dependency array to run the effect only once

  const filteredData = data.filter((item: UserData) =>
    item.login.toLowerCase().includes(filter.toLowerCase())
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
