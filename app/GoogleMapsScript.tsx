"use client";

import { GoogleKey } from "utils/endpoints";
import { useEffect } from "react";

export default function GoogleMapsScript() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${GoogleKey}&libraries=places,maps&loading=async`;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return null;
}