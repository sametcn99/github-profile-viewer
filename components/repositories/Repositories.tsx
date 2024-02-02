"use client";
import { useContext, useMemo, useState } from "react";
import { GithubContext } from "@/app/context/GithubContext";
import { Box } from "@radix-ui/themes";
import { sortByKeyAscending, sortByKeyDescending } from "@/lib/utils/sort";
import FilterBar from "./FilterBar";
import ReposCard from "./ReposCard";
import { VList } from "virtua";
import Loading from "@/app/loading";

type SetSelectedFunction = (value: string) => void;

export default function Repositories() {
  const { repos, loading } = useContext(GithubContext);
  const [sort, setSort] = useState("Stars Descending");
  const [filterValue, setFilterValue] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [selectedLicense, setSelectedLicense] = useState("");

  const handleFilterClick = (
    value: string,
    setSelectedFunction: SetSelectedFunction,
    selectedValue: string,
  ): void => {
    setSelectedFunction(value);
    // Reset filter if the same value is clicked again
    if (value === selectedValue) {
      setSelectedFunction("");
    }
  };

  const handleTopicClick = (topic: string): void => {
    handleFilterClick(topic, setSelectedTopic, selectedTopic);
  };

  const handleLanguageClick = (language: string): void => {
    handleFilterClick(language, setSelectedLanguage, selectedLanguage);
  };

  const handleLicenseClick = (license: string): void => {
    handleFilterClick(license, setSelectedLicense, selectedLicense);
  };

  const filteredAndSortedRepos = useMemo(() => {
    const filteredRepos = repos
      ? repos.filter((repo: any) => {
          if (selectedTopic) {
            return repo.topics.includes(selectedTopic);
          }
          if (selectedLanguage) {
            return repo.language === selectedLanguage;
          }
          if (selectedLicense) {
            return repo.license?.spdx_id === selectedLicense;
          }

          const nameMatches = repo.name
            .toLowerCase()
            .includes(filterValue.toLowerCase());
          const isForked = repo.fork;
          const isNotForked = !repo.fork;

          switch (selectedFilter) {
            case "All":
              return nameMatches;
            case "Forked":
              return nameMatches && isForked;
            case "Not Forked":
              return nameMatches && isNotForked;
            default:
              return nameMatches;
          }
        })
      : [];

    switch (sort) {
      case "Created Ascending":
        return sortByKeyAscending(filteredRepos, "created_at");
      case "Created Descending":
        return sortByKeyDescending(filteredRepos, "created_at");
      case "Updated Ascending":
        return sortByKeyAscending(filteredRepos, "pushed_at");
      case "Updated Descending":
        return sortByKeyDescending(filteredRepos, "pushed_at");
      case "Stars Ascending":
        return sortByKeyAscending(filteredRepos, "stargazers_count");
      default:
        return sortByKeyDescending(filteredRepos, "stargazers_count");
    }
  }, [
    repos,
    sort,
    selectedTopic,
    selectedLanguage,
    selectedLicense,
    filterValue,
    selectedFilter,
  ]);

  const uniqueLanguages = useMemo(() => {
    const languagesSet = new Set<string>();
    filteredAndSortedRepos.forEach((repo: GitHubRepo) => {
      if (repo.language) {
        languagesSet.add(repo.language);
      }
    });
    return Array.from(languagesSet);
  }, [filteredAndSortedRepos]);

  const uniqueLicenses = useMemo(() => {
    const licenseSet = new Set<string>();
    filteredAndSortedRepos.forEach((repo: GitHubRepo) => {
      if (repo.license?.spdx_id) {
        licenseSet.add(repo.license.spdx_id);
      }
    });
    return Array.from(licenseSet);
  }, [filteredAndSortedRepos]);

  const uniqueTopics = useMemo(() => {
    const topicSet = new Set<string>();
    filteredAndSortedRepos.forEach((repo: GitHubRepo) => {
      if (Array.isArray(repo.topics)) {
        repo.topics.forEach((topic: string) => topicSet.add(topic));
      }
    });
    return Array.from(topicSet);
  }, [filteredAndSortedRepos]);

  return (
    <>
      <Box className="flex w-full flex-col gap-3">
        <FilterBar
          setFilterValue={setFilterValue}
          sort={sort}
          setSort={setSort}
          selectedLanguage={selectedLanguage}
          setSelectedLanguage={setSelectedLanguage}
          uniqueLanguages={uniqueLanguages}
          selectedTopic={selectedTopic}
          setSelectedTopic={setSelectedTopic}
          uniqueTopics={uniqueTopics}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
          uniqueLicenses={uniqueLicenses}
          selectedLicense={selectedLicense}
          setSelectedLicense={setSelectedLicense}
        />
        {loading && (
          <Box className="flex w-full items-center justify-center">
            <Loading />
          </Box>
        )}
        <VList
          style={{
            height: "85vh",
          }}
        >
          {Array.isArray(filteredAndSortedRepos) &&
            filteredAndSortedRepos.map((repo, index) => (
              <ReposCard
                key={index}
                repo={repo}
                index={index}
                selectedLanguage={selectedLanguage}
                selectedLicense={selectedLicense}
                selectedTopic={selectedTopic}
                handleTopicClick={handleTopicClick}
                handleLanguageClick={handleLanguageClick}
                handleLicenseClick={handleLicenseClick}
              />
            ))}
        </VList>
      </Box>
    </>
  );
}
