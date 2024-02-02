"use client";
import { createContext, ReactNode, useState, useEffect } from "react";

// Define the structure of the context data
export type GithubContextProps = {
  repos: GitHubRepo[] | [];
  gists: GitHubRepo[] | [];
  user: UserData | null;
  loading: boolean;
  setUser: (user: UserData) => void; // Add this line
};

// Create a context with the defined structure
export const GithubContext = createContext<GithubContextProps>({
  repos: [],
  gists: [],
  user: null,
  loading: false,
  setUser: () => {},
});

// Create a provider component for the GitHub context
export const GithubProvider = ({
  children,
  username,
  repoCount,
  gistCount,
}: {
  children: ReactNode;
  username: string;
  repoCount: number;
  gistCount: number;
}) => {
  const [repos, setRepos] = useState<GitHubRepo[] | []>([]);
  const [gists, setGists] = useState<GitHubRepo[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/github?username=${username}&option=repos&repoCount=${repoCount}&gistCount=${gistCount}&chunk=false`,
          {
            next: { revalidate: 1000 },
          },
        );
        const data = await response.json();
        if (data) {
          // Append new data to existing state
          setRepos(data.repos);
          setGists(data.gists);
          setLoading(false);
          console.log(data);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchData();
  }, [gistCount, repoCount, username]);

  // Create the context value object
  const contextValue = {
    repos,
    gists,
    user,
    setUser,
    loading,
  };

  // Provide the context value to the child components
  return (
    <GithubContext.Provider value={contextValue}>
      {children}
    </GithubContext.Provider>
  );
};
