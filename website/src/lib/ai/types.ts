import { z } from 'zod';

export type AiActionType =
  | 'generate-readme'
  | 'improve-readme'
  | 'generate-bio'
  | 'describe-project'
  | 'suggest-skills'
  | 'suggest-sections'
  | 'generate-template'
  | 'explain-telemetry'
  | 'recommend-design'
  | 'create'
  | 'visual'
  | 'animate'
  | 'chart'
  | 'diagram'
  | 'banner'
  | 'component'
  | 'import'
  | 'redesign'
  | 'optimize'
  | 'doctor'
  | 'export'
  | 'search-assets';

export interface AiModelOption {
  id: string;
  name: string;
  provider: string;
  contextWindow: string;
  isFree?: boolean;
}

export const AI_MODELS: AiModelOption[] = [
  {
    id: 'google/gemini-2.0-flash-exp:free',
    name: 'Gemini 2.0 Flash (Free)',
    provider: 'Google',
    contextWindow: '1M tokens',
    isFree: true,
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B Instruct',
    provider: 'Meta',
    contextWindow: '128k tokens',
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    contextWindow: '200k tokens',
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    contextWindow: '128k tokens',
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    contextWindow: '64k tokens',
  },
];

export const AiRequestSchema = z.object({
  action: z.enum([
    'generate-readme',
    'improve-readme',
    'generate-bio',
    'describe-project',
    'suggest-skills',
    'suggest-sections',
    'generate-template',
    'explain-telemetry',
    'recommend-design',
    'create',
    'visual',
    'animate',
    'chart',
    'diagram',
    'banner',
    'component',
    'import',
    'redesign',
    'optimize',
    'doctor',
    'export',
    'search-assets',
  ]),
  prompt: z.string().min(1).max(12000),
  model: z.string().optional().default('google/gemini-2.0-flash-exp:free'),
  apiKey: z.string().optional(),
  context: z
    .object({
      currentBio: z.string().optional(),
      technologies: z.array(z.string()).optional(),
      archetype: z.string().optional(),
      rawMarkdown: z.string().optional(),
    })
    .optional(),
});

export type AiRequest = z.infer<typeof AiRequestSchema>;

export interface GeneratedProjectItem {
  name: string;
  description: string;
  url: string;
  tags: string[];
}

export interface AiResponseResult {
  markdown?: string;
  bio?: string;
  headline?: string;
  technologies?: string[];
  projects?: GeneratedProjectItem[];
  suggestions?: string[];
  summary?: string;
  assets?: Array<{
    id: string;
    name: string;
    publicUrl: string;
    category: string;
    format: string;
  }>;
}

export interface AiResponse {
  success: boolean;
  result?: AiResponseResult;
  error?: string;
  modelUsed?: string;
}
