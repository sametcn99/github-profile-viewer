"use client";
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

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
          href={"accounts.githubprofileviewer.com"}
        >
          Login
        </Link>
      )}
    </>
  );
}
