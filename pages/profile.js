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
      <h1>Your Profile</h1>

      {loading && <p>Loading login info...</p>}

      {!loading && !user && (
        <p>
            <a href="/api/auth/login">Login</a> to see your profile
        </p>
      )}

      {user && (
      <>
        <div className="container">
          <h3>Name</h3>
          <p>
            {user.name}
          </p>
            <h3>Nickname</h3>
          <p>
            {user.nickname}
          </p>
            <h3>Profile Picture (100x100)</h3>
          <p>
            <img src={user.picture} alt="user picture" width="100" height="100"/>
          </p>
            {/* <p>Raw User Data: {JSON.stringify(user)}</p> */}
        </div>

        <style jsx>{`
          .container{
            border-radius: 5px;
            background-color: #72747252;
            padding: 20px;
          }
        `
        }
        </style>
        </>
      )}
    </Layout>
  )
}

export default Home;
