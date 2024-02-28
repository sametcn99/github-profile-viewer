"use client";
import Loading from "@/app/loading";
import { useContext } from "react";
import "@/app/globals.css";
import { Box, Card, Flex, Heading } from "@radix-ui/themes";
import Licenses from "./Charts/Licenses";
import Topics from "./Charts/Topics";
import Languages from "./Charts/Languages";
import CreationDate from "./Charts/CreationDate";
import GistCreationDate from "./Charts/GistCreationDate";
import DownloadData from "./DownloadData";
import StatTable from "./Charts/StatTable";
import StarsPerRepo from "./Charts/StarsPerRepo";
import { StatsContext } from "@/app/context/StatsContext";
import ReposWrapper from "./ReposWrapper";

export default function Stats() {
  const statsContext = useContext(StatsContext);
  const loading = statsContext?.loading;

  return (
    <Card>
      <Flex gap="4" direction="column">
        <Heading size="7" className="ml-2">
          Profile Statistics
        </Heading>
        {loading ? (
          <Box className="flex w-full items-center justify-center">
            <Loading />
          </Box>
        ) : (
          <>
            <StatTable />
            <StarsPerRepo />
            <Languages />
            <Licenses />
            <Topics />
            <CreationDate />
            <GistCreationDate />
            <ReposWrapper />
            {/* <DownloadData /> */}
          </>
        )}
      </Flex>
    </Card>
  );
}
