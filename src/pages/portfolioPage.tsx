import { Helmet } from "react-helmet";
import Header from "../components/header";
import PortfolioMake from "../components/portfolioMake";

function Protfolio() {
  return (
    <>
      <Helmet>
        <title>Find JOB | 포트폴리오</title>
      </Helmet>
      <Header />
      <PortfolioMake />
    </>
  );
}

export default Protfolio;
