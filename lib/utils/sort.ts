/**
 * Sorts an array of GitHubRepo objects by the specified key in descending order.
 * @param data - The array of GitHubRepo objects to be sorted.
 * @param key - The key based on which the sorting will be performed.
 * @returns The array of GitHubRepo objects sorted by the specified key in descending order.
 */
export function sortByKeyDescending<K extends keyof GitHubRepo>(
  data: GitHubRepo[],
  key: K,
): GitHubRepo[] {
  return data.sort((a, b) => {
    if (b[key] > a[key]) {
      return 1;
    } else if (b[key] < a[key]) {
      return -1;
    }
    return 0;
  });
}

/**
 * Sorts an array of GitHubRepo objects by the specified key in ascending order.
 * @param data - The array of GitHubRepo objects to be sorted.
 * @param key - The key based on which the sorting will be performed.
 * @returns The array of GitHubRepo objects sorted by the specified key in ascending order.
 */
export function sortByKeyAscending<K extends keyof GitHubRepo>(
  data: GitHubRepo[],
  key: K,
): GitHubRepo[] {
  return data.sort((a, b) => {
    if (a[key] > b[key]) {
      return 1;
    } else if (a[key] < b[key]) {
      return -1;
    }
    return 0;
  });
}
