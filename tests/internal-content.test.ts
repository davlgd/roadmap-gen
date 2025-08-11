/**
 * Tests for internal content filtering functionality
 */

import { describe, test, expect } from 'bun:test';
import { build } from '../src/core/build.ts';
import { readFileSync, existsSync, rmSync } from 'fs';

const TEST_SOURCE = 'test-internal.yaml';
const TEST_OUTPUT = 'test-internal-output';

describe('internal content filtering', () => {
  test('should build without internal content by default', async () => {
    await build(TEST_SOURCE, '<embedded>', TEST_OUTPUT, false);

    expect(existsSync(`${TEST_OUTPUT}/index.html`)).toBe(true);
    const html = readFileSync(`${TEST_OUTPUT}/index.html`, 'utf8');

    // Should NOT contain internal project
    expect(html).not.toContain('Internal Project');
    expect(html).not.toContain('Secret Team');
    expect(html).not.toContain('Secret work happening');

    // Should NOT contain internal details
    expect(html).not.toContain('Internal detail (should be hidden)');

    // Should NOT contain internal notes
    expect(html).not.toContain('This is an internal note');

    // Should NOT contain internal quarter
    expect(html).not.toContain('Next phase planned');

    // Should NOT contain internal metrics
    expect(html).not.toContain('Revenue details');
    expect(html).not.toContain('Budget concerns');

    // Should contain public content
    expect(html).toContain('Public Feature A');
    expect(html).toContain('Public Team');
    expect(html).toContain('Public description');
    expect(html).toContain('Public detail 1');
    expect(html).toContain('Public detail 2');
    expect(html).toContain('Semi-Public Project');
    expect(html).toContain('Public phase completed');
    expect(html).toContain('User satisfaction &gt; 80%');
    expect(html).toContain('Market competition');

    // Cleanup
    if (existsSync(TEST_OUTPUT)) {
      rmSync(TEST_OUTPUT, { recursive: true });
    }
  });

  test('should build with internal content when --with-internal is used', async () => {
    await build(TEST_SOURCE, '<embedded>', TEST_OUTPUT, true);

    expect(existsSync(`${TEST_OUTPUT}/index.html`)).toBe(true);
    const html = readFileSync(`${TEST_OUTPUT}/index.html`, 'utf8');

    // Should contain internal project
    expect(html).toContain('Internal Project');
    expect(html).toContain('Secret Team');
    expect(html).toContain('Secret work happening');

    // Should contain internal details
    expect(html).toContain('Internal detail (should be hidden)');

    // Should contain internal quarter
    expect(html).toContain('Next phase planned');

    // Should contain internal metrics
    expect(html).toContain('Revenue details');
    expect(html).toContain('Budget concerns');

    // Should still contain public content
    expect(html).toContain('Public Feature A');
    expect(html).toContain('Public Team');
    expect(html).toContain('Public description');

    // Cleanup
    if (existsSync(TEST_OUTPUT)) {
      rmSync(TEST_OUTPUT, { recursive: true });
    }
  });

  test('should filter categories with no visible projects', async () => {
    // Create a test case where a category has only internal projects
    const testData = `title: 'Category Filter Test'
vision: 'Test category filtering'
quarters: ['Q1-2025']
categories:
  - name: 'All Internal Category'
    icon: '🔒'
    projects:
      - name: 'Internal Project 1'
        internal: true
        quarters:
          Q1-2025:
            status: 'planned'
            description: 'Secret'
      - name: 'Internal Project 2'
        internal: true
        quarters:
          Q1-2025:
            status: 'planned'
            description: 'Also secret'
  - name: 'Mixed Category'
    icon: '🌍'
    projects:
      - name: 'Public Project'
        quarters:
          Q1-2025:
            status: 'completed'
            description: 'Public work'`;

    const testFile = 'test-category-filter.yaml';
    const testOutput = 'test-category-filter-output';

    // Write test file
    require('fs').writeFileSync(testFile, testData);

    await build(testFile, '<embedded>', testOutput, false);

    const html = readFileSync(`${testOutput}/index.html`, 'utf8');

    // Should not contain the all-internal category
    expect(html).not.toContain('All Internal Category');
    expect(html).not.toContain('Internal Project 1');
    expect(html).not.toContain('Internal Project 2');

    // Should contain the mixed category with only public projects
    expect(html).toContain('Mixed Category');
    expect(html).toContain('Public Project');

    // Cleanup
    if (existsSync(testFile)) rmSync(testFile);
    if (existsSync(testOutput)) rmSync(testOutput, { recursive: true });
  });

  test('should handle metrics marked as internal', async () => {
    const testData = `title: 'Internal Metrics Test'
vision: 'Test internal metrics filtering'
quarters: ['Q1-2025']
categories:
  - name: 'Test'
    icon: '📊'
    projects:
      - name: 'Test Project'
        quarters:
          Q1-2025:
            status: 'completed'
            description: 'Test'
metrics:
  internal: true  # Entire metrics section is internal
  kpis:
    - 'Secret KPI'
  risks:
    - 'Secret Risk'`;

    const testFile = 'test-internal-metrics.yaml';
    const testOutput = 'test-internal-metrics-output';

    require('fs').writeFileSync(testFile, testData);

    await build(testFile, '<embedded>', testOutput, false);

    const html = readFileSync(`${testOutput}/index.html`, 'utf8');

    // Should not contain metrics section at all
    expect(html).not.toContain('📊 Metrics & Risk Management');
    expect(html).not.toContain('Secret KPI');
    expect(html).not.toContain('Secret Risk');

    // Should still contain project content
    expect(html).toContain('Test Project');

    // Cleanup
    if (existsSync(testFile)) rmSync(testFile);
    if (existsSync(testOutput)) rmSync(testOutput, { recursive: true });
  });
});
