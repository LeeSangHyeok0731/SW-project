import styled from "styled-components";
import MainLogo from "../assets/mainLogoSvg";
import { useNavigate } from "react-router-dom";

const HeaderWrapper = styled.div`
  width: 100vw;
  height: 84px;
  background-color: #41c777;
  display: flex;
  align-items: center;
`;

const LogoBox = styled.div`
  margin-left: 420px;
`;

function Header() {
  const navigate = useNavigate();

  const go = () => {
    navigate("/");
  };

  return (
    <>
      <HeaderWrapper>
        <LogoBox onClick={go}>
          <MainLogo />
        </LogoBox>
      </HeaderWrapper>
    </>
  );
}

export default Header;
