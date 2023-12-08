import { getSiteUrl } from "@/utils/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { FiLink } from "react-icons/fi";

// Consider using a TypeScript interface to define the structure of the social account data.
type SocialAccount = {
  provider: string;
  url: string;
};

type SocialAccountsProps = {
  username: { username: string };
};
export default function SocialAccounts(username: any) {
  const [data, setData] = useState<SocialAccount[] | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getSiteUrl()}/api/social-accounts?username=${username.username}`,

          { next: { revalidate: 3600 } },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData: SocialAccount[] = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [username.username]);

  return Array.isArray(data) && data.length > 0 ? (
    <Dropdown>
      <DropdownTrigger
        className="flex h-[4rem] flex-col items-start justify-center break-words rounded-lg bg-slate-100 
          p-2 
          transition-colors hover:cursor-pointer hover:bg-slate-200 dark:bg-zinc-900 hover:dark:bg-zinc-950"
      >
        <Button>
          Links <FiLink />
        </Button>
      </DropdownTrigger>
      {data && (
        <DropdownMenu aria-label="Static Actions">
          {data.map((item: SocialAccount, index: number) => (
            <DropdownItem key={index} target="_blank" href={item.url}>
              {item.provider === "generic"
                ? item.url.replace("https://", "").substring(0, 50)
                : item.provider}
            </DropdownItem>
          ))}
        </DropdownMenu>
      )}
    </Dropdown>
  ) : null;
}
