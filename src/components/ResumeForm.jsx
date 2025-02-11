/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useThemeContext } from "../hooks/useThemeContext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { CVMaker_API } from "../../env.js";
import queryTheSpreadsheet from "../helpers/queryTheSpreadsheet.js";

const ResumeForm = ({ user: { email, license } }) => {
  const [formData, setFormData] = useState({
    file: null,
    offer: "",
    checked: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useRef(null);
  const { themeStyle } = useThemeContext();

  const handleChange = ({ target: { name, type, value, checked, files } }) => {
    const newValue = { checkbox: checked, file: files?.[0] }[type] ?? value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    if (!formData.file) return;

    setIsProcessing(true);

    try {
      const resumeData = await queryTheSpreadsheet(formData.file);

      await downloadResume(email, license, resumeData, formData.offer);
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

        <input
          type="file"
          accept=".xlsx"
          name="file"
          onChange={handleChange}
          disabled={isProcessing}
        />

        {license && (
          <div className="flex items-center space-x-2">
            <label htmlFor="enableNotes" className="font-roboto">
              Do you have an offer?
            </label>
            <input
              id="enableNotes"
              type="checkbox"
              checked={formData.checked}
              onChange={handleChange}
              className="h-4 w-4 cursor-pointer focus:ring-2 focus:ring-blue-600"
            />
          </div>
        )}

        {formData.checked && (
          <div>
            <InputTextarea
              className="font-roboto w-full border border-gray-300 focus:border-[white] focus:ring-1 focus:ring-[white]"
              value={formData.offer}
              onChange={handleChange}
              rows={5}
              cols={30}
              name="offer"
              disabled={isProcessing}
            />
          </div>
        )}

        <Button
          label="Download Resume"
          className={`${themeStyle} font-roboto w-full rounded`}
          type="submit"
          severity="secondary"
          disabled={
            !formData.file ||
            isProcessing ||
            (formData.checked && !formData.offer)
          }
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
                className="text-blue-600 underline"
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

async function downloadResume(email, license, resumeData, offer) {
  const response = await fetch(`${CVMaker_API}/resumes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, license, resumeData, offer }),
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
