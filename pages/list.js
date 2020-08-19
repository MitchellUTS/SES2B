import Layout from '../components/layout'
import { useFetchUser } from '../lib/user'
import Qlist from '../components/all_questions'

function Home() {
  const { user, loading } = useFetchUser()

  return (
    <Layout user={user} loading={loading}>
      <h1>List of all questions</h1>
        <Qlist />
      
    </Layout>
  )
}

export default Home;
