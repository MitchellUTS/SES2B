import Layout from '../../components/layout'
import { useFetchUser } from '../../lib/user'
import Qlist from '../../components/all_questions'
import TestResults from '../../components/test_results'
import Users from '../../components/users'

const meta = {
  title: "Question List",
  description: "A list of Tests that Admin can view and modify",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading} meta={meta}>
      <h1>Administration Tools</h1>
      <h2>Tests</h2>
        <Qlist/>
      <h2>Test Results</h2>
        <TestResults user={null}/>
      <h2>Users</h2>
        <Users/>
    </Layout>
  )
}

export default Home;
