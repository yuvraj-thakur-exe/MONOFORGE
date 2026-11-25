import { NextResponse } from 'next/server';
import { pluginRegistry } from '#/lib/plugins/registry';
import {
  ReadmeConfigSchema,
  SectionConfigSchema,
  UserSettingsSchema,
} from '#/lib/plugins/types';
import { VISUALIZATION_REGISTRY, ALL_VISUALIZATION_IDS } from '#/lib/visualizations/registry';

export const runtime = 'nodejs';

function buildPluginContentPropertySchema(field: {
  type: string;
  label: string;
  description?: string;
  defaultValue?: unknown;
  options?: Array<{ value: string | number | boolean }>;
}) {
  const base: Record<string, unknown> = {
    description: field.description || field.label,
  };
  if (field.defaultValue !== undefined) {
    base.default = field.defaultValue;
  }

  switch (field.type) {
    case 'number':
      base.type = 'number';
      break;
    case 'boolean':
      base.type = 'boolean';
      break;
    case 'multiselect':
      base.type = 'array';
      break;
    case 'select':
      base.type = 'string';
      if (field.options && field.options.length > 0) {
        base.enum = field.options.map((opt) => opt.value);
      }
      break;
    default:
      base.type = 'string';
      break;
  }
  return base;
}

export async function GET() {
  const pluginIds = pluginRegistry.map((p) => p.id);
  const configKeys = Object.keys(ReadmeConfigSchema.shape);
  const settingsKeys = Object.keys(UserSettingsSchema.shape);
  const sectionKeys = Object.keys(SectionConfigSchema.shape);

  const pluginSectionVariants = pluginRegistry.map((plugin) => {
    const contentProperties: Record<string, unknown> = {};
    for (const field of plugin.fields) {
      const key = field.name || field.id;
      if (key) {
        contentProperties[key] = buildPluginContentPropertySchema(field);
      }
    }

    return {
      if: {
        properties: {
          type: { const: plugin.id },
        },
      },
      then: {
        properties: {
          props: {
            type: 'object',
            properties: {
              content: {
                type: 'object',
                description: `${plugin.name}: ${plugin.description}`,
                default: plugin.defaultConfig ?? {},
                properties: contentProperties,
              },
            },
          },
        },
      },
    };
  });

  const schema = {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'MonoForgeConfig',
    description:
      'Dynamically generated JSON Schema for MonoForge GitHub profile configuration, synced with ReadmeConfigSchema, pluginRegistry, and VISUALIZATION_REGISTRY.',
    type: 'object',
    required: configKeys.filter((k) =>
      ['version', 'title', 'settings', 'sections'].includes(k)
    ),
    properties: {
      version: {
        type: 'string',
        default: '1.0.0',
        description: 'Schema version',
      },
      title: {
        type: 'string',
        default: 'MonoForge Profile',
        description: 'Profile title or headline',
      },
      settings: {
        type: 'object',
        required: settingsKeys.filter((k) =>
          ['user', 'theme', 'accentColor', 'badgeStyle', 'align'].includes(k)
        ),
        properties: {
          user: {
            type: 'object',
            required: ['github'],
            properties: {
              github: { type: 'string', description: 'GitHub username' },
              name: { type: 'string', description: 'Display name' },
              role: { type: 'string', description: 'Primary engineering role' },
              bio: { type: 'string', description: 'Short bio or philosophy' },
              location: { type: 'string', description: 'Geographical location' },
              pronouns: { type: 'string', description: 'Pronouns' },
              status: { type: 'string', description: 'Current status or focus' },
            },
          },
          theme: {
            type: 'string',
            enum: ['dark', 'light', 'auto'],
            default: 'dark',
          },
          accentColor: {
            type: 'string',
            default: '#8b5cf6',
            pattern: '^#[0-9a-fA-F]{6}$',
          },
          badgeStyle: {
            type: 'string',
            enum: ['for-the-badge', 'flat', 'flat-square', 'plastic'],
            default: 'for-the-badge',
          },
          align: {
            type: 'string',
            enum: ['left', 'center', 'right'],
            default: 'left',
          },
          includeAttribution: {
            type: 'boolean',
            default: true,
            description:
              'Whether to append the Powered by MonoForge attribution footer and badge',
          },
        },
      },
      sections: {
        type: 'array',
        items: {
          type: 'object',
          required: sectionKeys.filter((k) => ['id', 'type', 'props'].includes(k)),
          properties: {
            id: { type: 'string', description: 'Unique section identifier' },
            type: {
              type: 'string',
              enum: pluginIds,
              description: `Registered MonoForge plugin ID (${pluginIds.length} plugins)`,
            },
            visible: {
              type: 'boolean',
              default: true,
              description: 'Controls whether this section is included in rendered Markdown',
            },
            title: {
              type: 'string',
              description: 'Optional human-readable section label',
            },
            props: {
              type: 'object',
              properties: {
                content: { type: 'object' },
                styles: { type: 'object' },
                state: { type: 'string' },
                visible: { type: 'boolean' },
              },
            },
          },
          allOf: pluginSectionVariants,
        },
      },
    },
    'x-plugins': pluginRegistry.map((p) => ({
      id: p.id,
      name: p.name,
      category: p.category,
      description: p.description,
    })),
    'x-visualizations': ALL_VISUALIZATION_IDS.map((id) => ({
      id,
      name: VISUALIZATION_REGISTRY[id].name,
      category: VISUALIZATION_REGISTRY[id].category,
      tagline: VISUALIZATION_REGISTRY[id].tagline,
    })),
  };

  return NextResponse.json(schema, {
    status: 200,
    headers: {
      'Content-Type': 'application/schema+json',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
