import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Octokit } from "octokit";

// Define an asynchronous function named GET
export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const username = nextUrl.searchParams.get("username");
  const option = nextUrl.searchParams.get("option");
  const reponame = nextUrl.searchParams.get("reponame");
  const page = nextUrl.searchParams.get("page");
  let auth;

  //--- EXAMPLE USINGS ---//
  //--- /api/github?username=sametcn99&option=repos
  //--- /api/github?username=sametcn99&option=gists
  //--- /api/github?username=sametcn99&option=repo&reponame=personal-website
  //--- /api/github?username=sametcn99&option=profile
  //--- /api/github?option=search&username=sametcn99
  //--- /api/github?option=rate

  let octokit = new Octokit({
    auth: auth, // GitHub token obtained from environment variables
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
  });

  try {
    // Fetch rate limit status
    const rateLimitResponse = await octokit.request("GET /rate_limit");
    let rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;
    // let rateLimitRemaining = 0
    // Check if the rate limit allows making the request
    // if anonymous rate limit exceeded try the project api token
    if (rateLimitRemaining === 0) {
      auth = process.env.GH_TOKEN;
      octokit = new Octokit({
        auth: auth, // GitHub token obtained from environment variables
        headers: {
          "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
        },
      });
      if (auth === process.env.GH_TOKEN) {
        const rateLimitResponse = await octokit.request("GET /rate_limit");
        rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;
        if (rateLimitRemaining === 0) {
          const resetTime = new Date(
            rateLimitResponse.data.resources.core.reset * 1000
          );
          return NextResponse.json({
            error: `Rate limit exceeded. Please try again later. ${resetTime.toISOString()}`,
          });
        }
      }
    }

    let responseData;
    if (username && option) {
      // username required requests
      switch (option) {
        // Fetch profile details for the specified user
        case "profile":
          responseData = await octokit.rest.users.getByUsername({
            username,
          });
          break;

        // Fetch all repositories for the specified user
        case "repos":
          responseData = await octokit.rest.repos.listForUser({
            username,
            per_page: 100,
            page: page ? parseInt(page) : 1, // Set the page number if provided in the URL, otherwise default to 1
          });
          break;

        // Fetch all gists for the specified user
        case "gists":
          responseData = await octokit.rest.gists.listForUser({
            username,
            per_page: 100,
            page: page ? parseInt(page) : 1, // Set the page number if provided in the URL
          });
          break;

        // Fetch profile details for the specified user
        case "followers":
          responseData = await octokit.rest.users.listFollowersForUser({
            username,
            per_page: 100,
            page: page ? parseInt(page) : 1, // Set the page number if provided in the URL, otherwise default to 1
          });
          break;

        // Fetch profile details for the specified user
        case "followings":
          responseData = await octokit.rest.users.listFollowingForUser({
            username,
            per_page: 100,
            page: page ? parseInt(page) : 1, // Set the page number if provided in the URL
          });
          break;

        // Fetch profile details for the specified user
        case "social":
          responseData = await octokit.rest.users.listSocialAccountsForUser({
            username: username,
          });
          break;

        // Fetch profile details for the specified user
        case "readme":
          responseData = await octokit.rest.repos.getReadme({
            owner: username,
            repo: username,
          });
          break;

        // Fetch profile details for the specified user
        case "search":
          responseData = await octokit.rest.search.users({
            q: username,
            per_page: 10,
          });
          break;

        // Fetch repo details for the specified user and specified repository
        case "repo":
          if (!reponame) {
            return NextResponse.json({
              error: "Reponame parameter is missing in the URL.",
            });
          }
          responseData = await octokit.rest.repos.get({
            owner: username,
            repo: reponame,
          });
          break;
      }
    } else {
      // username not required requests
      switch (option) {
        case "trending-developers":
          // Fetch profile details for the specified user
          responseData = await octokit.rest.users.list({
            per_page: 100,
          });
          break;
        case "rate":
          // Fetch profile details for the specified user
          responseData = await octokit.request("GET /rate_limit");
          break;

        default:
          return NextResponse.json({
            error: `Invalid option "${option}".`,
          });
      }
    }
    return NextResponse.json(responseData);
  } catch (error) {
    // Return a JSON response
    return NextResponse.json({
      error: "An error occurred while fetching data from GitHub API.",
      details: error,
    });
  }
}
