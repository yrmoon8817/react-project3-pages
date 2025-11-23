import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { worker } from "../shared/mocks/browser.js";

// 🟦 개발 환경일 때만 mock 작동
if (process.env.NODE_ENV === "development") {
  worker.start();
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);