// fetchUserPage.js

import React from "react";
import Header from "@/components/card-components/Header";
import TabSwitcher from "@/components/tab-switcher";
import FilterDataBar from "@/components/FilterDataBar";
import { getSiteUrl } from "@/utils/utils";

// Define TypeScript types for the profile data and search parameters
interface ProfileData {
  login: string;
  // Add other properties as needed
}

interface SearchParams {
  params: {
    username: string;
    // Add other properties as needed
  };
}
// Function to fetch user profile data
async function fetchUserProfile(username: string): Promise<ProfileData | null> {
  const profileUrl = `${getSiteUrl()}/api/profile?username=${username}`;
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
export default async function fetchUserPage(searchParams: any) {
  try {
    const username = searchParams.params.username;
    const userData = await fetchUserProfile(username);

    if (userData) {
      return (
        <section className="flex w-full select-none flex-col items-center justify-center gap-3">
          <Header profileData={userData} />
          <TabSwitcher username={username} />
        </section>
      );
    } else {
      console.log(userData);
      return (
        <div>
          Error fetching user profile. Please try again later. {userData}\
        </div>
      );
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return <div>Error fetching user profile. Please try again later.</div>;
  }
}
