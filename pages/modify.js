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
      <Modify  user={user} loading={loading} />
    </Layout>
  )
}

export default Home;
