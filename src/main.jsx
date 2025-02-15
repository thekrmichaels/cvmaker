import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </AuthProvider>
  </StrictMode>,
);
