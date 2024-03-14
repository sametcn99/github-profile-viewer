import { authMiddleware } from "@clerk/nextjs";

/**
 * Configures authentication middleware with public and ignored routes.
 *
 * @param config - Configuration object with `publicRoutes` and `ignoredRoutes` arrays.
 * `publicRoutes` defines routes that can be accessed while signed out.
 * `ignoredRoutes` defines routes that can always be accessed without authentication.
 */
export default authMiddleware({
  // Routes that can be accessed while signed out
  publicRoutes: [
    "/",
    "/:username",
    "/api/github",
    "/api/star-history",
    "/blog/:postId",
  ],
  // Routes that can always be accessed, and have
  // no authentication information
  ignoredRoutes: [""],
});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
