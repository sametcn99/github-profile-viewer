import { User } from "@nextui-org/react";
import Link from "next/link";

export default function SearchCard(data: any) {
  if (!data) {
    return null;
  }
  const items = data.data.items;
  return (
    <div className=" flex w-full flex-col">
      {Array.isArray(items) &&
        items.map((item: any, index: number) => (
          <Link href={`/${item.login}`} key={index}>
            <User
              className="flex w-full items-center justify-start p-2 hover:bg-blue-950 hover:bg-opacity-30 dark:hover:bg-black dark:hover:bg-opacity-30"
              key={index}
              name={item.login}
              description={item.type}
              avatarProps={{
                src: `${item.avatar_url}`,
              }}
            />
          </Link>
        ))}
    </div>
  );
}
