import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import ChatBot from "../pages/ChatBot";
import Protfolio from "../pages/portfolioPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chatbot" element={<ChatBot />} />
        <Route path="/portfolio" element={<Protfolio />} />
      </Routes>
    </>
  );
}

export default App;
