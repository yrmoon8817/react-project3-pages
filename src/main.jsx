import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { worker } from "../shared/mocks/browser.js";
const BASE = process.env.NODE_ENV === "production"
  ? "/react-project3-pages"
  : "";
// 🟦 개발 + 배포 모두 mock 사용
worker.start({
  serviceWorker: {
    url: `${BASE}/mockServiceWorker.js`,
  }
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);