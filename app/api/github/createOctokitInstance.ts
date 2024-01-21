import { Octokit } from "octokit";

export default async function createOctokitInstance() {
  let auth;
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

      if (rateLimitRemaining === 0) {
        const resetTime = new Date(
          rateLimitResponse.data.resources.core.reset * 1000,
        );
      }
    }
  }
  return octokit;
}
