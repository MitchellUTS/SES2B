import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Tests from '../components/tests/tests'

const meta = {
  title: "Test Select",
  description: "Place for users to select their tests",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading} meta={meta}>
      <h1>Tests</h1>
        <Tests/>
    </Layout>
  )
}

export default Home;
