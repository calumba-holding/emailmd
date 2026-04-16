import { describe, it, expect } from 'vitest';
import { render } from '../src/index.js';

describe('task lists / checkboxes', async () => {
  describe('HTML rendering', async () => {
    it('renders an unchecked task item with checkbox character', async () => {
      const { html } = await render('- [ ] Todo item');
      expect(html).toContain('\u2610');
      expect(html).toContain('Todo item');
      expect(html).not.toContain('<input');
    });

    it('renders a checked task item with check character', async () => {
      const { html } = await render('- [x] Done item');
      expect(html).toContain('\u2611');
      expect(html).toContain('Done item');
      expect(html).not.toContain('<input');
    });

    it('renders mixed checked and unchecked items', async () => {
      const md = '- [x] Buy milk\n- [ ] Walk dog\n- [x] Write code';
      const { html } = await render(md);
      expect(html).toContain('Buy milk');
      expect(html).toContain('Walk dog');
      expect(html).toContain('Write code');
      expect(html).not.toContain('<input');
    });

    it('renders task list alongside normal list items', async () => {
      const md = '- [ ] Task item\n- Normal item';
      const { html } = await render(md);
      expect(html).toContain('Task item');
      expect(html).toContain('Normal item');
    });

    it('contains no MJML tags in output', async () => {
      const { html } = await render('- [ ] Task\n- [x] Done');
      expect(html).not.toMatch(/<mj-/);
    });
  });

  describe('plain text output', async () => {
    it('renders unchecked items with [ ] marker', async () => {
      const { text } = await render('- [ ] Unchecked');
      expect(text).toContain('[ ]');
      expect(text).toContain('Unchecked');
    });

    it('renders checked items with [x] marker', async () => {
      const { text } = await render('- [x] Checked');
      expect(text).toContain('[x]');
      expect(text).toContain('Checked');
    });

    it('contains no HTML tags', async () => {
      const { text } = await render('- [ ] Task\n- [x] Done');
      expect(text).not.toMatch(/<[^>]+>/);
    });
  });
});
