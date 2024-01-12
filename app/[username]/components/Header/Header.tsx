import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { UserData } from "@/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import FollowersOrFollowings from "./FollowersOrFollowings";
import SocialLinks from "./SocialLinks";
import { createUrlObject } from "@/lib/utils";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import Readme from "./Readme";
import { TfiWorld } from "react-icons/tfi";

interface HeaderProps {
  userData: UserData;
}
export default function Header({ userData }: HeaderProps) {
  return (
    <Card className="h-fit pt-4">
      <CardContent className="flex flex-col">
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row ">
          <Avatar className="h-[15rem] w-[15rem]">
            <AvatarImage src={userData.avatar_url || userData.avatar_url} />
            <AvatarFallback>{userData.login.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-5xl">{userData.name}</span>
            <Link
              className="text-lg hover:underline"
              href={userData.html_url}
              target="_blank"
            >
              @{userData.login}
            </Link>
            <span className="text-base font-normal">{userData.bio}</span>
            <span className="text-base font-normal">
              From: {userData.location}
            </span>
            <span>
              Email:{" "}
              <a
                className="break-words hover:underline"
                type="email"
                href={`mailto:${userData.email}`}
              >
                {userData.email}
              </a>
            </span>
            <span className="text-base font-normal">
              Public Repos: {userData.public_repos}
            </span>
            <span className="text-base font-normal">
              Public Gists: {userData.public_gists}
            </span>
            <span className="text-base font-normal">
              Last Update: {new Date(userData.updated_at).toUTCString()}
            </span>
            <span className="text-base font-normal">
              Member Since: {new Date(userData.created_at).toUTCString()}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex w-full flex-row flex-wrap justify-center gap-2">
        <FollowersOrFollowings
          option="followers"
          username={userData.login}
          count={userData.followers}
        />
        <FollowersOrFollowings
          option="followings"
          username={userData.login}
          count={userData.following}
        />
        {userData.blog && (
          <Link
            href={createUrlObject(userData.blog).href}
            className="dialog-trigger"
            target="_blank"
          >
            <TfiWorld />
            {userData.blog}
          </Link>
        )}
        {userData.company && (
          <Link
            target="_blank"
            href={
              userData.company.startsWith("@")
                ? `https://github.com/${userData.company.replace("@", "")}`
                : ""
            }
            title={
              userData.company.startsWith("@")
                ? userData.company.replace("@", "")
                : userData.company
            }
            className="dialog-trigger"
          >
            <MdOutlineWorkOutline />
            {userData.company.startsWith("@")
              ? userData.company.replace("@", "")
              : userData.company}
          </Link>
        )}
        {userData.twitter_username && (
          <Link
            href={`https://x.com/${userData.twitter_username}`}
            target="_blank"
            className="dialog-trigger"
          >
            <BsTwitterX />
            {userData.twitter_username}
          </Link>
        )}
        <Readme username={userData.login} option="readme" />
        <SocialLinks username={userData.login} option="social" />
      </CardFooter>
    </Card>
  );
}
