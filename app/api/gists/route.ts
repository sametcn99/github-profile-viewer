import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "octokit";

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
  // Create a new instance of Octokit with GitHub token and API version
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN, // GitHub token obtained from environment variables
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
  });

  try {
    // Replace 'username' with the GitHub username whose repositories you want to fetch
    // Fetch all repositories for the specified user
    const userGists = await octokit.request("GET /users/{username}/gists", {
      username: username,
    });

    // Log userRepos to the console (commented out)
    // console.log("User Repositories:", userRepos.url);

    return NextResponse.json(userGists.data);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
