"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

/**
 * LoginControl displays either a login link or user profile/logout
 * depending on whether the user is authenticated.
 * It uses the useUser hook from Clerk to get the authentication state.
 * When logged in it displays the Clerk UserButton and a link to the profile.
 * When logged out it displays a link to login via the Clerk login page.
 */
export default function LoginControl() {
  const { user } = useUser();
  return (
    <>
      {user ? (
        <>
          <UserButton />
          <Link className="font-bold hover:underline" href={"/auth/profile"}>
            Profile
          </Link>
        </>
      ) : (
        <Link
          className="font-bold hover:underline"
          href={"https://accounts.githubprofileviewer.com/"}
        >
          Login
        </Link>
      )}
    </>
  );
}
