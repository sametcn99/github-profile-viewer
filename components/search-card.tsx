import React from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { ListboxWrapper } from "./ListboxWrapper";
import { David_Libre } from "next/font/google";
import { User } from "@nextui-org/react";
import Link from "next/link";

export default function SearchCard(data: any) {
  if (!data) {
    return null;
  }

  const items = data.data.items;
  console.log(items);
  return (
    <div className=" flex w-full flex-col">
      {Array.isArray(items) &&
        items.map((item: any, index: number) => (
          <Link href={`/${item.login}`} key={index}>
            <User
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
