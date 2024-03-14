import SocialLinks from "./SocialLinks";
import { checkEmail, createUrlObject } from "@/lib/utils";
import { MdEmail, MdOutlineWorkOutline } from "react-icons/md";
import { TfiWorld } from "react-icons/tfi";
import { Box, Link } from "@radix-ui/themes";
import Readme from "@/components/Readme";
import ContactList from "./ContactList";
import CustomTextArea from "../ui/CustomTextArea";

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
        {/* {userData.company && (
          <>
            <Text className="flex flex-row items-center gap-2 overflow-hidden text-base font-normal break-words md:break-normal">
              <MdOutlineWorkOutline />
              <Text>
                {userData.company.split(" ").map((word) => {
                  if (isGithubProfile(word)) {
                    const url = word.trim();
                    return (
                      <Link
                        key={url}
                        href={`https://github.com/${url.replace(/[^a-zA-Z0-9@]/g, "")}`}
                        target="_blank"
                      >
                        {url}{" "}
                      </Link>
                    );
                  } else {
                    return word + " ";
                  }
                })}
              </Text>
            </Text>
          </>
        )} */}
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
    </Box>
  );
}
