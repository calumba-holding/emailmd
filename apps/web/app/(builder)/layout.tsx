import type { ReactNode } from "react";
import Link from "next/link";

export default function BuilderLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh flex-col">
      <header className="flex items-center gap-4 border-b border-border px-4 py-2 shrink-0">
        <Link
          href="/"
          className="text-sm font-semibold"
          style={{ fontFamily: "var(--font-audiowide)" }}
        >
          _Email.md_
        </Link>
        <span className="text-xs text-muted-foreground">Builder</span>
        <div className="ml-auto flex items-center gap-3">
          <Link
            href="/docs"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Docs
          </Link>
          <a
            href="https://github.com/unmta/emailmd"
            target="_blank"
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </header>
      {children}
    </div>
  );
}
