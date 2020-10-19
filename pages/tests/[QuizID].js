import Layout from '../../components/layout'
import { useFetchUser } from '../../lib/user'
import Test from '../../components/tests/test'
import { useRouter } from 'next/router'
import UserTest from '../../components/tests/userTest'

const meta = {
  title: "Test",
  description: "Please Select an Answer",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  const { QuizID } = router.query;
  // console.log(QuizID);

  if (!QuizID) {
    return (
      <Layout user={user} loading={loading} meta={meta}>
        {/* <Test id={QuizID}/> */}
      </Layout>
    )
  }

  return (
    <Layout user={user} loading={loading} meta={meta}>
      {/* <Test id={QuizID}/> */}
      <UserTest/>
    </Layout>
  )
}

export default Home;
