# MonoForge Development Guide

## 1. Prerequisites
- **Node.js**: v20+ (Node v24 supported)
- **Package Manager**: `pnpm` (recommended) or `npm`
- **Git**: 2.30+

## 2. Quickstart
```bash
# Clone the repository
git clone https://github.com/yuvraj-thakur-exe/MONOFORGE.git
cd MONOFORGE

# Install dependencies
pnpm install

# Start development server
pnpm dev
# App will run at http://localhost:3000
```

## 3. Scripts & Verification
```bash
# Run full Vitest test suite (170+ test files, 800+ tests)
pnpm test

# Type-check TypeScript without emit
pnpm type-check

# Run linter and formatting check
pnpm lint

# Format codebase
pnpm format

# Production build with Next.js Turbopack
pnpm build
```

## 4. Pre-PR Checklist
Before opening a pull request or finishing an agent task:
1. `pnpm test` and `pnpm type-check` must pass with 0 errors.
2. If touching `buildMarkdown.ts` or any plugin: add or update corresponding Vitest tests.
3. If modifying profile config shape: update `docs/config-schema.md` and Zod schemas together.
4. Verify GitHub Camo rules: no unescaped scripts, no foreignObject in SVG generators.
