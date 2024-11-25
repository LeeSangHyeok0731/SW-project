import { Helmet } from "react-helmet";
import Button from "../components/button";
import Header from "../components/header";

function Home() {
  return (
    <>
      <Helmet>
        <title>Find JOB | 홈</title>
      </Helmet>
      <Header />
      <Button />
    </>
  );
}

export default Home;
