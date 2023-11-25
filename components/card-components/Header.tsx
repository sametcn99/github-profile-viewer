"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  useDisclosure,
} from "@nextui-org/react";
import Avatar from "./Avatar";
import ModalComponent from "../modal-component";
import { getBaseUrl } from "@/utils/utils";

export default function Header({ ...props }) {
  return (
    <section className="flex  items-center justify-center  ">
      <Card className="flex flex-col items-center justify-center p-5 md:flex-row">
        <Card className="scale-80 md:h-fit md:w-fit">
          <Avatar
            avatar_url={props.avatar_url}
            gravatar_url={props.gravatar_url}
          />
        </Card>
        <section className="flex h-fit w-full max-w-[35rem] flex-col items-start justify-center p-2">
          <span className="flex flex-col">
            <span className="text-5xl font-bold" title="name">
              {props.name}
            </span>
            <span className="font-extralight" title="username">
              @{props.login}
            </span>
            <Divider className="my-1" />
          </span>
          <span className="break-words" title="biography">
            {props.bio}
          </span>
          <span className="break-words" title="email">
            {props.email}
          </span>
          <span className="break-words" title="company">
            {props.company}
          </span>
          <span className="break-words" title="location">
            From: {props.location}
          </span>
          <span title="user profile type">
            Profile Type: <span>{props.type}</span>
          </span>
          <span className="break-words" title="twitter user name">
            {props.twitter_username}
          </span>
          <ModalComponent
            title={`Followers: ${props.followers}`}
            modalTitle="Followers"
            url={`${getBaseUrl()}/api/followers?username=${props.login}`}
          />
          <ModalComponent
            title={`Followings: ${props.following}`}
            modalTitle="Followings"
            url={`${getBaseUrl()}/api/following?username=${props.login}`}
          />
          <span
            className="w-fit"
            title="Public Repositories"
          >{`Public Repos: ${props.public_repos}`}</span>
          <span
            className="w-fit"
            title="Public Gists"
          >{`Public Gists: ${props.public_gists}`}</span>
          <span className="break-words" title="Account Created at">
            Member Since: <br />
            {new Date(props.created_at).toLocaleString()}
          </span>
          <span title="Last Profile Update">
            Last Profile Update: <br />
            <span>{new Date(props.updated_at).toLocaleString()}</span>
          </span>
          <span title="Last Event">
            Last Event: <br />
            <span>{new Date(props.latestEvent).toLocaleString()}</span>
          </span>
        </section>
      </Card>
    </section>
  );
}
