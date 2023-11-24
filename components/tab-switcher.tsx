"use client";
import { Tabs, Tab } from "@nextui-org/react";
import Projects from "./card-components/Projects";
import Gists from "./card-components/Gists";

export default function TabSwitcher({ username }: any) {
  return (
    <>
      <div className="z-10 flex select-none flex-col items-center px-5">
        <Tabs
          defaultSelectedKey={"projects"}
          aria-label="Options"
          className={`sticky top-0 z-50 flex w-full items-center justify-center p-2 `}
        >
          <Tab key="projects" title="Projects">
            <Projects username={username} />
          </Tab>
          <Tab key="gists" title="Gists">
            <Gists username={username} />
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
