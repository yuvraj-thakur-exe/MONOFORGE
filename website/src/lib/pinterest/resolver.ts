export const PINTEREST_PRESETS: Record<string, { label: string; url: string; title: string }> = {
  'lofi-coder': {
    label: 'Cozy Lo-Fi Coder (Midnight Desk)',
    url: 'https://i.pinimg.com/originals/0a/61/52/0a6152a25992955f134764b86378e994.gif',
    title: 'Cozy Lo-Fi Midnight Coding Desk',
  },
  'cyberpunk-neon': {
    label: 'Cyberpunk Neon City Skyline',
    url: 'https://i.pinimg.com/originals/24/49/a0/2449a022416b0817024f227b23395b28.gif',
    title: 'Cyberpunk Neon Metropolis',
  },
  'pixel-sunset': {
    label: 'Retro Pixel Twilight Horizon',
    url: 'https://i.pinimg.com/originals/a0/d5/9c/a0d59c636f890cf30c1be1ff5c58a69b.gif',
    title: 'Retro Pixel Sunset Horizon',
  },
  'vaporwave-grid': {
    label: 'Dark Vaporwave Synthwave Grid',
    url: 'https://i.pinimg.com/originals/3a/0d/bb/3a0dbb3a53e990b7936a2e212dbd4090.gif',
    title: 'Dark Synthwave Wireframe Horizon',
  },
  'ghibli-scenic': {
    label: 'Studio Ghibli Coding Sanctuary',
    url: 'https://i.pinimg.com/originals/60/a4/09/60a409549df9c4d2994db7a2fec34d9a.gif',
    title: 'Studio Ghibli Scenic Sanctuary',
  },
  'cat-typing': {
    label: 'Speed Hacker Cat Typing',
    url: 'https://i.pinimg.com/originals/e4/26/70/e426702edf874b181aced1e2fa5c6cde.gif',
    title: 'Cat Typing at Light Speed',
  },
};

export interface ResolvePinterestResult {
  success: boolean;
  url: string;
  title?: string;
  source: 'pinterest-cdn' | 'pinterest-pin' | 'preset' | 'external';
  error?: string;
}

const MAX_REDIRECTS = 5;

function normalizeHostname(hostname: string): string {
  return hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.+$/, '');
}

/**
 * Rejects loopback, private RFC1918/RFC4193, link-local, cloud metadata, and IP literal hosts.
 */
function isPrivateOrMetadataHost(rawHostname: string): boolean {
  const host = normalizeHostname(rawHostname);
  if (!host) return true;

  if (
    host === 'localhost' ||
    host.endsWith('.localhost') ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host === 'metadata.google.internal'
  ) {
    return true;
  }

  // IPv6 literals or mapped IPv4
  if (host.includes(':')) {
    return true;
  }

  // Dotted-quad IPv4 or integer/hex/octal IPv4 literals
  if (/^\d+$/.test(host) || /^0x[0-9a-f]+$/i.test(host)) {
    return true;
  }

  const ipv4Match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, aStr, bStr, cStr, dStr] = ipv4Match;
    const a = Number(aStr);
    const b = Number(bStr);
    const c = Number(cStr);
    const d = Number(dStr);
    if ([a, b, c, d].some((n) => n > 255)) return true;

    // 0.0.0.0/8, 10.0.0.0/8, 127.0.0.0/8, 169.254.0.0/16, 172.16.0.0/12, 192.168.0.0/16, 100.64.0.0/10
    if (
      a === 0 ||
      a === 10 ||
      a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127)
    ) {
      return true;
    }
    return true; // Reject all raw IPv4 addresses even if public
  }

  return false;
}

function isPinterestCdnHost(hostname: string): boolean {
  const host = normalizeHostname(hostname);
  return host === 'i.pinimg.com' || host.endsWith('.pinimg.com');
}

function isPinterestPageHost(hostname: string): boolean {
  const host = normalizeHostname(hostname);
  return (
    host === 'pinterest.com' ||
    host === 'www.pinterest.com' ||
    host.endsWith('.pinterest.com') ||
    host === 'pin.it' ||
    host === 'www.pin.it'
  );
}

interface ValidatedPinterestUrl {
  url: URL;
  kind: 'cdn' | 'pin';
}

function validatePinterestUrl(rawUrl: string, baseUrl?: URL): ValidatedPinterestUrl | { error: string } {
  let parsed: URL;
  try {
    parsed = baseUrl ? new URL(rawUrl, baseUrl) : new URL(rawUrl);
  } catch {
    return { error: 'Unrecognized URL format' };
  }

  if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
    return { error: `Unsupported URL protocol: ${parsed.protocol}` };
  }

  if (parsed.username || parsed.password) {
    return { error: 'Credentials in URL are not allowed' };
  }

  // Upgrade http -> https
  if (parsed.protocol === 'http:') {
    parsed.protocol = 'https:';
  }

  if (isPrivateOrMetadataHost(parsed.hostname)) {
    return { error: 'Private, loopback, or metadata hosts are not allowed' };
  }

  if (isPinterestCdnHost(parsed.hostname)) {
    return { url: parsed, kind: 'cdn' };
  }

  if (isPinterestPageHost(parsed.hostname)) {
    return { url: parsed, kind: 'pin' };
  }

  return {
    error: 'Only official Pinterest hosts (pinterest.com, www.pinterest.com, pin.it, i.pinimg.com) are allowed',
  };
}

