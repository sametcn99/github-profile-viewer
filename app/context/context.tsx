"use client";
import { fetchGithub } from "@/lib/utils";
import { GitHubRepo } from "@/types/types";
import { createContext, ReactNode, useEffect, useState } from "react";

// Define the structure of the context data
export type GithubContextProps = {
  repos: GitHubRepo[] | [];
  gists: GitHubRepo[] | [];
  loading: boolean;
};

// Create a context with the defined structure
export const GithubContext = createContext<GithubContextProps | []>([]);

// Create a provider component for the GitHub context
export const GithubProvider = ({
  children,
  username,
}: {
  children: ReactNode;
  username: string;
}) => {
  // State variables for repositories, gists, and loading status
  const [repos, setRepos] = useState<GitHubRepo[] | []>([]);
  const [gists, setGists] = useState<GitHubRepo[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const repositoryData = await fetchGithub(username, "repos");
        const gistsData = await fetchGithub(username, "gists");
        setGists(gistsData);
        setRepos(repositoryData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error as needed
      }
    };
    fetchData();
  }, [username]); // Empty dependency array to run the effect only once

  // Create the context value object
  const contextValue: GithubContextProps = {
    repos,
    gists,
    loading,
  };

  // Provide the context value to the child components
  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );
};
