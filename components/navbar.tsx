import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import { Button } from "@nextui-org/button";
import { HeartFilledIcon } from "@/components/icons";
import { ThemeSwitcher } from "@/components/theme-switch";
import { GithubIcon } from "@/components/icons";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="lg" position="static">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink
            className="flex h-full w-full items-center justify-start  gap-1 break-words font-bold"
            href="/"
          >
            HOME
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className=" basis-1/5 sm:flex sm:basis-full" justify="end">
        <NavbarItem className=" gap-2 sm:flex">
          <Link isExternal href={siteConfig.links.github} aria-label="Github">
            <GithubIcon className="text-default-500" />
          </Link>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
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
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
