"use client";
import Loading from "@/app/loading";
import { getSiteUrl } from "@/lib/utils";
import { UserData } from "@/types/types";
import { Avatar, Box, Heading, Link, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const RecommendedUsers = () => {
  const [randomUserData, setRandomUserData] = useState<UserData[] | []>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getSiteUrl()}/api/github?option=trending-developers`
        );
        const data = await response.json();
        // Set the fetched data to the state
        setRandomUserData(data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (randomUserData.length === 0) fetchData();

    // Set up an interval to shuffle the data every 2 seconds
    const intervalId = setInterval(() => {
      // Shuffle the array to get random users
      if (randomUserData) {
        const shuffledData = [...randomUserData]
          .sort(() => Math.random() - 0.5)
          .slice(0, 10);
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
              className="flex flex-row items-center rounded-3xl hover:bg-black hover:bg-opacity-50 gap-2 p-2 justify-start"
            >
              <Avatar
                size="3"
                fallback={item.login.charAt(0)}
                src={item.avatar_url || item.avatar_url}
              />
              <div className="flex flex-col text-start">
                <span className="text-xl font-bold">{item.login}</span>
                <span>Random {item.type}</span>
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
