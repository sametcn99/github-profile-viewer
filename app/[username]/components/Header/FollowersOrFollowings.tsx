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
  TextField,
} from "@radix-ui/themes";

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
        <Button className="hover:cursor-pointer">
          <Text>
            {option.charAt(0).toUpperCase()}
            {option.slice(1)}
          </Text>
          <Text className="">{count}</Text>
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Title>Users</Dialog.Title>
        <TextField.Root>
          <TextField.Input
            value={filter}
            type="search"
            placeholder="Filter by name"
            onChange={(e) => setFilter(e.target.value)}
          ></TextField.Input>
        </TextField.Root>
        <ScrollArea className="h-[35rem]">
          {Array.isArray(filteredData) && filteredData?.length > 0 ? (
            filteredData.map((item: UserData, index: number) => (
              <Link
                href={`/${item.login}`}
                key={index}
                className="flex flex-row items-center gap-2 rounded-2xl p-2 hover:bg-black hover:bg-opacity-50"
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
  );
}
