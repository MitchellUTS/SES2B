import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Results from '../components/results'

const meta = {
    title: "Results",
    description: "The page to display the results of a completed quiz.",
    //image: "/images/pfp.webp",
  };

function Home() {
  const { user, loading } = useFetchUser();
  
  return (
    <Layout user={user} loading={loading} meta={meta}>
      <h1>Results</h1>
      <Results user={user} loading={loading} />

      {loading && <p>Loading login info...</p>}
  
      {!loading && !user && (
        <p>
            {/* <a href="/api/auth/login">Login</a> to see your profile */}
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
  