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
import { formatNumber } from "@/lib/utils";

export default function Repository({ repo, index }: any) {
  return (
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
                    href={repo.html_url.replace("github.com", "github.dev")}
                    target="_blank"
                    className="px-2 text-base hover:bg-primary"
                  >
                    Github.DEV
                  </NavigationMenuLink>
                  {repo.home_page && (
                    <NavigationMenuLink
                      href={repo.home_page.replace("github.com", "github.dev")}
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
          <p>Created at: {new Date(repo.created_at).toLocaleDateString()}</p>
          <p>Last update: {new Date(repo.pushed_at).toLocaleDateString()}</p>
        </div>
        <div className="flex w-full flex-row flex-wrap justify-center">
          {repo.topics.map((topic: any, index: any) => (
            <p
              key={index}
              className={
                // Bold selected topic
                "m-[0.063rem] mb-1 select-none rounded-2xl   bg-primary p-1 text-xs font-bold hover:cursor-pointer"
              }
            >
              {topic}
            </p>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
