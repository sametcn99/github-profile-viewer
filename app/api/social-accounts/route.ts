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
    const social_accounts = await octokit.rest.users.listSocialAccountsForUser({
      username: username,
    });
    return NextResponse.json(social_accounts.data);
  } catch (error: any) {
    // Explicitly type 'error' as 'any' or use a more specific type if available
    return NextResponse.json({ error: error.message });
  }
}
