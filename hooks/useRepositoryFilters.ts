// hooks/useRepositoryFilters.ts
import { useState, useMemo } from "react";
import { sortByKeyAscending, sortByKeyDescending } from "@/lib/utils/sort";

type SetSelectedFunction = (value: string) => void;

export const useRepositoryFilters = (repos: GitHubRepo[]) => {
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
    if (value === selectedValue) {
      setSelectedFunction("");
    }
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

  return {
    sort,
    setSort,
    filterValue,
    setFilterValue,
    selectedTopic,
    setSelectedTopic,
    selectedLanguage,
    setSelectedLanguage,
    selectedFilter,
    setSelectedFilter,
    selectedLicense,
    setSelectedLicense,
    handleFilterClick,
    filteredAndSortedRepos,
  };
};
