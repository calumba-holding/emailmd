import { describe, it, expect } from 'vitest';
import { render } from '../src/index.js';

describe('linkify / bare URL autolinks', async () => {
  it('auto-links a bare https URL', async () => {
    const { html } = await render('Visit https://example.com for info.');
    expect(html).toContain('href="https://example.com"');
    expect(html).toContain('>https://example.com</a>');
  });

  it('auto-links a bare http URL', async () => {
    const { html } = await render('See http://example.com for details.');
    expect(html).toContain('href="http://example.com"');
  });

  it('does not double-link an explicit markdown link', async () => {
    const { html } = await render('[Example](https://example.com)');
    const matches = html.match(/href="https:\/\/example\.com"/g);
    expect(matches?.length).toBe(1);
  });

  it('auto-links alongside regular markdown content', async () => {
    const { html } = await render('# Title\n\nGo to https://example.com now.');
    expect(html).toContain('href="https://example.com"');
  });

  it('contains no MJML tags in output', async () => {
    const { html } = await render('Visit https://example.com');
    expect(html).not.toMatch(/<mj-/);
  });
});

describe('linkify plain text output', async () => {
  it('preserves the bare URL in plain text', async () => {
    const { text } = await render('Visit https://example.com for info.');
    expect(text).toContain('https://example.com');
  });
});
