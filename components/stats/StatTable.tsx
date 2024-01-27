import React from "react";
import { GithubContext } from "@/app/context/context";
import Loading from "@/app/loading";
import {
  calculateLanguageDistribution,
  calculateLicenseDistribution,
  calculateTopTopics,
  calculateTotalForks,
  calculateTotalRepos,
  calculateTotalStars,
  findLatestUpdatedRepo,
  findMostStarredRepo,
  findOldestRepo,
  findRepoWithLongestUpdatePeriod,
  getCreationStatsByYear,
} from "@/lib/utils/stats";
import { useContext } from "react";
import Repository from "../repositories/Repository";
import "@/app/globals.css";
import { formatNumber } from "@/lib/utils";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import Licenses from "./Licenses";
import Topics from "./Topics";
import Languages from "./Languages";
import CreationDate from "./CreationDate";
import GistCreationDate from "./GistCreationDate";
import DownloadData from "./DownloadData";

export default function StatTable({
  totalRepos,
  gists,
  totalForks,
  totalStars,
  averageStarsPerRepo,
}: {
  totalRepos: number;
  gists: number;
  totalForks: number;
  totalStars: number;
  averageStarsPerRepo: number;
}) {
  return (
    <Card className="">
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Repositories</Heading>
        <Text>{totalRepos}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Gists</Heading>
        <Text>{gists}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Forks</Heading>
        <Text>{totalForks}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Stars</Heading>
        <Text>{formatNumber(totalStars)}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Average Stars Per Repository</Heading>
        <Text>{averageStarsPerRepo.toFixed(2)}</Text>
      </Grid>
    </Card>
  );
}
