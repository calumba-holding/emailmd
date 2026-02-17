"use client";

import { cn } from "@/lib/utils";

export function PreviewFrame({
  html,
  mobile,
}: {
  html: string;
  mobile: boolean;
}) {
  return (
    <div
      className={cn(
        "flex-1 min-h-0 overflow-auto",
        mobile && "flex justify-center bg-muted/30"
      )}
    >
      <iframe
        srcDoc={html}
        sandbox="allow-same-origin"
        className={cn(
          "h-full border-0 bg-white",
          mobile ? "w-[375px] shadow-lg rounded-lg" : "w-full"
        )}
        title="Email preview"
      />
    </div>
  );
}
