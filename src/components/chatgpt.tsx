import OpenAI from "openai";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import ReactMarkdown from "react-markdown";

// OpenAI API 설정
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

interface Message {
  role: "user" | "assistant";
  content: string;
}

const ChatGpt: React.FC = () => {
  const [input, setInput] = useState<string>(""); // 유저 입력
  const [messages, setMessages] = useState<Message[]>([]); // 대화 내역
  const [loading, setLoading] = useState<boolean>(false); // 로딩 상태
  const chatWindowRef = useRef<HTMLDivElement>(null); // ChatWindow에 대한 ref

  // 페이지 로드 시 로컬 스토리지에서 대화 내역 불러오기
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // 대화가 업데이트될 때 로컬 스토리지에 저장
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // GPT 호출 함수
  const handleGenerate = async () => {
    if (!input.trim()) {
      alert("Please enter a prompt!");
      return;
    }

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    setLoading(true);
    setInput(""); // 입력창 비우기

    try {
      const result = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          ...messages,
          userMessage,
        ],
      });

      const gptResponse: Message = {
        role: "assistant",
        content: result.choices[0].message?.content || "No response",
      };

      setMessages((prev) => [...prev, gptResponse]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "An error occurred while communicating with GPT.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // 대화가 업데이트될 때 스크롤을 가장 아래로 이동
  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  // 엔터키로 메시지 전송 처리
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // 기본 엔터 동작을 방지 (줄바꿈이 아닌 전송)
      handleGenerate();
    }
  };

  return (
    <Container>
      <Header>GPT Chatbot</Header>
      <ChatWindow ref={chatWindowRef}>
        {messages.map((message, index) => (
          <MessageBubble key={index} isUser={message.role === "user"}>
            {message.role === "assistant" ? (
              <ReactMarkdown>{message.content}</ReactMarkdown>
            ) : (
              message.content
            )}
          </MessageBubble>
        ))}
      </ChatWindow>
      <InputArea>
        <Input
          placeholder="Type your prompt here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown} // 엔터키 이벤트 핸들링
          rows={2}
        />
        <SendButton onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Send"}
        </SendButton>
      </InputArea>
    </Container>
  );
};

// Styled-components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
`;

const Header = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const ChatWindow = styled.div`
  width: 100%;
  height: 400px;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 10px;
  overflow-y: auto; /* 스크롤 가능 */
  display: flex;
  flex-direction: column;
  gap: 10px;
  background-color: #f9f9f9;
`;

const MessageBubble = styled.div<{ isUser: boolean }>`
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 15px;
  align-self: ${(props) => (props.isUser ? "flex-end" : "flex-start")};
  background-color: ${(props) => (props.isUser ? "#007bff" : "#e9ecef")};
  color: ${(props) => (props.isUser ? "white" : "#333")};
  font-size: 14px;
  line-height: 1.4;
  white-space: pre-wrap;
`;

const InputArea = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
`;

const Input = styled.textarea`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  resize: none;
  outline: none;

  &:focus {
    border-color: #007bff;
  }
`;

const SendButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #aaa;
    cursor: not-allowed;
  }
`;

export default ChatGpt;
