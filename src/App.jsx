/* eslint-disable react/prop-types */
import { Link } from "react-router";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuthContext, useThemeContext } from "./hooks/useContexts";
import GoogleSignInButton from "./components/Google/GoogleSignInButton";
import UserDropdown from "./components/UserDropdown";

function App({ children }) {
  const { isAuthenticated, isLoading } = useAuth0();
  const { user } = useAuthContext();
  const { themeStyle } = useThemeContext();

  return (
    <div
      className={`relative flex h-auto min-h-screen justify-center ${themeStyle}`}
    >
      <nav className="absolute top-0 flex w-full items-center justify-between px-4 py-2">
        <div className="flex-1">
          <Link to="/">Home</Link>
        </div>
        <div className="flex flex-1 justify-center">
          <Link to="/pricing">Pricing</Link>
        </div>
        <div className="flex-1 text-right">
          {isAuthenticated ? (
            <UserDropdown user={user} />
          ) : (
            <GoogleSignInButton />
          )}
        </div>
      </nav>
      {isLoading ? <Loading themeStyle={themeStyle} /> : children}
    </div>
  );
}

const Loading = ({ themeStyle }) => {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-opacity-50 ${themeStyle}`}
    >
      <p className="animate-pulse">Loading</p>
    </div>
  );
};

export default App;
