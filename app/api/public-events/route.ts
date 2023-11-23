import { NextResponse } from "next/server";
import { Octokit } from "octokit";

// Define an asynchronous function named GET
export async function GET() {
  // Create a new instance of Octokit with GitHub token and API version
  const octokit = new Octokit({
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
  });

  try {
    // Replace 'username' with the GitHub username whose repositories you want to fetch
    const username = "sametcn99";

    const userDetails = await octokit.request("GET /events", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
      username: username,
    });

    return NextResponse.json(userDetails);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
