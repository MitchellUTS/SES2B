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
      <h1>SES 2B Questionnaire</h1>

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
          <p>
            Profile Picture (100x100):
            <img src={user.picture} alt="user picture" width="100" height="100"/>
          </p>
          <p>Raw User Data: {JSON.stringify(user)}</p>
        </>
      )}
    </Layout>
  )
}

export default Home;
