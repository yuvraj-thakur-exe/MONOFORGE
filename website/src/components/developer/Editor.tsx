'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import MonacoEditor, { OnChange, OnMount } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { useReadmeStore } from '#/store/useReadmeStore';
import { ReadmeConfigSchema } from '#/lib/plugins/types';
import { pluginRegistry } from '#/lib/plugins/registry';
import { buildMarkdown } from '#/lib/buildMarkdown';
import {
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  Code2,
  Terminal,
  RotateCw,
} from 'lucide-react';
import { toast } from 'sonner';
import { EditorSkeleton } from './EditorSkeleton';

type MonacoEditorInstance = Parameters<OnMount>[0];
type MonacoApi = Parameters<OnMount>[1];

interface EditorProps {
  theme?: 'vs-dark' | 'light';
  className?: string;
}

interface ValidationIssue {
  path: string;
  message: string;
  line: number;
  startColumn: number;
  endColumn: number;
}

function buildClientJsonSchema() {
  return {
    $schema: 'http://json-schema.org/draft-07/schema#',
    title: 'MonoForgeConfig',
    type: 'object',
    required: ['version', 'title', 'settings', 'sections'],
    properties: {
      version: { type: 'string', default: '1.0.0' },
      title: { type: 'string', default: 'MonoForge Profile' },
      settings: {
        type: 'object',
        required: ['user', 'theme', 'accentColor', 'badgeStyle', 'align'],
        properties: {
          user: {
            type: 'object',
            required: ['github'],
            properties: {
              github: { type: 'string', description: 'GitHub username' },
              name: { type: 'string', description: 'Display name' },
              role: { type: 'string', description: 'Engineering role' },
              bio: { type: 'string', description: 'Short developer bio' },
              location: { type: 'string', description: 'Location' },
              pronouns: { type: 'string', description: 'Pronouns' },
              status: { type: 'string', description: 'Current status' },
            },
          },
          theme: { type: 'string', enum: ['dark', 'light', 'auto'] },
          accentColor: { type: 'string', pattern: '^#[0-9a-fA-F]{6}$' },
          badgeStyle: {
            type: 'string',
            enum: ['for-the-badge', 'flat', 'flat-square', 'plastic'],
          },
          align: { type: 'string', enum: ['left', 'center', 'right'] },
          includeAttribution: {
            type: 'boolean',
            default: true,
            description: 'Include Powered by MonoForge attribution footer',
          },
        },
      },
      sections: {
        type: 'array',
        items: {
          type: 'object',
          required: ['id', 'type', 'props'],
          properties: {
            id: { type: 'string' },
            type: {
              type: 'string',
              enum: pluginRegistry.map((p) => p.id),
              description: 'Registered MonoForge plugin ID',
            },
            visible: { type: 'boolean', default: true },
            title: { type: 'string' },
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
        },
      },
    },
  };
}

function locatePathRange(
  text: string,
  pathParts: PropertyKey[]
): { line: number; startColumn: number; endColumn: number } {
  const lines = text.split('\n');
  const stringKey = [...pathParts].reverse().find((p) => typeof p === 'string') as
    | string
    | undefined;

  // Narrow search window if sections[index] is present
  let startLine = 0;
  if (pathParts[0] === 'sections' && typeof pathParts[1] === 'number') {
    const targetIdx = pathParts[1];
    let inSections = false;
    let braceDepth = 0;
    let currentObjIdx = -1;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (!inSections && /"sections"\s*:/.test(line)) {
        inSections = true;
        continue;
      }
      if (inSections) {
        for (const ch of line) {
          if (ch === '{') {
            if (braceDepth === 0) {
              currentObjIdx += 1;
              if (currentObjIdx === targetIdx) {
                startLine = i;
              }
            }
            braceDepth += 1;
          } else if (ch === '}') {
            braceDepth = Math.max(0, braceDepth - 1);
          }
        }
        if (currentObjIdx >= targetIdx && startLine > 0) {
          break;
        }
      }
    }
  }

  if (stringKey) {
    const escaped = stringKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const keyRegex = new RegExp(`"${escaped}"\\s*:`);
    for (let i = startLine; i < lines.length; i++) {
      const match = keyRegex.exec(lines[i]);
      if (match) {
        return {
          line: i + 1,
          startColumn: match.index + 1,
          endColumn: Math.max(match.index + match[0].length + 1, lines[i].length + 1),
        };
      }
    }
  }

  const fallbackLine = Math.min(startLine + 1, lines.length);
  return {
    line: fallbackLine,
    startColumn: 1,
    endColumn: Math.max(2, (lines[fallbackLine - 1]?.length ?? 1) + 1),
  };
}

