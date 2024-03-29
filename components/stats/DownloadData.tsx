import { GithubContext } from "@/app/context/GithubContext";
import { Box, Button } from "@radix-ui/themes";
import { useContext } from "react";

export default function DownloadData() {
  const { repos, gists } = useContext(GithubContext);

  const download = (content: any, fileName: string, contentType: string) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });

    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();

    URL.revokeObjectURL(a.href);
  };

  const downloadRepos = () => {
    const repoData = JSON.stringify(repos, null, 2); // Convert repos to JSON format
    download(
      repoData,
      `${repos[0].owner.login}'s repositories`,
      "application/json",
    );
  };

  const downloadGists = () => {
    const gistData = JSON.stringify(gists, null, 2); // Convert gists to JSON format
    download(gistData, `${repos[0].owner.login}'s gists`, "application/json");
  };

  return (
    <Box className="flex flex-col gap-3">
      <Button onClick={downloadRepos} className="hover:cursor-pointer">
        Download Repositories
      </Button>
      <Button onClick={downloadGists} className="hover:cursor-pointer">
        Download Gists
      </Button>
    </Box>
  );
}
