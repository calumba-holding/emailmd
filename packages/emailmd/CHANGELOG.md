# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] — unreleased

### Changed
- Upgraded MJML from 4.x to 5.0.1.
- `render()` is now `async` and returns a `Promise<RenderResult>`. Call sites must `await` the result.

### Added
- `RenderOptions.minify` — minify the output HTML (useful for Gmail's 102KB clip limit).
- `RenderOptions.fonts` — register custom web fonts as a map of family name → URL (rendered as `<mj-font>` tags).
- `RenderOptions.validationLevel` — pass through MJML's `'skip' | 'soft' | 'strict'` validation levels.
- `RenderOptions.templateSyntax` — pass through MJML's template delimiter configuration.
- `RenderOptions.sanitizeStyles` — sanitize template variables inside CSS before minification.
- `RenderOptions.beautify` — pretty-print the output HTML (ignored when `minify` is `true`).
- CLI: `-m, --minify` flag.
- CLI: `-b, --beautify` flag.

### Fixed
- CLI now surfaces unhandled rejections from `render()` as a clean `emailmd: <message>` error with exit code 1, rather than an unhandled-rejection stack trace.

## [0.2.1] — 2025

### Fixed
- Border radius now applies correctly to elements rendered inside directive blocks ([#13](https://github.com/unmta/emailmd/issues/13)).

## [0.2.0] — 2025

### Added
- Richer `border-radius` support across segments and directive blocks ([#12](https://github.com/unmta/emailmd/issues/12)).

## [0.1.5] — 2025

### Added
- `emailmd` CLI for rendering markdown from the command line (file input, stdin, `--output`, `--text`, `--help`, `--version`).

## [0.1.4] — 2025

### Changed
- Updated docs and cleaned up internal constants.

### Added
- Allow fallback-link text to be overridden, to support i18n ([#3](https://github.com/unmta/emailmd/pull/3)).

### Fixed
- Hero text color now respects the theme ([#9](https://github.com/unmta/emailmd/pull/9)).
- Buttons inside segments render correctly ([#8](https://github.com/unmta/emailmd/pull/8)).
- Button-only edge cases in segments.

## [0.1.3] — 2025

### Added
- Custom theme frontmatter for all button types ([#1](https://github.com/unmta/emailmd/issues/1)).

## [0.1.2] and earlier

Initial releases, including Cloudflare Workers support and the core markdown → email-safe HTML pipeline.
