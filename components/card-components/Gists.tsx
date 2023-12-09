// gists component
import { useEffect, useState } from "react";
import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import Loading from "@/app/loading";
import { getSiteUrl } from "@/utils/utils";
import FilterDataBar from "../FilterDataBar";
import CardButtons from "../CardButtons";
import { GithubIcon } from "../icons";

// Gistss component
const Gists = ({ username }: any) => {
  // State to store GitHub API data
  const [data, setData] = useState<any[]>([]);
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
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [page, username]);

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
                  <CardButtons
                    href={gist.html_url}
                    title="Source Code"
                    logo={<GithubIcon className="fill-white text-sm" />}
                  />
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
