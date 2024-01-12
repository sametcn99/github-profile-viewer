import SearchBar from "@/components/Search";

export default function Home() {
  return (
    <>
      <section className="flex flex-col items-center justify-center gap-4 py-8 text-white md:py-10 break-words text-center">
        <h1 className="text-3xl font-bold">Github Profile Viewer</h1>
        <span className="max-w-[50rem] text-center text-gray-400">
          Welcome to the Github Profile Viewer, a dynamic web platform powered
          by Next.js and NextUI. Explore GitHub and Gist profiles effortlessly,
          utilizing the GitHub REST API to retrieve comprehensive information.
          Discover a user&apos;s coding journey and contributions to the
          open-source community.
          <p className="mt-4">
            <strong>Key Features:</strong>
          </p>
          <div className="mt-2 flex list-disc flex-col pl-6">
            <span>
              View detailed repository information, including names and
              descriptions.
            </span>
            <span>Explore a user&apos;s followers and those they follow.</span>
            <span>
              Check out contribution statistics, including commit history.
            </span>
            <span>Discover public Gists and their content.</span>
          </div>
          <p className="mt-4">
            <strong>Why use Github Profile Viewer?</strong>
          </p>
          <p className="mt-2">
            Our platform provides a user-friendly interface to navigate through
            GitHub profiles efficiently. Whether you are an open-source
            enthusiast, a hiring manager, or just curious about a
            developer&apos;s work, Github Profile Viewer offers valuable
            insights.
          </p>
        </span>
        <SearchBar />
      </section>
    </>
  );
}
