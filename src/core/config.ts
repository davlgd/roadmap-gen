/**
 * Configuration constants for roadmap generation
 */

import type { StatusInfo, ProjectStatus } from './types.ts';

export const CONFIG = {
  // File paths
  INPUT_FILE: 'roadmap.yaml',
  EXAMPLE_FILE: 'example.yml',
  OUTPUT_DIR: 'dist',
  OUTPUT_FILE: 'index.html',

  // Asset paths
  ASSETS_DIR: 'templates/assets',
  TEMPLATE_DIR: 'templates',
  TEMPLATES_DIR: 'templates', // Legacy compatibility
  CSS_FILE: 'styles.css',
  JS_FILE: 'script.js',

  // Build settings
  DEFAULT_HTML_SIZE_THRESHOLD: 100, // KB
  MAX_PROJECTS_PER_CATEGORY: 10,
  BYTES_TO_KB: 1024,

  // Display settings
  DEFAULT_COLUMN_WIDTH: 220,
  MIN_COLUMN_WIDTH: 150,
  PROJECT_INFO_WIDTH: 280,

  // Animation settings
  ANIMATION_DURATION: '0.6s',
  HOVER_TRANSFORM_Y: '-1px',

  // Colors
  COLORS: {
    BACKGROUND: '#0a0f1c',
    SURFACE: '#1e2532',
    HEADER: '#0f172a',
    BORDER: '#374151',
    TEXT_PRIMARY: '#f1f5f9',
    TEXT_SECONDARY: '#cbd5e1',
    TEXT_MUTED: '#94a3b8',
    ACCENT: '#2563eb',
  } as const,
} as const;

/**
 * Status mapping with visual properties
 */
export const STATUS_MAP: Record<ProjectStatus, StatusInfo> = {
  completed: {
    class: 'completed',
    color: '#059669',
    text: '✅ Completed',
  },
  'in-progress': {
    class: 'in-progress',
    color: '#d97706',
    text: '🟡 In Progress',
  },
  planned: {
    class: 'planned',
    color: '#2563eb',
    text: '🔵 Planned',
  },
  'on-hold': {
    class: 'on-hold',
    color: '#6b7280',
    text: '⏸️ On Hold',
  },
};

/**
 * Validation rules for roadmap data
 */
export const VALIDATION_RULES = {
  MIN_TITLE_LENGTH: 5,
  MIN_VISION_LENGTH: 10,
  MIN_QUARTERS: 1,
  MAX_QUARTERS: 8,
  MIN_CATEGORIES: 1,
  MAX_CATEGORIES: 20,
  MIN_PROJECT_NAME_LENGTH: 3,
  MAX_PROJECT_NAME_LENGTH: 100,
} as const;

/**
 * Current period detection rules
 */
export const PERIOD_DETECTION = {
  CURRENT_YEAR: new Date().getFullYear(),
  QUARTERS: {
    Q1: { start: 1, end: 3 },
    Q2: { start: 4, end: 6 },
    Q3: { start: 7, end: 9 },
    Q4: { start: 10, end: 12 },
  },
} as const;
