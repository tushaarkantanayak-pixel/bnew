"use client";

import { useEffect } from "react";

export default function AdsterraSocialBar() {
  useEffect(() => {
    const scriptId = "adsterra-socialbar-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.src = "//pl29812870.effectivecpmnetwork.com/d6/52/4a/d6524a8d758146a0da8afda235d9252d.js";
      document.body.appendChild(script);
    }
  }, []);

  return null;
}
