"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchContact } from "@/lib/utils";
import { UserData } from "@/types/types";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  ScrollArea,
  Text,
} from "@radix-ui/themes";
import { AvatarImage } from "@radix-ui/react-avatar";

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
    <Dialog.Root>
      <Dialog.Trigger>
        <Button>
          <Text>
            {option.charAt(0).toUpperCase()}
            {option.slice(1)}
          </Text>
          <Text className="">{count}</Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Users</Dialog.Title>
        <ScrollArea className="h-[35rem] w-full rounded-2xl p-4">
          {Array.isArray(filteredData) && filteredData?.length > 0 ? (
            filteredData.map((item: UserData, index: number) => (
              <Link
                href={`/${item.login}`}
                key={index}
                className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-black hover:bg-opacity-50 "
              >
                <Avatar
                  fallback={item.login.charAt(0)}
                  src={item.avatar_url || item.avatar_url}
                />
                <Box className="flex flex-col">
                  <Text className="text-xl font-bold"> {item.login}</Text>
                  <Text> {item.type}</Text>
                </Box>
              </Link>
            ))
          ) : (
            <Text>No matching data found.</Text>
          )}
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
    // <Dialog>
    //   <DialogTrigger className="dialog-trigger">
    //     <span>
    //       {option.charAt(0).toUpperCase()}
    //       {option.slice(1)}
    //     </span>
    //     <span className="">{count}</span>
    //   </DialogTrigger>
    //   <DialogContent>
    //     <DialogHeader>
    //       <DialogTitle>{option.charAt(0).toUpperCase()}</DialogTitle>
    //     </DialogHeader>
    //     <Input
    //       aria-label="Search"
    //       placeholder="Filter by name"
    //       type="search"
    //       value={filter}
    //       onChange={(e) => setFilter(e.target.value)}
    //     />
    //     {loading && (
    //       <div className="flex w-full items-center justify-center">
    //         <Loading />
    //       </div>
    //     )}
    //     <ScrollArea className="h-[35rem] w-full rounded-2xl border p-4">
    //       {Array.isArray(filteredData) && filteredData?.length > 0 ? (
    //         filteredData.map((item: UserData, index: number) => (
    //           <Link
    //             href={`/${item.login}`}
    //             key={index}
    //             className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-purple-950 "
    //           >
    //             <Avatar>
    //               <AvatarImage src={item.avatar_url || item.avatar_url} />
    //               <AvatarFallback>{item.login.charAt(0)}</AvatarFallback>
    //             </Avatar>
    //             <div className="flex flex-col">
    //               <div className="text-xl font-bold"> {item.login}</div>
    //               <div> {item.type}</div>
    //             </div>
    //           </Link>
    //         ))
    //       ) : (
    //         <div>No matching data found.</div>
    //       )}
    //     </ScrollArea>
    //   </DialogContent>
    // </Dialog>
  );
}
