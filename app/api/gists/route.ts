import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import type { NextRequest } from "next/server";

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
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
    userAgent: "Github Profile Next UI", // Specify the user agent for the request
  });

  try {
    // Fetch repositories for the specified user until there are no more pages
    const response = await octokit.rest.gists.listForUser({
      username,
      per_page: 100,
      page: page ? parseInt(page, 10) : undefined, // Convert page to number if not null
    });

    // Increment the page number for the next request

    return NextResponse.json(response.data);
  } catch (error) {
    // Return a JSON response
    return NextResponse.json({
      error: "An error occurred while fetching data from GitHub API.",
      details: error,
    });
  }
}
