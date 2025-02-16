/* eslint-disable react/prop-types */
import { Button } from "primereact/button";

const Dialog = ({
  bgClass,
  textClass,
  isLightMode,
  dialogRef,
  overlayPanelRef,
  deleteUserAccount,
  isProcessing,
}) => (
  <dialog
    ref={dialogRef}
    className={`${bgClass} ${textClass} max-w-sm rounded border border-[#747775] text-center shadow-lg dark:border-[#8e918f]`}
  >
    <h2 className="mb-2 mt-2 text-lg font-bold">Confirm Delete</h2>
    <p>
      Are you sure you want to delete your account? This action is{" "}
      <strong className="text-lg">irreversible</strong>.
    </p>
    <footer className="mt-4 flex justify-center gap-2">
      <Button
        label="Cancel"
        onClick={() => {
          dialogRef.current.close();
          overlayPanelRef.current.hide();
        }}
        className={`${bgClass} ${textClass} button ${isLightMode ? "button--light" : "button--dark"} mx-2 mb-2 w-full`}
        severity="secondary"
      />
      <Button
        label={isProcessing ? "Deleting..." : "Delete"}
        onClick={deleteUserAccount}
        className={`${bgClass} ${textClass} button ${isLightMode ? "button--light" : "button--dark"} mx-2 mb-2 w-full`}
        severity="secondary"
      />
    </footer>
  </dialog>
);

export default Dialog;
