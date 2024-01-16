"use client";
import { GitHubRepo } from "@/types/types";
import { createContext, ReactNode, useState } from "react";

// Define the structure of the context data
export type GithubContextProps = {
  repos: GitHubRepo[] | [];
  gists: GitHubRepo[] | [];
};

// Create a context with the defined structure
// Create a context with the defined structure
export const GithubContext = createContext<GithubContextProps>({
  repos: [],
  gists: [],
});
// Create a provider component for the GitHub context
export const GithubProvider = ({
  children,
  initialRepos,
  initialGists,
}: {
  children: ReactNode;
  initialRepos: GitHubRepo[];
  initialGists: GitHubRepo[];
}) => {
  // State variables for repositories, gists, and loading status
  const [repos, setRepos] = useState<GitHubRepo[]>(initialRepos);
  const [gists, setGists] = useState<GitHubRepo[]>(initialGists);

  // Create the context value object
  const contextValue: GithubContextProps = {
    repos,
    gists,
  };

  // Provide the context value to the child components
  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );
};
