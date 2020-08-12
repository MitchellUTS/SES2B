import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Profile from '../components/profile'

const meta = {
  title: "Profile",
  description: "Your profile page, a place to check and change your account details",
  //image: "/images/pfp.webp", Mabye change this to their profile picture?
};

function Home() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} meta={meta}>
      <h1>Next.js and Auth0 Example</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <p>
            <a href="/api/auth/login">Login</a> to see your profile
        </p>
      )}

      {user && (
        <>
          <p>Name: {user.name}</p>
          <p>Nickname: {user.nickname}</p>
          <img src={user.picture} alt="user picture" />
        </>
      )}
    </Layout>
  )
}

export default Home;
