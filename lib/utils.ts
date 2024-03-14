import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes generated with clsx into a single
 * class string, to avoid long lists of classes.
 *
 * @param inputs List of class values to merge
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Dynamically generates the site URL based on the current environment.
 *
 * Checks if the environment is production, then returns the appropriate
 * base URL for that environment - either the NEXT_PUBLIC_URL env var in
 * production, or localhost in development.
 */
export const getSiteUrl = (): string => {
  // Dynamically generate the site URL based on the environment in which the page is running.

  // Check if the environment is production.
  const isProduction: boolean = process.env.NODE_ENV === "production";

  // Define the base URL for both production and local development environments.
  const baseUrl: string = isProduction
    ? process.env.NEXT_PUBLIC_URL || ""
    : "http://localhost:3000";

  // Return the appropriate base URL based on the environment.
  return baseUrl;
};

/**
 * Creates a URL object from the provided link string.
 * Validates that the link is a non-empty string before parsing.
 * Prepends 'https://' if the link does not start with 'http'.
 *
 * @param link - The link string to parse into a URL object.
 */
export const createUrlObject = (link: string) => {
  if (!link) {
    throw new Error("Link is empty");
  }
  // Ensure 'link' is a string before calling 'startsWith'
  let newLink =
    typeof link === "string" && link.startsWith("http")
      ? link
      : `https://${link}`;
  let url = new URL(newLink);
  return url;
};

/**
 * Checks if the given email address matches a valid email format.
 *
 * @param email - The email address to validate
 * @returns True if the email is valid, false otherwise
 */
export const checkEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

/**
 * Fetches user contact data from the server API.
 *
 * @param username - The username to fetch data for
 * @param option - The data option to fetch
 * @param page - The page number of results to return
 * @param signal - An AbortSignal to abort the fetch
 * @returns A promise resolving to the user data array
 * @throws Error on fetch failure
 */
export async function fetchContact(
  username: string,
  option: string,
  page: number,
  signal: AbortSignal,
): Promise<UserData[] | []> {
  try {
    // Check if the request has been aborted
    if (signal.aborted) {
      throw new DOMException("Aborted", "AbortError");
    }

    let url = `/api/github?username=${username}&option=${option}&page=${page}`;
    console.log(url);

    // Fetch data from the server using the provided username, option, and page number
    const response = await fetch(url, { signal, next: { revalidate: 1000 } });

    // Check if the response is successful; otherwise, throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch data for ${username}`);
    }

    // Parse the JSON data from the response
    const jsonData = await response.json();

    // Return the data
    return jsonData.data;
  } catch (error) {
    // Log and handle any errors that occur during the fetch process
    console.error(error);

    // Re-throw the error if it's not an AbortError
    if (error !== "AbortError") {
      throw error;
    }

    return [];
  }
}

/**
 * Formats a number by adding "." separators for thousands if the number is >= 1000.
 * Otherwise returns the number unchanged.
 * @param number - The number to potentially format
 * @returns The formatted number string or the original number
 */
export function formatNumber(number: number) {
  if (number >= 1000) {
    const formattedNumber = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return formattedNumber;
  } else {
    return number;
  }
}

/**
 * Extracts unique string values from an array of objects
 * by key and optional subKey.
 *
 * @param items - The array of objects to extract values from
 * @param key - The key to extract values from each object
 * @param subKey - Optional sub-key if value is an object
 * @returns An array of unique string values
 */
export const extractUniqueValues = <T, K extends keyof T>(
  items: T[],
  key: K,
  subKey?: Extract<keyof T[K], string>,
): string[] => {
  const uniqueSet = new Set<string>();
  items.forEach((item) => {
    const value = item[key];
    if (typeof value === "object" && value !== null && subKey !== undefined) {
      if (typeof subKey === "string" && subKey in value) {
        uniqueSet.add(String(value[subKey]));
      }
    } else if (typeof value === "string") {
      uniqueSet.add(value);
    }
  });
  return Array.from(uniqueSet);
};

// This function takes a date string as input and returns a formatted date string.
/**
 * Formats a date string into a localized long date format.
 * @param dateString - The date string to format.
 * @returns The formatted date string.
 */
export default function getFormattedDate(dateString: string): string {
  // Create a new Date object from the input date string.
  const date = new Date(dateString);

  // Use the Intl.DateTimeFormat constructor to create a formatter.
  const formatter = new Intl.DateTimeFormat("en-US", { dateStyle: "long" });

  // Use the formatter to format the date string.
  return formatter.format(date);
}

/**
 * Checks if a string is a valid URL.
 *
 * @param word - The string to check.
 * @returns True if the string is a valid URL, false otherwise.
 */
export const isUrl = (word: string) => {
  return word.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  );
};

/**
 * Checks if a given string matches a Github username pattern.
 *
 * @param word - The string to check
 * @returns True if the string starts with '@', false otherwise
 */
export const isGithubProfile = (word: string): boolean => {
  const match = word.match(/^@/);
  return match !== null;
};

/**
 * Converts a Unix timestamp (seconds since epoch) to a Date object.
 *
 * @param unixTimestamp - The Unix timestamp to convert.
 * @returns The Date object for the timestamp.
 */
export function convertUnixTimestampToDate(unixTimestamp: number): Date {
  const milliseconds = unixTimestamp * 1000;
  const date = new Date(milliseconds);
  return date;
}

/**
 * Calculates the age in years based on the given Date object.
 *
 * Accounts for leap years by checking the month and day differences.
 * Returns the age in years, months, or days depending on the differences.
 */
export function getProfileAge(dateString: Date): number {
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dateString.getFullYear();
  const monthsDiff = currentDate.getMonth() - dateString.getMonth();
  const daysDiff = currentDate.getDate() - dateString.getDate();

  if (
    monthsDiff < 0 ||
    (monthsDiff === 0 && currentDate.getDate() < dateString.getDate())
  ) {
    return age - 1;
  }

  if (age === 0) {
    if (monthsDiff === 0) {
      return daysDiff;
    }
    return monthsDiff;
  }

  return age;
}

/**
 * Returns a human-readable string representing the age difference
 * between the given date and the current date.
 * @param {Date} dateString The date to calculate the age from.
 * @returns {string} A string representing the age difference.
 */
export function getProfileAgeString(dateString: Date): string {
  const currentDate = new Date();
  const age = currentDate.getFullYear() - dateString.getFullYear();
  const monthsDiff = currentDate.getMonth() - dateString.getMonth();
  const daysDiff = currentDate.getDate() - dateString.getDate();
  const hoursDiff = currentDate.getHours() - dateString.getHours();
  const minutesDiff = currentDate.getMinutes() - dateString.getMinutes();
  let pluralSuffix = age - 1 === 1 ? "" : "s";

  if (
    monthsDiff < 0 ||
    (monthsDiff === 0 && currentDate.getDate() < dateString.getDate())
  ) {
    return `${age - 1} year${pluralSuffix}`;
  }

  if (age === 0) {
    if (monthsDiff === 0) {
      if (daysDiff === 0) {
        const hourString = hoursDiff === 1 ? "" : "s";
        const minuteString = minutesDiff === 1 ? "" : "s";
        return `${hoursDiff} hour${hourString} and ${minutesDiff} minute${minuteString}`;
      }
      return `${daysDiff} day${pluralSuffix}`;
    }
    return `${monthsDiff} month${pluralSuffix}`;
  }
  return `${age} year${pluralSuffix}`;
}
