"use client";
import classNames from "classnames";
import { useEffect } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import "./style.scss";

interface InputProps {
  label: string;
  required: boolean;
  error: string;
  name?: string;
  value: string | undefined;
  customInputContainer: string;
  disable: boolean;
  onChange: (val: string | undefined) => void;
  placeholder?: string;
}

const CustomPhoneInput = ({
  label,
  required,
  error,
  value,
  name,
  disable,
  customInputContainer,
  onChange,
  placeholder,
}: Partial<InputProps>) => {
  const dropIconAdder = () => {
    let parentNodes = document.getElementsByClassName(
      "PhoneInputCountrySelectArrow"
    );
    if (parentNodes.length > 0) {
      parentNodes[0].innerHTML = `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12.2927 5.33331C12.7119 5.33331 12.945 5.81828 12.6831 6.14566L8.39011 11.5119C8.18995 11.7621 7.8094 11.7621 7.60924 11.5119L3.31622 6.14566C3.05431 5.81828 3.2874 5.33331 3.70665 5.33331L12.2927 5.33331Z" fill="#868E96"/>
      </svg>`;
    }
  };

  useEffect(() => {
    dropIconAdder();
  }, []);

  return (
    <div className={classNames("relative w-full", error ? "mb-1" : "mb-3")}>
      <div className="flex flex-col items-start w-full gap-2">
        <label className={`inputLabel`}>
          {label} {!!required && <label className={`asterik`}>*</label>}
        </label>

        <div
          className={classNames(
            customInputContainer,
            "inputContainer",
            "w-full "
          )}
        >
          <PhoneInput
            disabled={disable}
            defaultCountry="US"
            label=""
            placeholder={placeholder ? placeholder : "+1 (111)11-111-111"}
            value={value}
            name={name}
            onChange={(value: string | undefined) => {
              onChange?.(value);
            }}
            limitMaxLength={true}
            className="bg-white"
          />
        </div>
      </div>
      {!!error && <div className="error">{error}</div>}
    </div>
  );
};

export default CustomPhoneInput;
