import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Btn = styled.div`
  width: 180px;
  height: 50px;
  border: 1px solid gray;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtButton() {
  const navigate = useNavigate();

  const go = () => {
    navigate("/portfolio");
  };
  return (
    <>
      <Btn onClick={go}>포트폴리오 만들기</Btn>
    </>
  );
}

export default ProtButton;
