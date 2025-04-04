/* eslint-disable react/prop-types */
import { Image } from "primereact/image";

const Steps = ({ textClass, isLightMode }) => {
  const baseUrl = import.meta.env.BASE_URL;
  const linkColor = isLightMode ? "text-[#00509E]" : "text-[#74BFFF]";
  const sheetLink = (
    <a
      href="https://docs.google.com/spreadsheets/d/1AniaeHo9ApPRptN0Hnd4YqfZfbUj_3oF3IoIXvH0_F8/edit?usp=sharing"
      target="_blank"
      rel="noopener noreferrer"
      className={`${linkColor} underline`}
    >
      Applicant Information Sheet
    </a>
  );

  const stepsData = [
    {
      steps: [
        <>
          Create a copy of <strong>{sheetLink}</strong> in your Google Drive.
        </>,
        "Fill it with information for your resume.",
      ],
      stepStartNumber: 1,
      imageSrc: `${baseUrl}/applicant_information_sheet-${isLightMode ? "light" : "dark"}.webp`,
      imageAlt:
        "Applicant Information Sheet to copy and fill out in Google Drive",
    },
    {
      steps: [
        "Paste the link to your spreadsheet into the input.",
        "If you have an offer to match your resume, select the check box and put it in the text area (paid users only).",
        "Click on Download Resume.",
      ],
      stepStartNumber: 3,
      imageSrc: `${baseUrl}/form-${isLightMode ? "light" : "dark"}.webp`,
      imageAlt:
        "Form to enter spreadsheet link, offer (optional, paid users only) and download resume.",
    },
  ];

  return (
    <section className="mx-8 flex min-h-screen flex-col">
      {stepsData.map((step, index) => (
        <Step
          key={index}
          stepStartNumber={step.stepStartNumber}
          steps={step.steps}
          textClass={textClass}
          imageSrc={step.imageSrc}
          imageAlt={step.imageAlt}
        />
      ))}
    </section>
  );
};

const Step = ({ stepStartNumber, steps, textClass, imageSrc, imageAlt }) => (
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
    <div className="mt-4 flex w-full justify-center">
      <Image
        src={imageSrc}
        alt={imageAlt}
        imageClassName="h-auto max-w-xs sm:max-w-sm md:max-w-md"
        srcSet={`${imageSrc}?w=320 320w, ${imageSrc}?w=384 384w, ${imageSrc}?w=448 448w`}
        sizes="(max-width: 640px) 320px, (max-width: 768px) 384px, (max-width: 1024px) 448px"
        width="448"
        height="336" // * Prevents the error “Image elements do not have an explicit width and height” with a height for a 4:3 aspect ratio.
        preview
      />
    </div>
  </div>
);

export default Steps;
