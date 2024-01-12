import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { Box, Link } from "@radix-ui/themes";

const Navbar = () => {
  return (
    <Box className="flex flex-row flex-wrap items-center justify-between rounded-2xl p-4">
      <div className="flex flex-row flex-wrap">
        <Link href="/" className="text-2xl font-bold  hover:underline">
          GPV
        </Link>
      </div>
      <div className="flex  flex-row flex-wrap items-center space-x-4">
        <Link
          href="https://github.com/sametcn99"
          className="m-2 rounded-2xl text-white hover:bg-secondary"
          aria-label="Github"
          target="_blank"
        >
          <FaGithub size={30} />
        </Link>
        <Link
          href="https://github.com/sponsors/sametcn99"
          className="flex items-center space-x-2 px-4 py-2"
          target="_blank"
        >
          <FaHeart />
          <span>Sponsor</span>
        </Link>
      </div>
    </Box>
  );
};

export default Navbar;
