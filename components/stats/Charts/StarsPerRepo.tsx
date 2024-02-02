"use client";
import { useContext } from "react";
import { StatsContext } from "@/app/context/StatsContext";
import ChartCardWrapper from "../ChartCardWrapper";
export default function StarsPerRepo({}: {}) {
  const statContext = useContext(StatsContext);
  const starsPerRepo = statContext?.starsPerRepo ?? {}; // Provide an empty object as default

  if (Object.entries(starsPerRepo).length === 0) return null;
  return <ChartCardWrapper data={starsPerRepo} title="Stars per Repo" />;
}
