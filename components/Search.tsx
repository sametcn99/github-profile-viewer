"use client";
import { useEffect, useMemo, useState } from "react"; // Import useState hook
import { useRouter } from "next/navigation";
import { getSiteUrl } from "@/lib/utils";
import { UserData } from "@/types/types";
import {
  Link,
  ScrollArea,
  TextField,
  Avatar,
  Dialog,
  Button,
  Flex,
  Text,
  Box,
  DropdownMenu,
} from "@radix-ui/themes";
import { FaSearch } from "react-icons/fa";
import { debounce } from "lodash";
import { VList } from "virtua";

export default function SearchBar() {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState<UserData[] | []>([]);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const router = useRouter();

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter") {
      searchHandle();
    }
  };

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const searchHandle = () => {
    router.push(`/${inputValue}`);
  };

  const fetchData = debounce(async () => {
    if (inputValue.trim() === "") {
      setData([]);
      return;
    }
    try {
      const response = await fetch(
        `${getSiteUrl()}/api/github?option=search&username=${inputValue}`,
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status code: ${response.status}`);
      }
      const fetchedData = await response.json();
      setData(fetchedData.data.items);
    } catch (error) {
      console.error("Could not fetch data:", error);
    }
  }, 1000);

  useEffect(() => {
    fetchData();
    return () => {
      fetchData.cancel();
    };
  }, [fetchData, inputValue]);

  // Filtreleme işlevi
  const filteredData = useMemo(() => {
    return data.filter((item: UserData) => {
      const loginMatches = item.login
        .toLowerCase()
        .includes(inputValue.toLowerCase());
      if (selectedFilter === "All") {
        return loginMatches;
      } else {
        return (
          item.type.toLowerCase() === selectedFilter.toLowerCase() &&
          loginMatches
        );
      }
    });
  }, [data, inputValue, selectedFilter]);

  return (
    <Dialog.Root>
      <Dialog.Trigger className="hover:cursor-pointer">
        <Button>
          <FaSearch />
          Search
        </Button>
      </Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title className="flex w-full flex-row justify-between">
          <Dialog.Close>
            <Box className="flex w-full flex-row items-center justify-between gap-3">
              <Text>Search</Text>
              <Button
                variant="soft"
                color="gray"
                className="hover:cursor-pointer"
              >
                Close
              </Button>
            </Box>
          </Dialog.Close>
        </Dialog.Title>

        <Flex gap="3" mt="4" justify="end"></Flex>
        <section className="static flex w-[15rem] flex-col items-center justify-center gap-5 md:w-[25rem] ">
          <Box className="flex w-full flex-row items-center justify-between gap-3">
            <TextField.Root size="3" className="w-full" aria-label="Search">
              <TextField.Input
                placeholder="Write user name"
                onKeyDown={handleKeyPress}
                onChange={handleChange}
              />
            </TextField.Root>
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
                  <DropdownMenu.RadioItem value="All">
                    All
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="User">
                    User
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="Organization">
                    Organization
                  </DropdownMenu.RadioItem>
                </DropdownMenu.RadioGroup>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
          <VList style={{ height: 400 }}>
            {data &&
              data?.length > 0 &&
              filteredData.map((item: any, index: number) => (
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
              ))}
          </VList>
        </section>
      </Dialog.Content>
    </Dialog.Root>
  );
}
