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

function Button() {
  const navigate = useNavigate();

  const go = () => {
    navigate("/chatbot");
  };
  return (
    <>
      <Btn onClick={go}>챗봇과 채팅하러 가기</Btn>
    </>
  );
}

export default Button;
