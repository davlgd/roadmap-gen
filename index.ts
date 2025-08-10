#!/usr/bin/env bun

/**
 * Main entrypoint for roadmap-gen CLI tool
 *
 * This file serves as the primary entry point for the application,
 * delegating to the build module for actual functionality.
 */

export * from './src/core/types.ts';
export * from './src/core/config.ts';
export * from './src/data/parser.ts';
export * from './src/template/html-generator.ts';
export * from './src/template/template.ts';
export * from './src/template/template-loader.ts';
export * from './src/template/html-utils.ts';

// Main CLI execution
import { parse } from '@bomb.sh/args';
import { build } from './src/core/build.ts';
import { CONFIG } from './src/core/config.ts';

function showHelp(): void {
  console.log(`
🗺️  roadmap-gen - Professional HTML roadmap generator from YAML data

Usage:
  roadmap-gen [options]
  roadmap-gen --source <file>
  roadmap-gen -s <file>

Options:
  -s, --source <file>    Source YAML file path (default: ${CONFIG.INPUT_FILE})
  -h, --help            Show this help message

Examples:
  roadmap-gen                           # Use default ${CONFIG.INPUT_FILE}
  roadmap-gen --source my-roadmap.yaml  # Use custom file
  roadmap-gen -s ./config/roadmap.yaml  # Use custom file (short)

Documentation: https://github.com/davlgd/roadmap-gen
`);
}

// Execute if called directly
if (import.meta.main) {
  const args = parse(process.argv, {
    boolean: ['help', 'h'],
    string: ['source', 's'],
    alias: {
      h: 'help',
      s: 'source',
    },
  });

  if (args.help) {
    showHelp();
    process.exit(0);
  }

  const sourceFile = args.source || CONFIG.INPUT_FILE;
  await build(sourceFile);
}

// Export main function for programmatic use
export { build };
