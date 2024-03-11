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

export const checkEmail = (email: string) => {
  const regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

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

export const isUrl = (word: string) => {
  return word.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
  );
};

export const isGithubProfile = (word: string): boolean => {
  const match = word.match(/^@/);
  return match !== null;
};

export function convertUnixTimestampToDate(unixTimestamp: number): Date {
  const milliseconds = unixTimestamp * 1000;
  const date = new Date(milliseconds);
  return date;
}
