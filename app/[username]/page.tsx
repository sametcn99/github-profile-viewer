// fetchUserPage.js

import React from "react";
import Header from "@/components/card-components/Header";
import TabSwitcher from "@/components/tab-switcher";
import { getSiteUrl } from "@/utils/utils";
import FilterDataBar from "@/components/FilterDataBar";

async function fetchUserPage(searchParams: any) {
  try {
    const username = searchParams.params.username;
    const profileRes = await fetch(
      `${getSiteUrl()}/api/profile?username=${username}`,
    );

    if (!profileRes.ok) {
      const errorText = await profileRes.text();
      throw new Error(
        `Failed to fetch profile data: ${profileRes.statusText}. ${errorText}`,
      );
    }

    const profile = await profileRes.json();
    const data = profile.data;

    if (data) {
      return (
        <section className="flex w-full select-none flex-col items-center justify-center gap-3">
          <Header profileData={data} />
          <TabSwitcher username={username} />
        </section>
      );
    } else {
      console.log(data);
      return (
        <div>Error fetching user profile. Please try again later.{data}\</div>
      );
    }
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return <div>Error fetching user profile. Please try again later.</div>;
  }
}

export default fetchUserPage;
