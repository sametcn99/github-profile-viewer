"use client";
import { useContext, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { BsFillStarFill } from "react-icons/bs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { FaCodeFork } from "react-icons/fa6";
import { GithubContext } from "@/app/context/context";
import FilterInput from "./FilterInput";
import {
  sortByCreatedAscending,
  sortByPushedAscending,
  sortByPushedDescending,
  sortByCreatedDescending,
  sortByStarsDescending,
  sortByStarsAscending,
} from "@/lib/utils/sort";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Loading from "@/app/loading";
import { formatNumber } from "@/lib/utils";

export default function Projects() {
  const { repos, loading }: any = useContext(GithubContext);
  const [sort, setSort] = useState("Stars Descending");
  const [filterValue, setFilterValue] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(""); // Add state for selected topic

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
          // Filter by topic if a topic is selected
          if (selectedTopic) {
            return repo.topics.includes(selectedTopic);
          }

          // Filter by name if no topic is selected
          return repo.name.toLowerCase().includes(filterValue.toLowerCase());
        })
      : [];
    switch (sort) {
      // Created Ascending(artan)
      case "Created Ascending":
        return sortByCreatedAscending(filteredRepos);

      // Created Descending(azalan)
      case "Created Descending":
        return sortByCreatedDescending(filteredRepos);

      // Updated Ascending(artan)
      case "Updated Ascending":
        return sortByPushedAscending(filteredRepos);

      // Updated Descending(azalan)
      case "Updated Descending":
        return sortByPushedDescending(filteredRepos);

      case "Stars Ascending":
        return sortByStarsAscending(filteredRepos);

      // Stars Descending
      default:
        return sortByStarsDescending(filteredRepos); // Default sorting by pushed date (descending)
    }
  }, [repos, sort, selectedTopic, filterValue]);

  return (
    <>
      {loading && (
        <div className="flex w-full items-center justify-center">
          <Loading />
        </div>
      )}
      <section className="flex w-full flex-col gap-3">
        <div className="flex flex-row gap-3">
          <FilterInput setFilterValue={setFilterValue} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="rounded-2xl text-xl">
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="Updated Descending">
                  Updated Descending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Updated Ascending">
                  Updated Ascending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Created Ascending">
                  Created Ascending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Created Descending">
                  Created Descending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Stars Ascending">
                  Stars Ascending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Stars Descending">
                  Stars Descending
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {Array.isArray(filteredAndSortedRepos) &&
          filteredAndSortedRepos.map((repo, index) => (
            <Card key={index}>
              <CardHeader className="gap-4">
                <CardTitle className="flex flex-row flex-wrap items-center justify-between gap-2">
                  <div className="flex flex-row flex-wrap items-start justify-start gap-2 break-all text-start">
                    <span>{repo.name}</span>
                    {repo.fork && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger className="flex flex-row gap-2 ">
                            <FaCodeFork size={22} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Forked Repo</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger className="flex flex-row gap-2 ">
                          <BsFillStarFill size={22} />
                          <span>{formatNumber(repo.stargazers_count)}</span>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Total Stars</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <NavigationMenu>
                    <NavigationMenuList>
                      <NavigationMenuItem>
                        <NavigationMenuTrigger className="rounded-2xl bg-primary">
                          Open
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="flex w-fit flex-col gap-2 p-2 ">
                          <NavigationMenuLink
                            href={repo.html_url}
                            target="_blank"
                            className="px-2 text-base hover:bg-primary"
                          >
                            Github
                          </NavigationMenuLink>
                          <NavigationMenuLink
                            href={repo.html_url.replace(
                              "github.com",
                              "github.dev",
                            )}
                            target="_blank"
                            className="px-2 text-base hover:bg-primary"
                          >
                            Github.DEV
                          </NavigationMenuLink>
                          {repo.home_page && (
                            <NavigationMenuLink
                              href={repo.home_page.replace(
                                "github.com",
                                "github.dev",
                              )}
                              target="_blank"
                              className="px-2 text-base hover:bg-primary"
                            >
                              Website
                            </NavigationMenuLink>
                          )}
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    </NavigationMenuList>
                  </NavigationMenu>
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <p>{repo.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <div className="item flex flex-col flex-wrap gap-1 text-left text-xs">
                  <p>{repo.license?.spdx_id}</p>
                  <p>{repo.language ? `Language: ${repo.language}` : null}</p>
                  <p>
                    Created at: {new Date(repo.created_at).toLocaleDateString()}
                  </p>
                  <p>
                    Last update: {new Date(repo.pushed_at).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex w-full flex-row flex-wrap justify-center">
                  {repo.topics.map((topic: any, index: any) => (
                    <p
                      key={index}
                      className={
                        // Bold selected topic
                        selectedTopic === topic
                          ? "m-[0.063rem] mb-1 select-none rounded-2xl   bg-primary p-1 text-xs font-bold hover:cursor-pointer"
                          : "m-[0.063rem] mb-1 select-none rounded-2xl bg-secondary  p-1 text-xs font-thin hover:cursor-pointer"
                      }
                      onClick={() => handleTopicClick(topic)} // Add click handler
                    >
                      {topic}
                    </p>
                  ))}
                </div>
              </CardFooter>
            </Card>
          ))}
      </section>
    </>
  );
}
