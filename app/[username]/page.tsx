// fetchUserPage.js
import { getSiteUrl } from "@/lib/utils";
import Header from "./components/Header/Header";
import { GitHubRepo, SocialLink, UserData } from "@/types/types";
import { GithubProvider } from "../context/context";
import TabWrapper from "./components/TabWrapper";

interface SearchParams {
  params: {
    username: string;
  };
}

// Function to generate page metadata
export async function generateMetadata(
  searchParams: SearchParams,
): Promise<{ title: string }> {
  try {
    const username = searchParams.params.username;
    const response = await fetch(
      `${getSiteUrl()}/api/github?username=${username}&option=profile`,
    );
    const data = await response.json();
    const userData = data.profile;
    if (userData) {
      return {
        title: userData.login,
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
    );
    const data = await response.json();
    const userData: UserData = data.profile;
    if (userData) {
      return (
        <>
          <Header userData={userData} />
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
