"use client";
import { useContext, useMemo, useState } from "react";

import { BsFillStarFill } from "react-icons/bs";
import { FaCodeFork } from "react-icons/fa6";
import { GithubContext } from "@/app/context/context";
import FilterInput from "./FilterInput";
import Loading from "@/app/loading";
import { formatNumber } from "@/lib/utils";
import {
  Box,
  Button,
  Card,
  DropdownMenu,
  Link,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { sortByKeyAscending, sortByKeyDescending } from "@/lib/utils/sort";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export default function Projects() {
  const { repos, loading }: any = useContext(GithubContext);
  const [sort, setSort] = useState("Stars Descending");
  const [filterValue, setFilterValue] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(""); // Add state for selected topic
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Handle topic click to filter
  // Handle topic click to filter
  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
    // Reset filter if the same topic is clicked again
    if (topic === selectedTopic) {
      setSelectedTopic("");
    }
  };

  const filteredAndSortedRepos = useMemo(() => {
    const filteredRepos = repos
      ? repos.filter((repo: any) => {
          if (selectedTopic) {
            return repo.topics.includes(selectedTopic);
          }

          const nameMatches = repo.name
            .toLowerCase()
            .includes(filterValue.toLowerCase());
          const isForked = repo.fork;
          const isNotForked = !repo.fork;

          switch (selectedFilter) {
            case "All":
              return nameMatches;
            case "Forked":
              return nameMatches && isForked;
            case "Not Forked":
              return nameMatches && isNotForked;
            default:
              return nameMatches;
          }
        })
      : [];

    switch (sort) {
      case "Created Ascending":
        return sortByKeyAscending(filteredRepos, "created_at");
      case "Created Descending":
        return sortByKeyDescending(filteredRepos, "created_at");
      case "Updated Ascending":
        return sortByKeyAscending(filteredRepos, "pushed_at");
      case "Updated Descending":
        return sortByKeyDescending(filteredRepos, "pushed_at");
      case "Stars Ascending":
        return sortByKeyAscending(filteredRepos, "stargazers_count");
      default:
        return sortByKeyDescending(filteredRepos, "stargazers_count");
    }
  }, [repos, sort, selectedTopic, filterValue, selectedFilter]);

  return (
    <>
      {loading && (
        <Box className="flex w-full items-center justify-center">
          <Loading />
        </Box>
      )}
      <Box className="flex w-full flex-col gap-3">
        <Box className="flex flex-row gap-3">
          <FilterInput setFilterValue={setFilterValue} />
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button className="hover:cursor-pointer">Sort By</Button>
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
                <DropdownMenu.RadioItem value="Stars Ascending">
                  Stars Ascending
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Stars Descending">
                  Stars Descending
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
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
                <DropdownMenu.RadioItem value="Forked">
                  Forked
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="Not Forked">
                  Not Forked
                </DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Box>
        {Array.isArray(filteredAndSortedRepos) &&
          filteredAndSortedRepos.map((repo, index) => (
            <Card key={index}>
              <Box className="gap-4">
                <Box className="flex flex-row flex-wrap items-center justify-between gap-2">
                  <Box className="flex flex-row flex-wrap items-start justify-start gap-2 break-all text-start">
                    <Text>{repo.name}</Text>
                    {repo.fork && (
                      <Tooltip content="Forked Repo">
                        <Box>
                          <FaCodeFork size={22} />
                        </Box>
                      </Tooltip>
                    )}
                    {repo.stargazers_count > 0 && (
                      <Tooltip content="Total Stars">
                        <Box className="flex flex-row gap-2">
                          <BsFillStarFill size={22} />
                          <Text>{formatNumber(repo.stargazers_count)}</Text>
                        </Box>
                      </Tooltip>
                    )}
                  </Box>
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Button className="hover:cursor-pointer">Open</Button>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content className="flex w-fit flex-col gap-2 p-2 ">
                      <DropdownMenu.Item className="px-2 text-base hover:bg-primary">
                        <Link href={repo.html_url} target="_blank">
                          Github
                        </Link>
                      </DropdownMenu.Item>
                      <DropdownMenu.Item className="px-2 text-base hover:bg-primary">
                        <Link
                          href={repo.html_url.replace(
                            "github.com",
                            "github.dev"
                          )}
                          target="_blank"
                        >
                          Github.DEV
                        </Link>
                      </DropdownMenu.Item>
                      {repo.home_page && (
                        <DropdownMenu.Item className="px-2 text-base hover:bg-primary">
                          <Link
                            href={repo.home_page.replace(
                              "github.com",
                              "github.dev"
                            )}
                            target="_blank"
                          >
                            Website
                          </Link>
                        </DropdownMenu.Item>
                      )}
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                </Box>
              </Box>
              <Box>
                <p>{repo.description}</p>
              </Box>
              <Box className="flex flex-col items-start">
                <Box className="item flex flex-col flex-wrap gap-1 text-left text-xs">
                  <Text>{repo.license?.spdx_id}</Text>
                  <Text>
                    {repo.language ? `Language: ${repo.language}` : null}
                  </Text>
                  <Text>
                    Created at: {new Date(repo.created_at).toLocaleDateString()}
                  </Text>
                  <Text>
                    Last update: {new Date(repo.pushed_at).toLocaleDateString()}
                  </Text>
                </Box>
                <Box className="flex w-full flex-row flex-wrap justify-center gap-2">
                  {repo.topics.map((topic: any, index: any) => (
                    <Text
                      size="2"
                      key={index}
                      className={
                        // Bold selected topic
                        selectedTopic === topic
                          ? "mb-1 select-none rounded-2xl p-1 font-bold hover:cursor-pointer"
                          : "mb-1 select-none rounded-2xl p-1  font-thin hover:cursor-pointer"
                      }
                      onClick={() => handleTopicClick(topic)} // Add click handler
                    >
                      {topic}
                    </Text>
                  ))}
                </Box>
              </Box>
            </Card>
          ))}
      </Box>
    </>
  );
}
