import { StatsContext } from "@/app/context/StatsContext";
import "@/app/globals.css";
import { Card, Grid, Heading, Text } from "@radix-ui/themes";
import { useContext } from "react";

export default function StatTable({}: {}) {
  const statsContext = useContext(StatsContext);
  const {
    totalRepos,
    totalForks,
    totalStars,
    totalGists,
    averageStarsPerRepo,
    totalTopics,
  } = statsContext ?? {};

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
        <Text>{totalGists}</Text>
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
        <Text>{totalStars ?? 0}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Total Topics</Heading>
        <Text>{totalTopics ?? 0}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="rounded-xl p-2 hover:bg-black/30"
      >
        <Heading size="4">Average Stars Per Repository</Heading>
        <Text>{averageStarsPerRepo?.toFixed(2)}</Text>
      </Grid>
    </Card>
  );
}
