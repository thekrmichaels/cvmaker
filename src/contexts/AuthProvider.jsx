/* eslint-disable react/prop-types */
import { useEffect, useMemo, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { AuthContext } from "../hooks/useContexts.jsx";
import { CVMaker_API } from "../../env.js";

export const AuthProvider = ({ children }) => {
  const { isAuthenticated, user } = useAuth0();
  const [license, setLicense] = useState(null);

  useEffect(() => {
    isAuthenticated &&
      fetch(`${CVMaker_API}/licenses/${user.email}`, {
        credentials: "include",
      })
        .then((response) => response.json())
        .then((licenseData) => setLicense(licenseData))
        .catch((error) => console.error(error));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const userWithLicense = useMemo(
    () => ({
      user: { ...user, license },
    }),
    [user, license],
  );

  return (
    <AuthContext.Provider value={userWithLicense}>
      {children}
    </AuthContext.Provider>
  );
};
