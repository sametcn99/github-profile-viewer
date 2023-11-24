"use client";
import React from "react";
import { Card, Spacer } from "@nextui-org/react";
import Avatar from "./Avatar";

export default function Header({ ...props }) {
  return (
    <>
      <Card className="flex h-fit w-full max-w-[35rem] flex-row items-center justify-center gap-5 p-4 px-4">
        <Avatar
          avatar_url={props.avatar_url}
          gravatar_url={props.gravatar_url}
        />
        <section className="flex flex-col">
          <h1 className="text-5xl font-bold">{props.name}</h1>
          <h1 className="font-extralight">@{props.login}</h1>
          <h1 className="break-words">{props.bio}</h1>
          <h1 className="break-words">{props.email}</h1>
          <h1 className="break-words">{props.company}</h1>
          <h1 className="break-words">From: {props.location}</h1>
          <h1>
            Profile Type: <span>{props.type}</span>
          </h1>
          <h1 className="break-words">{props.twitter_username}</h1>
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
          <h1 className="break-words">
            Created at: {new Date(props.created_at).toLocaleString()}
          </h1>
          <h1>
            Last Profile Update:{" "}
            <span>{new Date(props.updated_at).toLocaleString()}</span>
          </h1>
          <h1>
            Last Event:{" "}
            <span>{new Date(props.latestEvent).toLocaleString()}</span>
          </h1>
        </section>
      </Card>
      <Card className="my-2 w-full max-w-[35rem] p-1 text-center hover:scale-105">
        <a href={props.html_url}>{`Open on Github`}</a>
      </Card>
    </>
  );
}
