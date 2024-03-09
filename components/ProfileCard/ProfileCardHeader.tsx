import { Avatar, Box, Link, Text, Tooltip } from "@radix-ui/themes";
import { HiLocationMarker } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
export default function ProfileCardHeader({
  userData,
}: {
  userData: UserData;
}) {
  return (
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
          {userData.bio && (
            <Text className="break-words text-base font-normal md:break-normal">
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
            Last Update: {new Date(userData.updated_at).toUTCString()}
          </Text>
          <Text className="text-base font-normal">
            Member Since: {new Date(userData.created_at).toUTCString()}
          </Text>
        </Box>
      </Box>
    </Box>
  );
}
