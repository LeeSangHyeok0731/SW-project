import { Helmet } from "react-helmet";
import Header from "../components/header";
import ChatGpt from "../components/chatgpt";

function ChatBot() {
  return (
    <>
      <Helmet>
        <title>Find JOB | 챗봇</title>
      </Helmet>
      <Header />
      <ChatGpt />
    </>
  );
}

export default ChatBot;
