"use client";
import { getSiteUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
export default function SocialLinks({
  username,
  option,
}: {
  username: string;
  option: string;
}) {
  const [data, setData] = useState<[]>([]);
  const url = `${getSiteUrl()}/api/github?username=${username}&option=${option}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status code: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (Array.isArray(fetchedData.data) && fetchedData.data.length > 0) {
          setData(fetchedData.data);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };
    fetchData();
  }, [username, url]);

  return (
    <>
      {data.length > 0 && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="rounded-2xl bg-primary">
                Links
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex w-fit flex-col gap-2 p-2 ">
                {data.map((item: any, index: number) => (
                  <NavigationMenuLink
                    key={index}
                    href={item.url}
                    target="_blank"
                    className="px-2 text-base hover:bg-primary"
                  >
                    {item.provider === "generic"
                      ? item.url.replace("https://", "").substring(0, 50)
                      : item.provider}{" "}
                  </NavigationMenuLink>
                ))}
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}
    </>
  );
}
