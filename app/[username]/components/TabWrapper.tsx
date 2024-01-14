"use client";
import Gists from "@/app/components/Gists";
import Repositories from "@/app/components/repositories/Repositories";
import Stats from "@/app/components/stats/Stats";
import { Box, Tabs } from "@radix-ui/themes";

export default function TabWrapper() {
  return (
    <div>
      <Tabs.Root defaultValue="stats">
        <Tabs.List className="mb-2 w-full items-center justify-center">
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
            <Repositories />
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
