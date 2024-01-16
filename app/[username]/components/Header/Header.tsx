import { UserData } from "@/types/types";
import FollowersOrFollowings from "./FollowersOrFollowings";
import SocialLinks from "./SocialLinks";
import { createUrlObject } from "@/lib/utils";
import { MdOutlineWorkOutline } from "react-icons/md";
import { BsTwitterX } from "react-icons/bs";
import { TfiWorld } from "react-icons/tfi";
import { Avatar, Box, Card, Link, Text, Tooltip } from "@radix-ui/themes";
import { HiLocationMarker } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import Readme from "@/components/Readme";

interface HeaderProps {
  userData: UserData;
}
export default function Header({ userData }: HeaderProps) {
  return (
    <Card className="h-fit shadow-md shadow-black">
      <Box className="flex flex-col">
        <Box className="flex flex-col items-center justify-center gap-6 md:flex-row ">
          <Box className="absolute right-5 top-5">
            <Tooltip content={`Profile Type: ${userData.type}`}>
              {userData.type === "User" ? (
                <FaUser size={22} />
              ) : (
                <GrOrganization size={22} />
              )}
            </Tooltip>
          </Box>
          <Avatar
            size="9"
            fallback={userData.login.charAt(0)}
            src={userData.avatar_url || userData.avatar_url}
            className="transition-all duration-1000 hover:shadow-md hover:shadow-slate-700"
          />
          <Box className="flex flex-col">
            <Text className="break-words text-5xl">{userData.name}</Text>
            <Link
              className="w-fit text-lg hover:underline"
              href={userData.html_url}
              target="_blank"
            >
              @{userData.login}
            </Link>
            {userData.bio && (
              <Text className="break-all text-base font-normal md:break-normal">
                {userData.bio}
              </Text>
            )}
            {userData.location && (
              <Text className="flex flex-row gap-1 text-base font-normal">
                <HiLocationMarker size={18} />
                {userData.location}
              </Text>
            )}
            {userData.email && (
              <Text className="flex flex-row items-center gap-2 text-base font-normal">
                <MdEmail />
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
              Public Repositories: {userData.public_repos}
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
        <Readme
          url={`https://raw.githubusercontent.com/${userData.login}/${userData.login}/master/README.md`}
        />
        <SocialLinks username={userData.login} option="social" />
      </Box>
    </Card>
  );
}
