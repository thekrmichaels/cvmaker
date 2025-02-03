import { useState, useEffect } from "react";
import GoogleSignInButton from "./Google/GoogleSignInButton";
import UserDropdown from "./UserDropdown";

const AuthStatus = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const profile = getCookie("profile");

    profile && setUser(JSON.parse(profile));
  }, []);

  return (
    <>
      {user ? (
        <UserDropdown user={user} setUser={setUser} />
      ) : (
        <GoogleSignInButton />
      )}
    </>
  );
};

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  const cookie = cookies.find((cookie) => cookie.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=")[1]) : null;
}

export default AuthStatus;
