import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Octokit } from "octokit";

export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const username = nextUrl.searchParams.get("username");
  let auth;

  let octokit = new Octokit({
    auth: auth,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  try {
    const rateLimitResponse = await octokit.request("GET /rate_limit");
    let rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;

    if (rateLimitRemaining === 0) {
      auth = process.env.GH_TOKEN;
      octokit = new Octokit({
        auth: auth,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (auth === process.env.GH_TOKEN) {
        const rateLimitResponse = await octokit.request("GET /rate_limit");
        rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;

        if (rateLimitRemaining === 0) {
          const resetTime = new Date(
            rateLimitResponse.data.resources.core.reset * 1000,
          );

          return NextResponse.json({
            error: `Rate limit exceeded. Please try again later. ${resetTime.toISOString()}`,
          });
        }
      }
    }

    let repos = 0;
    let gists = 0;
    let repoData: any[] = [];
    let gistData: any[] = [];
    let profile;
    if (username) {
      const profileResponse = await octokit.rest.users.getByUsername({
        username: username,
      });
      profile = profileResponse.data;
      repos = profile.public_repos;
      gists = profile.public_gists;
      // Use Promise.all to fetch data for both repositories and gists concurrently
      const [repoResponses, gistResponses, socialResponse] = await Promise.all([
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
        await octokit.rest.users.listSocialAccountsForUser({
          username: username,
        }),
      ]);

      // Concatenate repo data from all pages
      repoData = repoResponses.reduce(
        (accumulator: any[], response) => accumulator.concat(response.data),
        [],
      );
      // Concatenate gist data from all pages
      gistData = gistResponses.reduce(
        (accumulator: any[], response) => accumulator.concat(response.data),
        [],
      );
    }

    return NextResponse.json({
      profile: profile,
      repos: repoData,
      gists: gistData,
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while fetching data from GitHub API.",
      details: error,
    });
  }
}
