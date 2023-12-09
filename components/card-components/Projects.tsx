"use client";
// Projects component
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Tooltip,
} from "@nextui-org/react";
import { FaStar } from "react-icons/fa";
import { MdOpenInNew } from "react-icons/md";
import Loading from "@/app/loading";
import { getSiteUrl } from "@/utils/utils";
import FilterDataBar from "../FilterDataBar";
import CardButtons from "../CardButtons";
import OpenOn from "../OpenOn";

// Projects component
const Projects = ({ username }: any) => {
  // State to store GitHub API data
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null); // New state for error message
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);

  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getSiteUrl()}/api/repos?username=${username}&page=${page}`,
          { next: { revalidate: 3600 } },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        if (fetchedData.error) {
          // If there is an error in the data, set the error state
          setError(fetchedData.error);
        }
        if (Array.isArray(fetchedData) && fetchedData.length > 0) {
          setData((prevData) => {
            const newData = Array.isArray(fetchedData)
              ? fetchedData
              : [fetchedData];

            // Filter out duplicates by comparing with previous data
            const uniqueData = newData.filter((item) => {
              return !prevData.some((prevItem) => prevItem.id === item.id);
            });

            return [...prevData, ...uniqueData];
          });
          setIsLoading(false);
          setPage(page + 1);
          console.log(page);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page, username]);

  const filteredData = data
    ? data.filter((project) =>
        project.name.toLowerCase().includes(filterValue.toLowerCase()),
      )
    : null;

  return (
    <section className="flex flex-col flex-wrap items-center gap-3 break-all">
      <FilterDataBar
        setFilterValue={setFilterValue}
        count={filteredData?.length}
        totalCount={data?.length}
      />
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
            filteredData?.map((project, index) => (
              <Card
                className="z-10 mb-3 flex max-w-[45rem] select-none flex-col bg-opacity-50 hover:scale-105"
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
                          className="select-none bg-opacity-60 light:bg-black light:text-white dark:bg-white dark:text-black"
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
                      <CardButtons
                        href={project.homepage}
                        title="Website"
                        logo={
                          <MdOpenInNew className="text-sm light:fill-black dark:fill-white" />
                        }
                      />
                    )}
                    {/* <div className="flex flex-col items-center gap-2">
                      <CardButtons
                        href={project.html_url}
                        title="Source Code"
                        logo={<GithubIcon className="fill-white text-sm" />}
                      />
                      <CardButtons
                        href={project.html_url}
                        title="Open on Github IDE"
                        logo={<GithubIcon className="fill-white text-sm" />}
                      />
                    </div> */}
                    <OpenOn
                      github={project.html_url}
                      githubide={project.html_url.replace(
                        "github.com",
                        "github.dev",
                      )}
                    />
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
                    {project.topics.map((topic: any, index: any) => (
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
    </section>
  );
};

export default Projects;
