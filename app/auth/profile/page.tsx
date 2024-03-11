"use client";
import { useState } from "react";
import { Button, Card, Grid, Tooltip } from "@radix-ui/themes";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import FaqAccordion from "@/components/auth/FaqAccordion";
import { getSiteUrl } from "@/lib/utils";
import { JsonView } from "react-json-view-lite";
export default function Page() {
  const { user } = useUser();
  const [token, setToken] = useState("");
  const [checkToken, setCheckToken] = useState(false);
  const [rateLimitRemaining, setRateLimitRemaining] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = `${getSiteUrl()}/api/github?option=rate&authId=${user?.id}`;
        if (user?.id) {
          setToken(user.unsafeMetadata.token as string);
          const response = await fetch(url);
          if (response.status === 200) {
            const data = await response.json();
            setCheckToken(true);
            setRateLimitRemaining(data.data.rate);
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
      <p className="text-3xl font-bold text-red-600">TESTING!!!</p>
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
          <input
            placeholder="Paste Your Auth Token Here"
            className="p-2"
            type="text"
            value={token}
            onChange={(e) => setToken(e.target.value)}
          />
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
      {checkToken && (
        <>
          <Card>
            API Rate: <JsonView data={rateLimitRemaining} />
          </Card>
        </>
      )}
    </>
  );
}
