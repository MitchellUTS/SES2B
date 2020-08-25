import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Qlist from '../components/all_questions'

const meta = {
  title: "Question List",
  description: "A list of questions that Admin can view and modify",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading} meta={meta}>
      <h1>List of all questions</h1>
        <Qlist/>
    </Layout>
  )
}

export default Home;
