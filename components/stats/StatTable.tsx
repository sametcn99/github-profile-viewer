import "@/app/globals.css";
import { formatNumber } from "@/lib/utils";
import { Card, Grid, Heading, Text } from "@radix-ui/themes";

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
