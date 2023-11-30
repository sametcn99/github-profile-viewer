"use client";
import { Card } from "@nextui-org/react";
import Avatar from "./Avatar";
import ModalComponent from "../modal-component";
import { getSiteUrl } from "@/utils/utils";
import { FaUser } from "react-icons/fa";
import { GoOrganization } from "react-icons/go";
import { FaXTwitter } from "react-icons/fa6";
import HeaderButtons from "./HeaderButtons";
import { MdOutlineWorkOutline } from "react-icons/md";
import { TbWorld } from "react-icons/tb";
import WithTooltip from "../header-components/WithTooltip";
import MainSec from "../header-components/MainSec";

export default function Header({ profileData }: any) {
  return (
    <section className="relative flex break-all text-sm md:text-base">
      <WithTooltip>
        <span className="absolute right-4 top-4 z-10 text-2xl">
          {profileData.type === "Organization" ? (
            <GoOrganization />
          ) : (
            <FaUser />
          )}
        </span>
      </WithTooltip>
      <Card className="flex flex-col items-center bg-opacity-50 md:flex-row">
        <Avatar
          avatar_url={profileData.avatar_url}
          gravatar_url={profileData.gravatar_url}
        />
        <section className="flex h-fit w-full max-w-[27rem] flex-col items-start justify-center p-2">
          <MainSec
            name={profileData.name}
            html_url={profileData.html_url}
            login={profileData.login}
          />
          <section className="flex flex-col pr-2">
            <span className="break-words">{profileData.bio}</span>
            <a
              className="break-words hover:underline"
              type="email"
              href={`mailto:${profileData.email}`}
            >
              {profileData.email}
            </a>
            {profileData.location && (
              <span className="break-words">From: {profileData.location}</span>
            )}
            <span className="w-fit">{`Public Repos: ${profileData.public_repos}`}</span>
            <span
              className="w-fit"
              title="Public Gists"
            >{`Public Gists: ${profileData.public_gists}`}</span>
            <span className="break-words">
              Member Since: <br />
              {new Date(profileData.created_at).toLocaleDateString()}
            </span>
          </section>
          <section className="flex max-w-[20rem] flex-row flex-wrap gap-2">
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
            {profileData.blog && (
              <HeaderButtons
                href={`http://${profileData.blog}`}
                title={profileData.blog}
                logo={<TbWorld className="text-xl" />}
              />
            )}
            {profileData.company && (
              <HeaderButtons
                href={
                  profileData.company.startsWith("@") &&
                  `https://github.com/${profileData.company.replace("@", "")}`
                }
                title={
                  profileData.company.startsWith("@")
                    ? profileData.company.replace("@", "")
                    : profileData.company
                }
                logo={<MdOutlineWorkOutline className="text-xl" />}
              />
            )}
            {profileData.twitter_username && (
              <HeaderButtons
                href={`https://x.com/${profileData.twitter_username}`}
                title={profileData.twitter_username}
                logo={<FaXTwitter className="text-xl" />}
              />
            )}
          </section>
        </section>
      </Card>
    </section>
  );
}
