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

type GitHubRepo = {
  id: number;
  name: string;
  stars: number;
  html_url: string;
  home_page: string;
  description: string;
  created_at: string;
  updated_at: string;
  topics: string[];
  license_name: string;
  license_url: string;
  language: string;
  license_key: string;
  license_spdx_id: string;
  files: string[];
};
// Gistss component
const Gists = ({ username }: any) => {
  // State to store GitHub API data
  const [data, setData] = useState<GitHubRepo[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data from GitHub API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`api/gists?username=${username}`);
        if (!response.ok) {
          throw new Error(`HTTP hata! Durum kodu: ${response.status}`);
        }
        const fetchedData = await response.json();
        // Sort the gists by updated_at in descending order
        const sortedData = Array.isArray(fetchedData)
          ? fetchedData.sort(
              (a, b) =>
                new Date(b.updated_at).getTime() -
                new Date(a.updated_at).getTime(),
            )
          : null;

        setData(sortedData);
        setIsLoading(false);
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
        <>
          {Array.isArray(data) &&
            data.map((gist, index) => (
              <Card
                className="z-10 my-3 max-w-[35rem] select-none bg-opacity-50 hover:scale-105"
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
        </>
      )}
    </>
  );
};

export default Gists;
