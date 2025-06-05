"use client";
import { Icons } from "assets";
import { useRouter } from "next13-progressbar";
import React from "react";
import { useSelector } from "react-redux";
import { routeConstant } from "routes/constants";
import { UserType } from "utils/enum";

const BackButton = () => {
  const { auth } = useSelector((state: any) => state.root);
  const router = useRouter();
  return (
    <button
      onClick={() => {
        if (auth?.user?.type === UserType.Participant) {
          router.replace(routeConstant.events.path);
        } else {
          router.replace(routeConstant.fellow.events.path);
        }
      }}
      className="flex items-center gap-0.5 w-fit"
    >
      <span>
        <Icons.ChevLeft />
      </span>
      Back to Events Listing
    </button>
  );
};

export default BackButton;
