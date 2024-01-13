/**
 * Utility functions.
 */
// utils.js

// Importing GitHubRepo type from the specified module
import { GitHubRepo } from "@/types/types";

/**
 * Calculates the total number of repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {number} - Total number of repositories.
 */
/**
 * Calculates the total number of repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {number} - Total number of repositories.
 */
export const calculateTotalRepos = (repos: GitHubRepo[]): number => {
  return repos.length;
};

/**
 * Calculates the total number of stars across all repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {number} - Total number of stars.
 */
export const calculateTotalStars = (repos: GitHubRepo[]): number => {
  return repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
};

/**
 * Finds the repository with the highest number of stars.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {GitHubRepo} - Repository with the most stars.
 */
export const findMostStarredRepo = (repos: GitHubRepo[]): GitHubRepo => {
  return repos.reduce(
    (max, repo) => (max.stargazers_count > repo.stargazers_count ? max : repo),
    repos[0]
  );
};

/**
 * Finds the repository with the latest update date.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {GitHubRepo} - Repository with the latest push date.
 */
export const findLatestUpdatedRepo = (repos: GitHubRepo[]): GitHubRepo => {
  return repos.reduce(
    (latest, repo) =>
      new Date(latest.pushed_at) > new Date(repo.pushed_at) ? latest : repo,
    repos[0]
  );
};

/**
 * Calculates the total number of forked repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {number} - Total number of forked repositories.
 */
export const calculateTotalForks = (repos: GitHubRepo[]): number => {
  return repos.filter((repo) => repo.fork).length;
};

/**
 * Calculates the distribution of programming languages across all repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {Record<string, number>} - Language distribution as an object.
 */
export const calculateLanguageDistribution = (
  repos: GitHubRepo[]
): Record<string, number> => {
  const languageDistribution: Record<string, number> = {};

  repos.forEach((repo) => {
    const language = repo.language || "Unknown";
    languageDistribution[language] = (languageDistribution[language] || 0) + 1;
  });

  return languageDistribution;
};

/**
 * Calculates the distribution of repository licenses across all repositories.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {Record<string, number>} - License distribution as an object.
 */
export const calculateLicenseDistribution = (
  repos: GitHubRepo[]
): Record<string, number> => {
  const licenseDistribution: Record<string, number> = {};

  repos.forEach((repo) => {
    const license =
      repo.license_spdx_id ||
      (repo.license && repo.license.spdx_id) ||
      "Unknown";
    if (typeof license === "string") {
      licenseDistribution[license] = (licenseDistribution[license] || 0) + 1;
    } else {
      console.log(`Invalid license_spdx_id type for repo: ${repo.name}`);
      licenseDistribution["Unknown"] =
        (licenseDistribution["Unknown"] || 0) + 1;
    }
  });

  return licenseDistribution;
};

/**
 * Finds the oldest repository based on the creation date.
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {GitHubRepo | null} - Oldest repository or null if the array is empty.
 */
export const findOldestRepo = (repos: GitHubRepo[]): GitHubRepo | null => {
  return repos.reduce(
    (oldest, repo) =>
      oldest === null || new Date(repo.created_at) < new Date(oldest.created_at)
        ? repo
        : oldest,
    null as unknown as GitHubRepo
  );
};

/**
 * Finds the repository with the longest update period (difference between created_at and pushed_at).
 *
 * @param {GitHubRepo[]} repos - Array of GitHub repositories.
 * @returns {GitHubRepo | null} - Repository with the longest update period or null if the array is empty.
 */
export const findRepoWithLongestUpdatePeriod = (
  repos: GitHubRepo[]
): GitHubRepo | null => {
  if (repos.length === 0) {
    return null;
  }

  return repos.reduce(
    (latest, repo) =>
      new Date(repo.pushed_at).getTime() - new Date(repo.created_at).getTime() >
      new Date(latest.pushed_at).getTime() -
        new Date(latest.created_at).getTime()
        ? repo
        : latest,
    repos[0]
  );
};

export const calculateTopTopics = (repos: GitHubRepo[]) => {
  const topics: Record<string, number> = {};

  repos.forEach((repo) => {
    if (repo.topics) {
      repo.topics.forEach((topic) => {
        if (typeof topic === "string") {
          topics[topic] = (topics[topic] || 0) + 1;
        }
      });
    }
  });

  return topics;
};
