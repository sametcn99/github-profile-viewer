"use client";
import { GithubContext } from "@/app/context/context";
import Loading from "@/app/loading";
import {
  calculateLanguageDistribution,
  calculateLicenseDistribution,
  calculateTotalForks,
  calculateTotalRepos,
  calculateTotalStars,
  findLatestUpdatedRepo,
  findMostStarredRepo,
  findOldestRepo,
  findRepoWithLongestUpdatePeriod,
} from "@/lib/utils/stats";
import { useContext } from "react";
import Repository from "./Repository";
import "@/app/globals.css";
import { formatNumber } from "@/lib/utils";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts/BarChart";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Box, Card, Flex, Heading, ScrollArea, Text } from "@radix-ui/themes";

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
  return (
    <>
      {loading && (
        <Box className="flex w-full items-center justify-center">
          <Loading />
        </Box>
      )}
      <Card>
        <Flex gap="4" direction="column">
          <Heading size="7">Repository Statistics</Heading>
          <Text>
            These statistics are calculated using the data from the GitHub API.
          </Text>
          {!loading && (
            <>
              <Text>Total Stars: {formatNumber(totalStars)}</Text>
              <Text>Total Repositories: {totalRepos}</Text>
              <Text>Total Forks: {totalForks}</Text>
              <Text>
                Average Stars Per Repository: {averageStarsPerRepo.toFixed(2)}
              </Text>
              {language.length > 0 && (
                <Card>
                  <Heading className="ml-3">Top 5 Languages</Heading>
                  <Box className="w-full h-[20rem] bg-gray-400 rounded-2xl p-2">
                    {language.length > 0 && count.length > 0 && (
                      <PieChart
                        sx={{
                          color: "green", // Metin rengini burada belirtin
                          WebkitTextStrokeColor: "white",
                          fontWeight: "bold", // Fontu kalın yapmak için fontWeight özelliğini ekleyin
                        }}
                        series={[
                          {
                            data: language.slice(0, 5).map((lang, index) => ({
                              id: index.toString(),
                              value: count[index],
                              label: lang,
                            })),
                          },
                        ]}
                      />
                    )}
                  </Box>
                  {language.length > 5 && (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>See all languages</AccordionTrigger>
                        <AccordionContent>
                          <ScrollArea className="h-[15rem] w-full rounded-2xl border p-4">
                            <ul>
                              {Object.entries(languages)
                                .sort((a, b) => b[1] - a[1])
                                .map(([language, count]) => (
                                  <li key={language} className="ml-4 list-disc">
                                    {language}: {count}
                                  </li>
                                ))}
                            </ul>
                          </ScrollArea>{" "}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </Card>
              )}
              {Object.values(licenses).length > 0 && (
                <Card>
                  <Heading className="ml-3">Top 5 Licenses</Heading>
                  <Box className="w-full h-[20rem] bg-gray-400 rounded-2xl">
                    <BarChart
                      xAxis={[
                        {
                          id: "barCategories",
                          data: Object.keys(licenses).slice(0, 5),
                          scaleType: "band",
                        },
                      ]}
                      series={[
                        {
                          data: Object.values(licenses).slice(0, 5),
                        },
                      ]}
                    />
                  </Box>
                  {Object.values(licenses).length > 5 && (
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>See all Licenses</AccordionTrigger>
                        <AccordionContent>
                          <ScrollArea className="h-[15rem] w-full rounded-2xl border p-4">
                            <ul>
                              {Object.entries(licenses)
                                .sort((a, b) => b[1] - a[1])
                                .map(([license, count]) => (
                                  <li key={license} className="ml-4 list-disc">
                                    {license}: {count}
                                  </li>
                                ))}
                            </ul>
                          </ScrollArea>{" "}
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  )}
                </Card>
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
            </>
          )}
        </Flex>
      </Card>
    </>
  );
}
