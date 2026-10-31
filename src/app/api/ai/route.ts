import { NextRequest, NextResponse } from 'next/server';
import { AiRequestSchema } from '#/lib/ai/types';
import { synthesizeFallbackAiResponse } from '#/lib/ai/ai-service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = AiRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: `Invalid request shape: ${parsed.error.issues.map((i) => i.message).join(', ')}`,
        },
        { status: 400 }
      );
    }

    const { action, prompt, model, apiKey, context } = parsed.data;
    const effectiveKey = apiKey || process.env.OPENROUTER_API_KEY;

    // If an OpenRouter API key is provided, query the model
    if (effectiveKey) {
      try {
        const systemPrompt = `You are the MonoForge AI Profile Architect. You generate high-impact, professional GitHub Profile READMEs, bio summaries, tech stack badges, and project highlights for software engineers. Output clean markdown and JSON formats without unnecessary banter. Action: ${action}.`;

        const openRouterResponse = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${effectiveKey}`,
            'HTTP-Referer': 'https://monoforge-studio.vercel.app',
            'X-Title': 'MonoForge Developer Studio',
          },
          body: JSON.stringify({
            model: model || 'google/gemini-2.0-flash-exp:free',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: prompt },
            ],
            temperature: 0.7,
            max_tokens: 1500,
          }),
        });

        if (openRouterResponse.ok) {
          const aiJson = await openRouterResponse.json();
          const content = aiJson.choices?.[0]?.message?.content || '';

          return NextResponse.json({
            success: true,
            result: {
              markdown: content,
              bio: content.slice(0, 200),
              suggestions: ['Generated via OpenRouter model ' + model],
            },
            modelUsed: model,
          });
        }
      } catch {
        // Fall back to heuristic synthesizer if upstream fails
      }
    }

    // Default: use built-in heuristic synthesis engine
    const synthesized = synthesizeFallbackAiResponse(action, prompt, context);
    return NextResponse.json({
      success: true,
      result: synthesized,
      modelUsed: 'heuristic-engine',
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: (err as Error).message || 'Internal AI Server Error',
      },
      { status: 500 }
    );
  }
}
