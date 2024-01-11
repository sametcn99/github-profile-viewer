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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import "@/app/globals.css";
import { formatNumber } from "@/lib/utils";

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
        <span className="header-title">
          Total Stars: {formatNumber(totalStars)}
        </span>
        <span className="header-title">Total Repositories: {totalRepos}</span>
        <span className="header-title">Total Forks: {totalForks}</span>
        <span className="header-title">
          Average Stars Per Repository: {averageStarsPerRepo.toFixed(2)}
        </span>
        <Separator />
        {languages && (
          <div className=" header-wrapper">
            <span className="header-title">Languages</span>
            <ScrollArea className="h-[200px] w-full rounded-2xl border p-4">
              <ul>
                {Object.entries(languages).map(([language, count]) => (
                  <li key={language} className="ml-4 list-disc">
                    {language}: {count}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}
        <Separator />
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
      </Card>
    </>
  );
}
