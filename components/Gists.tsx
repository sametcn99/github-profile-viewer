"use client";
// gists component
import { useContext, useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { GithubContext } from "@/app/context/context";
import FilterInput from "./FilterInput";
import {
  sortByCreatedAscending,
  sortByCreatedDescending,
  sortByUpdatedAscending,
  sortByUpdatedDescending,
} from "@/lib/utils/sort";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import Loading from "@/app/loading";
import { FaGithub } from "react-icons/fa";

// Gistss component
const Gists = () => {
  // State to store GitHub API data
  const { gists, loading }: any = useContext(GithubContext);
  const [filterValue, setFilterValue] = useState("");
  const [sort, setSort] = useState("updated");

  const filteredAndSortedGists = useMemo(() => {
    const filteredGists = gists
      ? gists.filter(
          (gist: any) =>
            gist.files &&
            Object.keys(gist.files).some((filename) =>
              filename.toLowerCase().includes(filterValue.toLowerCase()),
            ),
        )
      : null;

    switch (sort) {
      // Created Ascending(artan)
      case "Created Ascending":
        return sortByCreatedAscending(filteredGists);

      // Created Descending(azalan)
      case "Created Descending":
        return sortByCreatedDescending(filteredGists);

      // Updated Ascending(artan)
      case "Updated Ascending":
        return sortByUpdatedAscending(filteredGists);

      // Updated Descending(azalan)
      case "Updated Descending":
        return sortByUpdatedDescending(filteredGists);

      // Stars Descending
      default:
        return sortByCreatedDescending(filteredGists); // Default sorting by pushed date (descending)
    }
  }, [gists, sort, filterValue]);
  return (
    <>
      {loading && (
        <div className="flex w-full items-center justify-center">
          <Loading />
        </div>
      )}
      <section className="flex flex-col gap-3">
        <div className="flex flex-row gap-3">
          <FilterInput setFilterValue={setFilterValue} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="rounded-2xl text-xl">
              <Button variant="outline">Sort By</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 rounded-2xl">
              <DropdownMenuLabel>Sort by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                <DropdownMenuRadioItem value="Updated Descending">
                  Updated Descending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Updated Ascending">
                  Updated Ascending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Created Descending">
                  Created Descending
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="Created Ascending">
                  Created Ascending
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {Array.isArray(filteredAndSortedGists) &&
          filteredAndSortedGists.map((gist, index) => (
            <Card key={index}>
              <CardHeader className="gap-4">
                <CardTitle className="flex flex-row flex-wrap items-center justify-between gap-2 break-all">
                  <div className="flex flex-row flex-wrap items-start justify-start gap-2 break-all text-start">
                    <div className="flex flex-col gap-2 break-all">
                      {Object.keys(gist.files).map((filename, index) => (
                        <span key={index}>{filename}</span>
                      ))}
                    </div>
                  </div>
                  <Button className="flex flex-row rounded-2xl">
                    <Link
                      href={gist.html_url}
                      target="_blank"
                      className="flex flex-row items-center justify-center gap-2 text-base"
                    >
                      <FaGithub /> <span>Source</span>
                    </Link>
                  </Button>
                </CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <p>{gist.description}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start">
                <div className="item flex flex-col flex-wrap gap-1 text-left text-xs">
                  <p>{gist.language ? `Language: ${gist.language}` : null}</p>
                  <p>
                    Created at: {new Date(gist.created_at).toLocaleDateString()}
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
    </>
  );
};

export default Gists;
