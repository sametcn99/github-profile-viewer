"use client";
import React from "react";
import { useParams, useSearchParams } from "next/navigation";

const GetUser = ({ ...props }) => {
  const searchParams = useParams();
  const userName = searchParams.username;
  return <>{userName ? <p className="text-base">| {userName}</p> : null}</>;
};

export default GetUser;
