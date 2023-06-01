import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";

// Contexts imports
import { UserCtxProvider } from "./context/UserCtx.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <UserCtxProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserCtxProvider>
);
