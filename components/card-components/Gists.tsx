// gists component
import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "@nextui-org/react";
import { FaGithub } from "react-icons/fa";
import Loading from "@/app/loading";
import { getSiteUrl } from "@/utils/utils";
import FilterDataBar from "../FilterDataBar";
import { GitHubRepo } from "@/types";
import { SortData } from "@/utils/sort-data";

// Gistss component
const Gists = ({ username }: any) => {
  // State to store GitHub API data
  const [data, setData] = useState<GitHubRepo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filterValue, setFilterValue] = useState("");

  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${getSiteUrl()}/api/gists?username=${username}`,
          { next: { revalidate: 3600 } },
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        setData(SortData(fetchedData));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  const filteredData = data
    ? data.filter((project) =>
        Object.keys(project.files).some((filename) =>
          filename.toLowerCase().includes(filterValue.toLowerCase()),
        ),
      )
    : null;

  return (
    <section className="flex flex-col items-center gap-3">
      <FilterDataBar
        setFilterValue={setFilterValue}
        count={filteredData?.length}
        totalCount={data?.length}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <section>
          {Array.isArray(data) &&
            filteredData?.map((gist, index) => (
              <Card
                className="z-10 my-3 max-w-[45rem] select-none bg-opacity-50 hover:scale-105"
                key={`${gist.id}-${index}`}
              >
                <CardHeader className="justify-between">
                  <div className="flex flex-col items-start">
                    {Object.keys(gist.files).map((filename, index) => (
                      <div key={index}>{filename}</div>
                    ))}
                  </div>
                  <div>
                    <a href={gist.html_url} target="_blank">
                      <Button
                        className={
                          "border border-opacity-50 text-foreground transition-all duration-1000 hover:bg-zinc-700 hover:bg-opacity-50 light:fill-black dark:fill-white "
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
                  {gist.description}
                </CardBody>
                <CardFooter className="flex flex-col items-start gap-3">
                  <div className="item flex flex-col flex-wrap gap-1 text-left text-xs">
                    <p>
                      Created at:{" "}
                      {new Date(gist.created_at).toLocaleDateString()}
                    </p>
                    <p>
                      Last update:{" "}
                      {new Date(gist.updated_at).toLocaleDateString()}
                    </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </section>
      )}
    </section>
  );
};

export default Gists;
