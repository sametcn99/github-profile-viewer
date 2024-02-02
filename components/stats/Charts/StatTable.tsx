import { StatsContext } from "@/app/context/StatsContext";
import "@/app/globals.css";
import { formatNumber } from "@/lib/utils";
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
  } = statsContext ?? {};

  return (
    <Card className="">
      <Grid
        columns="2"
        width="auto"
        className="p-2 rounded-xl hover:bg-black/30"
      >
        <Heading size="4">Total Repositories</Heading>
        <Text>{totalRepos}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="p-2 rounded-xl hover:bg-black/30"
      >
        <Heading size="4">Total Gists</Heading>
        <Text>{totalGists}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="p-2 rounded-xl hover:bg-black/30"
      >
        <Heading size="4">Total Forks</Heading>
        <Text>{totalForks}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="p-2 rounded-xl hover:bg-black/30"
      >
        <Heading size="4">Total Stars</Heading>
        <Text>{totalStars ?? 0}</Text>
      </Grid>
      <Grid
        columns="2"
        width="auto"
        className="p-2 rounded-xl hover:bg-black/30"
      >
        <Heading size="4">Average Stars Per Repository</Heading>
        <Text>{averageStarsPerRepo}</Text>
      </Grid>
    </Card>
  );
}
