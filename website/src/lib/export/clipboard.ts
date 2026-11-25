export interface ClipboardOperationResult {
  ok: boolean;
  error?: string;
}

/**
 * Copies text to the system clipboard using the async Clipboard API with an
 * offscreen textarea execCommand('copy') fallback. Never returns `ok: true`
 * unless the copy operation actually succeeded.
 */
export async function copyToClipboard(text: string): Promise<ClipboardOperationResult> {
  if (typeof text !== 'string') {
    return { ok: false, error: 'Invalid clipboard text' };
  }

  let clipboardError: string | undefined;

  if (
    typeof navigator !== 'undefined' &&
    navigator.clipboard &&
    typeof navigator.clipboard.writeText === 'function'
  ) {
    try {
      await navigator.clipboard.writeText(text);
      return { ok: true };
    } catch (err) {
      clipboardError = err instanceof Error ? err.message : 'Clipboard writeText failed';
    }
  }

  if (typeof document !== 'undefined' && document.body) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-9999px';
    textarea.style.left = '-9999px';
    textarea.style.opacity = '0';
    textarea.style.pointerEvents = 'none';

    const previousFocus =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    try {
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      if (typeof textarea.setSelectionRange === 'function') {
        textarea.setSelectionRange(0, text.length);
      }

      if (typeof document.execCommand === 'function') {
        const succeeded = document.execCommand('copy');
        if (succeeded) {
          return { ok: true };
        }
        return { ok: false, error: clipboardError || 'execCommand("copy") returned false' };
      }

      return { ok: false, error: clipboardError || 'Clipboard fallback unavailable' };
    } catch (err) {
      return {
        ok: false,
        error: err instanceof Error ? err.message : clipboardError || 'Clipboard copy failed',
      };
    } finally {
      if (textarea.parentNode) {
        textarea.parentNode.removeChild(textarea);
      }
      if (previousFocus && typeof previousFocus.focus === 'function') {
        try {
          previousFocus.focus();
        } catch {
          // Ignore focus restoration errors in detached test DOMs
        }
      }
    }
  }

  return { ok: false, error: clipboardError || 'Clipboard API unavailable in this environment' };
}

/**
 * Triggers a browser download for a text payload using a temporary Blob URL
 * and defers URL revocation by 1000ms so browsers never cancel the download early.
 */
export function downloadTextFile(
  filename: string,
  content: string,
  mimeType = 'text/markdown;charset=utf-8'
): ClipboardOperationResult {
  if (
    typeof document === 'undefined' ||
    !document.body ||
    typeof Blob === 'undefined' ||
    typeof URL === 'undefined' ||
    typeof URL.createObjectURL !== 'function'
  ) {
    return { ok: false, error: 'File download API unavailable in this environment' };
  }

  let url: string | null = null;
  try {
    const blob = new Blob([content], { type: mimeType });
    url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename || 'README.md';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    const objectUrl = url;
    setTimeout(() => {
      try {
        URL.revokeObjectURL(objectUrl);
      } catch {
        // Ignore cleanup errors
      }
    }, 1000);

    return { ok: true };
  } catch (err) {
    if (url && typeof URL.revokeObjectURL === 'function') {
      const objectUrl = url;
      setTimeout(() => {
        try {
          URL.revokeObjectURL(objectUrl);
        } catch {
          // Ignore cleanup errors
        }
      }, 1000);
    }
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Failed to download file',
    };
  }
}
