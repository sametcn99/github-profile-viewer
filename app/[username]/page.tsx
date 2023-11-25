// fetchUserPage.js

import React from "react";
import Header from "@/components/card-components/Header";
import TabSwitcher from "@/components/tab-switcher";
import { getBaseUrl } from "@/utils/utils";

async function fetchUserPage(searchParams: any) {
  try {
    const username = searchParams.params.username;
    const profileRes = await fetch(
      `${getBaseUrl()}/api/profile?username=${username}`,
    );

    if (!profileRes.ok) {
      throw new Error(`Failed to fetch profile data: ${profileRes.statusText}`);
    }

    const profile = await profileRes.json();
    const data = profile.data;

    if (data) {
      return (
        <section className="flex w-full flex-col justify-center space-y-4">
          <Header profileData={data} />
          <TabSwitcher username={username} />
        </section>
      );
    } else {
      return <div>Error fetching user profile. Please try again later.</div>;
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return <div>Error fetching user profile. Please try again later.</div>;
  }
}

export default fetchUserPage;
