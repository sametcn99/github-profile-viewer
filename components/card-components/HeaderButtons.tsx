import Link from "next/link";
import React from "react";

export default function HeaderButtons({ ...props }) {
  return (
    <Link
      target="_blank"
      className="flex flex-col items-start justify-center break-words rounded-lg bg-slate-100 p-2 
          transition-colors 
          hover:cursor-pointer hover:bg-slate-200 dark:bg-zinc-900 hover:dark:bg-zinc-950"
      href={props.href}
    >
      {props.title}
      {props.logo}
    </Link>
  );
}
