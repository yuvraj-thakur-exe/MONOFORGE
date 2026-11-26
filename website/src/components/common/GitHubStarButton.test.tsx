import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { GitHubStarButton } from './GitHubStarButton';

describe('GitHubStarButton', () => {
  beforeEach(() => {
    cleanup();
    vi.restoreAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it('fetches stars from /api/github/stars instead of api.github.com directly', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ stars: 42 }),
    } as Response);

    render(<GitHubStarButton defaultStars={6} />);

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledWith(
        '/api/github/stars',
        expect.objectContaining({
          headers: { Accept: 'application/json' },
        })
      );
      expect(screen.getByText('42')).toBeDefined();
    });
  });

  it('falls back cleanly to defaultStars when /api/github/stars fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network error'));

    render(<GitHubStarButton defaultStars={6} />);

    await waitFor(() => {
      expect(screen.getByText('6')).toBeDefined();
    });
  });
});
