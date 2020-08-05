import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'

function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading}>
      <h1>Next.js and Auth0 Example</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <p>
          <a href="/api/auth/login">Login</a> to get started
        </p>
      )}

      {user && (
        <>
          <a href="/api/users">Click me</a>
          <p>{JSON.stringify(user)}</p>
        </>
      )}
    </Layout>
  )
}

export default Home;
