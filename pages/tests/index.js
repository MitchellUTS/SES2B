import Layout from '../../components/layout'
import { useFetchUser } from '../../lib/user'
import Tests from '../../components/tests/selectTests'

const meta = {
  title: "Test Select",
  description: "Place for users to select their tests",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading} meta={meta}>
      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <p>
          <a href="/api/auth/login">Login</a> to view tests
        </p>
      )}

      {user && (
        <>
          <h1>Privacy preserving adaptive testing system</h1>
          <h2>Welcome {user.nickname}</h2>
          <br/>
          <h2>Test List</h2>
          <Tests/>
        </>
      )}
    </Layout>
  )
}

export default Home;
