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
    const rateLimitResponse = await octokit.request("GET /rate_limit");
    const rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;

    // Check if the rate limit allows making the request
    if (rateLimitRemaining === 0) {
      const resetTime = new Date(
        rateLimitResponse.data.resources.core.reset * 1000,
      );
      return NextResponse.json({
        error: "Rate limit exceeded. Please try again later.",
        resetTime: resetTime.toISOString(),
      });
    }

    const rate_limit = {
      search_limit: rateLimitResponse.data.resources.search.limit,
      search_remaining: rateLimitResponse.data.resources.search.remaining,
      search_reset: rateLimitResponse.data.resources.search.reset,
      rate: rateLimitResponse.data.rate,
    };

    // Log userRepos to the console (commented out)
    // console.log("User Repositories:", userRepos.url);

    return NextResponse.json(rateLimitResponse.data);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
