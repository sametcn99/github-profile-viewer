import Header from "@/components/card-components/Header";
import Projects from "@/components/card-components/Projects";
import { getBaseUrl } from "@/utils/utils";
import { Card, CardFooter, Image, Button } from "@nextui-org/react";

// UserPage component
async function UserPage(searchParams: any) {
  const username = searchParams.params.username;
  const profileRes = await fetch(
    `${getBaseUrl()}/api/profile?username=${username}`
  );
  const profile = await profileRes.json();
  const data = profile.data;
  if (profile.data) {
    return (
      <section className=" min-h-screen py-4 flex flex-row flex-wrap justify-between w-full">
        <Header
          login={data.login}
          created_at={data.created_at}
          updated_at={data.updated_at_at}
          avatar_url={data.avatar_url}
          gravatar_url={data.gravatar_url}
          html_url={data.html_url}
          name={data.name}
          bio={data.bio}
          company={data.company}
          blog={data.blog}
          location={data.location}
          email={data.email}
          followers={data.followers}
          following={data.following}
          public_repos={data.public_repos}
          public_gists={data.public_gists}
          twitter_username={data.twitter_username}
          plan={data.plan.name}
          hireable={data.hireable}
          type={data.type}
          total_private_repos={data.total_private_repos}
          owned_private_repos={data.owned_private_repos}
          disk_usage={data.disk_usage}
          collaborators={data.collaborators}
          private_gists={data.private_gists}
          total_private_gists={data.total_private_gists}
          followers_url={data.followers_url}
          following_url={data.following_url}
          gists_url={data.gists_url}
        />
        <Projects username={username} />
      </section>
    );
  } else {
    // Eğer profile.data yoksa, isteği başarısız sayabilir veya başka bir işlem yapabilirsiniz.
    console.error("Profile data not found");
    return null; // veya başka bir şey döndürebilirsiniz, örneğin hata mesajı içeren bir bileşen
  }
}

export default UserPage;
