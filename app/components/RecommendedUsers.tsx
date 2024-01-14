"use client";
import Loading from "@/app/loading";
import { UserData } from "@/types/types";
import { Avatar, Link } from "@radix-ui/themes";
import { useEffect, useState } from "react";

const RecommendedUsers = () => {
  const [randomUserData, setRandomUserData] = useState<UserData[] | []>([]);
  const [data, setData] = useState<UserData[] | []>([]);

  const creator: UserData = {
    login: "sametcn99",
    id: 0,
    node_id: "",
    avatar_url: "https://avatars.githubusercontent.com/u/57061347?v=4",
    gravatar_id: "",
    url: "",
    html_url: "",
    followers_url: "",
    following_url: "",
    gists_url: "",
    starred_url: "",
    subscriptions_url: "",
    organizations_url: "",
    repos_url: "",
    events_url: "",
    received_events_url: "",
    type: "Creator of GPV",
    site_admin: false,
    name: "",
    company: null,
    blog: "sametcc.me",
    location: "Ankara, Turkey",
    email: null,
    hireable: true,
    bio: "I am a junior full-stack web developer interested in Next.js, UI/UX design, backend technologies.",
    twitter_username: null,
    public_repos: 0,
    public_gists: 0,
    followers: 0,
    following: 0,
    created_at: "",
    updated_at: "",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/github?option=trending-developers`);
        const data = await response.json();
        // Set the fetched data to the state
        setData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (randomUserData.length === 0) fetchData();

    // Set up an interval to shuffle the data every 2 seconds
    const intervalId = setInterval(() => {
      // Shuffle the array to get random users
      if (randomUserData) {
        const shuffledData = [...data]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);
        // Add the creator data to the beginning of the shuffledData array
        shuffledData.unshift(creator);
        // Set the shuffled data to the state
        setRandomUserData(shuffledData);
      }
    }, 2000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, [randomUserData]); // Dependency on randomUserData to re-run effect when the data changes

  return (
    <>
      {randomUserData.length < 100 ? (
        <>
          {randomUserData.map((item: any, index: number) => (
            <Link
              href={`/${item.login}`}
              key={index}
              className="flex flex-row items-center justify-start gap-2 rounded-3xl p-2 hover:bg-black hover:bg-opacity-50"
            >
              <Avatar
                size="3"
                fallback={item.login.charAt(0)}
                src={item.avatar_url}
              />
              <div className="flex flex-col text-start">
                <span className="text-xl font-bold">{item.login}</span>
                {item.type === "Creator of GPV" ? (
                  <span>{item.type}</span>
                ) : (
                  <span>Random {item.type}</span>
                )}
              </div>
            </Link>
          ))}
        </>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default RecommendedUsers;
