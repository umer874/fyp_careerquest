"use client";
import { useState } from "react";
import styles from "./style.module.scss";
import classNames from "classnames";
import { useRouter } from "next13-progressbar";
import { handleGetFilteredPathname } from "utils/helper";

interface CustomToggleProps {
  options: { id: string; icon: React.ReactNode }[];
  defaultSelected?: string;
  path: string;
}

const CustomToggleButton = ({
  options,
  defaultSelected,
  path,
}: CustomToggleProps) => {
  const router = useRouter();
  const [selected, setSelected] = useState(defaultSelected || options[0].id);

  const handleClick = (id: string) => {
    setSelected(id);
    router.push(handleGetFilteredPathname({ mode: id }));
  };

  return (
    <div
      className={classNames(
        styles.toggleContainer,
        "flex items-center justify-center gap-2"
      )}
    >
      {options.map((option) => (
        <button
          key={option.id}
          className={`${styles.toggleButton} ${
            selected === option.id ? styles.active : ""
          }`}
          onClick={() => handleClick(option.id)}
        >
          {option.icon}
        </button>
      ))}
    </div>
  );
};

export default CustomToggleButton;
