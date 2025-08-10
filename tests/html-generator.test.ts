/**
 * Tests for HTML generator module
 */

import { describe, test, expect } from 'bun:test';
import { generateHTML } from '../src/template/html-generator.ts';
import type { RoadmapData } from '../src/core/types.ts';

describe('generateHTML', () => {
  const testRoadmap: RoadmapData = {
    title: 'Test Roadmap',
    vision: 'Test vision for roadmap generation',
    quarters: ['Q1-2025', 'Q2-2025'],
    next_quarters: ['Q1-2025'],
    categories: [
      {
        name: 'Test Category',
        icon: '🚀',
        projects: [
          {
            name: 'Test Project',
            responsible: 'John Doe',
            issue: 'https://github.com/test/issue/1',
            quarters: {
              'Q1-2025': {
                status: 'in-progress',
                description: 'Working on initial implementation',
                details: ['Setup environment', 'Create basic structure'],
                progress: '30%',
              },
              'Q2-2025': {
                status: 'planned',
                description: 'Complete implementation',
                objectives: ['Finish core features', 'Add documentation'],
              },
            },
          },
        ],
      },
    ],
    metrics: {
      kpis: ['User adoption > 80%', 'Performance improvement > 20%'],
      risks: ['Technical debt accumulation', 'Resource constraints'],
    },
  };

  test('should generate complete HTML document', () => {
    const html = generateHTML(testRoadmap);

    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('</html>');
  });

  test('should include roadmap title and vision', () => {
    const html = generateHTML(testRoadmap);

    expect(html).toContain('Test Roadmap');
    expect(html).toContain('Test vision for roadmap generation');
  });

  test('should include category information', () => {
    const html = generateHTML(testRoadmap);

    expect(html).toContain('Test Category');
    expect(html).toContain('🚀');
    expect(html).toContain('1 project');
  });

  test('should include project information', () => {
    const html = generateHTML(testRoadmap);

    expect(html).toContain('Test Project');
    expect(html).toContain('John Doe');
    expect(html).toContain('https://github.com/test/issue/1');
  });

  test('should include quarter data', () => {
    const html = generateHTML(testRoadmap);

    expect(html).toContain('Q1-2025');
    expect(html).toContain('Q2-2025');
    expect(html).toContain('🟡 In Progress');
    expect(html).toContain('🔵 Planned');
    expect(html).toContain('Working on initial implementation');
    expect(html).toContain('30%');
  });

  test('should include metrics section', () => {
    const html = generateHTML(testRoadmap);

    expect(html).toContain('📊 Metrics & Risk Management');
    expect(html).toContain('User adoption &gt; 80%');
    expect(html).toContain('Technical debt accumulation');
  });

  test('should include legend section', () => {
    const html = generateHTML(testRoadmap);

    expect(html).toContain('📌 Legend');
    expect(html).toContain('Completed');
    expect(html).toContain('In Progress');
    expect(html).toContain('Planned');
    expect(html).toContain('On Hold');
  });

  test('should handle roadmap without metrics', () => {
    const roadmapWithoutMetrics = { ...testRoadmap };
    delete roadmapWithoutMetrics.metrics;

    const html = generateHTML(roadmapWithoutMetrics);

    expect(html).not.toContain('📊 KPIs & Metrics');
    expect(html).toContain('Test Roadmap'); // Should still work
  });

  test('should handle empty project quarters', () => {
    const roadmapWithEmptyQuarters = {
      ...testRoadmap,
      categories: [
        {
          name: 'Empty Category',
          icon: '📋',
          projects: [
            {
              name: 'Empty Project',
              quarters: {},
            },
          ],
        },
      ],
    };

    const html = generateHTML(roadmapWithEmptyQuarters);

    expect(html).toContain('Empty Project');
    expect(html).toContain('No information');
  });
});
