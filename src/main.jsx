import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import { Auth0 } from "../env.js";
import { PrimeReactProvider } from "primereact/api";
import "./index.css";
import App from "./App.jsx";

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
      <PrimeReactProvider>
        <App />
      </PrimeReactProvider>
    </Auth0Provider>
  </StrictMode>,
);
