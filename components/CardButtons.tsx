import { Button } from "@nextui-org/react";
import React from "react";
import Link from "next/link";

export default function CardButtons({ ...props }) {
  return (
    <Link href={props.href} target="_blank">
      <Button
        className={
          "h-10 border border-white border-opacity-50 fill-white text-foreground transition-all duration-1000 hover:bg-zinc-700 hover:bg-opacity-50"
        }
        radius="md"
        size="sm"
        variant={"bordered"}
      >
        {props.title}
        {props.logo}
      </Button>
    </Link>
  );
}
