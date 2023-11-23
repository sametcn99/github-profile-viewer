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
    });
    // Extract specific information from each repository
    const repoDetails = userRepos.data.map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      html_url: repo.html_url,
      home_page: repo.homepage,
      topics: repo.topics,
      created_at: repo.created_at,
      updated_at: repo.updated_at,
      license_name: repo.license?.name,
      license_url: repo.license?.url,
      license_key: repo.license?.key,
      language: repo.language,
      license_spdx_id: repo.license?.spdx_id,
    }));

    return NextResponse.json(userRepos);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
