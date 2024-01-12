"use client";
import { GithubContext } from "@/app/context/context";
import Loading from "@/app/loading";
import {
  calculateLanguageDistribution,
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
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "@/components/ui/separator";
import "@/app/globals.css";
import { formatNumber } from "@/lib/utils";
import { PieChart } from "@mui/x-charts/PieChart";
import { ScrollArea } from "./ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

  return (
    <>
      {loading && (
        <section className="flex w-full items-center justify-center">
          <Loading />
        </section>
      )}
      <Card className=" mb-4 flex flex-col gap-5 p-4 shadow">
        <CardHeader>
          <CardTitle>Repository Statistics</CardTitle>
          <CardDescription>
            These statistics are calculated using the data from the GitHub API.
          </CardDescription>
        </CardHeader>
        <Separator />
        {!loading && (
          <>
            <span className="header-title">
              Total Stars: {formatNumber(totalStars)}
            </span>
            <span className="header-title">
              Total Repositories: {totalRepos}
            </span>
            <span className="header-title">Total Forks: {totalForks}</span>
            <span className="header-title">
              Average Stars Per Repository: {averageStarsPerRepo.toFixed(2)}
            </span>
            <Separator />
            {language.length > 0 && (
              <>
                <div className=" header-wrapper rounded-2xl bg-primary w-full h-[20rem] py-2">
                  <span className="header-title">Languages</span>
                  {language.length > 0 && count.length > 0 && (
                    // <BarChart
                    //   xAxis={[
                    //     {
                    //       id: "barCategories",
                    //       data: language.slice(0, 5),
                    //       scaleType: "band",
                    //     },
                    //   ]}
                    //   series={[
                    //     {
                    //       data: count.slice(0, 5),
                    //     },
                    //   ]}
                    // />
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
                </div>
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
              </>
            )}
            {mostStarredRepo && (
              <div className=" header-wrapper">
                <span className="header-title">Most Starred Repository</span>
                <Repository repo={mostStarredRepo} />
              </div>
            )}
            <Separator />
            {oldestRepo && (
              <div className=" header-wrapper">
                <span className="header-title">Oldest Repository</span>
                {oldestRepo && <Repository repo={oldestRepo} />}
              </div>
            )}
            <Separator />
            {latestUpdatedRepo && (
              <div className="header-wrapper">
                <span className="header-title">Latest Updated Repository</span>
                <Repository repo={latestUpdatedRepo} />
              </div>
            )}
            <Separator />
            {updatePeriod && (
              <div className="header-wrapper">
                <span className="header-title">Longest Update Period</span>
                <Repository repo={updatePeriod} />
              </div>
            )}
          </>
        )}
      </Card>
    </>
  );
}
