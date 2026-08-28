import { StrictMode } from "react";
import { Toaster } from "react-hot-toast";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster
      position="bottom-center"
      toastOptions={{
        style: { background: "#1f1f1f", color: "#fff", fontSize: "14px" },
        success: { iconTheme: { primary: "#f00b51", secondary: "#fff" } },
      }}
    />
  </StrictMode>
);
