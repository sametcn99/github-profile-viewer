"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchContact } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserData } from "@/types/types";
import { Input } from "@/components/ui/input";
import Loading from "@/app/loading";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function FollowersOrFollowings({
  username,
  option,
  count,
}: {
  username: string;
  option: string;
  count: number;
}) {
  const [data, setData] = useState<UserData[]>([]);
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
    <Dialog>
      <DialogTrigger className="dialog-trigger">
        <span>
          {option.charAt(0).toUpperCase()}
          {option.slice(1)}
        </span>
        <span className="">{count}</span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Followings</DialogTitle>
        </DialogHeader>
        <Input
          aria-label="Search"
          placeholder="Filter by name"
          type="search"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {loading && (
          <div className="flex w-full items-center justify-center">
            <Loading />
          </div>
        )}
        <ScrollArea className="h-[35rem] w-full rounded-2xl border p-4">
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
                  <div className="text-xl font-bold"> {item.login}</div>
                  <div> {item.type}</div>
                </div>
              </Link>
            ))
          ) : (
            <div>No matching data found.</div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
