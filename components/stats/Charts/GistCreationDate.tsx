import { StatsContext } from "@/app/context/StatsContext";
import { useContext } from "react";
import BarChartCardWrapper from "../BarChartCardWrapper";

export default function GistCreationDate() {
  const statsContext = useContext(StatsContext);
  const gistCreationStats = statsContext?.gistCreationStats || {};
  if (Object.entries(gistCreationStats).length === 0) return null;
  return (
    <BarChartCardWrapper data={gistCreationStats} title="Gist Creation Dates" />
  );
}
