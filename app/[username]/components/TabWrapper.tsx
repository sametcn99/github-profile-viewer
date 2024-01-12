"use client";
import Gists from "@/components/Gists";
import Projects from "@/components/Projects";
import Stats from "@/components/Stats";
import { Box, Tabs } from "@radix-ui/themes";

export default function TabWrapper() {
  return (
    <div>
      <Tabs.Root defaultValue="stats">
        <Tabs.List className="w-full items-center justify-center mb-2">
          <Tabs.Trigger value="repositories" className="hover:cursor-pointer">
            Repos
          </Tabs.Trigger>
          <Tabs.Trigger value="stats" className="hover:cursor-pointer">
            Stats
          </Tabs.Trigger>
          <Tabs.Trigger value="gists" className="hover:cursor-pointer">
            Gists
          </Tabs.Trigger>
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
