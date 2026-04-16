"use client";

import { useState } from "react";
import { Monitor, Smartphone, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CopyButton } from "./copy-button";
import { PreviewFrame } from "./preview-frame";
import { cn } from "@/lib/utils";

type Tab = "preview" | "html" | "text";

// Gmail clips messages over ~102KB. Warn a bit before we hit the cliff.
const GMAIL_CLIP_BYTES = 102 * 1024;
const GMAIL_WARN_BYTES = 90 * 1024;

interface OutputPaneProps {
  html: string;
  minifiedHtml: string;
  text: string;
}

export function OutputPane({ html, minifiedHtml, text }: OutputPaneProps) {
  const [tab, setTab] = useState<Tab>("preview");
  const [mobile, setMobile] = useState(false);
  const [minified, setMinified] = useState(false);

  const tabs: { id: Tab; label: string }[] = [
    { id: "preview", label: "Preview" },
    { id: "html", label: "HTML Source" },
    { id: "text", label: "Plain Text" },
  ];

  const shownHtml = minified ? minifiedHtml : html;
  const byteSize = new Blob([shownHtml]).size;

  return (
    <TooltipProvider delayDuration={300} skipDelayDuration={100}>
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
            {tab === "html" && (
              <>
                <span
                  className={cn(
                    "text-xs font-mono tabular-nums",
                    byteSize >= GMAIL_CLIP_BYTES
                      ? "text-destructive"
                      : byteSize >= GMAIL_WARN_BYTES
                      ? "text-amber-600 dark:text-amber-500"
                      : "text-muted-foreground"
                  )}
                >
                  {formatBytes(byteSize)}
                </span>
                <div className="flex items-center rounded-md border border-border bg-background p-0.5">
                  <button
                    onClick={() => setMinified(false)}
                    className={cn(
                      "px-2 py-0.5 text-xs rounded transition-colors",
                      !minified
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Pretty
                  </button>
                  <button
                    onClick={() => setMinified(true)}
                    className={cn(
                      "px-2 py-0.5 text-xs rounded transition-colors",
                      minified
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Minified
                  </button>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <Info className="size-3.5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="end" className="max-w-xs">
                    Gmail clips messages over 102 KB. Minified output strips
                    whitespace. Template placeholders written as{" "}
                    <span className="font-mono">{"{{ var }}"}</span> or{" "}
                    <span className="font-mono">{"[[ var ]]"}</span> are
                    preserved. Other delimiters may break — use the npm
                    package with a custom{" "}
                    <span className="font-mono">templateSyntax</span> if you
                    need them.
                  </TooltipContent>
                </Tooltip>
                <CopyButton text={shownHtml} />
              </>
            )}
            {tab === "text" && <CopyButton text={text} />}
          </div>
        </div>

        {tab === "preview" && <PreviewFrame html={html} mobile={mobile} />}
        {tab === "html" && (
          <pre className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all">
            {shownHtml}
          </pre>
        )}
        {tab === "text" && (
          <pre className="flex-1 overflow-auto p-4 font-mono text-xs leading-relaxed whitespace-pre-wrap">
            {text}
          </pre>
        )}
      </div>
    </TooltipProvider>
  );
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  return `${(n / 1024).toFixed(1)} KB`;
}
