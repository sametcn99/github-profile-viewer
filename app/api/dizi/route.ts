// pages/api/check/route.ts

import axios from "axios";
import cheerio from "cheerio";
import { NextApiResponse, NextApiRequest } from "next";

async function checkSite(
  siteUrl: string,
  metaTagNames: string[],
): Promise<{ siteUrl: string; title: string } | null> {
  try {
    // Send a GET request to the site URL with a timeout of 1 second
    const response = await axios.get(siteUrl, { timeout: 1000 });

    // Raise an error for bad responses
    if (response.status !== 200) {
      throw new Error(`Bad response status: ${response.status}`);
    }

    // Parse the HTML content of the page using Cheerio
    const $ = cheerio.load(response.data);

    // Initialize an array to store found meta tags
    const foundTags: any[] = [];

    // Loop through each specified meta tag name
    for (const metaTagName of metaTagNames) {
      // Find all meta tags with the specified name
      const metaTags = $(`meta[name="${metaTagName}"]`);
      // Extend the array of found tags with the current meta tags
      foundTags.push(...metaTags.get());
    }

    // Check if the number of found tags is equal to the number of specified meta tag names
    if (foundTags.length === metaTagNames.length) {
      // Find the title tag
      const titleTag = $("title");
      // Get the text content of the title tag or set a default value if not found
      const title = titleTag.text() || "Title not found";

      if (title.includes("Dizipal")) {
        // Return an object containing the site URL and the title
        return { siteUrl, title };
      }
    }

    // Return null if the number of found tags does not match the expected count
    return null;
  } catch (error) {
    // Return null if an error occurs (e.g., connection timeout or error)
    return null;
  }
}

async function findActiveSites(
  startRange: number,
  endRange: number,
  metaTagNames: string[],
): Promise<{ siteUrl: string; title: string }[]> {
  // Initialize an array to store active sites
  const activeSites: { siteUrl: string; title: string }[] = [];

  // Generate an array of site URLs based on the provided range
  const siteUrls = Array.from(
    { length: endRange - startRange + 1 },
    (_, i) => `https://dizipal${startRange + i}.com`,
  );

  // Use Promise.all to concurrently check multiple sites
  const results = await Promise.all(
    siteUrls.map((siteUrl) => checkSite(siteUrl, metaTagNames)),
  );

  // Filter out null values (sites that couldn't be checked or didn't meet the criteria)
  results.forEach((result) => {
    if (result !== null) {
      activeSites.push(result);
    }
  });

  // Return the array of active sites
  return activeSites;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    // Set the range of site URLs to check
    const startRange = 100;
    const endRange = 999;
    // Specify the meta tag names to look for
    const metaTagNames = ["description", "viewport"]; // Add more metaTagNames as needed
    // Find active sites within the specified range and with the specified meta tags
    const activeSites = await findActiveSites(
      startRange,
      endRange,
      metaTagNames,
    );

    // Send the results as JSON
    if (activeSites.length > 0) {
      res.json({ activeSites });
    } else {
      res.json({ message: "No active sites found." });
    }
  } catch (error) {
    // Send an error response
    res.json({
      message: `An error occurred: ${error || "Unknown error"}`,
    });
  }
}
