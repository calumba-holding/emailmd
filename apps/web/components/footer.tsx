import Image from "next/image";

export function Footer() {
  return (
    <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
      <div className="container mx-auto max-w-5xl px-4">
        <span className="inline-flex items-center gap-1">
          <span>Built by</span>
          <a
            href="https://anypost.com/"
            target="_blank"
            className="inline-flex items-center hover:opacity-80"
          >
            <Image
              src="/wordmark-dark.png"
              alt="Anypost"
              width={88}
              height={20}
              className="inline-block h-5 w-auto dark:hidden"
            />
            <Image
              src="/wordmark-light.png"
              alt="Anypost"
              width={88}
              height={20}
              className="hidden h-5 w-auto dark:inline-block"
            />
          </a>
        </span>
        . The source code is available on{" "}
        <a
          href="https://github.com/anypost/emailmd"
          target="_blank"
          className="underline underline-offset-4 hover:text-foreground"
        >
          GitHub
        </a>
        .
      </div>
    </footer>
  );
}
