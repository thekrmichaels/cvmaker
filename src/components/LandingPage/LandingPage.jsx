/* eslint-disable react/prop-types */
import { lazy } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useThemeContext } from "../../hooks/useContexts";
import { Button } from "primereact/button";
import Suspense from "../Suspense/Suspense";

const Steps = lazy(() => import("./Steps"));

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  const { isLightMode, bgClass, textClass } = useThemeContext();

  return (
    <>
      <section className="relative mb-4 flex h-screen items-center justify-center">
        <div className="text-center">
          {/*
            Security Warning
          */}
          <p
            className={`${textClass} mx-4 mb-8 text-justify text-sm font-medium`}
            role="alert"
          >
            ⚠️ This app requires <em>spreadsheet.readonly</em> access to your
            Google Sheets. Google has not verified this app, and it requests
            access to sensitive information. Proceed only if you understand the
            risks and trust the developer (amilkarjdiazh@gmail.com).
          </p>

          <h2 className={`${textClass} mx-4 mb-4 text-4xl font-bold`}>
            Welcome to CVMaker
          </h2>
          <p className={`${textClass} mx-4 mb-4 text-lg font-normal`}>
            Create ATS-Friendly resumes dynamically.
          </p>
          <Button
            className={`${bgClass} ${textClass} button ${
              isLightMode ? "button--light" : "button--dark"
            }`}
            aria-label="Get Started"
            label="Get Started"
            onClick={loginWithRedirect}
          />
        </div>
        <ScrollHint {...{ isLightMode, textClass }} />
      </section>
      <Suspense>
        <Steps {...{ isLightMode, textClass }} />
      </Suspense>
    </>
  );
};

const ScrollHint = ({ isLightMode, textClass }) => (
  <div
    className={`${textClass} absolute bottom-4 left-1/2 flex -translate-x-1/2 animate-pulse flex-col items-center`}
  >
    <p className="text-lg font-medium">Need help?</p>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-4 w-4 rotate-45 transform"
      fill="none"
      viewBox="0 0 120 120"
    >
      <path
        fill={isLightMode ? "#1f1f1f" : "#e3e3e3"}
        d="M0 107.093 107.123 0l.827 107.95z"
      />
    </svg>
  </div>
);

export default LandingPage;
