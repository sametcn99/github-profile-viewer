import React from "react";
import { useContext, useMemo, useState } from "react";
import { GithubContext } from "@/app/context/context";
import FilterInput from "../FilterInput";
import { Box, Button, Card, DropdownMenu, Link, Text } from "@radix-ui/themes";
import { FaGithub } from "react-icons/fa";
import { sortByKeyAscending, sortByKeyDescending } from "@/lib/utils/sort";
import { VList } from "virtua";
import Loading from "@/app/loading";
import { GitHubRepo } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setFilterValue: Dispatch<SetStateAction<string>>;
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}
export default function FilterGists({ setFilterValue, sort, setSort }: Props) {
  return (
    <Box className="flex flex-row gap-3">
      <FilterInput setFilterValue={setFilterValue} />
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="hover:cursor-pointer">
          <Button>Sort By</Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>Sort by</DropdownMenu.Label>
          <DropdownMenu.Separator />
          <DropdownMenu.RadioGroup value={sort} onValueChange={setSort}>
            <DropdownMenu.RadioItem value="Updated Descending">
              Updated Descending
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="Updated Ascending">
              Updated Ascending
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="Created Ascending">
              Created Ascending
            </DropdownMenu.RadioItem>
            <DropdownMenu.RadioItem value="Created Descending">
              Created Descending
            </DropdownMenu.RadioItem>
          </DropdownMenu.RadioGroup>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
}
