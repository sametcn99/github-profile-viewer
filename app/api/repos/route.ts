import { NextResponse } from "next/server";
import { Octokit } from "octokit";
import type { NextRequest } from "next/server";

// Define an asynchronous function named GET
export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const username = nextUrl.searchParams.get("username");

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
    // Fetch all repositories for the specified user
    const userRepos = await octokit.rest.repos.listForUser({
      username,
      per_page: 100,
    });

    return NextResponse.json(userRepos);
  } catch (error) {
    // Return a JSON response
    return NextResponse.json({
      error: "An error occurred while fetching data from GitHub API.",
      details: error,
    });
  }
}
