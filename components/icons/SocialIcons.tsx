import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaSnapchat,
  FaPinterest,
  FaTumblr,
  FaReddit,
  FaYoutube,
  FaGooglePlus,
  FaWhatsapp,
  FaSkype,
  FaVimeo,
  FaSoundcloud,
  FaSpotify,
  FaStackOverflow,
  FaGitlab,
  FaBitbucket,
  FaJira,
  FaDocker,
  FaNpm,
  FaDev,
  FaMedium,
  FaFreeCodeCamp,
  FaCodepen,
  FaHackerrank,
  FaDribbble,
  FaBehance,
  FaTelegram,
} from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import Image from "next/image";
import { SiBento, SiLeetcode } from "react-icons/si";

export const socialMediaIcons: Record<string, JSX.Element> = {
  "facebook.com": <FaFacebook />,
  "twitter.com": <BsTwitterX />,
  "x.com": <BsTwitterX />,
  "t.me": <FaTelegram />,
  "githubprofileviewer.com": (
    <Image
      src="/icons/icon16.png"
      width={18}
      height={18}
      alt="icon"
      color="#000"
    />
  ),
  "bento.me": <SiBento />,
  "instagram.com": <FaInstagram />,
  "linkedin.com": <FaLinkedin />,
  "github.com": <FaGithub />,
  "gist.github.com": <FaGithub />,
  "leetcode.com": <SiLeetcode />,
  "snapchat.com": <FaSnapchat />,
  "pinterest.com": <FaPinterest />,
  "tumblr.com": <FaTumblr />,
  "reddit.com": <FaReddit />,
  "whatsapp.com": <FaWhatsapp />,
  "skype.com": <FaSkype />,
  "vimeo.com": <FaVimeo />,
  "soundcloud.com": <FaSoundcloud />,
  "spotify.com": <FaSpotify />,
  "stackoverflow.com": <FaStackOverflow />,
  "gitlab.com": <FaGitlab />,
  "bitbucket.com": <FaBitbucket />,
  "jira.com": <FaJira />,
  "docker.com": <FaDocker />,
  "npm.com": <FaNpm />,
  "dev.to": <FaDev />,
  "medium.com": <FaMedium />,
  "freecodecamp.com": <FaFreeCodeCamp />,
  "codepen.com": <FaCodepen />,
  "hackerrank.com": <FaHackerrank />,
  "dribbble.com": <FaDribbble />,
  "behance.com": <FaBehance />,
};
