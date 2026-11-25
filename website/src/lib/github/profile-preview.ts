import { ReadmeConfig } from '#/lib/plugins/types';
import { NormalizedDeveloperIdentity } from '#/lib/visualizations/types';
import {
  assembleDeveloperIdentity,
  fetchPublicGitHubAccount,
  isValidGitHubUsername,
  NormalizedDeveloperIdentityWithProvenance,
} from '#/lib/visualizations/data-engine';

export type PreviewDataStatus =
  | 'sample'
  | 'fetching'
  | 'live'
  | 'partial'
  | 'unavailable'
  | 'rate_limited'
  | 'invalid_username';

export interface GitHubPreviewProfileResult {
  status: PreviewDataStatus;
  statusMessage: string;
  username: string;
  identity?: NormalizedDeveloperIdentity;
  applyToConfig: (baseConfig: ReadmeConfig) => ReadmeConfig;
}

function cloneConfig(config: ReadmeConfig): ReadmeConfig {
  return JSON.parse(JSON.stringify(config)) as ReadmeConfig;
}

function createIdentityApplier(
  identity?: NormalizedDeveloperIdentityWithProvenance
): (baseConfig: ReadmeConfig) => ReadmeConfig {
  return (baseConfig: ReadmeConfig): ReadmeConfig => {
    const nextConfig = cloneConfig(baseConfig);
    if (!identity) {
      return nextConfig;
    }

    const baseUser = nextConfig.settings?.user ?? { github: '' };
    const updatedUser: ReadmeConfig['settings']['user'] & { avatarUrl?: string } = {
      ...baseUser,
      github: identity.username,
      name: identity.displayName || identity.username,
      bio: identity.bio ? identity.bio : baseUser.bio || '',
      location: identity.location ? identity.location : baseUser.location || '',
    };

    if (identity.avatarUrl) {
      updatedUser.avatarUrl = identity.avatarUrl;
    }

    nextConfig.settings = {
      ...nextConfig.settings,
      user: updatedUser,
    };

    if (Array.isArray(nextConfig.sections)) {
      nextConfig.sections = nextConfig.sections.map((section) => {
        if (!section?.props?.content || typeof section.props.content !== 'object') {
          return section;
        }

        const content = { ...section.props.content };
        let changed = false;

        if (typeof content.username === 'string') {
          content.username = identity.username;
          changed = true;
        }
        if (typeof content.github === 'string') {
          content.github = identity.username;
          changed = true;
        }

        if (!changed) return section;

        return {
          ...section,
          props: {
            ...section.props,
            content,
          },
        };
      });
    }

    return nextConfig;
  };
}

/**
 * Fetches verified public GitHub account info + `/api/telemetry/contributions`
 * without inventing missing stars, followers, streaks, or languages.
 */
