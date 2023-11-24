"use client";
import { useState, useEffect } from "react";
import "@/styles/globals.css";
import { siteConfig } from "@/config/site";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
import { HeartFilledIcon } from "@/components/icons";

export default function Footer() {
  const [footerVisible, setFooterVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.body.clientHeight;
      const threshold = 100;

      if (scrollPosition + windowHeight >= documentHeight - threshold) {
        setFooterVisible(true);
      } else {
        setFooterVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {footerVisible && (
        <footer className="flex w-full scale-80 flex-col items-center justify-center p-2 hover:scale-85 ">
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
      )}
    </>
  );
}
