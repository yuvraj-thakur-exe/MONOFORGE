import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  plugins: [],
  resolve: {
    alias: {
      'react-twc$': path.resolve(__dirname, './.jest/mocks/react-twc.js'),
      '@': path.resolve(__dirname, './website/src'),
      '#': path.resolve(__dirname, './website/src'),
      config: path.resolve(__dirname, './website/src/config'),
      types: path.resolve(__dirname, './website/src/types'),
      utils: path.resolve(__dirname, './website/src/utils'),
      features: path.resolve(__dirname, './website/src/features'),
      resources: path.resolve(__dirname, './website/src/resources'),
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./.jest/setup.ts'],
    exclude: ['node_modules', '/.next/'],
    include: [
      'website/src/**/test.ts',
      'website/src/**/test.tsx',
      'website/src/**/*.{test,spec}.{ts,tsx}',
      'src/**/test.ts',
      'src/**/test.tsx',
      'src/**/*.{test,spec}.{ts,tsx}',
    ],
    coverage: {
      enabled: false,
      provider: 'v8',
      include: ['website/src/**/*.{ts,tsx}'],
      exclude: [
        'website/src/pages/**/*.ts(x)?',
        'website/src/templates/**/*.ts(x)?',
        'website/src/services/**/*.ts(x)?',
        'website/src/styles/**/*.ts',
        'website/src/types/**/*.ts',
        'website/src/app/**/*.ts(x)?',
        'website/src/generators/**/*.ts(x)?',
        'website/src/components/**/*.ts(x)?',
        '**/*.d.ts',
        '**/*.js',
        'node_modules/',
        '/.next/',
      ],
    },
  },
});
