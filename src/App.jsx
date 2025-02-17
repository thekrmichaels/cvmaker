/* eslint-disable react/prop-types */
import { lazy } from "react";
import { Link } from "react-router";
import { useAuthContext, useThemeContext } from "./hooks/useContexts";
import GoogleSignInButton from "./components/Google/GoogleSignInButton";
import Loader from "./components/Suspense/Loader";
import Suspense from "./components/Suspense/Suspense";

const UserDropdown = lazy(
  () => import("./components/UserDropdown/UserDropdown"),
);

function App({ children }) {
  const { isAuthenticated, isLoading, user } = useAuthContext();
  const { isLightMode, bgClass, textClass } = useThemeContext();

  return (
    <main
      className={`bg-pattern bg-pattern--${isLightMode ? "light" : "dark"} relative flex min-h-screen w-full flex-col overflow-hidden`}
    >
      <NavBar {...{ isLightMode, bgClass, textClass, isAuthenticated, user }} />

      <div className="flex-1">
        {isLoading ? <Loader loadText="Authenticating" /> : children}
      </div>

      {!isLoading && <Footer {...{ bgClass, textClass }} />}
    </main>
  );
}

const Footer = ({ bgClass, textClass }) => (
  <footer
    className={`${bgClass} ${textClass} w-full px-4 py-2 text-start text-sm font-normal shadow-[0_-1px_2px_0_#747775] dark:shadow-[0_-1px_2px_0_#8E918F]`}
  >
    <p>
      <strong>Dev:</strong>{" "}
      <a
        href="https://github.com/thekrmichaels"
        target="_blank"
        rel="noopener noreferrer"
        className="underline"
      >
        Amilkar Díaz
      </a>
    </p>
    <p>
      <strong>Support:</strong>{" "}
      <a href="mailto:amilkarjdiazh@gmail.com" className="underline">
        amilkarjdiazh@gmail.com
      </a>
    </p>
  </footer>
);

const NavBar = ({ isLightMode, bgClass, textClass, isAuthenticated, user }) => (
  <nav
    className={`${bgClass} ${textClass} fixed top-0 z-10 flex w-full items-center justify-between px-4 py-2 shadow-sm shadow-[#747775] dark:shadow-[#8E918F]`}
    aria-label="Navigation bar"
  >
    <div className="flex-1">
      <Link to="/" className="flex items-center gap-2">
        <img
          src={`${import.meta.env.BASE_URL}/cvmaker-${isLightMode ? "light" : "dark"}.svg`}
          alt="CVMaker icon"
          className="h-[1.375rem] w-[1.0625rem]"
        />
        <h1 className="text-sm font-bold">CVMaker</h1>
      </Link>
    </div>
    <Link to="/pricing" className="flex-1 text-center text-sm font-semibold">
      Pricing
    </Link>
    <div className="flex-1 text-right">
      {isAuthenticated ? (
        <Suspense>
          <UserDropdown user={user} />
        </Suspense>
      ) : (
        <GoogleSignInButton />
      )}
    </div>
  </nav>
);

export default App;
