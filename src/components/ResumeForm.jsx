/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useThemeContext } from "../hooks/useContexts";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { CVMaker_API } from "../../env.js";

const ResumeForm = ({ user: { email, license, sub: userId } }) => {
  const [formData, setFormData] = useState({
    spreadsheetUrl: "",
    offer: "",
    checked: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const { spreadsheetUrl, offer, checked } = formData;
  const { isLightMode, bgClass, textClass } = useThemeContext();
  const toast = useRef(null);

  const buttonStyle = `button ${isLightMode ? "border-[#747775] button--focus-light disabled:bg-[#eeeeee]" : "border-[#8E918F] button--focus-dark disabled:bg-[#252526]"}`;

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
      await downloadResume(email, license, offer, spreadsheetUrl, userId);
    } catch (error) {
      toast.current.show({
        severity: "secondary",
        summary: "Error",
        detail: error.message || "Error downloading the resume.",
      });
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
          placeholder="Paste here the link to your spreadsheet."
          onChange={handleChange}
          disabled={isProcessing}
          className={`${bgClass} ${textClass} w-full cursor-pointer rounded px-5 ${buttonStyle}`}
        />

        {!license && (
          <>
            <div className="flex items-center space-x-2">
              <label
                className={`${textClass} font-normal`}
                htmlFor="offerField"
              >
                Do you have an offer?
              </label>
              <input
                id="offerField"
                type="checkbox"
                name="checked"
                checked={checked}
                onChange={handleChange}
                className="h-4 w-4 cursor-pointer"
              />
            </div>

            {checked && (
              <InputTextarea
                className={`${buttonStyle} ${bgClass} ${textClass} w-full`}
                value={offer}
                onChange={handleChange}
                rows={5}
                cols={30}
                name="offer"
                disabled={isProcessing}
              />
            )}
          </>
        )}

        <Button
          type="submit"
          className={`${bgClass} ${textClass} ${buttonStyle} w-full rounded disabled:bg-[#252526] disabled:opacity-100`}
          disabled={!spreadsheetUrl || isProcessing || (checked && !offer)}
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

async function downloadResume(email, license, offer, spreadsheetUrl, userId) {
  const response = await fetch(`${CVMaker_API}/resumes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, license, offer, spreadsheetUrl, userId }),
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
  return response.headers
    .get("Content-Disposition")
    .split("filename=")[1]
    .replace(/"/g, "");
}

export default ResumeForm;
