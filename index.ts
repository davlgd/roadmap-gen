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
import { build } from './src/core/build.ts';

// Execute if called directly
if (import.meta.main) {
  await build();
}

// Export main function for programmatic use
export { build };
