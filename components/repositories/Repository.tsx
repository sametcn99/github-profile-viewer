import { BsFillStarFill } from "react-icons/bs";
import { FaCodeFork } from "react-icons/fa6";
import { formatNumber } from "@/lib/utils";
import {
  Box,
  Button,
  Card,
  DropdownMenu,
  Heading,
  Link,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import Readme from "../Readme";
import { languageIcons } from "./LanguageIcons";
import { GitHubRepo } from "@/types/types";
import { GoLaw } from "react-icons/go";

export default function Repository({ repo }: { repo: GitHubRepo }) {
  return (
    <Card>
      <Box className="flex flex-row gap-4 ">
        <Box className="flex w-full flex-row items-center justify-between gap-2">
          <Box className="flex w-full flex-row  items-center gap-2 break-all text-start">
            <Heading>
              <Link href={repo.html_url} target="_blank">
                {repo.name}
              </Link>
            </Heading>
            <Box className="flex w-fit flex-row flex-wrap items-center justify-start gap-2">
              {repo.fork && (
                <Tooltip content="Forked Repo">
                  <Box>
                    <FaCodeFork size={22} />
                  </Box>
                </Tooltip>
              )}
              <Tooltip content="Show Readme">
                <Box className="flex flex-row items-center gap-2">
                  <Readme
                    url={`https://raw.githubusercontent.com/${repo.owner.login}/${repo.name}/master/README.md`}
                  >
                    <span></span>
                  </Readme>
                </Box>
              </Tooltip>
              {repo.stargazers_count > 0 && (
                <Tooltip content="Total Stars">
                  <Box className="flex flex-row gap-2">
                    <BsFillStarFill size={22} />
                    <Text>{formatNumber(repo.stargazers_count)}</Text>
                  </Box>
                </Tooltip>
              )}
            </Box>
          </Box>
          <Box>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button className="hover:cursor-pointer">Open</Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <Link href={repo.html_url} target="_blank">
                    Github
                  </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Link
                    href={repo.html_url.replace("github.com", "github.dev")}
                    target="_blank"
                  >
                    Github.DEV
                  </Link>
                </DropdownMenu.Item>
                {repo.homepage && (
                  <DropdownMenu.Item>
                    <Link href={repo.homepage} target="_blank">
                      Website
                    </Link>
                  </DropdownMenu.Item>
                )}
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Box>
        </Box>
      </Box>
      <Box>
        <p>{repo.description}</p>
      </Box>
      <Box className="flex flex-col items-start">
        <Box className="item flex flex-col flex-wrap gap-1 text-left text-xs">
          <Text className={"flex flex-row items-center gap-2 font-thin "}>
            <GoLaw /> {repo.license?.spdx_id}
          </Text>
          {repo.language && (
            <>
              {repo.language && languageIcons[repo.language] ? (
                // Display icon if available
                <Tooltip content={`Language: ${repo.language}`}>
                  <Box
                    className={"flex flex-row items-center gap-2 font-thin "}
                  >
                    {languageIcons[repo.language]}
                    <Text>{repo.language}</Text>
                  </Box>
                </Tooltip>
              ) : (
                // Display language name if icon is not available
                <Text className={"flex flex-row items-center gap-2 font-thin "}>
                  Language: {repo.language}
                </Text>
              )}
            </>
          )}
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
              className={"mb-1 select-none rounded-2xl p-1 font-thin "}
            >
              {topic}
            </Text>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
