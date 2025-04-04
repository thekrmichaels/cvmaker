/* eslint-disable react/prop-types */
import { useThemeContext } from "../hooks/useContexts";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "primereact/button";

const LandingPage = () => {
  const { loginWithRedirect } = useAuth0();
  const { isLightMode, bgClass, textClass } = useThemeContext();

  return (
    <>
      <section className="relative mb-8 flex h-screen items-center justify-center">
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

          <h2 className={`${textClass} mb-4 text-4xl font-bold`}>
            Welcome to CVMaker
          </h2>
          <p className={`${textClass} mb-4 text-lg font-normal`}>
            Create ATS-Friendly resumes dynamically.
          </p>
          <Button
            className={`${bgClass} ${textClass} button ${
              isLightMode
                ? "button--light button--focus-light"
                : "button--dark button--focus-dark"
            }`}
            aria-label="Get Started"
            label="Get Started"
            onClick={loginWithRedirect}
          />
        </div>
        <div
          className={`${textClass} absolute bottom-4 left-1/2 flex -translate-x-1/2 animate-pulse flex-col items-center`}
        >
          <p className="text-lg font-semibold">Need help?</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 rotate-45 transform"
            fill="none"
            viewBox="0 0 120 120"
          >
            <path
              fill={isLightMode ? "#131314" : "#ffffff"}
              d="M0 107.093 107.123 0l.827 107.95z"
            />
          </svg>
        </div>
      </section>
      <Steps {...{ textClass, isLightMode }} />
    </>
  );
};

const Steps = ({ textClass, isLightMode }) => {
  const stepsData = [
    {
      steps: [
        <>
          Create a copy of{" "}
          <strong>
            <a
              href="https://docs.google.com/spreadsheets/d/1AniaeHo9ApPRptN0Hnd4YqfZfbUj_3oF3IoIXvH0_F8/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className={`${isLightMode ? "text-[#00509E]" : "text-[#74BFFF]"} underline`}
            >
              Applicant Information Sheet
            </a>
          </strong>{" "}
          in your Google Drive.
        </>,
        "Fill it with information for your resume.",
      ],
      stepStartNumber: 1,
      imageSrc: isLightMode
        ? `${import.meta.env.BASE_URL}/applicant_information_sheet-light.webp`
        : `${import.meta.env.BASE_URL}/applicant_information_sheet-dark.webp`,
      imageAlt: "Step 1 and 2 Visual",
    },
    {
      steps: [
        "Paste the link to your spreadsheet in the input.",
        "If you have an offer to match your resume, select the checkbox and put it in the text area (members only).",
        "Click on Download Resume.",
      ],
      stepStartNumber: 3,
      imageSrc: isLightMode
        ? `${import.meta.env.BASE_URL}/form-light.webp`
        : `${import.meta.env.BASE_URL}/form-dark.webp`,
      imageAlt: "Step 3 Visual",
    },
  ];

  return (
    <section className="mx-8 flex min-h-screen flex-col">
      {stepsData.map((step, index) => (
        <Step
          key={index}
          stepStartNumber={step.stepStartNumber}
          steps={step.steps}
          imageSrc={step.imageSrc}
          imageAlt={step.imageAlt}
          textClass={textClass}
        />
      ))}
    </section>
  );
};

const Step = ({ stepStartNumber, steps, imageSrc, imageAlt, textClass }) => (
  <div className="mb-4 flex flex-col items-center justify-center">
    <ol
      className="mb-4 max-w-md list-decimal text-justify"
      start={stepStartNumber}
    >
      {steps.map((step, index) => (
        <li key={index} className={`font-bold ${textClass}`}>
          <span className={`font-normal ${textClass}`}>{step}</span>
        </li>
      ))}
    </ol>
    <div className="mt-4 flex w-full justify-center md:mt-0 md:w-1/2">
      <img
        src={imageSrc}
        alt={imageAlt}
        className="h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        srcSet={`${imageSrc}?w=320 320w, ${imageSrc}?w=384 384w, ${imageSrc}?w=448 448w`}
        sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px"
        width="384"
        height="288"
      />
    </div>
  </div>
);

export default LandingPage;
