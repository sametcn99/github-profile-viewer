"use client";
import { Card, Divider } from "@nextui-org/react";
import Avatar from "./Avatar";
import ModalComponent from "../modal-component";
import { getSiteUrl } from "@/utils/utils";
import { FaUser } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";

export default function Header({ profileData }: any) {
  return (
    <section className="relative flex items-center justify-center break-all text-sm md:text-base">
      <span
        className="absolute right-4 top-4 z-10 text-2xl"
        title={`Profile type: ${profileData.type}`}
      >
        {profileData.type === "Organization" ? <GoOrganization /> : <FaUser />}
      </span>
      <Card className="flex flex-col items-center justify-center bg-opacity-50 p-5 md:flex-row">
        <Card className="scale-80 md:h-fit md:w-fit">
          <Avatar
            avatar_url={profileData.avatar_url}
            gravatar_url={profileData.gravatar_url}
          />
        </Card>
        <section className="flex h-fit w-full max-w-[35rem] flex-col items-start justify-center p-2">
          <span className="flex flex-col gap-1">
            <span className="flex flex-row flex-wrap items-center justify-center gap-2 break-words text-3xl font-bold md:text-5xl">
              {profileData.name}
            </span>
            <a
              className="break-words font-extralight hover:underline"
              href={profileData.html_url}
            >
              @{profileData.login}
            </a>
            <Divider className="my-1" />
          </span>
          <span className="break-words">{profileData.bio}</span>
          <a
            className="break-words hover:underline"
            type="email"
            href={`mailto:${profileData.email}`}
          >
            {profileData.email}
          </a>
          <span className="break-words">
            {profileData.blog && (
              <>
                <span>Website: </span>
                <a
                  className="hover:underline"
                  href={`http://${profileData.blog}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.blog}
                </a>
              </>
            )}
          </span>

          {profileData.location && (
            <span className="break-words">From: {profileData.location}</span>
          )}
          <span className="break-words">
            {profileData.twitter_username &&
              `Twitter: ${profileData.twitter_username}`}
          </span>
          <span className="w-fit">{`Public Repos: ${profileData.public_repos}`}</span>
          <span
            className="w-fit"
            title="Public Gists"
          >{`Public Gists: ${profileData.public_gists}`}</span>
          <span className="break-words">
            Member Since: <br />
            {new Date(profileData.created_at).toLocaleString()}
          </span>
          <div className="flex flex-row flex-wrap gap-2">
            <ModalComponent
              title={`${profileData.followers}`}
              modalTitle="Followers"
              url={`${getSiteUrl()}/api/followers?username=${
                profileData.login
              }`}
            />
            <ModalComponent
              title={`${profileData.following}`}
              modalTitle="Followings"
              url={`${getSiteUrl()}/api/following?username=${
                profileData.login
              }`}
            />
            {profileData.company && (
              <div
                className="flex flex-col items-start justify-center rounded-lg bg-slate-100 p-2 
          transition-colors 
          hover:cursor-pointer hover:bg-slate-200 dark:bg-zinc-900 hover:dark:bg-zinc-950"
              >
                {profileData.company.startsWith("@") ? (
                  <a
                    href={`https://github.com/${profileData.company}`}
                    className="flex flex-col hover:underline"
                  >
                    <span> Working at </span>
                    {profileData.company.includes("@")
                      ? profileData.company.replace("@", "")
                      : profileData.company}
                  </a>
                ) : (
                  <div className="flex flex-col">
                    <span> Working at </span>
                    {profileData.company}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </Card>
    </section>
  );
}
