import React from "react";
import { FaGithub } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import GetUser from "./GetUser";

const Navbar = () => {
  return (
    <nav className="flex flex-row flex-wrap items-center justify-between rounded-2xl bg-primary p-4">
      <div className="flex flex-row flex-wrap">
        <a href="/" className="text-2xl font-bold  hover:underline">
          GPV
        </a>
      </div>
      <div className="flex  flex-row flex-wrap items-center space-x-4">
        <a
          href="https://github.com/sametcn99"
          className="m-2 rounded-2xl text-white hover:bg-secondary"
          aria-label="Github"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://github.com/sponsors/sametcn99"
          className="flex items-center space-x-2 rounded-2xl  bg-secondary px-4 py-2 text-sm font-normal hover:bg-primary"
          target="_blank"
        >
          <FaHeart />
          <span>Sponsor</span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
