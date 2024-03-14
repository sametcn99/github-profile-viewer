import { getSiteUrl } from "@/lib/utils";
import { GithubProvider } from "../context/GithubContext";
import TabWrapper from "../../components/TabWrapper";
import { Metadata } from "next";
import ProfileCard from "../../components/ProfileCard/ProfileCard";
import { StatsProvider } from "../context/StatsContext";

/**
 * Interface for search parameters.
 *
 * @param params - Search parameters object with username property.
 */
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
        cache: "no-store",
      },
    );
    const data = await response.json();
    const userData: UserData = data.profile;
    if (userData) {
      return {
        title: userData.login ?? "Not Found",
        description: userData.bio ?? "",
        icons: [userData.avatar_url],
        metadataBase: new URL(`${getSiteUrl()}`),
        robots: "index, follow",
        twitter: {
          title: userData.login ?? "Default Title",
          description: userData.bio ?? "",
          card: "summary_large_image",
          images: [userData.avatar_url],
        },

        openGraph: {
          title: userData.login ?? "Default Title",
          description: userData.bio ?? "",
          url: `/${username}`,
          images: [userData.avatar_url],
          locale: "en_US",
          siteName: "GitHub Profile Viewer",
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
        cache: "no-store",
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
            user={userData}
          >
            <StatsProvider>
              <TabWrapper />
            </StatsProvider>
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
