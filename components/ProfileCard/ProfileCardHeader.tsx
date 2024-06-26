import { Avatar, Box, Link, Text, Tooltip } from "@radix-ui/themes";
import { HiLocationMarker } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import SocialLinks from "./SocialLinks";
import { checkEmail, createUrlObject } from "@/lib/utils";
import {  MdOutlineWorkOutline } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import Readme from "@/components/Readme";
import ContactList from "./ContactList";
import CustomTextArea from "../ui/CustomTextArea";

export default function ProfileCardHeader({
  userData,
}: {
  userData: UserData;
}) {
  return (
<>
<Box className="flex flex-col py-6">
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
          className="drag-none scale-105 transition-all duration-1000 hover:shadow-lg hover:shadow-slate-700"
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
          {userData.bio && <CustomTextArea text={userData.bio} logo={<></>} />}
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
            Last Update: {new Date(userData.updated_at).toUTCString()}
          </Text>
          <Text className="text-base font-normal">
            Member Since: {new Date(userData.created_at).toUTCString()}
          </Text>
        </Box>
      </Box>
    </Box>
        <Box className="flex w-full flex-row flex-wrap justify-center gap-2">
        <Box className="flex flex-row flex-wrap justify-center gap-2">
          <ContactList
            option="followers"
            username={userData.login}
            count={userData.followers}
          />
          <ContactList
            option="followings"
            username={userData.login}
            count={userData.following}
          />
        </Box>
        <Box className="flex w-full flex-row flex-wrap items-center justify-center gap-2">
          {userData.blog && (
            <Link
              href={
                checkEmail(userData.blog)
                  ? `mailto:${userData.blog}`
                  : createUrlObject(userData.blog).href
              }
              className="dialog-trigger text-white"
              target="_blank"
            >
              {checkEmail(userData.blog) ? <MdEmail /> : <TfiWorld />}
              {checkEmail(userData.blog)
                ? `${userData.blog}`
                : createUrlObject(userData.blog).href}
            </Link>
          )}
          {userData.company && (
            <CustomTextArea
              text={userData.company}
              logo={<MdOutlineWorkOutline />}
            />
          )}
          <Readme
            url={
              userData.type === "User"
                ? `https://raw.githubusercontent.com/${userData.login}/${userData.login}/master/README.md`
                : `https://raw.githubusercontent.com/${userData.login}/.github/main/profile/README.md`
            }
          >
            README.md
          </Readme>
          <SocialLinks username={userData.login} option="social" />
        </Box>
      </Box></>
  );
}
