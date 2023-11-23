"use client";
// Projects component
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Tooltip,
} from "@nextui-org/react";
import { FaGithub, FaStar } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import { getBaseUrl } from "@/utils/utils";

type GitHubRepo = {
  id: number;
  name: string;
  stargazers_count: number;
  html_url: string;
  homepage: string;
  description: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  license_name: string;
  license_url: string;
  language: string;
  license_key: string;
  license: any;
};
// Projects component
const Projects = ({ username }: any) => {
  // State to store GitHub API data
  const [data, setData] = useState<GitHubRepo[] | null>(null);
  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getBaseUrl()}/api/repos?username=${username}`
        );
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        console.log(fetchedData);
        // sort data by stars
        //const sortedData = fetchedData.sort((a, b) => b.stars - a.stars);

        setData(fetchedData.data);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="">
      {Array.isArray(data) &&
        data.map((project, index) => (
          <Card
            className="z-10 mb-3 bg-opacity-50 select-none hover:scale-105 max-w-[35rem] flex flex-col"
            key={`${project.id}-${index}`}
          >
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <div className="flex flex-row flex-wrap items-center">
                  <h1 className="font-semibold leading-none hover:font-bold text-small text-default-600">
                    {project.name}
                  </h1>
                  {project.stargazers_count > 0 && (
                    <Tooltip
                      content="Give a star to help!"
                      delay={0}
                      closeDelay={0}
                      className="bg-black bg-opacity-60 select-none"
                    >
                      <div className="flex gap-2 items-center font-bold scale-85">
                        <FaStar />
                        {project.stargazers_count}
                      </div>
                    </Tooltip>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-1 justify-end items-center">
                {project.homepage && (
                  <a href={project.homepage} target="_blank">
                    <Button
                      className={
                        "text-foreground border border-opacity-50 border-white hover:bg-opacity-50 hover:bg-zinc-700 transition-all duration-1000 fill-white "
                      }
                      radius="full"
                      size="sm"
                      variant={"bordered"}
                    >
                      Demo
                      <MdOpenInNew className="text-sm fill-white" />
                    </Button>
                  </a>
                )}
                <a href={project.html_url} target="_blank">
                  <Button
                    className={
                      "text-foreground border border-opacity-50 border-white hover:bg-opacity-50 hover:bg-zinc-700 transition-all duration-1000 fill-white "
                    }
                    radius="full"
                    size="sm"
                    variant={"bordered"}
                  >
                    Source Code
                    <FaGithub className="text-sm fill-white" />
                  </Button>
                </a>
              </div>
            </CardHeader>
            <CardBody className="py-0 px-3 text-small text-default-600">
              {project.description}
            </CardBody>
            <CardFooter className="flex flex-col gap-3 items-start">
              <div className="flex flex-col flex-wrap gap-1 text-xs text-left item">
                <p>{project.license?.spdx_id}</p>
                <p>
                  {project.language ? `Language: ${project.language}` : null}
                </p>
                <p>
                  Created at:{" "}
                  {new Date(project.created_at).toLocaleDateString()}
                </p>
                <p>
                  Last update:{" "}
                  {new Date(project.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex flex-row flex-wrap jus">
                {project.topics.map((topic, index) => (
                  <p
                    key={index}
                    className="p-1 mb-1 text-xs font-thin bg-opacity-5 rounded-2xl select-none hover:font-normal m-[0.063rem] bg-slate-400 dark:bg-slate-900"
                  >
                    {topic}
                  </p>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
    </section>
  );
};

export default Projects;
