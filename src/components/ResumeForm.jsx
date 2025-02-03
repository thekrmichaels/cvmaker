/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useThemeContext } from "../hooks/useThemeContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Toast } from "primereact/toast";
import { CVMaker_API } from "../../env.js";

const ResumeForm = ({ user: { email, license, sub: userId } }) => {
  const [formData, setFormData] = useState({
    url: "",
    offer: "",
    checked: false,
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const toast = useRef(null);
  const { themeStyle } = useThemeContext();

  const handleChange = ({ target: { name, value } }) =>
    setFormData((prev) => ({ ...prev, [name]: value }));

  const handleCheckboxChange = ({ target: { checked } }) =>
    setFormData((prev) => ({ ...prev, checked }));

  async function handleSubmit(e) {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await downloadResume(
        email,
        license,
        formData.offer,
        formData.url,
        userId,
      );
    } catch (error) {
      toast.current.show({
        severity: "error",
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
      <Toast ref={toast} />
      <form className="space-y-2" onSubmit={handleSubmit}>
        <Rules />
        <InputText
          className="font-roboto w-full border border-gray-300 focus:border-[white] focus:ring-1 focus:ring-[white]"
          type="text"
          placeholder="Paste the link to that file"
          aria-label="Google Sheets file URL input"
          value={formData.url}
          onChange={handleChange}
          name="url"
          disabled={isProcessing}
        />

        {!license && (
          <div className="flex items-center space-x-2">
            <label htmlFor="enableNotes" className="font-roboto">
              Do you have an offer?
            </label>
            <input
              id="enableNotes"
              type="checkbox"
              checked={formData.checked}
              onChange={handleCheckboxChange}
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
          className={`${themeStyle} font-roboto w-full`}
          type="submit"
          severity="secondary"
          disabled={
            !formData.url ||
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

async function downloadResume(email, license, offer, url, userId) {
  const response = await fetch(`${CVMaker_API}/resumes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, license, offer, url, userId }),
    credentials: "include",
  });

  if (!response.ok) {
    const { message } = await response.json();
    throw new Error(message);
  }

  const resume = await response.blob();
  const downloadUrl = window.URL.createObjectURL(resume);
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