export const Editor: React.FC<EditorProps> = ({ theme, className = '' }) => {
  const { resolvedTheme } = useTheme();
  const activeMonacoTheme = theme || (resolvedTheme === 'dark' ? 'vs-dark' : 'light');

  const config = useReadmeStore((state) => state.config);
  const setEntireConfig = useReadmeStore((state) => state.setEntireConfig);

  const [editorValue, setEditorValue] = useState<string>(() => JSON.stringify(config, null, 2));
  const [validationIssues, setValidationIssues] = useState<ValidationIssue[]>([]);
  const [isValid, setIsValid] = useState<boolean>(true);
  const [hasPendingExternalUpdate, setHasPendingExternalUpdate] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);
  const [useRawEditor, setUseRawEditor] = useState<boolean>(false);

  const isInternalChange = useRef<boolean>(false);
  const isValidRef = useRef<boolean>(true);
  const editorRef = useRef<MonacoEditorInstance | null>(null);
  const monacoRef = useRef<MonacoApi | null>(null);
  const handleFormatRef = useRef<() => void>(() => {});
  const handleSaveMarkdownRef = useRef<() => void>(() => {});

  const applyMonacoMarkers = useCallback((issues: ValidationIssue[]) => {
    const monaco = monacoRef.current;
    const editor = editorRef.current;
    if (!monaco || !editor) return;
    const model = editor.getModel();
    if (!model) return;

    const markers = issues.map((issue) => ({
      severity: monaco.MarkerSeverity.Error,
      message: `${issue.path}: ${issue.message}`,
      startLineNumber: issue.line,
      startColumn: issue.startColumn,
      endLineNumber: issue.line,
      endColumn: issue.endColumn,
    }));

    monaco.editor.setModelMarkers(model, 'zod-schema', markers);
  }, []);

  // Sync external store changes into editor unless editor currently has unsaved invalid JSON
  useEffect(() => {
    if (isInternalChange.current) {
      isInternalChange.current = false;
      return;
    }
    if (!isValidRef.current) {
      setHasPendingExternalUpdate(true);
      return;
    }
    const formatted = JSON.stringify(config, null, 2);
    setEditorValue(formatted);
    setIsValid(true);
    isValidRef.current = true;
    setValidationIssues([]);
    setHasPendingExternalUpdate(false);
    applyMonacoMarkers([]);
  }, [config, applyMonacoMarkers]);

  const validateAndApply = useCallback(
    (text: string) => {
      setEditorValue(text);

      try {
        const parsed = JSON.parse(text);
        const result = ReadmeConfigSchema.safeParse(parsed);

        if (!result.success) {
          const issues: ValidationIssue[] = result.error.issues.map((issue) => {
            const loc = locatePathRange(text, issue.path);
            return {
              path: issue.path.map(String).join('.') || 'root',
              message: issue.message,
              ...loc,
            };
          });
          setIsValid(false);
          isValidRef.current = false;
          setValidationIssues(issues);
          applyMonacoMarkers(issues);
          return;
        }

        setIsValid(true);
        isValidRef.current = true;
        setValidationIssues([]);
        setHasPendingExternalUpdate(false);
        applyMonacoMarkers([]);

        isInternalChange.current = true;
        setEntireConfig(result.data);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Invalid JSON format';
        const lineMatch = /line\s+(\d+)/i.exec(msg);
        const line = lineMatch ? Math.max(1, Number(lineMatch[1])) : 1;
        const syntaxIssue: ValidationIssue = {
          path: 'syntax',
          message: msg,
          line,
          startColumn: 1,
          endColumn: 80,
        };
        setIsValid(false);
        isValidRef.current = false;
        setValidationIssues([syntaxIssue]);
        applyMonacoMarkers([syntaxIssue]);
      }
    },
    [applyMonacoMarkers, setEntireConfig]
  );

  const handleEditorChange: OnChange = (value) => {
    validateAndApply(value ?? '');
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    validateAndApply(e.target.value);
  };

  const handleFormat = useCallback(() => {
    try {
      const parsed = JSON.parse(editorValue);
      const formatted = JSON.stringify(parsed, null, 2);
      validateAndApply(formatted);
      toast.success('Formatted JSON');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Cannot format invalid JSON syntax';
      toast.error(`Format failed: ${msg}`);
    }
  }, [editorValue, validateAndApply]);

  const handleSaveMarkdown = useCallback(() => {
    try {
      const latestConfig = useReadmeStore.getState().config;
      const markdown = buildMarkdown(latestConfig);
      const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'README.md';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      toast.success('Exported README.md');
    } catch {
      toast.error('Failed to export README.md');
    }
  }, []);

  handleFormatRef.current = handleFormat;
  handleSaveMarkdownRef.current = handleSaveMarkdown;

  const handleSyncFromStore = () => {
    const formatted = JSON.stringify(config, null, 2);
    setEditorValue(formatted);
    setIsValid(true);
    isValidRef.current = true;
    setValidationIssues([]);
    setHasPendingExternalUpdate(false);
    applyMonacoMarkers([]);
    toast.success('Synced editor with latest store state');
  };

  const handleJumpToIssue = (issue: ValidationIssue) => {
    const editor = editorRef.current;
    if (!editor) return;
    editor.revealLineInCenter(issue.line);
    editor.setPosition({ lineNumber: issue.line, column: issue.startColumn });
    editor.focus();
  };

  const handleCopyJson = async () => {
    try {
      await navigator.clipboard.writeText(editorValue);
      setCopiedJson(true);
      setTimeout(() => setCopiedJson(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleMonacoMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
    monacoRef.current = monaco;

    const schemaUri =
      typeof window !== 'undefined'
        ? `${window.location.origin}/api/schema`
        : 'https://monoforge-studio.vercel.app/api/schema';

    const fallbackSchema = buildClientJsonSchema();

    const jsonDefaults = (
      monaco.languages.json as unknown as {
        jsonDefaults?: {
          setDiagnosticsOptions: (options: Record<string, unknown>) => void;
        };
      }
    )?.jsonDefaults;

    jsonDefaults?.setDiagnosticsOptions({
      validate: true,
      allowComments: false,
      enableSchemaRequest: false,
      schemas: [
        {
          uri: schemaUri,
          fileMatch: ['*'],
          schema: fallbackSchema,
        },
      ],
    });

    // Fetch live /api/schema to keep IntelliSense synced with server schema
    if (typeof window !== 'undefined') {
      fetch('/api/schema')
        .then((res) => (res.ok ? res.json() : null))
        .then((liveSchema) => {
          if (liveSchema && jsonDefaults) {
            jsonDefaults.setDiagnosticsOptions({
              validate: true,
              allowComments: false,
              enableSchemaRequest: false,
              schemas: [
                {
                  uri: schemaUri,
                  fileMatch: ['*'],
                  schema: liveSchema,
                },
              ],
            });
          }
        })
        .catch(() => {
          // Keep synchronous fallbackSchema
        });
    }

    // IDE keyboard shortcuts
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, () => {
      handleSaveMarkdownRef.current();
    });

    editor.addCommand(
      monaco.KeyMod.Shift | monaco.KeyMod.Alt | monaco.KeyCode.KeyF,
      () => {
        handleFormatRef.current();
      }
    );

    if (validationIssues.length > 0) {
      applyMonacoMarkers(validationIssues);
    }
  };

  const primaryIssue = validationIssues[0];

  return (
    <div
      className={`flex flex-col h-full bg-[#fafbfc] dark:bg-[#1e293b] rounded-2xl border-2 border-slate-300 dark:border-slate-700 overflow-hidden shadow-[4px_4px_0px_#334155] dark:shadow-[4px_4px_0px_#475569] ${className}`}
    >
      {/* Editor Header Bar */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 bg-[#f8fafc] dark:bg-slate-800 border-b-2 border-slate-300 dark:border-slate-700 text-xs font-mono shrink-0">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-2 py-0.5 rounded bg-[#ffe600] text-slate-900 font-black tracking-wider border border-slate-700 shrink-0">
            CONFIG.JSON
          </span>
          {isValid ? (
            <span className="flex items-center gap-1 text-emerald-800 dark:text-emerald-300 bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/40 font-bold shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>VALID SCHEMA</span>
            </span>
          ) : (
            <span
              className="flex items-center gap-1 text-rose-800 dark:text-rose-300 bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/40 font-bold shrink-0"
              title={primaryIssue ? `${primaryIssue.path}: ${primaryIssue.message}` : ''}
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>
                {validationIssues.length}{' '}
                {validationIssues.length === 1 ? 'ERROR' : 'ERRORS'}
              </span>
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500 dark:text-slate-400 font-bold hidden sm:inline">
            {config.sections?.length || 0} SECTIONS
          </span>
          <button
            onClick={() => setUseRawEditor(!useRawEditor)}
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 font-mono text-[11px] font-bold transition-all cursor-pointer"
            title="Toggle Lightweight / Monaco Editor"
          >
            {useRawEditor ? (
              <Terminal className="w-3 h-3 text-emerald-500" />
            ) : (
              <Code2 className="w-3 h-3 text-amber-500" />
            )}
            <span className="hidden sm:inline">{useRawEditor ? 'RAW MODE' : 'MONACO'}</span>
          </button>
          <button
            onClick={handleCopyJson}
            type="button"
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-[#ffe600] hover:text-slate-900 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 transition-all font-bold shadow-2xs cursor-pointer"
            title="Copy JSON to clipboard"
          >
            {copiedJson ? (
              <Check className="w-3 h-3 text-emerald-600" />
            ) : (
              <Copy className="w-3 h-3" />
            )}
            <span>{copiedJson ? 'COPIED' : 'COPY'}</span>
          </button>
          <button
            onClick={handleFormat}
            type="button"
            className="flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-[#ffe600] hover:text-slate-900 text-slate-800 dark:text-slate-100 border border-slate-300 dark:border-slate-600 transition-all font-bold shadow-2xs cursor-pointer"
            title="Prettify JSON (Shift+Alt+F)"
          >
            <RefreshCw className="w-3 h-3 text-amber-500" />
            <span>PRETTIFY</span>
          </button>
        </div>
      </div>

      {/* Pending External Update Notice (prevents silently clobbering invalid JSON edits) */}
      {hasPendingExternalUpdate && (
        <div className="px-4 py-1.5 bg-amber-500/15 border-b border-amber-500/40 text-amber-900 dark:text-amber-200 text-[11px] font-mono flex items-center justify-between gap-2 shrink-0">
          <span>
            Store updated while editor has unsaved syntax/schema errors. External sync paused.
          </span>
          <button
            type="button"
            onClick={handleSyncFromStore}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold shrink-0 cursor-pointer"
          >
            <RotateCw className="w-3 h-3" />
            <span>Sync from Store</span>
          </button>
        </div>
      )}

      {/* Editor Main Surface */}
      <div className="flex-1 min-h-0 bg-[#fafbfc] dark:bg-slate-900 relative">
        {useRawEditor ? (
          <div className="w-full h-full p-4 font-mono text-xs overflow-auto bg-slate-900 text-emerald-300 selection:bg-amber-400 selection:text-slate-900">
            <textarea
              value={editorValue}
              onChange={handleTextareaChange}
              onKeyDown={(e) => {
                if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 's') {
                  e.preventDefault();
                  handleSaveMarkdown();
                } else if (e.shiftKey && e.altKey && e.key.toLowerCase() === 'f') {
                  e.preventDefault();
                  handleFormat();
                }
              }}
              spellCheck={false}
              className="w-full h-full bg-transparent text-emerald-300 font-mono text-xs sm:text-sm resize-none focus:outline-hidden leading-relaxed"
              placeholder="Paste or write your config JSON here..."
            />
          </div>
        ) : (
          <MonacoEditor
            height="100%"
            defaultLanguage="json"
            value={editorValue}
            theme={activeMonacoTheme}
            onChange={handleEditorChange}
            loading={<EditorSkeleton />}
            onMount={handleMonacoMount}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineNumbers: 'on',
              scrollBeyondLastLine: false,
              automaticLayout: true,
              tabSize: 2,
              wordWrap: 'on',
              formatOnPaste: true,
              cursorBlinking: 'smooth',
              cursorSmoothCaretAnimation: 'on',
              smoothScrolling: true,
              bracketPairColorization: { enabled: true },
              guides: { bracketPairs: true, indentation: true },
              fontFamily: 'var(--font-mono, "JetBrains Mono", monospace)',
            }}
          />
        )}
      </div>

      {/* Multi-Issue Diagnostic Footer */}
      {validationIssues.length > 0 && (
        <div className="px-4 py-2 bg-slate-800 border-t-2 border-amber-500/60 text-amber-200 text-xs font-mono shrink-0 max-h-28 overflow-y-auto space-y-1">
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-amber-300">
              {validationIssues.length} Schema Diagnostic
              {validationIssues.length > 1 ? 's' : ''} (Cmd/Ctrl+S export · Shift+Alt+F format)
            </span>
            <button
              type="button"
              onClick={handleFormat}
              className="text-[11px] underline hover:text-white shrink-0 font-bold cursor-pointer"
            >
              Auto-Format
            </button>
          </div>
          <ul className="space-y-0.5 text-[11px]">
            {validationIssues.slice(0, 6).map((issue, idx) => (
              <li key={`${issue.path}-${idx}`} className="flex items-center gap-2 truncate">
                <button
                  type="button"
                  onClick={() => handleJumpToIssue(issue)}
                  className="text-amber-400 hover:underline font-bold shrink-0 cursor-pointer"
                >
                  Ln {issue.line}
                </button>
                <span className="text-slate-300 truncate">
                  <strong className="text-amber-200">{issue.path}</strong>: {issue.message}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
