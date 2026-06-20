"use client";

import { useEffect } from "react";

export default function AdsterraPopunder() {
  useEffect(() => {
    const scriptId = "adsterra-popunder-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.src = "//pl29812868.effectivecpmnetwork.com/a7/30/c5/a730c5c0118e48e569fb35eecec9b330.js";
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
