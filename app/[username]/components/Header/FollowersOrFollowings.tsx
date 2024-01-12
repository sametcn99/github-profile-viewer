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
import Loading from "@/app/loading";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedFilter, setSelectedFilter] = useState("All");

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

  const filteredData = data.filter((item: UserData) => {
    const loginMatches = item.login
      .toLowerCase()
      .includes(filter.toLowerCase());

    // Additional filtering based on the selected filter type
    if (selectedFilter === "All") {
      return loginMatches;
    } else {
      return (
        item.type.toLowerCase() === selectedFilter.toLowerCase() && loginMatches
      );
    }
  });
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
        {loading && <Loading />}
        <TextField.Root>
          <TextField.Input
            value={filter}
            type="search"
            placeholder="Filter by name"
            onChange={(e) => setFilter(e.target.value)}
          ></TextField.Input>
          <Select onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-[8rem] rounded-lg">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Filter</SelectLabel>
                <SelectItem
                  value="All"
                  className="hover:bg-black hover:bg-opacity-50 hover:cursor-pointer"
                >
                  All
                </SelectItem>
                <SelectItem
                  value="User"
                  className="hover:bg-black hover:bg-opacity-50 hover:cursor-pointer"
                >
                  User
                </SelectItem>
                <SelectItem
                  value="Organization"
                  className="hover:bg-black hover:bg-opacity-50 hover:cursor-pointer"
                >
                  Organization
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
            <>{!loading && <Text>No matching data found.</Text>}</>
          )}
        </ScrollArea>
      </Dialog.Content>
    </Dialog.Root>
  );
}
