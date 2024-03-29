"use client";
import { useContext } from "react";
import Repository from "../repositories/Repository";
import "@/app/globals.css";
import { Box, Card, Heading } from "@radix-ui/themes";
import { StatsContext } from "@/app/context/StatsContext";

export default function ReposWrapper() {
  const statsContext = useContext(StatsContext);
  const mostStarredRepo = statsContext?.mostStarredRepo;
  const oldestRepo = statsContext?.oldestRepo;
  const updatePeriod = statsContext?.updatePeriod;
  const latestUpdatedRepo = statsContext?.latestUpdatedRepo;
  return (
    <>
      {mostStarredRepo && (
        <Box>
          <Heading size="4" className="ml-2">
            Most Starred Repository
          </Heading>
          <Repository repo={mostStarredRepo} />
        </Box>
      )}
      {oldestRepo && (
        <Box>
          <Heading size="4" className="ml-2">
            Oldest Repository
          </Heading>
          {oldestRepo && <Repository repo={oldestRepo} />}
        </Box>
      )}
      {latestUpdatedRepo && (
        <Box>
          <Heading size="4" className="ml-2">
            Latest Updated Repository
          </Heading>
          <Repository repo={latestUpdatedRepo} />
        </Box>
      )}
      {updatePeriod && (
        <Box>
          <Heading size="4" className="ml-2">
            Longest Update Period
          </Heading>
          <Repository repo={updatePeriod} />
        </Box>
      )}
    </>
  );
}
