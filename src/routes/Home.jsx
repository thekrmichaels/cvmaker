import { useAuth0 } from "@auth0/auth0-react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useThemeContext } from "../hooks/useThemeContext";
import ResumeForm from "../components/ResumeForm";
import { Button } from "primereact/button";

const Home = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { user } = useAuthContext();
  const { themeStyle } = useThemeContext();

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
              className={`${themeStyle}`}
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
