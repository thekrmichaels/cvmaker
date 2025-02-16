/* eslint-disable react/prop-types */
import { InputTextarea } from "primereact/inputtextarea";

const OfferFields = ({
  bgClass,
  textClass,
  isLightMode,
  checked,
  offer,
  handleChange,
  isProcessing,
}) => (
  <fieldset className="space-y-2">
    <div className="flex items-center space-x-2">
      <span className={`${textClass} font-normal`}>Do you have an offer?</span>
      <input
        id="offer-field"
        type="checkbox"
        name="checked"
        checked={checked}
        onChange={handleChange}
        className="h-4 w-4 cursor-pointer"
      />
    </div>

    {checked && (
      <InputTextarea
        aria-label="Paste here the offer."
        placeholder="Paste here the offer."
        className={`${bgClass} ${textClass} input ${isLightMode ? "input--light" : "input--dark"} w-full`}
        value={offer}
        onChange={handleChange}
        rows={5}
        cols={30}
        name="offer"
        disabled={isProcessing}
      />
    )}
  </fieldset>
);

export default OfferFields;
