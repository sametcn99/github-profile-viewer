import { Card } from "@radix-ui/themes";
import ProfileCardHeader from "./ProfileCardHeader";
import ProfileCardFooter from "./ProfileCardFooter";

interface HeaderProps {
  userData: UserData;
}
export default function ProfileCard({ userData }: HeaderProps) {
  return (
    <Card className="h-fit shadow-lg shadow-black">
      <ProfileCardHeader userData={userData} />
      <ProfileCardFooter userData={userData} />
    </Card>
  );
}
