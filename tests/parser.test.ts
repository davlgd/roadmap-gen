/**
 * Tests for parser module
 */

import { describe, test, expect } from 'bun:test';
import { parseYAML, validateRoadmap } from '../src/data/parser.ts';
import type { RoadmapData } from '../src/core/types.ts';

describe('parseYAML', () => {
  test('should parse valid YAML content', () => {
    const yamlContent = `
title: "Test Roadmap"
vision: "Test vision for roadmap"
quarters: ["Q1-2025", "Q2-2025"]
next_quarters: ["Q1-2025"]
categories:
  - name: "Test Category"
    icon: "🚀"
    projects:
      - name: "Test Project"
        responsible: "Test User"
        quarters:
          Q1-2025:
            status: "planned"
            description: "Test description"
`;

    const result = parseYAML(yamlContent);

    expect(result.title).toBe('Test Roadmap');
    expect(result.vision).toBe('Test vision for roadmap');
    expect(result.quarters).toEqual(['Q1-2025', 'Q2-2025']);
    expect(result.categories).toHaveLength(1);
    expect(result.categories[0].projects).toHaveLength(1);
  });

  test('should throw error for invalid YAML', () => {
    const invalidYaml = `
title: "Test"
invalid_structure: [
  - missing closing bracket
`;

    expect(() => parseYAML(invalidYaml)).toThrow();
  });

  test('should handle empty YAML content', () => {
    const result = parseYAML('');
    expect(result).toBeUndefined();
  });

  test('should accept various progress formats', () => {
    const yamlContent = `
title: "Test Roadmap"
vision: "Test vision"
quarters: ["Q1-2025"]
next_quarters: ["Q1-2025"]
categories:
  - name: "Test Category"
    icon: "🚀"
    projects:
      - name: "Project 1"
        quarters:
          Q1-2025:
            status: "in-progress"
            description: "Test"
            progress: "75%"
      - name: "Project 2"
        quarters:
          Q1-2025:
            status: "in-progress"
            description: "Test"
            progress: "3/5 tasks"
      - name: "Project 3"
        quarters:
          Q1-2025:
            status: "in-progress"
            description: "Test"
            progress: "Phase 2"
      - name: "Project 4"
        quarters:
          Q1-2025:
            status: "in-progress"
            description: "Test"
            progress: "MVP complete"
`;

    const result = parseYAML(yamlContent);
    expect(() => validateRoadmap(result!)).not.toThrow();

    const projects = result!.categories[0].projects;
    expect(projects[0].quarters['Q1-2025'].progress).toBe('75%');
    expect(projects[1].quarters['Q1-2025'].progress).toBe('3/5 tasks');
    expect(projects[2].quarters['Q1-2025'].progress).toBe('Phase 2');
    expect(projects[3].quarters['Q1-2025'].progress).toBe('MVP complete');
  });
});

describe('validateRoadmap', () => {
  const validRoadmap: RoadmapData = {
    title: 'Valid Roadmap Title',
    vision: 'Valid vision statement for testing',
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
            quarters: {
              'Q1-2025': {
                status: 'planned',
                description: 'Test description',
              },
            },
          },
        ],
      },
    ],
  };

  test('should validate correct roadmap data', () => {
    expect(() => validateRoadmap(validRoadmap)).not.toThrow();
  });

  test('should reject roadmap with short title', () => {
    const invalidRoadmap = { ...validRoadmap, title: 'Hi' };
    expect(() => validateRoadmap(invalidRoadmap)).toThrow('Title must be at least');
  });

  test('should reject roadmap with short vision', () => {
    const invalidRoadmap = { ...validRoadmap, vision: 'Short' };
    expect(() => validateRoadmap(invalidRoadmap)).toThrow('Vision must be at least');
  });

  test('should reject roadmap with invalid quarter format', () => {
    const invalidRoadmap = { ...validRoadmap, quarters: ['2025-Q1', 'Q2-2025'] };
    expect(() => validateRoadmap(invalidRoadmap)).toThrow('Invalid quarter format');
  });

  test('should reject roadmap with too many quarters', () => {
    const invalidRoadmap = {
      ...validRoadmap,
      quarters: ['Q1-2025', 'Q2-2025', 'Q3-2025', 'Q4-2025', 'Q1-2026', 'Q2-2026', 'Q3-2026', 'Q4-2026', 'Q1-2027'],
    };
    expect(() => validateRoadmap(invalidRoadmap)).toThrow('Maximum 8 quarters allowed');
  });

  test('should reject roadmap without categories', () => {
    const invalidRoadmap = { ...validRoadmap, categories: [] };
    expect(() => validateRoadmap(invalidRoadmap)).toThrow('At least 1 category required');
  });

  test('should reject category with short project name', () => {
    const invalidRoadmap = {
      ...validRoadmap,
      categories: [
        {
          ...validRoadmap.categories[0],
          projects: [
            {
              name: 'Hi',
              quarters: {},
            },
          ],
        },
      ],
    };
    expect(() => validateRoadmap(invalidRoadmap)).toThrow('must be between 3 and 100 characters');
  });
});
