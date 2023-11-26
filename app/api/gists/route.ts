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
    let userGists: any[] = [];
    let page = 1;

    // Fetch all gists for the specified user
    while (true) {
      const response = await octokit.rest.gists.listForUser({
        username,
        per_page: 100,
        page,
      });

      // Concatenate the gists from the response into userGists
      userGists = userGists.concat(response.data);

      // Check if there is another page
      const linkHeader = response.headers.link;
      if (!linkHeader || !linkHeader.includes('rel="next"')) {
        break;
      }

      page++;
    }

    // Log userGists to the console (commented out)
    // console.log("User Gists:", userGists);

    return NextResponse.json(userGists);
  } catch (error) {
    // return a JSON response
    return NextResponse.json(error);
  }
}
