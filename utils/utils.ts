export const getBaseUrl = (): string => {
  try {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      return window.location.origin;
    } else {
      // Use the actual port your Next.js app is running on during development
      return "http://localhost:3000";
    }
  } catch (error) {
    // Throw the error if it occurs
    throw error;
  }
};
