#!/usr/bin/env bun

/**
 * Build script for roadmap generation
 * Converts YAML data into HTML roadmap visualization
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { parseYAML, validateRoadmap } from '../data/parser.ts';
import { generateHTML } from '../template/html-generator.ts';
import { CONFIG } from './config.ts';
import { loadThemeAssets } from './embedded-assets.ts';
import type { RoadmapData, BuildStats } from './types.ts';

/**
 * Copies static assets to the distribution directory
 * Uses embedded assets for default theme or loads from external theme directory
 */
function copyAssets(templateDir: string = CONFIG.TEMPLATE_DIR, outputDir: string = CONFIG.OUTPUT_DIR): void {
  let assets;
  // Check if using embedded default theme
  if (templateDir === CONFIG.TEMPLATE_DIR || templateDir === '<embedded>') {
    // Use embedded assets for default theme
    assets = loadThemeAssets('<embedded>');
    console.log('📦 Using embedded default theme');
  } else {
    // Load from external theme directory
    assets = loadThemeAssets(templateDir);
  }

  // Write CSS file
  writeFileSync(`${outputDir}/${CONFIG.CSS_FILE}`, assets.css);
  console.log('📄 CSS copied');

  // Write JavaScript file
  writeFileSync(`${outputDir}/${CONFIG.JS_FILE}`, assets.js);
  console.log('⚡ JS copied');
}

/**
 * Ensures the output directory exists, creates it if necessary
 */
function ensureOutputDir(outputDir: string = CONFIG.OUTPUT_DIR): void {
  if (!existsSync(outputDir)) {
    Bun.spawnSync(['mkdir', '-p', outputDir]);
  }
}

/**
 * Calculates build statistics from roadmap data
 *
 * @param roadmap - The roadmap data structure
 * @param htmlSize - Size of generated HTML in KB
 * @returns Build statistics object
 */
function calculateStats(roadmap: RoadmapData, htmlSize: string): BuildStats {
  return {
    categories: roadmap.categories.length,
    projects: roadmap.categories.reduce((sum, cat) => sum + cat.projects.length, 0),
    quarters: roadmap.quarters.length,
    htmlSize,
  };
}

/**
 * Validates source file existence and provides helpful error messages
 */
function validateSourceFile(sourceFile: string): void {
  if (!existsSync(sourceFile)) {
    console.error(`❌ Source file not found: ${sourceFile}`);
    console.error('💡 Use --source <file> or -s <file> to specify a different YAML file');
    console.error(`📋 See ${CONFIG.EXAMPLE_FILE} for reference format`);
    process.exit(1);
  }
}

/**
 * Processes YAML content and returns validated roadmap data
 */
function processYamlData(yamlContent: string): RoadmapData {
  const roadmap = parseYAML(yamlContent);

  if (!roadmap) {
    throw new Error('YAML file is empty or invalid');
  }

  console.log('✅ Validating data…');
  validateRoadmap(roadmap);

  return roadmap;
}

/**
 * Displays build statistics and roadmap information
 */
function displayBuildInfo(roadmap: RoadmapData, stats: BuildStats, outputDir: string = CONFIG.OUTPUT_DIR): void {
  console.log(`📊 Statistics: ${stats.categories} categories, ${stats.projects} projects, ${stats.quarters} quarters`);
  console.log(`✅ Roadmap generated: ${outputDir}/${CONFIG.OUTPUT_FILE}`);
  console.log(`📅 Quarters: ${roadmap.quarters.join(', ')}`);

  if (roadmap.next_quarters) {
    console.log(`🎯 Next quarters: ${roadmap.next_quarters.join(', ')}`);
  }

  console.log(`📈 HTML size: ${stats.htmlSize}KB`);
}

/**
 * Main build function - orchestrates the entire build process
 *
 * @throws Error if build process fails
 */
async function build(
  sourceFile: string = CONFIG.INPUT_FILE,
  templateDir: string = CONFIG.TEMPLATE_DIR,
  outputDir: string = CONFIG.OUTPUT_DIR
): Promise<void> {
  try {
    console.log('🚀 Building roadmap…');

    // Validate source file and process data
    validateSourceFile(sourceFile);
    console.log('📖 Reading data…');
    const yamlContent = readFileSync(sourceFile, 'utf8');
    const roadmap = processYamlData(yamlContent);

    // Prepare output and generate content
    ensureOutputDir(outputDir);
    console.log('🎨 Generating HTML…');
    const html = generateHTML(roadmap);

    // Output files and display results
    copyAssets(templateDir, outputDir);
    const outputPath = `${outputDir}/${CONFIG.OUTPUT_FILE}`;
    writeFileSync(outputPath, html, 'utf8');

    const htmlSize = (html.length / CONFIG.BYTES_TO_KB).toFixed(1);
    const stats = calculateStats(roadmap, htmlSize);
    displayBuildInfo(roadmap, stats, outputDir);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('❌ Build error:', errorMessage);

    if (process.env.DEBUG) {
      console.error(error instanceof Error ? error.stack : error);
    }
    process.exit(1);
  }
}

// Execute if called directly
if (import.meta.main) {
  await build();
}

export { build };
