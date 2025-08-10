/**
 * Tests for build module
 */

import { describe, test, expect, beforeEach, afterEach } from 'bun:test';
import { existsSync, writeFileSync, rmSync, readFileSync } from 'fs';
import { build } from '../src/core/build.ts';

describe('build function', () => {
  const testDataFile = 'test-roadmap.yaml';
  const testOutputDir = 'test-output';
  const testThemeDir = 'test-theme';

  const validYamlData = `
title: "Test Roadmap Build"
vision: "Testing the build process with comprehensive validation"
quarters: ["Q1-2025", "Q2-2025"]
next_quarters: ["Q1-2025"]
categories:
  - name: "Build Test Category"
    icon: "🧪"
    projects:
      - name: "Test Build Project"
        responsible: "Test Engineer"
        quarters:
          Q1-2025:
            status: "in-progress"
            description: "Testing build functionality"
            progress: "50%"
`;

  beforeEach(() => {
    // Clean up any existing test files/directories
    [testDataFile, testOutputDir, testThemeDir].forEach(path => {
      if (existsSync(path)) {
        rmSync(path, { recursive: true, force: true });
      }
    });
  });

  afterEach(() => {
    // Clean up test files/directories
    [testDataFile, testOutputDir, testThemeDir].forEach(path => {
      if (existsSync(path)) {
        rmSync(path, { recursive: true, force: true });
      }
    });
  });

  test('should successfully build with default parameters', async () => {
    writeFileSync(testDataFile, validYamlData);

    await build(testDataFile, 'templates', testOutputDir);

    // Verify output was created
    expect(existsSync(testOutputDir)).toBe(true);
    expect(existsSync(`${testOutputDir}/index.html`)).toBe(true);
    expect(existsSync(`${testOutputDir}/styles.css`)).toBe(true);
    expect(existsSync(`${testOutputDir}/script.js`)).toBe(true);

    // Verify HTML content
    const html = readFileSync(`${testOutputDir}/index.html`, 'utf8');
    expect(html).toContain('Test Roadmap Build');
    expect(html).toContain('Testing the build process');
    expect(html).toContain('Test Build Project');
  });

  test('should work with existing themed templates', async () => {
    writeFileSync(testDataFile, validYamlData);

    await build(testDataFile, 'themes/compact', testOutputDir);

    // Verify output was created
    expect(existsSync(testOutputDir)).toBe(true);
    expect(existsSync(`${testOutputDir}/index.html`)).toBe(true);
    expect(existsSync(`${testOutputDir}/styles.css`)).toBe(true);
    expect(existsSync(`${testOutputDir}/script.js`)).toBe(true);

    // Verify HTML content was generated correctly
    const html = readFileSync(`${testOutputDir}/index.html`, 'utf8');
    expect(html).toContain('Test Roadmap Build');
    expect(html).toContain('Testing the build process');
    expect(html).toContain('Test Build Project');
  });

  test('should handle file system operations correctly', () => {
    // Test that we can check file existence
    expect(existsSync('non-existent.yaml')).toBe(false);
    expect(existsSync('example.yml')).toBe(true);
  });

  test('should create output directory if it does not exist', async () => {
    writeFileSync(testDataFile, validYamlData);

    expect(existsSync(testOutputDir)).toBe(false);

    await build(testDataFile, 'templates', testOutputDir);

    expect(existsSync(testOutputDir)).toBe(true);
  });
});
