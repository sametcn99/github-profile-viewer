import { Octokit } from "octokit";
import { clerkClient } from "@clerk/nextjs";

export default async function createOctokitInstance(userId?: string) {
  let auth;
  if (userId !== undefined) {
    const user = await clerkClient.users.getUser(userId);
    auth = user.unsafeMetadata.token as string;
  }
  let octokit = new Octokit({
    auth: auth,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  const rateLimitResponse = await octokit.request("GET /rate_limit");
  let rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;

  if (rateLimitRemaining === 0) {
    auth = process.env.GH_TOKEN ?? "";
    octokit = new Octokit({
      auth: auth,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (auth === process.env.GH_TOKEN) {
      const rateLimitResponse = await octokit.request("GET /rate_limit");
      rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;
    }
  }
  return octokit;
}
