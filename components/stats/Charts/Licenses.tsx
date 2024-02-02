"use client";
import "@/app/globals.css";
import { useContext } from "react";
import { StatsContext } from "@/app/context/StatsContext";
import ChartCardWrapper from "../ChartCardWrapper";

export default function Licenses() {
  const statContext = useContext(StatsContext);
  const licenses = statContext?.licenses ?? {};
  if (Object.entries(licenses).length === 0) return null;
  return <ChartCardWrapper data={licenses} title="Licenses" />;
}
