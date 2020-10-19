import Layout from "../../components/layout";
import { useFetchUser } from "../../lib/user";
import { useRouter } from "next/router";
import UserTest from "../../components/tests/userTest";

const meta = {
  title: "Test",
  description: "Please Select an Answer",
  //image: "/images/pfp.webp",
};

function Home() {
  const { user, loading } = useFetchUser();
  const router = useRouter();
  const { UserTestID: userTestID } = router.query;
  // console.log(QuizID);

  if (!userTestID) {
    return (
      <Layout user={user} loading={loading} meta={meta}>
        {
          <>
            <h1>Privacy preserving adaptive testing system</h1>
            <br />
            <h2>Yeeeet</h2>
          </>
        }
      </Layout>
    );
  }

  return (
    <Layout user={user} loading={loading} meta={meta}>
      {
        <>
          <UserTest userTestID={userTestID}></UserTest>
        </>
      }
    </Layout>
  );
}

export default Home;
