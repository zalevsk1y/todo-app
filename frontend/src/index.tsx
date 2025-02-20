import { StrictMode } from "react";
import * as ReactDOMClient from "react-dom/client";

import "./style.css";
import App from "./App";

const rootElement = document.getElementById("root") as Element;
const root = ReactDOMClient.createRoot(rootElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
