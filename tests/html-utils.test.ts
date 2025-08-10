/**
 * Tests for HTML utilities
 */

import { describe, test, expect } from 'bun:test';
import { generateListItems, generateSection, createInfoSection, createInfoList } from '../src/template/html-utils.ts';

describe('html-utils', () => {
  describe('generateListItems', () => {
    test('should generate list items with class', () => {
      const items = ['Item 1', 'Item 2', 'Item 3'];
      const result = generateListItems(items, 'test-item');

      expect(result).toContain('<div class="test-item">Item 1</div>');
      expect(result).toContain('<div class="test-item">Item 2</div>');
      expect(result).toContain('<div class="test-item">Item 3</div>');
    });

    test('should generate list items with prefix', () => {
      const items = ['Task A', 'Task B'];
      const result = generateListItems(items, 'task-item', '• ');

      expect(result).toContain('<div class="task-item">• Task A</div>');
      expect(result).toContain('<div class="task-item">• Task B</div>');
    });

    test('should handle empty array', () => {
      const result = generateListItems([], 'empty-item');
      expect(result).toBe('');
    });
  });

  describe('generateSection', () => {
    test('should generate section with title and content', () => {
      const result = generateSection('Test Title', '<p>Test content</p>', 'test-section');

      expect(result).toContain('<div class="test-section">');
      expect(result).toContain('<h3>Test Title</h3>');
      expect(result).toContain('<p>Test content</p>');
      expect(result).toContain('</div>');
    });
  });

  describe('createInfoSection', () => {
    test('should create info section with label and content', () => {
      const result = createInfoSection('Progress:', '75%', 'progress-info');

      expect(result).toBe('<div class="progress-info"><strong>Progress:</strong> 75%</div>');
    });
  });

  describe('createInfoList', () => {
    test('should create info section with list items', () => {
      const items = ['Risk 1', 'Risk 2'];
      const result = createInfoList('Risks:', items, 'risks-info');

      expect(result).toContain('<div class="risks-info">');
      expect(result).toContain('<strong>Risks:</strong><br>');
      expect(result).toContain('• Risk 1<br>• Risk 2');
      expect(result).toContain('</div>');
    });

    test('should handle single item', () => {
      const items = ['Single item'];
      const result = createInfoList('Item:', items, 'single-info');

      expect(result).toContain('• Single item');
      expect(result).toContain('<strong>Item:</strong><br>• Single item');
    });
  });
});
