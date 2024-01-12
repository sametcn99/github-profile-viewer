"use client";
import Gists from "@/components/Gists";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import { Box, Container, Tabs } from "@radix-ui/themes";
import React from "react";

export default function TabWrapper() {
  return (
    <div>
      <Tabs.Root defaultValue="stats">
        <Tabs.List className="w-full items-center justify-center mb-2">
          <Tabs.Trigger value="repositories">Repos</Tabs.Trigger>
          <Tabs.Trigger value="stats">Stats</Tabs.Trigger>
          <Tabs.Trigger value="gists">Gists</Tabs.Trigger>
        </Tabs.List>
        <Box>
          <Tabs.Content value="repositories">
            <Projects />
          </Tabs.Content>
          <Tabs.Content value="stats">
            <Stats />
          </Tabs.Content>
          <Tabs.Content value="gists">
            <Gists />
          </Tabs.Content>
        </Box>
      </Tabs.Root>
    </div>
  );
}
