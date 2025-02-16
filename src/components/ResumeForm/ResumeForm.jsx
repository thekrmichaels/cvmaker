/* eslint-disable react/prop-types */
import { lazy, useRef, useState } from "react";
import { useThemeContext } from "../../hooks/useContexts";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { CVMaker_API } from "../../../env.js";
import Suspense from "../Suspense/Suspense.jsx";

const OfferFields = lazy(() => import("./OfferFields"));

const ResumeForm = ({ user: { email, license, userAccessToken } }) => {
  const [formData, setFormData] = useState({
    spreadsheetUrl: "",
    offer: "",
    checked: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { spreadsheetUrl, offer, checked } = formData;
  const { isLightMode, bgClass, textClass } = useThemeContext();
  const toast = useRef(null);

  function handleChange({ target: { name, type, value, checked } }) {
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await downloadResume(
        email,
        license,
        offer,
        spreadsheetUrl,
        userAccessToken,
      );
    } catch (error) {
      const { status, message = "Error downloading the resume." } = error;
      const styles = {
        400: { severity: "warning", summary: "Missing info" },
        401: { severity: "warning", summary: "Unauthorized" },
        403: { severity: "info", summary: "Forbidden" },
        500: { severity: "error", summary: "Error" },
      };
      const { severity = "error", summary = "Error" } = styles[status] || {};

      toast.current.show({ severity, summary, detail: message });
      console.error(
        `Error downloading the resume:\n${error.name}: ${error.message}`,
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <form className="mx-auto max-w-lg space-y-2" onSubmit={handleSubmit}>
        <Rules isLightMode={isLightMode} />
        <InputText
          type="text"
          name="spreadsheetUrl"
          aria-label="Paste here the link to your spreadsheet."
          placeholder="Paste here the link to your spreadsheet."
          onChange={handleChange}
          disabled={isProcessing}
          className={`${bgClass} ${textClass} input ${isLightMode ? "input--light" : "input--dark"} w-full px-5`}
        />

        {license && (
          <Suspense>
            <OfferFields
              {...{
                bgClass,
                textClass,
                isLightMode,
                checked,
                offer,
                handleChange,
                isProcessing,
              }}
            />
          </Suspense>
        )}

        <Button
          type="submit"
          className={`${bgClass} ${textClass} button ${isLightMode ? "button--light" : "button--dark"} w-full rounded`}
          disabled={!spreadsheetUrl || isProcessing || (checked && !offer)}
          aria-label="Download Resume"
          label="Download Resume"
        />
      </form>
    </>
  );
};

const Rules = ({ isLightMode }) => (
  <div className="text-justify text-[#1f1f1f] dark:text-[#e3e3e3]">
    <ol className="list-decimal pl-5">
      <li className="font-bold">
        <span className="font-normal">
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
        </span>
      </li>
      <li className="font-bold">
        <span className="font-normal">
          Fill it with information for your resume.
        </span>
      </li>
    </ol>
  </div>
);

async function downloadResume(
  email,
  license,
  offer,
  spreadsheetUrl,
  userAccessToken,
) {
  const response = await fetch(`${CVMaker_API}/resumes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      license,
      offer,
      spreadsheetUrl,
      userAccessToken,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    const { message } = await response.json();

    throw new Error(message);
  }

  const file = await response.blob();
  const downloadUrl = window.URL.createObjectURL(file);
  const filename = getFilenameFromResponse(response);

  downloadFile(downloadUrl, filename);
}

function downloadFile(downloadUrl, filename) {
  const a = document.createElement("a");

  a.href = downloadUrl;
  a.download = filename;

  document.body.appendChild(a);
  a.click();

  a.remove();
  window.URL.revokeObjectURL(downloadUrl);
}

function getFilenameFromResponse(response) {
  return decodeURIComponent(
    response.headers
      .get("Content-Disposition")
      .split("filename*=")[1]
      .replace(/^UTF-8''/, ""),
  );
}

export default ResumeForm;
