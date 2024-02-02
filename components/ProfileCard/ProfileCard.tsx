"use client";
import { Card } from "@radix-ui/themes";
import ProfileCardHeader from "./ProfileCardHeader";
import ProfileCardFooter from "./ProfileCardFooter";
import { useContext, useEffect } from "react";
import { GithubContext } from "@/app/context/GithubContext";

interface HeaderProps {
  userData: UserData;
}
export default function ProfileCard({ userData }: HeaderProps) {
  const { setUser } = useContext(GithubContext);

  useEffect(() => {
    setUser(userData);
  }, [userData, setUser]);

  return (
    <Card className="h-fit shadow-lg shadow-black">
      <ProfileCardHeader userData={userData} />
      <ProfileCardFooter userData={userData} />
    </Card>
  );
}
