import { Helmet } from "react-helmet";
import Button from "../components/gptbutton";
import Header from "../components/header";
import ProtButton from "../components/protfolioButton";

function Home() {
  return (
    <>
      <Helmet>
        <title>Find JOB | 홈</title>
      </Helmet>
      <Header />
      <Button />
      <ProtButton />
    </>
  );
}

export default Home;
