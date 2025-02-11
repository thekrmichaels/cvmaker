/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useThemeContext } from "../hooks/useThemeContext";
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
  const { themeStyle } = useThemeContext();
  const overlayPanelRef = useRef(null);
  const toast = useRef(null);

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
      <Button
        className="p-button-text p-0"
        onClick={(e) => overlayPanelRef.current.toggle(e)}
        unstyled
      >
        <Avatar
          image={picture}
          shape="circle"
          className={`${themeStyle} p-mr-2 h-12 w-12 border border-gray-300`}
          label={getInitials(name)}
          size="large"
        />
      </Button>
      <OverlayPanel
        ref={overlayPanelRef}
        className={`${themeStyle} p-text-center`}
      >
        <div className="text-center">
          <strong>{name}</strong>
          <div>{email}</div>
          <Badge
            className={`${themeStyle}`}
            value={license ? "Paid" : "Free"}
          />
        </div>
        <div className="my-2 w-full border-t"></div>
        <div className="flex flex-col items-end">
          <Button
            label="Log Out"
            icon="pi pi-sign-out"
            className={`${themeStyle} p-button-text`}
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin + "/cvmaker",
                },
              })
            }
            unstyled
          />
          <Button
            label={isProcessing ? "Eliminando..." : "Delete Account"}
            icon="pi pi-trash"
            className={`${themeStyle} p-button-text`}
            onClick={deleteUserAccount}
            disabled={isProcessing}
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
