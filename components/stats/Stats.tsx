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
  getStarsPerRepo,
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
import StatTable from "./StatTable";
import StarsPerRepo from "./StarsPerRepo";

export default function Stats() {
  const { repos, loading, gists } = useContext(GithubContext);
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
  const starsPerRepo = getStarsPerRepo(repos);
  return (
    <Card>
      <Flex gap="4" direction="column">
        <Heading size="7" className="ml-2">
          Profile Statistics
        </Heading>
        {loading && (
          <Box className="flex w-full items-center justify-center">
            <Loading />
          </Box>
        )}
        {!loading && (
          <>
            <StatTable
              totalRepos={totalRepos}
              gists={gists.length}
              totalForks={totalForks}
              totalStars={totalStars}
              averageStarsPerRepo={averageStarsPerRepo}
            />
            {starsPerRepo && <StarsPerRepo starsPerRepo={starsPerRepo} />}
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
              <Box className="header-wrapper">
                <Heading size="4" className="ml-2">
                  Longest Update Period
                </Heading>
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
