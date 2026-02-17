import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span
          style={{
            fontFamily: "var(--font-audiowide)",
          }}
        >
          _Email.md_
        </span>
      ),
    },
    githubUrl: "https://github.com/unmta/emailmd",
    links: [
      {
        text: "Builder",
        url: "/builder",
      },
      {
        text: "Docs",
        url: "/docs",
      },
    ],
  };
}
