"use client";
import React from "react";
import { Card, Spacer } from "@nextui-org/react";
import Avatar from "./Avatar";

export default function Header({ ...props }) {
  return (
    <Card className="flex items-center w-fit mx-auto px-4 h-fit p-4 sticky top-[10rem]">
      <Avatar avatar_url={props.avatar_url} />
      <h1 className="text-5xl font-bold">{props.name}</h1>
      <h1 className="font-extralight">@{props.login}</h1>
      <h1>{props.bio}</h1>
      <Spacer y={1} />
      <a
        href={`${props.html_url}?tab=followers`}
      >{`Followers: ${props.followers}`}</a>
      <a
        href={`${props.html_url}?tab=following`}
      >{`Following: ${props.following}`}</a>
      <a
        href={`${props.html_url}?tab=repositories`}
      >{`Public Repos: ${props.public_repos}`}</a>
      <a
        href={`https://gist.github.com/${props.login}`}
      >{`Public Gists: ${props.public_gists}`}</a>
    </Card>
  );
}
