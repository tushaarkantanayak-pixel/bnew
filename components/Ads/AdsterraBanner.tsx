"use client";

import { useEffect, useRef } from "react";

export default function AdsterraBanner() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Inject the script manually to prevent React hydration issues with ad networks
    if (containerRef.current && !containerRef.current.querySelector("script")) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.dataset.cfasync = "false";
      script.src = "https://pl29812869.effectivecpmnetwork.com/cb982bcb51b4be1c3dba75c08c7fcf90/invoke.js";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="flex justify-center w-full my-8 overflow-hidden">
      <div ref={containerRef} id="container-cb982bcb51b4be1c3dba75c08c7fcf90"></div>
    </div>
  );
}
