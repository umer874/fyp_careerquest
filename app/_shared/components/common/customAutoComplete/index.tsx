"use client";
import classNames from "classnames";
import useDebounce from "hooks/useDebounce";
import { useEffect, useState } from "react";
import OptionsDropDown from "../options";
import styles from "./style.module.scss";

interface InputProps extends React.HTMLProps<HTMLInputElement> {
  label: string;
  error?: string;
  notRequiredMargin?: boolean;
  customLabelStyle?: any;
  customInputStyle?: any;
  customInputContainer?: any;
  customIconStyle?: any;
  Icon?: any;
  formikKey: string;
  setFieldValue: (val: string, val2: any) => void;
  readOnlyColor?: string;
  addressKey?: string;
  value: string;
}

const CustomAutoComplete = ({
  label,
  required,
  error,
  value,
  placeholder,
  notRequiredMargin,
  onKeyDown,
  customLabelStyle,
  customInputStyle,
  customInputContainer,
  customIconStyle,
  readOnly,
  Icon,
  onPaste,
  defaultValue,
  formikKey,
  setFieldValue,
  readOnlyColor,
  id,
  addressKey,
}: InputProps) => {
  const [search, setSearch] = useState<string>("");
  const [options, setOptions] = useState<any[]>([]);
  const [openProfileDropDown, setOpenDropDown] = useState<boolean>(false);
  const [showOptions, setShowOption] = useState<boolean>(true);

  useEffect(() => {
    if (showOptions) {
      const autocompleteService = new google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        {
          input: search,
          componentRestrictions: { country: ["us"] },
        },
        (predictions, status) => {
          if (predictions) {
            let arr = [];
            for (let x = 0; x < predictions?.length; x++) {
              let obj = {
                title: predictions[x]?.description,
                Icon: null,
                action: () => {
                  if (addressKey) {
                    const geocoder = new google.maps.Geocoder();
                    geocoder
                      .geocode({ placeId: predictions[x].place_id })
                      .then(({ results }) => {
                        setFieldValue(addressKey, [
                          results[0].geometry?.location?.lng(),
                          results[0].geometry?.location?.lat(),
                        ]);
                      })
                      .catch((e) => {
                        console.error("Failed to get lat longs");
                      });
                  }
                  setFieldValue(formikKey, predictions[x]?.description);
                  setShowOption(false);
                },
              };
              arr.push(obj);
            }
            setOptions(arr);
            if (!openProfileDropDown) {
              setOpenDropDown(true);
            }
          } else {
            setOpenDropDown(false);
          }
        }
      );
    }
  }, [search]);

  useDebounce(
    () => {
      //@ts-ignore
      setSearch(value);
      if (value === "") {
        setOpenDropDown(false);
      }
    },
    //@ts-ignore
    [value],
    800
  );

  return (
    <div
      className={classNames(
        "relative w-full",
        notRequiredMargin ? "" : error ? "mb-0" : "mb-3"
      )}
    >
      <div className="flex flex-col items-start w-full gap-2">
        {label ? (
          <label
            className={classNames(
              styles.inputLabel,
              customLabelStyle && customLabelStyle
            )}
          >
            {label} {!!required && <label className={styles.asterik}>*</label>}
          </label>
        ) : null}

        <div
          className={classNames(
            styles.inputContainer,
            "gap-2",
            readOnly ? styles.readonly : "",
            customInputContainer && customInputContainer,
            "w-full"
          )}
          style={readOnlyColor ? { background: readOnlyColor } : {}}
          id="input-container"
        >
          {Icon ? (
            <Icon className={classNames(customIconStyle, styles.iconStyle)} />
          ) : null}

          <input
            id={id}
            defaultValue={defaultValue}
            type="text"
            placeholder={placeholder}
            className={classNames(
              styles.inputStyle,
              customInputStyle && customInputStyle,
              readOnly ? styles.readonly : ""
            )}
            value={value}
            onChange={(e) => {
              setShowOption(true);
              setFieldValue(formikKey, e.target.value);
              if (addressKey) {
                setFieldValue(addressKey, []);
              }
            }}
            onKeyDown={onKeyDown}
            readOnly={readOnly}
            onPaste={onPaste}
          />
        </div>
      </div>
      <OptionsDropDown
        options={options}
        openSelection={openProfileDropDown}
        setOpenSelection={setOpenDropDown}
        customContainer={styles.optionsContainer}
        wrapInGlobalWrapper={false}
      />
      {!!error && <div className={classNames(styles.error)}>{error}</div>}
    </div>
  );
};

export default CustomAutoComplete;
