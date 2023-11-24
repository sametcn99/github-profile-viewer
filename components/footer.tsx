import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { HeartFilledIcon } from "@/components/icons";

export default function Footer() {
  return (
    <>
      <footer className="flex w-full scale-80 flex-col items-center justify-center p-2 hover:scale-85">
        <Button
          isExternal
          as={Link}
          className="bg-default-100 text-sm font-normal text-default-600"
          href={siteConfig.links.sponsor}
          startContent={<HeartFilledIcon className="text-danger" />}
          variant="flat"
        >
          Sponsor
        </Button>
      </footer>
    </>
  );
}
