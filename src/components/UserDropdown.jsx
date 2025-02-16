/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useThemeContext } from "../hooks/useContexts.jsx";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import { CVMaker_API } from "../../env.js";

const UserDropdown = ({
  user: { email, license, name, picture, sub: userId },
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { logout } = useAuth0();
  const { theme, themeStyle } = useThemeContext();
  const overlayPanelRef = useRef(null);
  const toast = useRef(null);

  const borderStyle =
    theme === "light" ? "border-[#747775]" : "border-[#8e918f]";

  async function deleteUserAccount() {
    setIsProcessing(true);

    try {
      const response = await fetch(`${CVMaker_API}/users/${userId}`, {
        method: "DELETE",
      });

      response.status === 204 &&
        logout({
          logoutParams: { returnTo: window.location.origin + "/cvmaker" },
        });
    } catch (error) {
      toast.current.show({
        severity: "secondary",
        summary: "Error",
        detail: error.message || "Error deleting the user.",
      });
      console.error(
        `Error deleting the user:\n${error.name}: ${error.message}`,
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <>
      <Toast ref={toast} position="top-center" />
      <Button onClick={(e) => overlayPanelRef.current.toggle(e)} unstyled>
        <Avatar
          image={picture}
          label={getInitials(name)}
          shape="circle"
          className={`${borderStyle} ${themeStyle} h-12 w-12 border`}
        />
      </Button>
      <OverlayPanel
        ref={overlayPanelRef}
        className={`${themeStyle} p-text-center shadow-md dark:shadow-[#e3e3e314]`}
      >
        <div className="text-center">
          <strong>{name}</strong>
          <p>{email}</p>
          <Badge
            className={`${themeStyle} text-base`}
            value={license ? "Paid" : "Free"}
          />
        </div>
        <div className="my-2 w-full border-t"></div>
        <div className="flex flex-col items-center space-y-2">
          <Button
            label="Log Out"
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin + "/cvmaker",
                },
              })
            }
            className="font-bold"
            unstyled
          />
          <Button
            label={isProcessing ? "Eliminando..." : "Delete Account"}
            onClick={deleteUserAccount}
            disabled={isProcessing}
            className="font-bold"
            unstyled
          />
        </div>
      </OverlayPanel>
    </>
  );
};

function getInitials(name) {
  const fullName = name.split(" ");
  const initials = fullName.map((name) => name.charAt(0));

  return initials.join("");
}

export default UserDropdown;
