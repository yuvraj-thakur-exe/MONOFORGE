import { describe, it, expect, vi, afterEach } from 'vitest';
import { resolvePinterestUrl, PINTEREST_PRESETS } from './resolver';

describe('resolvePinterestUrl', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('resolves built-in presets without network requests', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const res = await resolvePinterestUrl('lofi-coder');

    expect(res.success).toBe(true);
    expect(res.source).toBe('preset');
    expect(res.url).toBe(PINTEREST_PRESETS['lofi-coder'].url);
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('upgrades i.pinimg.com HTTP URLs to HTTPS originals without fetching', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const res = await resolvePinterestUrl('http://i.pinimg.com/736x/ab/cd/ef/sample.jpg');

    expect(res.success).toBe(true);
    expect(res.source).toBe('pinterest-cdn');
    expect(res.url).toBe('https://i.pinimg.com/originals/ab/cd/ef/sample.jpg');
    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('rejects SSRF attempts with private/metadata IPs, localhost, and spoofed hostnames', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    const maliciousInputs = [
      'http://169.254.169.254/latest/meta-data/?pinterest.com',
      'http://127.0.0.1:8080/pin.it',
      'https://localhost/pinterest.com',
      'https://10.0.0.1/pinterest.com',
      'https://192.168.1.10/pinterest.com',
      'https://172.16.0.1/i.pinimg.com',
      'https://[::1]/pinterest.com',
      'https://evil.com/?pinterest.com',
      'https://pinterest.com.evil.com/pin/12345',
      'https://notpinterest.com/pin/12345',
      'https://user:pass@www.pinterest.com/pin/12345',
      'file:///etc/passwd?pinterest.com',
      'javascript:alert(1)',
    ];

    for (const input of maliciousInputs) {
      const res = await resolvePinterestUrl(input);
      expect(res.success, `Expected rejection for ${input}`).toBe(false);
    }

    expect(fetchSpy).not.toHaveBeenCalled();
  });

  it('uses manual redirect mode and validates allowlisted redirects safely', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(null, {
          status: 302,
          headers: { location: 'https://www.pinterest.com/pin/123456/' },
        })
      )
      .mockResolvedValueOnce(
        new Response(
          '<html><head><meta property="og:image" content="https://i.pinimg.com/564x/11/22/33/img.png" /><meta property="og:title" content="Dev Setup" /></head></html>',
          { status: 200 }
        )
      );

    const res = await resolvePinterestUrl('http://pin.it/abc123');

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[0]?.[0]).toBe('https://pin.it/abc123');
    expect(fetchMock.mock.calls[0]?.[1]?.redirect).toBe('manual');
    expect(res.success).toBe(true);
    expect(res.source).toBe('pinterest-pin');
    expect(res.url).toBe('https://i.pinimg.com/originals/11/22/33/img.png');
    expect(res.title).toBe('Dev Setup');
  });

  it('blocks redirects to private metadata IPs or unallowlisted external hosts', async () => {
    const fetchMock = vi
      .spyOn(globalThis, 'fetch')
      .mockResolvedValueOnce(
        new Response(null, {
          status: 302,
          headers: { location: 'http://169.254.169.254/latest/meta-data/' },
        })
      );

    const res = await resolvePinterestUrl('https://pin.it/ssrf-redirect');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(res.success).toBe(false);
    expect(res.error).toContain('Blocked unsafe redirect target');
  });
});
