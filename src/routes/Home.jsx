import { lazy } from "react";
import { useAuthContext } from "../hooks/useContexts";
import LandingPage from "../components/LandingPage/LandingPage";
import Suspense from "../components/Suspense/Suspense";

const ResumeForm = lazy(() => import("../components/ResumeForm/ResumeForm"));

const Home = () => {
  const { isAuthenticated, user } = useAuthContext();

  return (
    <>
      {isAuthenticated ? (
        <Suspense>
          <div className="mb-[40px] mt-[120px] px-4">
            <ResumeForm user={user} />
          </div>
        </Suspense>
      ) : (
        <LandingPage />
      )}
    </>
  );
};

export default Home;
