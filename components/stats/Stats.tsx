"use client";
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

export default function Stats() {
  const { repos, loading, gists }: any = useContext(GithubContext);
  const totalRepos = calculateTotalRepos(repos);
  const totalStars = calculateTotalStars(repos);
  const mostStarredRepo = findMostStarredRepo(repos);
  const latestUpdatedRepo = findLatestUpdatedRepo(repos);
  const totalForks = calculateTotalForks(repos);
  const languages = calculateLanguageDistribution(repos);
  const averageStarsPerRepo = totalStars / totalRepos;
  const oldestRepo = findOldestRepo(repos);
  const updatePeriod = findRepoWithLongestUpdatePeriod(repos);
  const language = Object.keys(languages);
  const count = Object.values(languages);
  const licenses = calculateLicenseDistribution(repos);
  const topTopics = calculateTopTopics(repos);
  const creationStats = getCreationStatsByYear(repos);
  const gistCreationStats = getCreationStatsByYear(gists);
  const statsData = Object.entries(creationStats).map(([year, count]) => ({
    category: year,
    value: count,
  }));
  const gistStatsData = Object.entries(gistCreationStats).map(
    ([year, count]) => ({
      category: year,
      value: count,
    }),
  );
  return (
    <Card>
      <Flex gap="4" direction="column">
        <Heading size="7">Repository Statistics</Heading>
        {loading && (
          <Box className="flex w-full items-center justify-center">
            <Loading />
          </Box>
        )}
        {!loading && (
          <>
            <Card>
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
                <Text>{gists.length}</Text>
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
            {language.length > 0 && (
              <Languages language={language} count={count} />
            )}
            {Object.values(licenses).length > 0 && (
              <Licenses licenses={licenses} count={Object.values(licenses)} />
            )}
            {topTopics && <Topics topTopics={topTopics} />}
            {statsData.length > 0 && <CreationDate statsData={statsData} />}
            {gistStatsData.length > 0 && (
              <GistCreationDate statsData={gistStatsData} />
            )}
            {mostStarredRepo && (
              <Box>
                <Text>Most Starred Repository</Text>
                <Repository repo={mostStarredRepo} />
              </Box>
            )}

            {oldestRepo && (
              <Box>
                <Text>Oldest Repository</Text>
                {oldestRepo && <Repository repo={oldestRepo} />}
              </Box>
            )}
            {latestUpdatedRepo && (
              <Box className="header-wrapper">
                <Text>Latest Updated Repository</Text>
                <Repository repo={latestUpdatedRepo} />
              </Box>
            )}
            {updatePeriod && (
              <Box className="header-wrapper">
                <Text>Longest Update Period</Text>
                <Repository repo={updatePeriod} />
              </Box>
            )}
            <DownloadData />
          </>
        )}
      </Flex>
    </Card>
  );
}
