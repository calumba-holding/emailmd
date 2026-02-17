"use client";

import { useState } from "react";
import { Monitor, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyButton } from "./copy-button";
import { PreviewFrame } from "./preview-frame";
import { cn } from "@/lib/utils";

type Tab = "preview" | "html" | "text";

interface OutputPaneProps {
  html: string;
  text: string;
}

export function OutputPane({ html, text }: OutputPaneProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [mobile, setMobile] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "preview", label: "Preview" },
    { id: "html", label: "HTML Source" },
    { id: "text", label: "Plain Text" },
  ];

  return (
    <div className="flex flex-1 flex-col min-w-0">
      <div className="flex items-center border-b border-border bg-muted/30 px-1">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "px-3 py-2 text-xs font-medium border-b-2 transition-colors",
              tab === t.id
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            )}
          >
            {t.label}
          </button>
        ))}

        <div className="ml-auto flex items-center gap-1 pr-2">
          {tab === "preview" && (
            <>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setMobile(false)}
                className={cn(!mobile && "bg-muted")}
              >
                <Monitor className="size-3.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setMobile(true)}
                className={cn(mobile && "bg-muted")}
              >
                <Smartphone className="size-3.5" />
              </Button>
            </>
          )}
          {tab === "html" && <CopyButton text={html} label="HTML" />}
          {tab === "text" && <CopyButton text={text} label="Plain Text" />}
        </div>
      </div>

      {tab === "preview" && <PreviewFrame html={html} mobile={mobile} />}
      {tab === "html" && (
        <pre className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all">
          {html}
        </pre>
      )}
      {tab === "text" && (
        <pre className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
          {text}
        </pre>
      )}
    </div>
  );
}
