import styled from "styled-components";
import MainLogo from "../assets/mainLogoSvg";

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
  return (
    <>
      <HeaderWrapper>
        <LogoBox>
          <MainLogo />
        </LogoBox>
      </HeaderWrapper>
    </>
  );
}

export default Header;
