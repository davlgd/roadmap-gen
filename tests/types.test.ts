/**
 * Tests for TypeScript type definitions
 */

import { describe, test, expect } from 'bun:test';
import type {
  ProjectStatus,
  StatusInfo,
  QuarterData,
  Project,
  Category,
  RoadmapData,
  BuildStats,
} from '../src/core/types.ts';

describe('Type definitions', () => {
  test('ProjectStatus should accept valid status values', () => {
    const validStatuses: ProjectStatus[] = ['completed', 'in-progress', 'planned', 'on-hold'];

    validStatuses.forEach(status => {
      expect(typeof status).toBe('string');
      expect(['completed', 'in-progress', 'planned', 'on-hold']).toContain(status);
    });
  });

  test('StatusInfo should have correct structure', () => {
    const statusInfo: StatusInfo = {
      class: 'completed',
      color: '#059669',
      text: '✅ Completed',
    };

    expect(statusInfo.class).toBe('completed');
    expect(statusInfo.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    expect(typeof statusInfo.text).toBe('string');
  });

  test('QuarterData should accept all optional fields', () => {
    const minimalQuarterData: QuarterData = {
      status: 'planned',
      description: 'Test description',
    };

    const fullQuarterData: QuarterData = {
      status: 'in-progress',
      description: 'Full test description',
      details: ['Detail 1', 'Detail 2'],
      progress: '50%',
      metrics: ['Metric 1'],
      risks: ['Risk 1'],
      objectives: ['Objective 1'],
      dependencies: ['Dependency 1'],
    };

    expect(minimalQuarterData.status).toBe('planned');
    expect(fullQuarterData.details).toHaveLength(2);
    expect(fullQuarterData.progress).toBe('50%');
  });

  test('Project should have required and optional fields', () => {
    const minimalProject: Project = {
      name: 'Test Project',
      quarters: {},
    };

    const fullProject: Project = {
      name: 'Full Test Project',
      responsible: 'John Doe',
      issue: 'https://github.com/test/issue/1',
      quarters: {
        'Q1-2025': {
          status: 'planned',
          description: 'Test quarter',
        },
      },
    };

    expect(minimalProject.name).toBe('Test Project');
    expect(fullProject.responsible).toBe('John Doe');
    expect(fullProject.quarters['Q1-2025']?.status).toBe('planned');
  });

  test('Category should contain projects array', () => {
    const category: Category = {
      name: 'Test Category',
      icon: '🚀',
      projects: [
        {
          name: 'Project 1',
          quarters: {},
        },
        {
          name: 'Project 2',
          quarters: {},
        },
      ],
    };

    expect(category.projects).toHaveLength(2);
    expect(category.icon).toBe('🚀');
  });

  test('RoadmapData should have complete structure', () => {
    const roadmap: RoadmapData = {
      title: 'Test Roadmap',
      vision: 'Test vision statement',
      quarters: ['Q1-2025', 'Q2-2025'],
      next_quarters: ['Q1-2025'],
      categories: [
        {
          name: 'Category 1',
          icon: '📋',
          projects: [],
        },
      ],
      metrics: {
        kpis: ['KPI 1'],
        risks: ['Risk 1'],
      },
    };

    expect(roadmap.title).toBe('Test Roadmap');
    expect(roadmap.quarters).toHaveLength(2);
    expect(roadmap.next_quarters).toHaveLength(1);
    expect(roadmap.categories).toHaveLength(1);
  });

  test('BuildStats should track build metrics', () => {
    const TEST_CATEGORIES_COUNT = 5;
    const TEST_PROJECTS_COUNT = 25;
    const TEST_QUARTERS_COUNT = 4;
    const TEST_HTML_SIZE = '124.5';

    const stats: BuildStats = {
      categories: TEST_CATEGORIES_COUNT,
      projects: TEST_PROJECTS_COUNT,
      quarters: TEST_QUARTERS_COUNT,
      htmlSize: TEST_HTML_SIZE,
    };

    expect(stats.categories).toBe(TEST_CATEGORIES_COUNT);
    expect(stats.projects).toBe(TEST_PROJECTS_COUNT);
    expect(stats.quarters).toBe(TEST_QUARTERS_COUNT);
    expect(stats.htmlSize).toBe(TEST_HTML_SIZE);
  });
});
