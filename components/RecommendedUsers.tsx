"use client";
import { getSiteUrl } from "@/lib/utils";
import { UserData } from "@/types/types";
import { Avatar, Box, Heading, Link, Text } from "@radix-ui/themes";
import React, { useEffect, useState } from "react";

const RecommendedUsers = () => {
  const [randomUserData, setRandomUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getSiteUrl()}/api/github?option=trending-developers`
        );
        const data = await response.json();

        // Check if there is data and it has items
        if (data && data.data && data.data.length > 0) {
          // Pick a random item from the array
          const randomIndex = Math.floor(Math.random() * data.data.length);
          const randomUser = data.data[randomIndex];

          // Set the random user data to the state
          setRandomUserData(randomUser);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();

    // Set up an interval to fetch new data every 1.5 seconds (adjust as needed)
    const intervalId = setInterval(fetchData, 1500);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run the effect only once on mount

  return (
    <>
      {randomUserData ? (
        <>
          <Link
            href={`/${randomUserData.login}`}
            className="flex flex-row items-center gap-2 justify-start hover:bg-black hover:bg-opacity-50 w-[15rem] h-fit"
          >
            {randomUserData.avatar_url && (
              <Avatar
                size="3"
                fallback={randomUserData.login.charAt(0)}
                src={randomUserData.avatar_url || randomUserData.avatar_url}
              />
            )}
            <Box className="flex flex-col text-start justify-center">
              <Text size="5">{randomUserData.login}</Text>
              <Text size="2">Random {randomUserData.type}</Text>
            </Box>
          </Link>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </>
  );
};

export default RecommendedUsers;
