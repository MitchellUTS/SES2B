import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Profile from '../components/profile'

function Home() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading}>
      <Profile user={user} loading={loading} />
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
