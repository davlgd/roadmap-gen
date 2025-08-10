/**
 * Tests for configuration constants
 */

import { describe, test, expect } from 'bun:test';
import { STATUS_MAP, VALIDATION_RULES, CONFIG, PERIOD_DETECTION } from '../src/core/config.ts';

describe('STATUS_MAP', () => {
  test('should contain all required status types', () => {
    expect(STATUS_MAP.completed).toBeDefined();
    expect(STATUS_MAP['in-progress']).toBeDefined();
    expect(STATUS_MAP.planned).toBeDefined();
    expect(STATUS_MAP['on-hold']).toBeDefined();
  });

  test('should have proper structure for each status', () => {
    Object.values(STATUS_MAP).forEach(status => {
      expect(status).toHaveProperty('class');
      expect(status).toHaveProperty('color');
      expect(status).toHaveProperty('text');
      expect(typeof status.class).toBe('string');
      expect(typeof status.color).toBe('string');
      expect(typeof status.text).toBe('string');
    });
  });

  test('should have valid CSS color values', () => {
    Object.values(STATUS_MAP).forEach(status => {
      expect(status.color).toMatch(/^#[0-9a-fA-F]{6}$/);
    });
  });
});

describe('VALIDATION_RULES', () => {
  test('should have reasonable validation limits', () => {
    expect(VALIDATION_RULES.MIN_TITLE_LENGTH).toBeGreaterThan(0);
    expect(VALIDATION_RULES.MIN_VISION_LENGTH).toBeGreaterThan(0);
    expect(VALIDATION_RULES.MIN_QUARTERS).toBeGreaterThan(0);
    expect(VALIDATION_RULES.MAX_QUARTERS).toBeGreaterThan(VALIDATION_RULES.MIN_QUARTERS);
    expect(VALIDATION_RULES.MIN_CATEGORIES).toBeGreaterThan(0);
    expect(VALIDATION_RULES.MAX_CATEGORIES).toBeGreaterThan(VALIDATION_RULES.MIN_CATEGORIES);
    expect(VALIDATION_RULES.MIN_PROJECT_NAME_LENGTH).toBeGreaterThan(0);
    expect(VALIDATION_RULES.MAX_PROJECT_NAME_LENGTH).toBeGreaterThan(VALIDATION_RULES.MIN_PROJECT_NAME_LENGTH);
  });
});

describe('CONFIG', () => {
  test('should have all required file paths', () => {
    expect(CONFIG.INPUT_FILE).toBeDefined();
    expect(CONFIG.OUTPUT_DIR).toBeDefined();
    expect(CONFIG.OUTPUT_FILE).toBeDefined();
    expect(CONFIG.ASSETS_DIR).toBeDefined();
    expect(CONFIG.CSS_FILE).toBeDefined();
    expect(CONFIG.JS_FILE).toBeDefined();
  });

  test('should have valid colors object', () => {
    expect(CONFIG.COLORS).toBeDefined();
    expect(typeof CONFIG.COLORS.BACKGROUND).toBe('string');
    expect(typeof CONFIG.COLORS.SURFACE).toBe('string');
    expect(typeof CONFIG.COLORS.TEXT_PRIMARY).toBe('string');
  });
});

describe('PERIOD_DETECTION', () => {
  test('should have valid quarter definitions', () => {
    expect(PERIOD_DETECTION.CURRENT_YEAR).toBeGreaterThan(2020);
    expect(PERIOD_DETECTION.QUARTERS.Q1).toEqual({ start: 1, end: 3 });
    expect(PERIOD_DETECTION.QUARTERS.Q2).toEqual({ start: 4, end: 6 });
    expect(PERIOD_DETECTION.QUARTERS.Q3).toEqual({ start: 7, end: 9 });
    expect(PERIOD_DETECTION.QUARTERS.Q4).toEqual({ start: 10, end: 12 });
  });
});
