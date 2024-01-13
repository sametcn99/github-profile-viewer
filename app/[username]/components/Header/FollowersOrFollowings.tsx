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
  DropdownMenu,
  ScrollArea,
  Text,
  TextField,
} from "@radix-ui/themes";
import Loading from "@/app/loading";

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
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      try {
        console.log(`Fetching ${username}'s ${option}...`);
        const repositoryData = await fetchContact(username, option, signal);
        setData(repositoryData);
        setLoading(false);
        console.log(
          `${username}'s ${option} fetched successfully.\n${repositoryData}`
        );
      } catch (error) {
        if (error === "AbortError") {
          // Request was aborted
          console.log("Fetch operation was aborted");
        } else {
          console.error("Error fetching data:", error);
          // Handle the error as needed
        }
      }
    };

    if (dialogOpen && data.length === 0) {
      fetchData();
    }

    return () => {
      // Cleanup function to abort the ongoing operation
      abortController.abort();
    };
  }, [dialogOpen, data.length, option, username]);

  const filteredData = data.filter((item: UserData) => {
    const loginMatches = item.login
      .toLowerCase()
      .includes(filter.toLowerCase());

    if (selectedFilter === "All") {
      return loginMatches;
    } else {
      console.log("Selected Filter:", selectedFilter);
      console.log("Item Type:", item.type.toLowerCase());
      console.log("Login Matches:", loginMatches);

      return (
        item.type.toLowerCase() === selectedFilter.toLowerCase() && loginMatches
      );
    }
  });

  return (
    <Dialog.Root open={dialogOpen} onOpenChange={setDialogOpen}>
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
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button className="hover:cursor-pointer">Filter By</Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              <DropdownMenu.Label>Filter By</DropdownMenu.Label>
              <DropdownMenu.Separator />
              <DropdownMenu.RadioGroup
                value={selectedFilter}
                onValueChange={setSelectedFilter}
              >
                <DropdownMenu.RadioItem value="All">All</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="User">
                  User
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Organization">
                  Organization
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
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
