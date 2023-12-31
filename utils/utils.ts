// Create the lib/utils.ts file or choose an existing file available in the project.

// Create a function in the lib/utils.ts file as follows:
export const getSiteUrl = () => {
  // Dynamically generate the site URL based on the environment in which the page is running.

  // Check if the environment is production.
  const isProduction = process.env.NODE_ENV === "production";

  // Define the base URL for both production and local development environments.
  const baseUrl = isProduction
    ? "https://next-github-profile-viewer.vercel.app"
    : "http://localhost:3000";

  // Return the appropriate base URL based on the environment.
  return baseUrl;
};

export const createUrlObject = (link: string) => {
  try {
    if (!link) {
      throw new Error("Link is empty");
    }
    let newLink = link.startsWith("http") ? link : `https://${link}`;
    let url = new URL(newLink);
    return url;
  } catch (error) {
    console.error("Hata:", error);
    return null;
  }
};
