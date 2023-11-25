"use client";
import { Tabs, Tab, Card } from "@nextui-org/react";
import Projects from "./card-components/Projects";
import Gists from "./card-components/Gists";

export default function TabSwitcher({ username }: any) {
  return (
    <section className="sticky top-0 z-10 mt-2 flex w-full select-none flex-col items-center">
      <Tabs
        defaultSelectedKey={"projects"}
        aria-label="Options"
        className={`sticky top-0 z-50 flex w-full items-center justify-center p-2 lg:p-0`}
      >
        <Tab key="projects" title="Projects">
          <Projects username={username} />
        </Tab>
        <Tab key="gists" title="Gists">
          <Gists username={username} />
        </Tab>
      </Tabs>
    </section>
  );
}
