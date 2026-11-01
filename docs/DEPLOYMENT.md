# MonoForge Deployment Specification

## 1. Production Architecture
- **Framework**: Next.js 16 (App Router) with Turbopack compilation.
- **Hosting Platform**: Vercel Serverless / Edge Network.
- **Production URL**: `https://monoforge-studio.vercel.app`
- **Canonical Locale**: `/en` (i18n routing powered by `next-intl`).

## 2. Environment Variables
Configure the following in the Vercel dashboard:
- `NEXT_PUBLIC_APP_URL`: Production domain URL (`https://monoforge-studio.vercel.app`).
- `GITHUB_CLIENT_ID`: (Optional) For GitHub OAuth authentication.
- `GITHUB_CLIENT_SECRET`: (Optional) For GitHub OAuth direct commits.

## 3. Caching & Edge Optimization
- Contributor activity responses are cached with `Cache-Control: public, max-age=900, stale-while-revalidate=86400`.
- Telemetry SVG endpoints utilize immutable asset caching: `Cache-Control: public, max-age=86400, stale-while-revalidate=604800, immutable`.
- In-memory 15-minute TTL cache protects against external GitHub API rate-limiting.

## 4. Deploy Commands
```bash
# Preview build locally
pnpm build
pnpm start

# Deploy to Vercel production
npx vercel --prod --yes
```
