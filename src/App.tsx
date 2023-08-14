import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./router";
import { ChatContextProvider } from "./contexts/ChatContext";

function App() {
  return (
    <ChatContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChatContextProvider>
  );
}

export default App;
