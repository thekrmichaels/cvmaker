/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useThemeContext } from "../../hooks/useContexts";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";
import { Toast } from "primereact/toast";
import { CVMaker_API } from "../../../env.js";
import Dialog from "./Dialog";
import Suspense from "../Suspense/Suspense.jsx";

const UserDropdown = ({
  user: { email, license, name, picture, sub: userId },
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { logout } = useAuth0();
  const { isLightMode, bgClass, textClass } = useThemeContext();
  const dialogRef = useRef(null);
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
      <Button onClick={(e) => overlayPanelRef.current.toggle(e)} unstyled>
        <Avatar
          image={picture}
          label={getInitials(name)}
          shape="circle"
          className={`${bgClass} ${textClass} h-12 w-12 border`}
        />
      </Button>
      <OverlayPanel
        ref={overlayPanelRef}
        className={`${bgClass} ${textClass} p-text-center shadow-sm shadow-[#747775] dark:shadow-[#8E918F]`}
      >
        <section className="text-center">
          <strong>{name}</strong>
          <p>{email}</p>
          <Badge
            className={`${bgClass} ${textClass} text-base`}
            value={license ? "Paid" : "Free"}
          />
        </section>
        <hr className="my-2 w-full border-t" />
        <ul className="flex flex-col items-center space-y-2">
          <li>
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
          </li>
          <li>
            <Button
              label="Delete Account"
              onClick={() => dialogRef.current.showModal()}
              disabled={isProcessing}
              className="font-bold"
              unstyled
            />
            <Suspense>
              <Dialog
                {...{
                  bgClass,
                  textClass,
                  isLightMode,
                  dialogRef,
                  overlayPanelRef,
                  deleteUserAccount,
                  isProcessing,
                }}
              />
            </Suspense>
          </li>
        </ul>
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
