import type { MutableRefObject } from "react";

type PendingSelection = MutableRefObject<{
  start: number;
  end: number;
} | null>;

/**
 * Wrap the current selection with prefix/suffix. If nothing is selected,
 * inserts prefix + placeholder + suffix and selects the placeholder.
 */
export function wrapSelection(
  textarea: HTMLTextAreaElement,
  value: string,
  onChange: (v: string) => void,
  pendingSelectionRef: PendingSelection,
  prefix: string,
  suffix: string,
  placeholder: string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = value.slice(start, end);

  if (selected) {
    const replacement = prefix + selected + suffix;
    const newValue = value.slice(0, start) + replacement + value.slice(end);
    pendingSelectionRef.current = {
      start: start + prefix.length,
      end: start + prefix.length + selected.length,
    };
    onChange(newValue);
  } else {
    const replacement = prefix + placeholder + suffix;
    const newValue = value.slice(0, start) + replacement + value.slice(end);
    pendingSelectionRef.current = {
      start: start + prefix.length,
      end: start + prefix.length + placeholder.length,
    };
    onChange(newValue);
  }
}

/**
 * Insert a block of text at cursor, ensuring blank line separation
 * from surrounding content. Optionally select a substring within
 * the inserted text.
 */
export function insertBlock(
  textarea: HTMLTextAreaElement,
  value: string,
  onChange: (v: string) => void,
  pendingSelectionRef: PendingSelection,
  block: string,
  selectText?: string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const before = value.slice(0, start);
  const after = value.slice(end);

  // Ensure blank line before block (if there's content before)
  let prefix = "";
  if (before.length > 0 && !before.endsWith("\n\n")) {
    if (before.endsWith("\n")) {
      prefix = "\n";
    } else {
      prefix = "\n\n";
    }
  }

  // Ensure blank line after block (if there's content after)
  let suffix = "";
  if (after.length > 0 && !after.startsWith("\n\n")) {
    if (after.startsWith("\n")) {
      suffix = "\n";
    } else {
      suffix = "\n\n";
    }
  }

  const insertion = prefix + block + suffix;
  const newValue = before + insertion + after;

  if (selectText) {
    const selectStart = start + prefix.length + block.indexOf(selectText);
    pendingSelectionRef.current = {
      start: selectStart,
      end: selectStart + selectText.length,
    };
  } else {
    const cursorPos = start + insertion.length;
    pendingSelectionRef.current = { start: cursorPos, end: cursorPos };
  }

  onChange(newValue);
}

/**
 * Prefix selected lines with a string (e.g., "> " for blockquote).
 * If nothing is selected, inserts prefix + placeholder.
 */
export function prefixLines(
  textarea: HTMLTextAreaElement,
  value: string,
  onChange: (v: string) => void,
  pendingSelectionRef: PendingSelection,
  prefix: string,
  placeholder: string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = value.slice(start, end);

  if (selected) {
    const lines = selected.split("\n");
    const prefixed = lines.map((line) => prefix + line).join("\n");
    const newValue = value.slice(0, start) + prefixed + value.slice(end);
    pendingSelectionRef.current = {
      start,
      end: start + prefixed.length,
    };
    onChange(newValue);
  } else {
    const text = prefix + placeholder;
    const newValue = value.slice(0, start) + text + value.slice(end);
    pendingSelectionRef.current = {
      start: start + prefix.length,
      end: start + text.length,
    };
    onChange(newValue);
  }
}

/**
 * Insert a template where selected text fills a slot. If text is selected,
 * it's used as the label and the other part (e.g., URL) is selected.
 * If nothing is selected, the entire template is inserted with a default
 * portion selected.
 */
export function insertTemplate(
  textarea: HTMLTextAreaElement,
  value: string,
  onChange: (v: string) => void,
  pendingSelectionRef: PendingSelection,
  buildTemplate: (selected: string) => string,
  getSelectRange: (
    result: string,
    hadSelection: boolean
  ) => { start: number; end: number }
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const selected = value.slice(start, end);
  const hadSelection = selected.length > 0;

  const template = buildTemplate(selected || "");
  const before = value.slice(0, start);
  const after = value.slice(end);

  // Ensure blank line separation for block templates
  let prefix = "";
  if (before.length > 0 && !before.endsWith("\n\n")) {
    if (before.endsWith("\n")) {
      prefix = "\n";
    } else {
      prefix = "\n\n";
    }
  }

  let suffix = "";
  if (after.length > 0 && !after.startsWith("\n\n")) {
    if (after.startsWith("\n")) {
      suffix = "\n";
    } else {
      suffix = "\n\n";
    }
  }

  const insertion = prefix + template + suffix;
  const newValue = before + insertion + after;
  const range = getSelectRange(template, hadSelection);

  pendingSelectionRef.current = {
    start: start + prefix.length + range.start,
    end: start + prefix.length + range.end,
  };

  onChange(newValue);
}

/**
 * Insert text at the current cursor position without block separation.
 * Used for inline insertions like emoji shortcodes.
 */
export function insertAtCursor(
  textarea: HTMLTextAreaElement,
  value: string,
  onChange: (v: string) => void,
  pendingSelectionRef: PendingSelection,
  text: string
) {
  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;
  const newValue = value.slice(0, start) + text + value.slice(end);
  const cursorPos = start + text.length;
  pendingSelectionRef.current = { start: cursorPos, end: cursorPos };
  onChange(newValue);
}
