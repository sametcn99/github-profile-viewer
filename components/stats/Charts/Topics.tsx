"use client";
import { useContext } from "react";
import { StatsContext } from "@/app/context/StatsContext";
import ChartCardWrapper from "../ChartCardWrapper";

export default function Topics({}: {}) {
  const statsContext = useContext(StatsContext);
  const topTopics = statsContext?.topTopics ?? {}; // Provide an empty object as default
  return <ChartCardWrapper data={topTopics} title="Topics" />;
}
