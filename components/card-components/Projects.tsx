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
import Loading from "@/app/loading";

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
  const [error, setError] = useState<string | null>(null); // New state for error message
  const [isLoading, setIsloading] = useState(true);
  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getBaseUrl()}/api/repos?username=${username}`,
        );
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (fetchedData.error) {
          // If there is an error in the data, set the error state
          setError(fetchedData.error);
        } else {
          // If no error, set the data state
          setData(fetchedData.data);
        }
        setData(fetchedData.data);
        setIsloading(false);
      } catch (error) {
        console.error("Veri alınamadı:", error);
      }
    };
    fetchData();
  }, [username]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <section className="">
          {error && (
            // Display error message in a div
            <div className="mb-4 text-center font-bold text-red-500">
              Error: {error}
            </div>
          )}
          {Array.isArray(data) &&
            data.map((project, index) => (
              <Card
                className="z-10 mb-3 flex max-w-[35rem] select-none flex-col bg-opacity-50 hover:scale-105"
                key={`${project.id}-${index}`}
              >
                <CardHeader className="justify-between">
                  <div className="flex gap-5">
                    <div className="flex flex-row flex-wrap items-center">
                      <h1 className="text-small font-semibold leading-none text-default-600 hover:font-bold">
                        {project.name}
                      </h1>
                      {project.stargazers_count > 0 && (
                        <Tooltip
                          content="Total Stars"
                          delay={0}
                          closeDelay={0}
                          className="select-none bg-opacity-60 light:bg-black dark:bg-white"
                        >
                          <div className="flex scale-85 items-center gap-2 font-bold">
                            <FaStar />
                            {project.stargazers_count}
                          </div>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center justify-end gap-1">
                    {project.homepage && (
                      <a href={project.homepage} target="_blank">
                        <Button
                          className={
                            "border border-opacity-50 fill-white text-foreground transition-all duration-1000 hover:bg-zinc-700 hover:bg-opacity-50 light:fill-black dark:fill-white "
                          }
                          radius="full"
                          size="sm"
                          variant={"bordered"}
                        >
                          Website
                          <MdOpenInNew className="text-sm light:fill-black dark:fill-white" />
                        </Button>
                      </a>
                    )}
                    <a href={project.html_url} target="_blank">
                      <Button
                        className={
                          "border border-opacity-50 fill-white text-foreground transition-all duration-1000 hover:bg-zinc-700 hover:bg-opacity-50 light:fill-black dark:fill-white "
                        }
                        radius="full"
                        size="sm"
                        variant={"bordered"}
                      >
                        Source Code
                        <FaGithub className="text-sm light:fill-black dark:fill-white" />
                      </Button>
                    </a>
                  </div>
                </CardHeader>
                <CardBody className="px-3 py-0 text-small text-default-600">
                  {project.description}
                </CardBody>
                <CardFooter className="flex flex-col items-start gap-3">
                  <div className="item flex flex-col flex-wrap gap-1 text-left text-xs">
                    <p>{project.license?.spdx_id}</p>
                    <p>
                      {project.language
                        ? `Language: ${project.language}`
                        : null}
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
                  <div className="jus flex flex-row flex-wrap">
                    {project.topics.map((topic, index) => (
                      <p
                        key={index}
                        className="m-[0.063rem] mb-1 select-none rounded-2xl bg-slate-400 bg-opacity-5 p-1 text-xs font-thin hover:font-normal dark:bg-slate-900"
                      >
                        {topic}
                      </p>
                    ))}
                  </div>
                </CardFooter>
              </Card>
            ))}
        </section>
      )}
    </>
  );
};

export default Projects;