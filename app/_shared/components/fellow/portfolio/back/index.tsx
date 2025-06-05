"use client";
import classNames from "classnames";
import React from "react";
import styles from "./style.module.scss";
import { useRouter } from "next13-progressbar";
import { Icons } from "assets";

interface BackButtonProps {
  label: string;
}

const BackButton = ({ label }: BackButtonProps) => {
  const router = useRouter();
  return (
    <div className={classNames(styles.backLink)}>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-0.5 w-fit"
      >
        <span>
          <Icons.ChevLeft />
        </span>
        {label}
      </button>
    </div>
  );
};

export default BackButton;
