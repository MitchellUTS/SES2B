import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import AboutUs from '../components/about_us'

function About_Us() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading}>
      <h1>About Us</h1>
      <AboutUs/>

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

// Abcd1234

export default About_Us;