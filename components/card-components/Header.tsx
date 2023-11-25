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
import { getSiteUrl } from "@/utils/utils";

export default function Header({ profileData }: any) {
  return (
    <section className="flex  items-center justify-center  ">
      <Card className="flex flex-col items-center justify-center p-5 md:flex-row">
        <Card className="scale-80 md:h-fit md:w-fit">
          <Avatar
            avatar_url={profileData.avatar_url}
            gravatar_url={profileData.gravatar_url}
          />
        </Card>
        <section className="flex h-fit w-full max-w-[35rem] flex-col items-start justify-center p-2">
          <span className="flex flex-col">
            <span className="text-5xl font-bold" title="name">
              {profileData.name}
            </span>
            <span className="font-extralight" title="username">
              @{profileData.login}
            </span>
            <Divider className="my-1" />
          </span>
          <span className="break-words" title="biography">
            {profileData.bio}
          </span>
          <span className="break-words" title="email">
            {profileData.email}
          </span>
          <span className="break-words" title="company">
            {profileData.company}
          </span>
          <span className="break-words" title="location">
            From: {profileData.location}
          </span>
          <span title="user profile type">
            Profile Type: <span>{profileData.type}</span>
          </span>
          <span className="break-words" title="twitter user name">
            {profileData.twitter_username}
          </span>
          <ModalComponent
            title={`Followers: ${profileData.followers}`}
            modalTitle="Followers"
            url={`${getSiteUrl()}/api/followers?username=${profileData.login}`}
          />
          <ModalComponent
            title={`Followings: ${profileData.following}`}
            modalTitle="Followings"
            url={`${getSiteUrl()}/api/following?username=${profileData.login}`}
          />
          <span
            className="w-fit"
            title="Public Repositories"
          >{`Public Repos: ${profileData.public_repos}`}</span>
          <span
            className="w-fit"
            title="Public Gists"
          >{`Public Gists: ${profileData.public_gists}`}</span>
          <span className="break-words" title="Account Created at">
            Member Since: <br />
            {new Date(profileData.created_at).toLocaleString()}
          </span>
          <span title="Last Profile Update">
            Last Profile Update: <br />
            <span>{new Date(profileData.updated_at).toLocaleString()}</span>
          </span>
        </section>
      </Card>
    </section>
  );
}
