import Layout from '../../components/layout'
import { useFetchUser } from '../../lib/user'
import Qlist from '../../components/all_questions'
import TestDetails from '../../components/tests/details'
import TestResults from '../../components/test_results'
import { useRouter } from 'next/router'


const meta = {
  title: "Question List",
  description: "A list of Tests that Admin can view and modify",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  const { TestID } = router.query;

  if (!TestID) {
    return (
      <Layout user={user} loading={loading} meta={meta}>
      <h1>List of all Tests</h1>
        <Qlist/>
      <h1>Test Results</h1>
        <TestResults/>
    </Layout>
    )
  }

  return (
    <Layout user={user} loading={loading} meta={meta}>
      <h1>Test Details</h1>
        <TestDetails id={TestID}/>
    </Layout>
  )
}

export default Home;
