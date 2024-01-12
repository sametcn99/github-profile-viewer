import { GitHubRepo, UserData } from "@/types/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { sortByKeyDescending } from "./utils/sort";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const getSiteUrl = () => {
  // Dynamically generate the site URL based on the environment in which the page is running.

  // Check if the environment is production.
  const isProduction = process.env.NODE_ENV === "production";

  // Define the base URL for both production and local development environments.
  const baseUrl = isProduction
    ? "https://next-github-profile-viewer.vercel.app"
    : "http://localhost:3000";

  // Return the appropriate base URL based on the environment.
  return baseUrl;
};

export const createUrlObject = (link: string) => {
  if (!link) {
    throw new Error("Link is empty");
  }
  let newLink = link.startsWith("http") ? link : `https://${link}`;
  let url = new URL(newLink);
  return url;
};

export const removeDuplicates = (arr: any[]) => {
  const uniqueData: any[] = [];
  const uniqueSet = new Set();

  for (const item of arr) {
    const key = item.login; // You may need to adjust this depending on your data structure
    if (!uniqueSet.has(key)) {
      uniqueSet.add(key);
      uniqueData.push(item);
    }
  }

  return uniqueData;
};
// Async function to fetch GitHub repositories based on a username and option
export async function fetchContact(
  username: string,
  option: string
): Promise<UserData[]> {
  // Initialize variables for pagination and repository storage
  let nextPage = 1;
  let repos: UserData[] = [];
  let completed = false;
  try {
    // Infinite loop to paginate through the user's repositories
    while (completed === false) {
      let url = `/api/github?username=${username}&option=${option}&page=${nextPage}`;
      console.log(url);
      // Fetch repositories data from the server using the provided username, option, and page number
      const reposResponse = await fetch(url);

      // Check if the response is successful; otherwise, throw an error
      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch data for ${username}`);
      }

      // Parse the JSON data from the response
      const reposJsonData = await reposResponse.json();

      // Check if there are repositories in the response
      if (reposJsonData.data.length > 0) {
        // Increment the page number for the next iteration
        nextPage++;

        // Concatenate the new repositories to the existing ones
        repos = [...repos, ...reposJsonData.data];
      } else if (reposJsonData.data.length === 0) {
        // Break the loop if there are no more repositories
        completed = true;
        break;
      }
    }
  } catch (error) {
    // Log and handle any errors that occur during the fetch process
    console.error(error);
  }
  // Return the accumulated repositories
  return repos;
}
// Async function to fetch GitHub repositories based on a username and option
export async function fetchGithub(
  username: string,
  option: string
): Promise<GitHubRepo[]> {
  // Initialize variables for pagination and repository storage
  let nextPage = 1;
  let repos: GitHubRepo[] = [];
  let completed = false;
  try {
    // Infinite loop to paginate through the user's repositories
    while (completed === false) {
      let url = `/api/github?username=${username}&option=${option}&page=${nextPage}`;
      console.log(url);
      // Fetch repositories data from the server using the provided username, option, and page number
      const reposResponse = await fetch(url);

      // Check if the response is successful; otherwise, throw an error
      if (!reposResponse.ok) {
        throw new Error(`Failed to fetch data for ${username}`);
      }

      // Parse the JSON data from the response
      const reposJsonData = await reposResponse.json();

      // Check if there are repositories in the response
      if (reposJsonData.data.length > 0) {
        // Increment the page number for the next iteration
        nextPage++;

        // Concatenate the new repositories to the existing ones
        repos = [...repos, ...reposJsonData.data];
      } else if (reposJsonData.data.length === 0) {
        // Break the loop if there are no more repositories
        completed = true;
        break;
      }
    }
  } catch (error) {
    // Log and handle any errors that occur during the fetch process
    console.error(error);
  }
  repos = sortByKeyDescending(repos, "created_at");
  // Return the accumulated repositories
  return repos;
}

export function formatNumber(number: number) {
  if (number >= 1000) {
    const formattedNumber = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    return formattedNumber;
  } else {
    return number;
  }
}
