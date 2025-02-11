import { useAuth0 } from "@auth0/auth0-react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useThemeContext } from "../hooks/useThemeContext";
import ResumeForm from "../components/ResumeForm";
import { Button } from "primereact/button";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { user } = useAuthContext();
  const { theme, themeStyle } = useThemeContext();

  const hoverStyle =
    theme === "light"
      ? "hover:bg-gray-800/10 shadow-md hover:shadow-gray-500/30"
      : "hover:bg-white/10 shadow-md hover:shadow-gray-500/30";

  return (
    <>
      {isAuthenticated ? (
        <div className="absolute top-[15%] max-w-xl px-4">
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
              className={`${hoverStyle} ${themeStyle} rounded`}
              label="Get Started"
              onClick={() => loginWithRedirect()}
              severity="secondary"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
