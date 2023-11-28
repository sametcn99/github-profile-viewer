import { NextResponse } from "next/server";
import { Octokit } from "octokit";

// Define an asynchronous function named GET
export async function GET() {
  // Create a new instance of Octokit with GitHub token and API version
  const octokit = new Octokit({
    auth: process.env.GH_TOKEN, // GitHub token obtained from environment variables
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
  });

  try {
    // Fetch rate limit status
    const rateLimitResponse = await octokit.rest.rateLimit.get();
    return NextResponse.json(rateLimitResponse.data);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
