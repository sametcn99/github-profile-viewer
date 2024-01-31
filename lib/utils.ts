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

export const createUrlObject = (link: string): URL => {
  if (!link) {
    throw new Error("Link is empty");
  }
  let newLink = link.startsWith("http") ? link : `https://${link}`;
  let url = new URL(newLink);
  return url;
};

// utils.ts dosyasında fetchContact fonksiyonunu güncelle
export async function fetchContact(
  username: string,
  option: string,
  page: number, // Sayfa numarası parametresi ekle
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
