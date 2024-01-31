import SocialLinks from "./SocialLinks";
import { createUrlObject } from "@/lib/utils";
import { MdOutlineWorkOutline } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import { Box, Link, Text } from "@radix-ui/themes";
import Readme from "@/components/Readme";
import ContactList from "./ContactList";
export default function ProfileCardFooter({
  userData,
}: {
  userData: UserData;
}) {
  return (
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
            href={createUrlObject(userData.blog).href}
            className="dialog-trigger"
            target="_blank"
          >
            <TfiWorld />
            {createUrlObject(userData.blog).host}
          </Link>
        )}
        {userData.company && (
          <>
            {userData.company.split(", ").map((comp) => {
              if (comp.startsWith("@")) {
                const name = comp.slice(1);
                return (
                  <Link
                    key={name}
                    href={`https://github.com/${name}`}
                    target="_blank"
                    className="flex flex-row items-center gap-2"
                  >
                    <MdOutlineWorkOutline />
                    <Text> @{name}</Text>
                  </Link>
                );
              } else {
                return (
                  <span key={comp} className="flex flex-row items-center gap-2">
                    {" "}
                    <MdOutlineWorkOutline />
                    {comp}
                  </span>
                );
              }
            })}
          </>
        )}
        <Readme
          url={`https://raw.githubusercontent.com/${userData.login}/${userData.login}/master/README.md`}
        >
          README.md
        </Readme>
        <SocialLinks username={userData.login} option="social" />
      </Box>
    </Box>
  );
}
