import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { worker } from "../shared/mocks/browser";

// 🟦 개발 환경일 때만 mock 작동
if (import.meta.env.MODE === "development") {
  worker.start({
    onUnhandledRequest: "bypass",
    serviceWorker: {
      url: "/mockServiceWorker.js", // 🟥 Vite 기반일 때 명시하는 게 안전
    },
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);