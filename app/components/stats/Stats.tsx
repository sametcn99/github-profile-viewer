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
import { Box, Card, Flex, Heading, Text } from "@radix-ui/themes";
import Licenses from "./Licenses";
import Topics from "./Topics";
import Languages from "./Languages";
import CreationDate from "./CreationDate";

export default function Stats() {
  const { repos, loading }: any = useContext(GithubContext);
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
  const statsData = Object.entries(creationStats).map(([year, count]) => ({
    category: year,
    value: count,
  }));

  return (
    <>
      <Card>
        <Flex gap="4" direction="column">
          <Heading size="7">Repository Statistics</Heading>
          <Text>
            These statistics are calculated using the data from the GitHub API.
          </Text>
          {loading && (
            <Box className="flex w-full items-center justify-center">
              <Loading />
            </Box>
          )}
          {!loading && (
            <>
              <Text>Total Stars: {formatNumber(totalStars)}</Text>
              <Text>Total Repositories: {totalRepos}</Text>
              <Text>Total Forks: {totalForks}</Text>
              <Text>
                Average Stars Per Repository: {averageStarsPerRepo.toFixed(2)}
              </Text>
              {language.length > 0 && (
                <Languages language={language} count={count} />
              )}
              {Object.values(licenses).length > 0 && (
                <Licenses licenses={licenses} count={Object.values(licenses)} />
              )}
              {topTopics && <Topics topTopics={topTopics} />}
              {statsData.length > 0 && <CreationDate statsData={statsData} />}
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
            </>
          )}
        </Flex>
      </Card>
    </>
  );
}
