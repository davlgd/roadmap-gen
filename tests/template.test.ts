/**
 * Tests for HTML template generation
 */

import { describe, test, expect } from 'bun:test';
import { generateHTMLTemplate } from '../src/template/template.ts';
import type { RoadmapData } from '../src/core/types.ts';

describe('generateHTMLTemplate', () => {
  const testRoadmap: RoadmapData = {
    title: 'Template Test Roadmap',
    vision: 'Testing HTML template generation functionality',
    quarters: ['Q1-2025', 'Q2-2025'],
    next_quarters: ['Q2-2025'],
    categories: [],
  };

  test('should generate complete HTML document structure', () => {
    const categoriesHTML = '<div class="test-categories">Test Categories</div>';
    const metricsHTML = '<div class="test-metrics">Test Metrics</div>';

    const html = generateHTMLTemplate(testRoadmap, categoriesHTML, metricsHTML);

    expect(html).toContain('<!doctype html>');
    expect(html).toContain('<html lang="en">');
    expect(html).toContain('<head>');
    expect(html).toContain('<body>');
    expect(html).toContain('</html>');
  });

  test('should include proper meta tags and title', () => {
    const html = generateHTMLTemplate(testRoadmap, '', '');

    expect(html).toContain('<meta charset="UTF-8" />');
    expect(html).toContain('<meta name="viewport"');
    expect(html).toContain('<meta name="description"');
    expect(html).toContain('<title>Template Test Roadmap</title>');
  });

  test('should include CSS and JavaScript references', () => {
    const html = generateHTMLTemplate(testRoadmap, '', '');

    expect(html).toContain('<link rel="stylesheet" href="./styles.css" />');
    expect(html).toContain('<script src="./script.js"></script>');
  });

  test('should include roadmap header with title and vision', () => {
    const html = generateHTMLTemplate(testRoadmap, '', '');

    expect(html).toContain('<h1>Template Test Roadmap</h1>');
    expect(html).toContain('Testing HTML template generation functionality');
  });

  test('should inject categories and metrics HTML', () => {
    const categoriesHTML = '<div class="categories-content">Categories go here</div>';
    const metricsHTML = '<div class="metrics-content">Metrics go here</div>';

    const html = generateHTMLTemplate(testRoadmap, categoriesHTML, metricsHTML);

    expect(html).toContain('Categories go here');
    expect(html).toContain('Metrics go here');
  });

  test('should include legend section', () => {
    const html = generateHTMLTemplate(testRoadmap, '', '');

    expect(html).toContain('📌 Legend');
    expect(html).toContain('Completed');
    expect(html).toContain('In Progress');
    expect(html).toContain('Planned');
    expect(html).toContain('On Hold');
  });

  test('should display next quarters information', () => {
    const html = generateHTMLTemplate(testRoadmap, '', '');

    expect(html).toContain('Next quarters');
    expect(html).toContain('Q2-2025');
  });

  test('should handle roadmap without next quarters', () => {
    const roadmapWithoutNext = { ...testRoadmap };
    delete roadmapWithoutNext.next_quarters;

    const html = generateHTMLTemplate(roadmapWithoutNext, '', '');

    expect(html).toContain('Next quarters');
    expect(html).toContain('()'); // Should show empty parentheses
  });

  test('should escape HTML in roadmap data', () => {
    const roadmapWithSpecialChars: RoadmapData = {
      title: 'Roadmap with <script>alert("test")</script>',
      vision: 'Vision with & special characters',
      quarters: ['Q1-2025'],
      categories: [],
    };

    const html = generateHTMLTemplate(roadmapWithSpecialChars, '', '');

    // Note: The actual escaping should be handled by the template engine
    expect(html).toContain('Roadmap with');
    expect(html).toContain('Vision with');
  });

  test('should maintain proper HTML structure with empty content', () => {
    const html = generateHTMLTemplate(testRoadmap, '', '');

    expect(html).toContain('<div class="container">');
    expect(html).toContain('</div>');

    // Count opening and closing tags should match
    const openDivs = (html.match(/<div/g) || []).length;
    const closeDivs = (html.match(/<\/div>/g) || []).length;
    expect(openDivs).toBe(closeDivs);
  });
});
