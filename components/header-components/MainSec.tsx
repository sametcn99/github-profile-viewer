import { Divider } from "@nextui-org/react";
import React from "react";

export default function MainSec({ ...props }) {
  return (
    <span className="flex flex-col gap-1">
      <span className="flex flex-row flex-wrap items-center justify-center gap-2 break-words text-3xl font-bold md:text-5xl">
        {props.name}
      </span>
      <a
        className="break-words font-extralight "
        href={props.html_url}
        target="_blank"
      >
        <span>@</span>
        <span className="hover:underline">{props.login}</span>
      </a>
      <Divider className="my-1" />
    </span>
  );
}
