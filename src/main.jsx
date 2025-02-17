import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0 } from "../env.js";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import { ThemeProvider } from "./contexts/ThemeProvider.jsx";
import "./index.css";
import App from "./App.jsx";
import Home from "./routes/Home.jsx";
import Pricing from "./routes/Pricing.jsx";

const { clientId, domain } = Auth0;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin + "/cvmaker",
      }}
    >
      <AuthProvider>
        <BrowserRouter basename="/cvmaker">
          <PrimeReactProvider>
            <ThemeProvider>
              <App>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pricing" element={<Pricing />} />
                </Routes>
              </App>
            </ThemeProvider>
          </PrimeReactProvider>
        </BrowserRouter>
      </AuthProvider>
    </Auth0Provider>
  </StrictMode>,
);
