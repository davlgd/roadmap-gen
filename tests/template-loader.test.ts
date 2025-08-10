/**
 * Tests for template loader module
 */

import { describe, test, expect, beforeEach } from 'bun:test';
import {
  loadTemplate,
  replaceTemplateVariables,
  processTemplate,
  clearTemplateCache,
} from '../src/template/template-loader.ts';

describe('template-loader', () => {
  beforeEach(() => {
    clearTemplateCache();
  });

  describe('loadTemplate', () => {
    test('should load existing template files', () => {
      const template = loadTemplate('main');
      expect(template).toContain('<!doctype html>');
      expect(template).toContain('{{title}}');
      expect(template).toContain('{{header}}');
    });

    test('should cache templates for performance', () => {
      const template1 = loadTemplate('header');
      const template2 = loadTemplate('header');
      expect(template1).toBe(template2);
    });

    test('should throw error for non-existent template', () => {
      expect(() => loadTemplate('non-existent')).toThrow('Failed to load template');
    });
  });

  describe('replaceTemplateVariables', () => {
    test('should replace single variable', () => {
      const template = '<h1>{{title}}</h1>';
      const result = replaceTemplateVariables(template, { title: 'Test Title' });
      expect(result).toBe('<h1>Test Title</h1>');
    });

    test('should replace multiple variables', () => {
      const template = '<div>{{name}} - {{description}}</div>';
      const result = replaceTemplateVariables(template, {
        name: 'Project A',
        description: 'Test description',
      });
      expect(result).toBe('<div>Project A - Test description</div>');
    });

    test('should replace multiple occurrences of same variable', () => {
      const template = '<title>{{title}}</title><h1>{{title}}</h1>';
      const result = replaceTemplateVariables(template, { title: 'My Title' });
      expect(result).toBe('<title>My Title</title><h1>My Title</h1>');
    });

    test('should handle empty values', () => {
      const template = '<div>{{empty}}</div>';
      const result = replaceTemplateVariables(template, { empty: '' });
      expect(result).toBe('<div></div>');
    });

    test('should handle undefined values', () => {
      const template = '<div>{{missing}}</div>';
      const result = replaceTemplateVariables(template, {});
      expect(result).toBe('<div></div>');
    });
  });

  describe('processTemplate', () => {
    test('should load and process template with variables', () => {
      const result = processTemplate('header', {
        title: 'Test Roadmap',
        vision: 'Test vision statement',
      });

      expect(result).toContain('Test Roadmap');
      expect(result).toContain('Test vision statement');
      expect(result).toContain('<div class="header">');
    });

    test('should work with empty variables', () => {
      const result = processTemplate('legend');
      expect(result).toContain('📌 Legend');
      expect(result).toContain('Next quarters ()');
    });
  });

  describe('clearTemplateCache', () => {
    test('should clear template cache', () => {
      // Load template to populate cache
      loadTemplate('header');

      // Clear cache
      clearTemplateCache();

      // This should work without errors (would load from file again)
      const template = loadTemplate('header');
      expect(template).toContain('{{title}}');
    });
  });
});
