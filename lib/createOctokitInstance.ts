import { clerkClient } from "@clerk/nextjs/server";
import { Octokit } from "octokit";

export default async function createOctokitInstance(userId?: string) {
  let auth;
  if (userId !== null && userId !== undefined) {
    const user = await clerkClient.users.getUser(userId);
    auth = user.unsafeMetadata.token as string;
  }
  let octokit = new Octokit({
    auth: auth,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });
  return octokit;
}
