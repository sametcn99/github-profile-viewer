"use client";
import "@/app/globals.css";
import { useContext } from "react";
import { StatsContext } from "@/app/context/StatsContext";
import ChartCardWrapper from "../ChartCardWrapper";

export default function Languages({}: {}) {
  const statsContext = useContext(StatsContext);
  const languages = statsContext?.languages ?? {};
  if (Object.entries(languages).length === 0) return null;
  return <ChartCardWrapper data={languages} title="Languages" />;
}
