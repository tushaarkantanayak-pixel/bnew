"use client";

export default function AdsterraClassicBanner() {
  const adHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>body { margin: 0; padding: 0; display: flex; justify-content: center; background: transparent; }</style>
      </head>
      <body>
        <script>
          atOptions = {
            'key' : 'c8db32eb4cf1543e26cccd269c96c16c',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script type="text/javascript" src="https://www.highperformanceformat.com/c8db32eb4cf1543e26cccd269c96c16c/invoke.js"></script>
      </body>
    </html>
  `;

  return (
    <div className="flex justify-center w-full my-8 overflow-hidden mx-auto max-w-[468px]">
      <iframe
        title="Adsterra Classic Banner"
        srcDoc={adHtml}
        width="100%"
        height="60"
        style={{ border: "none", overflow: "hidden", background: "transparent" }}
        scrolling="no"
        loading="eager"
      />
    </div>
  );
}
