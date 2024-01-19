import { getSiteUrl } from "@/lib/utils";
import { UserData } from "@/types/types";
import { GithubProvider } from "../context/context";
import TabWrapper from "../../components/TabWrapper";
import { Metadata } from "next";
import ProfileCard from "../../components/ProfileCard/ProfileCard";

interface SearchParams {
  params: {
    username: string;
  };
}

// Function to generate page metadata
export async function generateMetadata(
  searchParams: SearchParams,
): Promise<Metadata> {
  try {
    const username = searchParams.params.username;
    const response = await fetch(
      `${getSiteUrl()}/api/github?username=${username}&option=profile`,
      {
        next: { revalidate: 1000 },
      },
    );
    const data = await response.json();
    const userData: UserData = data.profile;
    if (userData) {
      return {
        title: userData.login ?? "Default Title",
        description: userData.bio ?? "",
        icons: [userData.avatar_url],
        metadataBase: new URL(`${getSiteUrl()}`),
        robots: "index, follow",
        twitter: {
          site: "@" + (userData.twitter_username ?? ""),
          title: userData.login ?? "Default Title",
          description: userData.bio ?? "",
          card: "summary_large_image",
          images: [userData.avatar_url],
          siteId: "@" + (userData.twitter_username ?? ""),
          creator: userData.twitter_username ?? "",
          creatorId: userData.twitter_username ?? "",
        },

        openGraph: {
          title: userData.login ?? "Default Title",
          description: userData.bio ?? "",
          type: "profile",
          url: `/user/${username}`,
          images: [userData.avatar_url],
          locale: "en_US",
          siteName: "GitHub Profile Viewer",
          emails: [userData.email ?? ""],
          username: userData.login ?? "",
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }
  return {
    title: "Default Title",
  };
}

// Main function to fetch user page and render components
export default async function fetchUserPage(searchParams: SearchParams) {
  try {
    const username = searchParams.params.username;
    const response = await fetch(
      `${getSiteUrl()}/api/github?username=${username}&option=profile`,
      {
        next: { revalidate: 1000 },
      },
    );
    const data = await response.json();
    const userData: UserData = data.profile;
    if (userData) {
      return (
        <>
          <ProfileCard userData={userData} />
          <GithubProvider
            username={username}
            repoCount={userData.public_repos}
            gistCount={userData.public_gists}
          >
            <TabWrapper />
          </GithubProvider>
        </>
      );
    } else {
      return <div>Error fetching user profile. Please try again later.</div>;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return <div>Error fetching user profile. Please try again later.</div>;
  }
}
