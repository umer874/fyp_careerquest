"use client";
import { Icons } from "assets";
import { useRouter } from "next13-progressbar";
import React from "react";
import { useSelector } from "react-redux";
import { routeConstant } from "routes/constants";
//import { UserType } from "utils/enum";

const BackButton = () => {
  const router = useRouter();
  const { auth } = useSelector((state: any) => state.root);
  return (
    <button
      onClick={() => {
       
         
          router.replace(routeConstant.fellow.jobs.path);
        
      }}
      className="flex items-center gap-0.5 w-fit"
    >
      <span>
        <Icons.ChevLeft />
      </span>
      Back to Jobs Listing
    </button>
  );
};

export default BackButton;
