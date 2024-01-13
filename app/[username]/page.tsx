// fetchUserPage.js
import { getSiteUrl } from "@/lib/utils";
import Header from "./components/Header/Header";
import { UserData } from "@/types/types";
import { GithubProvider } from "../context/context";
import TabWrapper from "./components/TabWrapper";

interface SearchParams {
  params: {
    username: string;
    // Add other properties as needed
  };
}

// Function to fetch user profile data
async function fetchUserProfile(username: string): Promise<UserData | null> {
  const profileUrl = `${getSiteUrl()}/api/github?option=profile&username=${username}`;
  const profileRes = await fetch(profileUrl, {
    next: { revalidate: 3600 },
  });

  if (!profileRes.ok) {
    const errorText = await profileRes.text();
    throw new Error(
      `Failed to fetch profile data: ${profileRes.statusText}. ${errorText}`,
    );
  }

  const profile = await profileRes.json();
  return profile.data || null;
}

// Function to generate page metadata
export async function generateMetadata(
  searchParams: SearchParams,
): Promise<{ title: string }> {
  try {
    const username = searchParams.params.username;
    const userData = await fetchUserProfile(username);

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
    const userData: UserData | null = await fetchUserProfile(username);

    if (userData) {
      return (
        <GithubProvider username={userData.login}>
          <Header userData={userData} />
          <TabWrapper />
        </GithubProvider>
      );
    } else {
      return <div>Error fetching user profile. Please try again later.</div>;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return <div>Error fetching user profile. Please try again later.</div>;
  }
}
