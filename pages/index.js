import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Tests from '../components/tests/selectTests'
import TestResults from '../components/test_results'

const meta = {
  title: "Home",
  description: "The home for SES 2B and a place for students and teachers to test their maths skills",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading} meta={meta}>
      <h1>Privacy Preserving Adaptive Testing System</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <p>
          <a href="/api/auth/login">Login</a> to get started
        </p>
      )}

      {user && (
        <>
          <h2>Welcome {user.nickname}</h2>
          <br/>
          <h2>Test List</h2>
          <Tests user={user}/>
          <h2>Test History</h2>
          <TestResults user={user}/>
        </>
      )}
    </Layout>
  )
}

export default Home;
