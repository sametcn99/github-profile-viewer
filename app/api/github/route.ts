import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createOctokitInstance from "./createOctokitInstance";
import { auth } from "@clerk/nextjs";

/**
 * Handles GitHub API requests and responses.
 *
 * Parses request parameters from nextUrl to determine which GitHub API endpoint to call.
 * Calls Octokit methods to get data from GitHub API.
 * Returns JSON response with profile, repo, gist data.
 * Handles pagination and error cases.
 */
export async function GET(request: NextRequest) {
  // Extract parameters from the request URL
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get("username");
  const option = searchParams.get("option");
  const repoCount = searchParams.get("repoCount");
  const gistCount = searchParams.get("gistCount");
  const chunk = searchParams.get("chunk");
  const page = Number(searchParams.get("page"));

  const { userId } = auth();

  let duration = Date.now();

  // Initialize Octokit instance
  let octokit = await createOctokitInstance(userId ? userId : undefined);

  // Initialize variables for data storage
  let repos = Number(repoCount);
  let gists = Number(gistCount);
  let repoData: GitHubRepo[] = [];
  let gistData: GitHubRepo[] = [];
  let profile;
  let responseData;

  // Determine the option and handle the corresponding GitHub API call
  switch (option) {
    case "get-auth-user":
      if (userId) {
        // Fetch followings data with pagination
        responseData = await octokit.rest.users.getAuthenticated();
        return NextResponse.json(responseData);
      }
      break;
    case "repos":
      if (username && repoCount && gistCount && chunk === "false") {
        // Fetch repository and gist data using pagination
        const [repoResponses, gistResponses] = await Promise.all([
          // Fetch repository data
          Promise.all(
            Array.from({ length: Math.ceil(repos / 100) }, (_, page) =>
              octokit.rest.repos.listForUser({
                username: username,
                per_page: 100,
                page: page + 1,
              }),
            ),
          ),
          // Fetch gist data
          Promise.all(
            Array.from({ length: Math.ceil(gists / 100) }, (_, page) =>
              octokit.rest.gists.listForUser({
                username: username,
                per_page: 100,
                page: page + 1,
              }),
            ),
          ),
        ]);

        // Combine paginated responses into a single array
        repoData = repoResponses.reduce(
          (accumulator: any[], response) => accumulator.concat(response.data),
          [],
        );
        gistData = gistResponses.reduce(
          (accumulator: any[], response) => accumulator.concat(response.data),
          [],
        );

        duration = Date.now() - duration;
        console.log(`${username}'s API response took ${duration}ms`); // Return JSON response with profile, repos, and gists data
        return NextResponse.json({
          repos: repoData,
          gists: gistData,
        });
      }
      break;

    case "profile":
      if (username) {
        // Fetch user profile data
        const profileResponse = await octokit.rest.users.getByUsername({
          username: username,
        });
        profile = profileResponse.data;

        // Return JSON response with profile, repos, and gists data
        return NextResponse.json({
          profile: profile,
        });
      }
      break;

    // Handle other GitHub API options
    case "trending-developers":
      // Fetch trending developers data
      responseData = await octokit.rest.users.list({
        per_page: 100,
      });
      return NextResponse.json(responseData);

    case "rate":
      // Fetch rate limit data
      responseData = await octokit.request("GET /rate_limit");
      return NextResponse.json(responseData);

    case "search":
      if (username) {
        // Fetch search results for users
        responseData = await octokit.rest.search.users({
          q: username,
          per_page: 100,
        });
        return NextResponse.json(responseData);
      }
      break;

    case "social":
      if (username) {
        // Fetch social accounts data
        responseData = await octokit.rest.users.listSocialAccountsForUser({
          username: username,
        });
        return NextResponse.json(responseData);
      }
      break;

    case "followers":
      if (username && page) {
        // Fetch followers data with pagination
        responseData = await octokit.rest.users.listFollowersForUser({
          username,
          per_page: 100,
          page: page ? Number(page) : 1,
        });
        return NextResponse.json(responseData);
      }
      break;

    case "followings":
      if (username && page) {
        // Fetch followings data with pagination
        responseData = await octokit.rest.users.listFollowingForUser({
          username,
          per_page: 100,
          page: page ? Number(page) : 1,
        });
        return NextResponse.json(responseData);
      }
      break;

    // Handle the default case for unknown options
    default:
      return NextResponse.json({
        error: "Something is missing. Please check your request parameters.",
      });
  }
}
