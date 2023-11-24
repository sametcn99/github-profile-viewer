import Header from "@/components/card-components/Header";
import TabSwitcher from "@/components/tab-switcher";
import { getBaseUrl } from "@/utils/utils";

// UserPage component
async function UserPage(searchParams: any) {
  const username = searchParams.params.username;
  const profileRes = await fetch(
    `${getBaseUrl()}/api/profile?username=${username}`,
  );
  const profile = await profileRes.json();
  const data = profile.data;

  const latestEventRes = await fetch(
    `${getBaseUrl()}/api/public-events?username=${username}`,
  );
  const latestEvent = await latestEventRes.json();
  console.log(latestEvent.latestEventDate);
  if (profile.data) {
    return (
      <section className=" flex w-full flex-col items-center">
        <Header
          login={data.login}
          created_at={data.created_at}
          updated_at={data.updated_at}
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
          hireable={data.hireable}
          type={data.type}
          followers_url={data.followers_url}
          following_url={data.following_url}
          gists_url={data.gists_url}
          latestEvent={latestEvent.latestEventDate}
        />
        <TabSwitcher username={username} />
      </section>
    );
  } else {
    // Eğer profile.data yoksa, isteği başarısız sayabilir veya başka bir işlem yapabilirsiniz.
    return null; // veya başka bir şey döndürebilirsiniz, örneğin hata mesajı içeren bir bileşen
  }
}

export default UserPage;
