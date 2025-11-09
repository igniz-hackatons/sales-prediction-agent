import { defineConfig } from '@nizhdanov/eslint';

export default defineConfig({
  vue: true,
  typescript: true,
  stylistic: true,
  formatters: true,
  ignores: ['src/volt/**/*']
});
