import { useAuth0 } from "@auth0/auth0-react";
import { useAuthContext, useThemeContext } from "../hooks/useContexts.jsx";
import ResumeForm from "../components/ResumeForm.jsx";
import { Button } from "primereact/button";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { user } = useAuthContext();
  const { theme, themeStyle } = useThemeContext();

  const borderStyle =
    theme === "light" ? "border-[#747775]" : "border-[#8e918f]";
  const focusStyle =
    theme === "light"
      ? "focus:border-[#1f1f1f] focus:ring-1 focus:ring-[#1f1f1f]"
      : "focus:border-[#e3e3e3] focus:ring-1 focus:ring-[#e3e3e3]";

  return (
    <>
      {isAuthenticated ? (
        <div className="mb-[40px] mt-[120px] px-4">
          <ResumeForm user={user} />
        </div>
      ) : (
        <div className="flex w-full items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold">
              Welcome to <br /> CVMaker
            </h1>
            <p className="mb-4 text-lg">
              Create ATS-Friendly resumes dynamically.
            </p>
            <Button
              className={`${borderStyle} ${focusStyle} ${themeStyle} rounded`}
              label="Get Started"
              onClick={() => loginWithRedirect()}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
