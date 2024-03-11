"use client";
import { useState } from "react";
import {
  Button,
  Card,
  Grid,
  Heading,
  IconButton,
  Separator,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import FaqAccordion from "@/components/auth/FaqAccordion";
import { convertUnixTimestampToDate, getSiteUrl } from "@/lib/utils";
import { GoEyeClosed } from "react-icons/go";
import { GoEye } from "react-icons/go";

export default function Page() {
  const { user } = useUser();
  const [token, setToken] = useState("");
  const [checkToken, setCheckToken] = useState(false);
  const [rateLimitRemaining, setRateLimitRemaining] =
    useState<GitHubRateLimitResponse>();
  const [loading, setLoading] = useState(true);
  const [masked, setMasked] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${getSiteUrl()}/api/github?option=rate`;
        if (user?.id) {
          setToken(user.unsafeMetadata.token as string);
          const response = await fetch(url);
          if (response.status === 200) {
            const data = await response.json();
            console.log("data: ", data);
            setCheckToken(true);
            setRateLimitRemaining(data);
          } else {
            setCheckToken(false);
          }
        }
      } catch (error) {
        console.error("Error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <>
      <FaqAccordion />
      <Card>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            Auth Token{" "}
            {loading ? (
              <>Checking...</>
            ) : (
              <>
                {checkToken ? (
                  <Tooltip content="Authenticated Successfully">
                    <div className="h-fit w-fit">✅</div>
                  </Tooltip>
                ) : (
                  <Tooltip content="Not Authenticated">
                    <div className="h-fit w-fit">❌</div>
                  </Tooltip>
                )}
              </>
            )}
          </label>
          <span className="text-xs font-thin">
            Please be sure to grant read-only access to public repositories.
          </span>
          <div className="flex flex-row items-center gap-2">
            <input
              placeholder="Paste Your Auth Token Here"
              className="w-full rounded-xl p-2"
              type={masked ? "password" : "text"}
              value={token}
              onChange={(e) => setToken(e.target.value)}
            ></input>
            <IconButton
              onClick={() => setMasked(!masked)}
              className="transition-all duration-200 hover:scale-105 hover:cursor-pointer"
            >
              {masked ? <GoEyeClosed /> : <GoEye />}
            </IconButton>
          </div>
          <Button
            className="w-fit p-2 hover:cursor-pointer hover:underline"
            onClick={() => {
              user?.update({
                unsafeMetadata: {
                  token: token,
                },
              });
            }}
          >
            Submit
          </Button>
        </div>
      </Card>
      {checkToken && rateLimitRemaining && (
        <>
          <Card>
            <Heading size="4" className="p-2">
              Rate Limit
            </Heading>
            <Grid
              columns="2"
              width="auto"
              className="rounded-xl p-2 hover:bg-black/30"
            >
              <Heading size="4">Limit</Heading>
              <Text>{rateLimitRemaining?.data.rate.limit}</Text>
            </Grid>
            <Grid
              columns="2"
              width="auto"
              className="rounded-xl p-2 hover:bg-black/30"
            >
              <Heading size="4">Used</Heading>
              <Text>{rateLimitRemaining?.data.rate.used}</Text>
            </Grid>
            <Grid
              columns="2"
              width="auto"
              className="rounded-xl p-2 hover:bg-black/30"
            >
              <Heading size="4">Remaining</Heading>
              <Text>{rateLimitRemaining?.data.rate.remaining}</Text>
            </Grid>
            <Grid
              columns="2"
              width="auto"
              className="rounded-xl p-2 hover:bg-black/30"
            >
              <Heading size="4">Reset</Heading>
              <Text>
                {convertUnixTimestampToDate(
                  rateLimitRemaining?.data.rate.reset,
                ).toString()}
              </Text>
            </Grid>
            <Separator size={"4"} />
            <Heading size="4" className="p-2">
              Searching Rate Limit
            </Heading>
            <Grid
              columns="2"
              width="auto"
              className="rounded-xl p-2 hover:bg-black/30"
            >
              <Heading size="4">Limit</Heading>
              <Text>{rateLimitRemaining?.data.resources.search.limit}</Text>
            </Grid>
            <Grid
              columns="2"
              width="auto"
              className="rounded-xl p-2 hover:bg-black/30"
            >
              <Heading size="4">Used</Heading>
              <Text>{rateLimitRemaining?.data.resources.search.used}</Text>
            </Grid>
            <Grid
              columns="2"
              width="auto"
              className="rounded-xl p-2 hover:bg-black/30"
            >
              <Heading size="4">Remaining</Heading>
              <Text>{rateLimitRemaining?.data.resources.search.remaining}</Text>
            </Grid>
            <Grid
              columns="2"
              width="auto"
              className="rounded-xl p-2 hover:bg-black/30"
            >
              <Heading size="4">Reset</Heading>
              <Text>
                {convertUnixTimestampToDate(
                  rateLimitRemaining?.data.resources.search.reset,
                ).toString()}
              </Text>
            </Grid>
          </Card>
        </>
      )}
    </>
  );
}
