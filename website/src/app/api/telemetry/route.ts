import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  buildTelemetryActionWorkflow,
  buildTelemetryEmbedUrl,
  buildTelemetryMarkdownSnippet,
} from '#/lib/forge-telemetry/builder';
import { ForgeTelemetryConfig, TelemetryTemplate } from '#/lib/forge-telemetry/types';
import { TELEMETRY_PLUGINS_CATALOG } from '#/lib/forge-telemetry/catalog';

export const runtime = 'nodejs';

const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9](?:[a-zA-Z0-9]|-(?=[a-zA-Z0-9])){0,38}$/;

const TelemetryConfigSchema = z
  .object({
    username: z
      .string()
      .trim()
      .max(39)
      .refine((val) => val === '' || GITHUB_USERNAME_REGEX.test(val), {
        message: 'Invalid GitHub username format',
      })
      .optional(),
    template: z
      .enum(['classic', 'terminal', 'repository', 'markdown', 'community'])
      .optional(),
    outputMode: z.enum(['action', 'direct_svg', 'markdown_table']).optional(),
    base: z
      .object({
        header: z.boolean().optional(),
        activity: z.boolean().optional(),
        community: z.boolean().optional(),
        repositories: z.boolean().optional(),
        metadata: z.boolean().optional(),
      })
      .strict()
      .optional(),
    isocalendar: z
      .object({
        enabled: z.boolean().optional(),
        duration: z.enum(['half-year', 'full-year']).optional(),
      })
      .strict()
      .optional(),
    languages: z
      .object({
        enabled: z.boolean().optional(),
        ignored: z.array(z.string()).optional(),
        limit: z.number().int().min(1).max(30).optional(),
        sections: z.array(z.enum(['most-used', 'recently-used'])).optional(),
        details: z.array(z.enum(['bytes', 'percentage', 'lines'])).optional(),
        indepth: z.boolean().optional(),
      })
      .strict()
      .optional(),
    habits: z
      .object({
        enabled: z.boolean().optional(),
        from: z.number().int().min(1).max(1000).optional(),
        days: z.number().int().min(1).max(365).optional(),
        facts: z.boolean().optional(),
        charts: z.boolean().optional(),
        trim: z.boolean().optional(),
      })
      .strict()
      .optional(),
    achievements: z
      .object({
        enabled: z.boolean().optional(),
        threshold: z.enum(['C', 'B', 'A', 'S', 'X']).optional(),
        secrets: z.boolean().optional(),
        display: z.enum(['compact', 'detailed']).optional(),
        limit: z.number().int().min(0).max(50).optional(),
      })
      .strict()
      .optional(),
    leetcode: z
      .object({
        enabled: z.boolean().optional(),
        user: z.string().trim().max(64).optional(),
        sections: z.array(z.enum(['solved', 'skills', 'recent'])).optional(),
      })
      .strict()
      .optional(),
    topics: z
      .object({
        enabled: z.boolean().optional(),
        mode: z.enum(['starred', 'mastered']).optional(),
        sort: z.enum(['stars', 'activity', 'random']).optional(),
        limit: z.number().int().min(1).max(50).optional(),
      })
      .strict()
      .optional(),
    wakatime: z
      .object({
        enabled: z.boolean().optional(),
        sections: z.array(z.enum(['time', 'projects', 'languages', 'editors'])).optional(),
        days: z.number().int().min(1).max(365).optional(),
      })
      .strict()
      .optional(),
    customPlugins: z
      .record(z.string(), z.record(z.string(), z.unknown()))
      .optional(),
    timezone: z.string().max(64).optional(),
    commitMessage: z.string().max(200).optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: 'Telemetry configuration payload must not be empty',
  });

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const user = searchParams.get('user') || 'octocat';
  const template = (searchParams.get('template') as TelemetryTemplate) || 'classic';
  const hasIsocalendar = searchParams.get('isocalendar') === '1' || searchParams.get('isocalendar') === 'true';
  const hasLanguages = searchParams.get('languages') === '1' || searchParams.get('languages') === 'true';
  const hasHabits = searchParams.get('habits') === '1' || searchParams.get('habits') === 'true';
  const hasAchievements = searchParams.get('achievements') === '1' || searchParams.get('achievements') === 'true';

  const config: ForgeTelemetryConfig = {
    username: user,
    template,
    outputMode: 'direct_svg',
    isocalendar: { enabled: hasIsocalendar },
    languages: { enabled: hasLanguages },
    habits: { enabled: hasHabits },
    achievements: { enabled: hasAchievements },
  };

  const embedUrl = buildTelemetryEmbedUrl(config);
  const markdown = buildTelemetryMarkdownSnippet(config);

  return NextResponse.json({
    engine: 'MonoForge Telemetry Engine',
    version: '3.35.0-monoforge',
    user,
    template,
    embedUrl,
    markdown,
    availableTemplates: ['classic', 'terminal', 'repository', 'markdown', 'community'],
    supportedPlugins: TELEMETRY_PLUGINS_CATALOG.map(p => p.id),
  });
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.json();
    const parsed = TelemetryConfigSchema.safeParse(rawBody);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid telemetry configuration payload',
          details: parsed.error.issues.map((issue) => ({
            path: issue.path.join('.') || 'root',
            message: issue.message,
          })),
        },
        { status: 400 }
      );
    }

    const body: ForgeTelemetryConfig = parsed.data;
    const user = body.username || 'octocat';
    const workflowYaml = buildTelemetryActionWorkflow(body);
    const embedUrl = buildTelemetryEmbedUrl(body);
    const markdown = buildTelemetryMarkdownSnippet(body);

    return NextResponse.json({
      success: true,
      user,
      workflowYaml,
      embedUrl,
      markdown,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Invalid request payload' },
      { status: 400 }
    );
  }
}
