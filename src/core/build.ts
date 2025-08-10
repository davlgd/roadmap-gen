#!/usr/bin/env bun

/**
 * Build script for roadmap generation
 * Converts YAML data into HTML roadmap visualization
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { parseYAML, validateRoadmap } from '../data/parser.ts';
import { generateHTML } from '../template/html-generator.ts';
import { CONFIG } from './config.ts';
import type { RoadmapData, BuildStats } from './types.ts';

/**
 * Copies static assets to the distribution directory
 */
function copyAssets(): void {
  // CSS file
  if (existsSync(`${CONFIG.ASSETS_DIR}/${CONFIG.CSS_FILE}`)) {
    const css = readFileSync(`${CONFIG.ASSETS_DIR}/${CONFIG.CSS_FILE}`, 'utf8');
    writeFileSync(`${CONFIG.OUTPUT_DIR}/${CONFIG.CSS_FILE}`, css);
    console.log('📄 CSS copied');
  }

  // JavaScript file
  if (existsSync(`${CONFIG.ASSETS_DIR}/${CONFIG.JS_FILE}`)) {
    const js = readFileSync(`${CONFIG.ASSETS_DIR}/${CONFIG.JS_FILE}`, 'utf8');
    writeFileSync(`${CONFIG.OUTPUT_DIR}/${CONFIG.JS_FILE}`, js);
    console.log('⚡ JS copied');
  }
}

/**
 * Ensures the output directory exists, creates it if necessary
 */
function ensureOutputDir(): void {
  if (!existsSync(CONFIG.OUTPUT_DIR)) {
    Bun.spawnSync(['mkdir', '-p', CONFIG.OUTPUT_DIR]);
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
 * Displays build statistics and roadmap information
 */
function displayBuildInfo(roadmap: RoadmapData, stats: BuildStats): void {
  console.log(`📊 Statistics: ${stats.categories} categories, ${stats.projects} projects, ${stats.quarters} quarters`);
  console.log(`✅ Roadmap generated: ${CONFIG.OUTPUT_DIR}/${CONFIG.OUTPUT_FILE}`);
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
async function build(): Promise<void> {
  try {
    console.log('🚀 Building roadmap...');

    // Check source file existence
    if (!existsSync(CONFIG.INPUT_FILE)) {
      console.error(`❌ Source file not found: ${CONFIG.INPUT_FILE}`);
      process.exit(1);
    }

    // Read and parse YAML data
    console.log('📖 Reading data...');
    const yamlContent = readFileSync(CONFIG.INPUT_FILE, 'utf8');
    const roadmap = parseYAML(yamlContent);

    if (!roadmap) {
      throw new Error('YAML file is empty or invalid');
    }

    // Validate roadmap data structure
    console.log('✅ Validating data...');
    validateRoadmap(roadmap);

    // Prepare output directory
    ensureOutputDir();

    // Generate HTML content
    console.log('🎨 Generating HTML...');
    const html = generateHTML(roadmap);

    // Copy static assets
    copyAssets();

    // Write HTML output file
    const outputPath = `${CONFIG.OUTPUT_DIR}/${CONFIG.OUTPUT_FILE}`;
    writeFileSync(outputPath, html, 'utf8');

    // Calculate and display build statistics
    const htmlSize = (html.length / CONFIG.BYTES_TO_KB).toFixed(1);
    const stats = calculateStats(roadmap, htmlSize);
    displayBuildInfo(roadmap, stats);
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
