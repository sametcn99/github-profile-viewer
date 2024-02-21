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
          height={56.25}
          width={186}
          src="/icons/chrome-extension-dark.png"
          alt="GPV Opener"
          className="shadow-md shadow-gray-700 transition-all duration-500 hover:scale-105"
          fetchPriority="high"
        />
      </Link>
    </>
  );
}
