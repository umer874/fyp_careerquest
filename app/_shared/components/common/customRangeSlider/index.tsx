import React, { useCallback, useEffect, useState, useRef } from "react";
import styles from "./style.module.scss";
import CustomInput from "../customInput";
import classNames from "classnames";

interface CustomRangeSliderProps {
  min: number;
  max: number;
  onChange: (values: { min: number; max: number }) => void;
}

const CustomRangeSlider = ({ min, max, onChange }: CustomRangeSliderProps) => {
  const [minVal, setMinVal] = useState<number>(min);
  const [maxVal, setMaxVal] = useState<number>(max);
  const minValRef = useRef<number>(min);
  const maxValRef = useRef<number>(max);
  const range = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number): number => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  useEffect(() => {
    onChange({ min: minVal, max: maxVal });
  }, [minVal, maxVal, onChange]);

  const handleMinChange = (value: number) => {
    const newMinVal = Math.min(value, maxVal - 1);
    setMinVal(newMinVal);
    minValRef.current = newMinVal;
  };

  const handleMaxChange = (value: number) => {
    const newMaxVal = Math.max(value, minVal + 1);
    setMaxVal(newMaxVal);
    maxValRef.current = newMaxVal;
  };

  return (
    <div className="flex flex-col gap-2 w-full relative">
      <div className={classNames(styles.container)}>
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(event) => {
            const value = Math.min(
              Number((event.target as HTMLInputElement).value),
              maxVal - 1
            );
            setMinVal(value);
            minValRef.current = value;
          }}
          className={`${classNames(styles.thumb)} ${styles["thumb--left"]}`}
          style={{ zIndex: minVal > max - 100 ? 5 : undefined }}
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(event) => {
            const value = Math.max(
              Number((event.target as HTMLInputElement).value),
              minVal + 1
            );
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className={`${classNames(styles.thumb)} ${styles["thumb--right"]}`}
        />

        <div className={classNames(styles.slider, "w-full")}>
          <div className={classNames(styles.slider__track)} />
          <div ref={range} className={classNames(styles.slider__range)} />
        </div>
      </div>
      <div className="flex justify-between gap-4 pt-2">
        <CustomInput
          label="From"
          type="number"
          value={minVal}
          // value={`$${minVal}`}
          min={min}
          max={max}
          readOnly
          onChange={(event) =>
            handleMinChange(Number((event.target as HTMLInputElement).value))
          }
          customInputContainer="transparent-bg-input-edit w-full"
          customInputStyle="transparent-bg-input"
        />
        <CustomInput
          label="To"
          type="number"
          // value={`$${maxVal}`}
          value={maxVal}
          min={min}
          max={max}
          readOnly
          onChange={(event) =>
            handleMaxChange(Number((event.target as HTMLInputElement).value))
          }
          customInputContainer="transparent-bg-input-edit w-full"
          customInputStyle="transparent-bg-input"
        />
      </div>
    </div>
  );
};

export default CustomRangeSlider;
