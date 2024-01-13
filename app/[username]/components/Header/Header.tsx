import { UserData } from "@/types/types";
import FollowersOrFollowings from "./FollowersOrFollowings";
import SocialLinks from "./SocialLinks";
import { createUrlObject } from "@/lib/utils";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import Readme from "./Readme";
import { TfiWorld } from "react-icons/tfi";
import { Avatar, Box, Card, Link, Text } from "@radix-ui/themes";

interface HeaderProps {
  userData: UserData;
}
export default function Header({ userData }: HeaderProps) {
  return (
    <Card className="h-fit pt-4">
      <Box className="flex flex-col">
        <Box className="flex flex-col items-center justify-center gap-6 md:flex-row ">
          <Avatar
            size="9"
            fallback={userData.login.charAt(0)}
            src={userData.avatar_url || userData.avatar_url}
          />
          <Box className="flex flex-col">
            <Text className="text-5xl break-words">{userData.name}</Text>
            <Link
              className="text-lg hover:underline"
              href={userData.html_url}
              target="_blank"
            >
              @{userData.login}
            </Link>
            {userData.bio && (
              <Text className="text-base font-normal break-all md:break-normal">
                {userData.bio}
              </Text>
            )}
            {userData.location && (
              <Text className="text-base font-normal">
                From: {userData.location}
              </Text>
            )}
            {userData.email && (
              <Text>
                Email:{" "}
                <Link
                  className="break-words hover:underline"
                  type="email"
                  href={`mailto:${userData.email}`}
                >
                  {userData.email}
                </Link>
              </Text>
            )}
            <Text className="text-base font-normal">
              Public Repos: {userData.public_repos}
            </Text>
            <Text className="text-base font-normal">
              Public Gists: {userData.public_gists}
            </Text>
            <Text className="text-base font-normal">
              Last Update: {new Date(userData.updated_at).toUTCString()}
            </Text>
            <Text className="text-base font-normal">
              Member Since: {new Date(userData.created_at).toUTCString()}
            </Text>
          </Box>
        </Box>
      </Box>
      <Box className="flex w-full flex-row flex-wrap justify-center gap-2">
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
            {(userData.blog.startsWith("http://" || "hhpts://") &&
              userData.blog.replace("http://", "")) ||
              userData.blog.replace("https://", "")}
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
      </Box>
    </Card>
  );
}
