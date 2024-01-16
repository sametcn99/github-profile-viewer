import { FaGithub } from "react-icons/fa6";
import { Box, Link } from "@radix-ui/themes";
import SearchBar from "./Search";

const Navbar = () => {
  return (
    <Box className="flex flex-row flex-wrap items-center justify-between rounded-2xl p-4">
      <div className="flex flex-row flex-wrap">
        <Link href="/" className="text-2xl font-bold  hover:underline">
          GPV
        </Link>
      </div>
      <div className="flex  flex-row flex-wrap items-center space-x-4">
        <SearchBar />
        <Link
          href="https://github.com/sametcn99"
          className="m-2 rounded-2xl text-white hover:bg-secondary"
          aria-label="Github"
          target="_blank"
        >
          <FaGithub size={25} />
        </Link>
      </div>
    </Box>
  );
};

export default Navbar;
