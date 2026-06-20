"use client";

export default function AdsterraBanner() {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>body { margin: 0; padding: 0; display: flex; justify-content: center; background: transparent; }</style>
      </head>
      <body>
        <script async="async" data-cfasync="false" src="https://pl29812869.effectivecpmnetwork.com/cb982bcb51b4be1c3dba75c08c7fcf90/invoke.js"></script>
        <div id="container-cb982bcb51b4be1c3dba75c08c7fcf90"></div>
      </body>
    </html>
  `;

  return (
    <div className="flex justify-center w-full my-2 overflow-hidden bg-[var(--background)] py-1 rounded-xl shadow-inner border border-[var(--border)] max-w-[250px] mx-auto">
      <iframe
        title="Adsterra Native Banner"
        srcDoc={adHtml}
        width="100%"
        height="150"
        style={{ border: "none", overflow: "hidden", background: "transparent" }}
        scrolling="no"
        loading="eager"
      />
    </div>
  );
}
