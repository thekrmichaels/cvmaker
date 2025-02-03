/* eslint-disable react/prop-types */
import { useRef } from "react";
import { useThemeContext } from "../hooks/useThemeContext";
import { useAuth0 } from "@auth0/auth0-react";
import { Avatar } from "primereact/avatar";
import { Badge } from "primereact/badge";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";

const UserDropdown = ({ user: { email, license, name, picture } }) => {
  const { logout } = useAuth0();
  const overlayPanelRef = useRef(null);
  const { themeStyle } = useThemeContext();

  return (
    <>
      <Button
        className="p-button-text p-0"
        onClick={(e) => overlayPanelRef.current.toggle(e)}
        unstyled
      >
        <Avatar
          image={picture}
          shape="circle"
          className={`p-mr-2 h-12 w-12 ${themeStyle} border border-gray-300`}
          label={getInitials(name)}
          size="large"
        />
      </Button>
      <OverlayPanel
        ref={overlayPanelRef}
        className={`p-text-center ${themeStyle}`}
      >
        <div className="text-center">
          <strong>{name}</strong>
          <div>{email}</div>
          <Badge
            className={`${themeStyle}`}
            value={license ? "Pro" : "Free"}
            severity={license ? "success" : "info"}
          />
        </div>
        <div className="my-2 w-full border-t"></div>
        <div className="flex flex-col items-end">
          <Button
            label="Log Out"
            icon="pi pi-sign-out"
            className={`p-button-text ${themeStyle}`}
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
            label="Delete Account"
            icon="pi pi-sign-out"
            className={`p-button-text ${themeStyle}`}
            onClick={() =>
              logout({ logoutParams: { returnTo: window.location.origin } })
            }
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
