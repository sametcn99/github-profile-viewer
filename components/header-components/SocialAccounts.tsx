import { getSiteUrl } from "@/utils/utils";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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
    <section className="flex max-w-[20rem] flex-col flex-wrap gap-2">
      <span>Social Links</span>
      <section className="flex max-w-[20rem] flex-row flex-wrap gap-2">
        {data.map((item: SocialAccount, index: number) => (
          <Link
            key={index}
            target="_blank"
            className="flex flex-col items-start justify-center break-words rounded-lg bg-slate-100 p-2 
          transition-colors 
          hover:cursor-pointer hover:bg-slate-200 dark:bg-zinc-900 hover:dark:bg-zinc-950"
            href={item.url}
          >
            {item.provider === "generic" ? item.url : item.provider}
          </Link>
        ))}
      </section>
    </section>
  ) : null;
}
