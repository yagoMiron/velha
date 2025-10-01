import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// basename="/sigaReact"
root.render(
  <BrowserRouter>
    <div>
      <App />
    </div>
  </BrowserRouter>
);
