import { GitHubRepo } from "@/types/types";

export const sortByDateDesc = (property: string) => (a: any, b: any) =>
  new Date(b[property]).getTime() - new Date(a[property]).getTime();

export function sortByUpdatedDescending(data: GitHubRepo[]) {
  return data.sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateB.getTime() - dateA.getTime();
  });
}

export function sortByUpdatedAscending(data: GitHubRepo[]) {
  return data.sort((a, b) => {
    const dateA = new Date(a.updated_at);
    const dateB = new Date(b.updated_at);
    return dateA.getTime() - dateB.getTime(); // Reverse the comparison for ascending order
  });
}

export function sortByCreatedDescending(data: GitHubRepo[]) {
  return data.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateB.getTime() - dateA.getTime();
  });
}

export function sortByCreatedAscending(data: GitHubRepo[]) {
  return data.sort((a, b) => {
    const dateA = new Date(a.created_at);
    const dateB = new Date(b.created_at);
    return dateA.getTime() - dateB.getTime(); // Reverse the comparison for ascending order
  });
}
export function sortByStarsDescending(data: GitHubRepo[]) {
  return data.sort((a, b) => {
    const starsA = a.stargazers_count || 0;
    const starsB = b.stargazers_count || 0;
    return starsB - starsA;
  });
}
export function sortByStarsAscending(data: GitHubRepo[]) {
  return data.sort((a, b) => {
    const starsA = a.stargazers_count;
    const starsB = b.stargazers_count;
    return starsA - starsB; // Reverse the comparison for ascending order
  });
}

export function sortByPushedDescending(data: GitHubRepo[]) {
  return data.sort((a, b) => {
    const dateA = new Date(a.pushed_at);
    const dateB = new Date(b.pushed_at);

    // Compare dates for descending order:
    return dateB.getTime() - dateA.getTime();
  });
}
export function sortByPushedAscending(data: GitHubRepo[]) {
  return data.sort((a, b) => {
    const dateA = new Date(a.pushed_at);
    const dateB = new Date(b.pushed_at);

    // Compare dates for ascending order:
    return dateA.getTime() - dateB.getTime();
  });
}
