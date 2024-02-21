import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full text-center hover:cursor-pointer hover:text-gray-400 hover:underline">
      <Link href="https://sametcc.me/github-profile-viewer" target="_blank">
        Check out the Source Code Here and Give it a Star please.
      </Link>
    </footer>
  );
}
