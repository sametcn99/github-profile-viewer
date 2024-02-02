import { StatsContext } from "@/app/context/StatsContext";
import { useContext } from "react";
import BarChartCardWrapper from "../BarChartCardWrapper";

export default function CreationDate() {
  const statsContext = useContext(StatsContext);
  const creationStats = statsContext?.creationStats || {};
  return (
    <BarChartCardWrapper
      data={creationStats}
      title="Repository Creation Dates"
    />
  );
}
