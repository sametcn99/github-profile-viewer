import { MetadataRoute } from "next";
/**
 * @export
 * @return {*}  {MetadataRoute.Robots}
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  };
}
