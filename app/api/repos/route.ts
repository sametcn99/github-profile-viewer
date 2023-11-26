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
    let userRepos: any[] = [];
    let page = 1;

    // Fetch repositories for the specified user until there are no more pages
    while (true) {
      const response = await octokit.rest.repos.listForUser({
        username,
        per_page: 100,
        page,
      });

      // Concatenate the repositories to the existing array
      userRepos = userRepos.concat(response.data);

      // Check if there is another page
      const linkHeader = response.headers.link;
      if (!linkHeader || !linkHeader.includes('rel="next"')) {
        break;
      }

      // Increment the page number for the next request
      page++;
    }

    return NextResponse.json(userRepos);
  } catch (error) {
    // Return a JSON response
    return NextResponse.json({
      error: "An error occurred while fetching data from GitHub API.",
      details: error,
    });
  }
}
