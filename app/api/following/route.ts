import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

// Define an asynchronous function named GET
export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const username = nextUrl.searchParams.get("username");
  const page = nextUrl.searchParams.get("page");
  if (username === null) {
    // Handle the case where "username" is not provided in the URL
    return NextResponse.json({
      error: "Username parameter is missing in the URL.",
    });
  }
  // Create a new instance of Octokit with GitHub token and API version
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN, // GitHub token obtained from environment variables
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
  });
  try {
    const following = await octokit.request(
      `GET /users/${username}/following`,
      {
        per_page: 100, // Adjust per_page based on your needs
        page: page, // Get the page number from the query parameter
      },
    );
    const lastPageLink = following.headers.link;
    let lastPageNumber = 1; // Default to 1 if link header is not present

    if (lastPageLink) {
      const match = lastPageLink.match(/&page=(\d+)>; rel="last"/);
      if (match) {
        lastPageNumber = parseInt(match[1], 10);
      }
    }
    if (page && parseInt(page, 10) < lastPageNumber + 1) {
      // Return the following' data only if the current page is less than the last page
      return NextResponse.json(following.data);
    } else {
      return NextResponse.json({
        error: "This is the last page of following.",
      });
    }
  } catch (error: any) {
    // Explicitly type 'error' as 'any' or use a more specific type if available
    return NextResponse.json({ error: error.message });
  }
}
