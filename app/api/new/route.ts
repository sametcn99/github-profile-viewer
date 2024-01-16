import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Octokit } from "octokit";

export async function GET(request: NextRequest) {
  const nextUrl = request.nextUrl;
  const username = nextUrl.searchParams.get("username");
  const option = nextUrl.searchParams.get("option");
  const repoCount = nextUrl.searchParams.get("repoCount");
  const gistCount = nextUrl.searchParams.get("gistCount");
  const chunk = nextUrl.searchParams.get("chunk");
  const page = Number(nextUrl.searchParams.get("page"));
  let auth;

  let octokit = new Octokit({
    auth: auth,
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  try {
    const rateLimitResponse = await octokit.request("GET /rate_limit");
    let rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;

    if (rateLimitRemaining === 0) {
      auth = process.env.GH_TOKEN ?? "";
      octokit = new Octokit({
        auth: auth,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      });

      if (auth === process.env.GH_TOKEN) {
        const rateLimitResponse = await octokit.request("GET /rate_limit");
        rateLimitRemaining = rateLimitResponse.data.resources.core.remaining;

        if (rateLimitRemaining === 0) {
          const resetTime = new Date(
            rateLimitResponse.data.resources.core.reset * 1000,
          );

          return NextResponse.json({
            error: `Rate limit exceeded. Please try again later. ${resetTime.toISOString()}`,
          });
        }
      }
    }

    let repos = Number(repoCount);
    let gists = Number(gistCount);
    let repoData: any[] = [];
    let gistData: any[] = [];
    let profile;

    if (
      username &&
      option === "repos" &&
      repoCount &&
      gistCount &&
      chunk === "false"
    ) {
      // Use Promise.all to fetch data for both repositories and gists concurrently
      const [repoResponses, gistResponses] = await Promise.all([
        // Fetch repository data
        Promise.all(
          Array.from({ length: Math.ceil(repos / 100) }, (_, page) =>
            octokit.rest.repos.listForUser({
              username: username,
              per_page: 100,
              page: page + 1,
            }),
          ),
        ),

        // Fetch gist data
        Promise.all(
          Array.from({ length: Math.ceil(gists / 100) }, (_, page) =>
            octokit.rest.gists.listForUser({
              username: username,
              per_page: 100,
              page: page + 1,
            }),
          ),
        ),
      ]);

      // Concatenate repo data from all pages
      repoData = repoResponses.reduce(
        (accumulator: any[], response) => accumulator.concat(response.data),
        [],
      );
      // Concatenate gist data from all pages
      gistData = gistResponses.reduce(
        (accumulator: any[], response) => accumulator.concat(response.data),
        [],
      );
      return NextResponse.json({
        profile: profile,
        repos: repoData,
        gists: gistData,
      });
    } else if (
      username &&
      option === "repos" &&
      repoCount &&
      gistCount &&
      chunk === "true"
    ) {
      // `page` parametresi 1 tabanlı index olmalıdır.
      const currentPage = page || 1; // Eğer `page` parametresi yoksa veya geçersizse, 1 varsayalım.
      const startIndex = (currentPage - 1) * 10 + 1; // Her 1000 öğe için başlangıç sayfasını hesapla (1 tabanlı index).
      const endIndex = startIndex + 10; // Sonraki 10 sayfa için bitiş index'ini hesapla.

      // 10 ayrı istek için Promise'ları hazırla.
      const repoPromises = [];
      for (let i = startIndex; i < endIndex; i++) {
        repoPromises.push(
          octokit.rest.repos.listForUser({
            username: username,
            per_page: 100,
            page: i,
          }),
        );
      }

      // Promise.all ile tüm istekleri paralel olarak yap.
      const repoResponses = await Promise.all(repoPromises);
      // Tüm sayfalardan gelen verileri birleştir.
      repoData = repoResponses.flatMap((response) => response.data);
      return NextResponse.json({
        profile: profile,
        repos: repoData,
        gists: gistData,
      });
    } else if (option === "profile" && username) {
      const profileResponse = await octokit.rest.users.getByUsername({
        username: username,
      });
      profile = profileResponse.data;
      return NextResponse.json({
        profile: profile,
        repos: repoData,
        gists: gistData,
      });
    }
    return NextResponse.json({
      error: "Something is missing. Please check your request parameters.",
    });
  } catch (error) {
    return NextResponse.json({
      error: "An error occurred while fetching data from GitHub API.",
      details: error,
    });
  }
}
