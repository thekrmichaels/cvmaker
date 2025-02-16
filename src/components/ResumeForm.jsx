/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useThemeContext } from "../hooks/useContexts.jsx";
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
  const { theme, themeStyle } = useThemeContext();
  const toast = useRef(null);

  const borderStyle =
    theme === "light" ? "border-[#747775]" : "border-[#8e918f]";
  const focusStyle =
    theme === "light"
      ? "focus:border-[#1f1f1f] focus:ring-1 focus:ring-[#1f1f1f]"
      : "focus:border-[#e3e3e3] focus:ring-1 focus:ring-[#e3e3e3]";

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
      <form className="space-y-2" onSubmit={handleSubmit}>
        <Rules />
        <InputText
          type="text"
          name="spreadsheetUrl"
          placeholder="Paste here the link to your spreadsheet."
          onChange={handleChange}
          disabled={isProcessing}
          className={`${borderStyle} ${focusStyle} ${themeStyle} w-full cursor-pointer rounded px-5`}
        />

        {license && (
          <>
            <div className="flex items-center space-x-2">
              <label htmlFor="offerField" className="font-roboto">
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
                className={`${borderStyle} ${focusStyle} ${themeStyle} font-roboto w-full`}
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
          className={`${borderStyle} ${focusStyle} ${themeStyle} font-roboto w-full rounded`}
          disabled={!spreadsheetUrl || isProcessing || (checked && !offer)}
          label="Download Resume"
        />
      </form>
    </>
  );
};

const Rules = () => {
  return (
    <div className="text-justify">
      <ol className="list-decimal pl-5">
        <li className="font-roboto font-bold">
          <span className="font-roboto font-normal">
            Create a copy of{" "}
            <strong>
              <a
                href="https://docs.google.com/spreadsheets/d/1AniaeHo9ApPRptN0Hnd4YqfZfbUj_3oF3IoIXvH0_F8/edit?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0075ff] underline"
              >
                Applicant Information Sheet
              </a>
            </strong>{" "}
            in your Google Drive.
          </span>
        </li>
        <li className="font-roboto font-bold">
          <span className="font-roboto font-normal">
            Fill it with information for your resume.
          </span>
        </li>
      </ol>
    </div>
  );
};

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
