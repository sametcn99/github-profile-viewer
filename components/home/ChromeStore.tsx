import Image from "next/image";
import Link from "next/link";

export default function ChromeStore() {
  return (
    <>
      <Link
        href="https://chromewebstore.google.com/detail/gpv-opener/abgechjdbcnlcdcmhkaakobeoimjgkmb"
        target="_blank"
      >
        <Image
          width={180}
          height={40}
          src="/icons/chrome-extension-dark.png"
          alt="GPV Opener"
          className="shadow-md shadow-gray-700 transition-all duration-500 hover:scale-105"
          fetchPriority="high"
        />
      </Link>
    </>
  );
}
