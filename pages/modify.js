import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Modify from '../components/forms/modify'

const meta = {
  title: "Modify",
  description: "Form to modify existing questions.",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser();

  return (
    <Layout user={user} loading={loading} meta={meta}>
      <h1>Modify Form</h1>
      <Modify user={user} loading={loading} />

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
