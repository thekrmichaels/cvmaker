import { lazy, StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./contexts/AuthProvider.jsx";
import { BrowserRouter, Routes, Route } from "react-router";
import { PrimeReactProvider } from "primereact/api";
import { ThemeProvider } from "./contexts/ThemeProvider.jsx";
import "./index.css";
import App from "./App.jsx";
import Home from "./routes/Home.jsx";
import Suspense from "./components/Suspense/Suspense.jsx";

const Pricing = lazy(() => import("./routes/Pricing.jsx"));

const BASE_PATH = "/cvmaker";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter basename={BASE_PATH}>
        <PrimeReactProvider>
          <ThemeProvider>
            <App>
              <Suspense>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/pricing" element={<Pricing />} />
                </Routes>
              </Suspense>
            </App>
          </ThemeProvider>
        </PrimeReactProvider>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
