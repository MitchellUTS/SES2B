import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Profile from '../components/profile'
import ProfilePage from '../components/profilePage'

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
        <ProfilePage user={user} loading={loading} />
      )}
    </Layout>
  )
}

export default Home;
