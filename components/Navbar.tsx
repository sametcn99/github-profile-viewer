import { Box } from "@radix-ui/themes";
import SearchBar from "./Search";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import LoginControl from "./auth/LoginControl";

const Navbar = () => {
  return (
    <Box className="flex w-full flex-row flex-wrap items-center justify-between rounded-2xl p-4">
      <div className="flex flex-row flex-wrap">
        <Link
          href="/"
          className="text-2xl font-bold text-zinc-400 hover:underline"
        >
          GPV
        </Link>
      </div>
      <div className="flex flex-row flex-wrap items-center space-x-4">
        <LoginControl />
        <SearchBar />
      </div>
    </Box>
  );
};

export default Navbar;
