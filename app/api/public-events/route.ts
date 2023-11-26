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
    headers: {
      "X-GitHub-Api-Version": "2022-11-28", // Specify the GitHub API version
    },
  });

  try {
    const events = await octokit.request("GET /users/:username/events", {
      username: username,
    });

    // Check if there are any events
    if (events.data.length > 0) {
      // Get the latest event
      const latestEvent = events.data[0];

      // Return the date of the latest event
      return NextResponse.json({ latestEventDate: latestEvent.created_at });
    } else {
      // If there are no events, return a message
      return NextResponse.json({ message: "No events found for the user." });
    }
  } catch (error: any) {
    // Explicitly type 'error' as 'any' or use a more specific type if available
    return NextResponse.json({ error: error.message });
  }
}
