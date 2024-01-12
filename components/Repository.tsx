import { BsFillStarFill } from "react-icons/bs";
import { FaCodeFork } from "react-icons/fa6";
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
export default function Repository({ repo, index }: any) {
  return (
    <Card key={index}>
      <Box className="gap-4">
        <Box className="flex flex-row flex-wrap items-center justify-between gap-2">
          <Box className="flex flex-row flex-wrap items-start justify-start gap-2 break-all text-start">
            <Text>{repo.name}</Text>
            {repo.fork && (
              <Tooltip content="Forked Repo">
                <FaCodeFork size={22} />
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
                  href={repo.html_url.replace("github.com", "github.dev")}
                  target="_blank"
                >
                  Github.DEV
                </Link>
              </DropdownMenu.Item>
              {repo.home_page && (
                <DropdownMenu.Item className="px-2 text-base hover:bg-primary">
                  <Link
                    href={repo.home_page.replace("github.com", "github.dev")}
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
          <Text>{repo.language ? `Language: ${repo.language}` : null}</Text>
          <Text>
            Created at: {new Date(repo.created_at).toLocaleDateString()}
          </Text>
          <Text>
            Last update: {new Date(repo.pushed_at).toLocaleDateString()}
          </Text>
        </Box>
        <Box className="flex w-full flex-row flex-wrap justify-center">
          {repo.topics.map((topic: any, index: any) => (
            <Text
              key={index}
              className={
                "m-[0.063rem] mb-1 select-none rounded-2xl p-1 text-xs font-bold"
              }
            >
              {topic}
            </Text>
          ))}
        </Box>
      </Box>
    </Card>
  );
}
