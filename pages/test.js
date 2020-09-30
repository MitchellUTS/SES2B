import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Test from '../components/tests/test'

const meta = {
  title: "Test",
  description: "Please Select an Answer",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading} meta={meta}>
        <Test/>
    </Layout>
  )
}

export default Home;