export async function fetchGitHubPreviewProfile(
  username: string
): Promise<GitHubPreviewProfileResult> {
  const cleanUser = typeof username === 'string' ? username.trim() : '';

  if (!isValidGitHubUsername(cleanUser)) {
    return {
      status: 'invalid_username',
      statusMessage: 'Invalid GitHub username. Use 1-39 alphanumeric characters or single hyphens.',
      username: cleanUser,
      applyToConfig: createIdentityApplier(undefined),
    };
  }

  const contribFetch = async (): Promise<{
    ok: boolean;
    status: number;
    data: Record<string, unknown> | null;
    rateLimited?: boolean;
    notFound?: boolean;
    error?: string;
  }> => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000);
    try {
      const res = await fetch(`/api/telemetry/contributions?user=${encodeURIComponent(cleanUser)}`, {
        signal: controller.signal,
      });
      let json: Record<string, unknown> | null = null;
      try {
        json = (await res.json()) as Record<string, unknown>;
      } catch {
        json = null;
      }

      if (res.status === 429) {
        return {
          ok: false,
          status: 429,
          data: null,
          rateLimited: true,
          error: typeof json?.error === 'string' ? json.error : 'GitHub API rate limit reached',
        };
      }

      if (res.status === 404) {
        return {
          ok: false,
          status: 404,
          data: null,
          notFound: true,
          error: typeof json?.error === 'string' ? json.error : 'GitHub user not found',
        };
      }

      if (!res.ok || !json?.success || !json?.data || typeof json.data !== 'object') {
        return {
          ok: false,
          status: res.status,
          data: null,
          rateLimited: Boolean(json?.rateLimited),
          notFound: Boolean(json?.notFound),
          error: typeof json?.error === 'string' ? json.error : 'Contribution telemetry unavailable',
        };
      }

      return {
        ok: true,
        status: res.status,
        data: json.data as Record<string, unknown>,
      };
    } catch (err) {
      return {
        ok: false,
        status: 0,
        data: null,
        error: err instanceof Error ? err.message : 'Failed to fetch contributions',
      };
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const [accountResult, contribResult] = await Promise.all([
    fetchPublicGitHubAccount(cleanUser, { timeoutMs: 6000 }),
    contribFetch(),
  ]);

  if (accountResult.notFound || contribResult.notFound) {
    return {
      status: 'unavailable',
      statusMessage: `GitHub user "@${cleanUser}" was not found.`,
      username: cleanUser,
      applyToConfig: createIdentityApplier(undefined),
    };
  }

  const contribData = contribResult.ok ? contribResult.data : null;
  const contribHasRealCalendar = Boolean(contribData && contribData.isRealData === true);

  if (accountResult.rateLimited && !contribHasRealCalendar) {
    return {
      status: 'rate_limited',
      statusMessage: 'GitHub API rate limit reached. Try again shortly.',
      username: cleanUser,
      applyToConfig: createIdentityApplier(undefined),
    };
  }

  if (contribResult.rateLimited && !accountResult.ok) {
    return {
      status: 'rate_limited',
      statusMessage: 'GitHub API rate limit reached. Try again shortly.',
      username: cleanUser,
      applyToConfig: createIdentityApplier(undefined),
    };
  }

  // If contributions route returned full combined identity and direct GitHub account call failed,
  // check if contributions route already included real repositories/profile.
  const contribAlsoHasProfile = Boolean(
    contribHasRealCalendar &&
      contribData &&
      Array.isArray(contribData.repositories) &&
      Array.isArray(contribData.languages)
  );

  const effectiveAccount = accountResult.ok
    ? accountResult
    : contribAlsoHasProfile && contribData
    ? {
        ok: true,
        username: cleanUser,
        displayName: typeof contribData.displayName === 'string' ? contribData.displayName : cleanUser,
        avatarUrl: typeof contribData.avatarUrl === 'string' ? contribData.avatarUrl : undefined,
        bio: typeof contribData.bio === 'string' ? contribData.bio : '',
        location: typeof contribData.location === 'string' ? contribData.location : '',
        repositories: contribData.repositories as NormalizedDeveloperIdentity['repositories'],
        languages: contribData.languages as NormalizedDeveloperIdentity['languages'],
      }
    : accountResult;

  const identity = assembleDeveloperIdentity(cleanUser, contribData, effectiveAccount);

  if (identity.source === 'unavailable') {
    return {
      status: identity.rateLimited ? 'rate_limited' : 'unavailable',
      statusMessage: identity.rateLimited
        ? 'GitHub API rate limit reached. Try again shortly.'
        : identity.error || `GitHub data unavailable for "@${cleanUser}".`,
      username: cleanUser,
      applyToConfig: createIdentityApplier(undefined),
    };
  }

  if (identity.source === 'partial') {
    const missingLabel = identity.missingFields?.length
      ? ` (${identity.missingFields.join(', ')} unavailable)`
      : '';
    return {
      status: 'partial',
      statusMessage: `Partial GitHub data available for @${identity.username}${missingLabel}.`,
      username: identity.username,
      identity,
      applyToConfig: createIdentityApplier(identity),
    };
  }

  return {
    status: 'live',
    statusMessage: `Live GitHub data loaded for @${identity.username}.`,
    username: identity.username,
    identity,
    applyToConfig: createIdentityApplier(identity),
  };
}