function normalizeImageResultUrl(rawImgUrl: string): string | null {
  try {
    const parsed = new URL(rawImgUrl);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') return null;
    if (isPrivateOrMetadataHost(parsed.hostname)) return null;
    if (parsed.protocol === 'http:') {
      parsed.protocol = 'https:';
    }
    if (!isPinterestCdnHost(parsed.hostname) && !isPinterestPageHost(parsed.hostname)) {
      return null;
    }
    return parsed.toString().replace(/\/\d+x\//, '/originals/');
  } catch {
    return null;
  }
}

/**
 * Resolves any Pinterest pin link, shortlink, or CDN link into a direct high-resolution image URL.
 */
export async function resolvePinterestUrl(input: string): Promise<ResolvePinterestResult> {
  const clean = input ? input.trim() : '';

  if (!clean) {
    return {
      success: false,
      url: '',
      source: 'preset',
      error: 'Empty Pinterest URL provided',
    };
  }

  // 1. Check if it matches a preset key
  if (PINTEREST_PRESETS[clean]) {
    const p = PINTEREST_PRESETS[clean];
    return {
      success: true,
      url: p.url,
      title: p.title,
      source: 'preset',
    };
  }

  // 2. Parse & strictly validate URL against Pinterest allowlist (SSRF protection)
  const validated = validatePinterestUrl(clean);
  if ('error' in validated) {
    return {
      success: false,
      url: clean,
      source: 'external',
      error: validated.error,
    };
  }

  // 3. Direct Pinterest CDN URL (i.pinimg.com / *.pinimg.com)
  if (validated.kind === 'cdn') {
    const upgraded = validated.url.toString().replace(/\/\d+x\//, '/originals/');
    return {
      success: true,
      url: upgraded,
      source: 'pinterest-cdn',
    };
  }

  // 4. Pinterest Pin Webpage (pinterest.com/pin/... or pin.it/...) with manual redirect validation
  let currentUrl = validated.url;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 6000);

  try {
    let res: Response | null = null;

    for (let hop = 0; hop <= MAX_REDIRECTS; hop++) {
      res = await fetch(currentUrl.toString(), {
        headers: {
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        },
        redirect: 'manual',
        signal: controller.signal,
      });

      if (res.status >= 300 && res.status < 400) {
        const location = res.headers.get('location');
        if (!location) {
          return {
            success: false,
            url: clean,
            source: 'pinterest-pin',
            error: `Pinterest redirect (${res.status}) missing Location header`,
          };
        }

        const nextValidated = validatePinterestUrl(location, currentUrl);
        if ('error' in nextValidated) {
          return {
            success: false,
            url: clean,
            source: 'pinterest-pin',
            error: `Blocked unsafe redirect target: ${nextValidated.error}`,
          };
        }

        if (nextValidated.kind === 'cdn') {
          return {
            success: true,
            url: nextValidated.url.toString().replace(/\/\d+x\//, '/originals/'),
            source: 'pinterest-cdn',
          };
        }

        currentUrl = nextValidated.url;
        continue;
      }

      break;
    }

    if (!res) {
      return {
        success: false,
        url: clean,
        source: 'pinterest-pin',
        error: 'No response from Pinterest',
      };
    }

    if (res.status >= 300 && res.status < 400) {
      return {
        success: false,
        url: clean,
        source: 'pinterest-pin',
        error: 'Too many redirects while resolving Pinterest URL',
      };
    }

    if (!res.ok) {
      return {
        success: false,
        url: clean,
        source: 'pinterest-pin',
        error: `Pinterest returned status ${res.status}`,
      };
    }

    const html = await res.text();

    // Extract OpenGraph Image meta tag
    const ogMatch = html.match(/<meta property=["']og:image["'] content=["']([^"']+)["']/i);
    if (ogMatch && ogMatch[1]) {
      const directImg = normalizeImageResultUrl(ogMatch[1]);
      if (directImg) {
        const titleMatch = html.match(/<meta property=["']og:title["'] content=["']([^"']+)["']/i);
        return {
          success: true,
          url: directImg,
          title: titleMatch?.[1] || undefined,
          source: 'pinterest-pin',
        };
      }
    }

    // Fallback: look for JSON-LD image
    const jsonMatch = html.match(/"image":\s*"([^"]+)"/);
    if (jsonMatch && jsonMatch[1]) {
      const normalized = normalizeImageResultUrl(jsonMatch[1].replace(/\\u002F/g, '/'));
      if (normalized) {
        return {
          success: true,
          url: normalized,
          source: 'pinterest-pin',
        };
      }
    }

    return {
      success: false,
      url: clean,
      source: 'pinterest-pin',
      error: 'Could not extract image from Pinterest page',
    };
  } catch (err: unknown) {
    return {
      success: false,
      url: clean,
      source: 'pinterest-pin',
      error: err instanceof Error ? err.message : 'Failed to resolve pin webpage',
    };
  } finally {
    clearTimeout(timeoutId);
  }
}
