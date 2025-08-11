/**
 * HTML generation utilities to reduce code duplication
 */

import type { DetailEntry, MetricEntry } from '../core/types.ts';

// ASCII code for apostrophe character to avoid quote conflicts in ESLint/Prettier
const APOSTROPHE_CHAR_CODE = 39;

/**
 * Escapes HTML special characters to prevent XSS
 */
export function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    '/': '&#x2F;',
    [String.fromCharCode(APOSTROPHE_CHAR_CODE)]: '&#39;',
  };

  return text.replace(/[&<>"'/]/g, char => htmlEscapes[char] || char);
}

/**
 * Validates and sanitizes URLs
 */
export function sanitizeUrl(url: string): string {
  // Only allow http, https, and relative URLs
  const sanitized = url.trim();
  if (sanitized.startsWith('javascript:') || sanitized.startsWith('data:') || sanitized.startsWith('vbscript:')) {
    return '#';
  }
  return sanitized;
}

/**
 * Generates HTML list items from an array of strings
 *
 * @param items - Array of string items
 * @param itemClass - CSS class for each item
 * @param prefix - Optional prefix for each item (e.g., '• ')
 * @returns HTML string with list items
 */
export function generateListItems(items: string[], itemClass: string, prefix = ''): string {
  return items.map(item => `<div class="${itemClass}">${prefix}${escapeHtml(item)}</div>`).join('');
}

/**
 * Generates a section with title and content
 *
 * @param title - Section title
 * @param content - Section content HTML
 * @param sectionClass - CSS class for the section
 * @returns HTML section
 */
export function generateSection(title: string, content: string, sectionClass: string): string {
  return `
    <div class="${sectionClass}">
      <h3>${title}</h3>
      ${content}
    </div>`;
}

/**
 * Creates info sections with label and content
 *
 * @param label - Label text (e.g., 'Progress:', 'Metrics:')
 * @param content - Content to display
 * @param infoClass - CSS class for the info section
 * @returns HTML info section
 */
export function createInfoSection(label: string, content: string, infoClass: string): string {
  return `<div class="${infoClass}"><strong>${escapeHtml(label)}</strong> ${escapeHtml(content)}</div>`;
}

/**
 * Creates info section with list content
 *
 * @param label - Label text
 * @param items - Array of items to list
 * @param infoClass - CSS class for the info section
 * @returns HTML info section with list
 */
export function createInfoList(label: string, items: string[], infoClass: string): string {
  const itemsList = items.map(item => `• ${escapeHtml(item)}`).join('<br>');
  return `<div class="${infoClass}"><strong>${escapeHtml(label)}</strong><br>${itemsList}</div>`;
}

/**
 * Converts DetailEntry array to string array for HTML generation
 *
 * @param details - Array of DetailEntry (string or DetailItem)
 * @returns Array of strings
 */
export function detailEntriesToStrings(details: DetailEntry[]): string[] {
  return details.map(detail => {
    if (typeof detail === 'string') {
      return detail;
    }
    return detail.text;
  });
}

/**
 * Converts MetricEntry array to string array for HTML generation
 *
 * @param metrics - Array of MetricEntry (string or MetricItem)
 * @returns Array of strings
 */
export function metricEntriesToStrings(metrics: MetricEntry[]): string[] {
  return metrics.map(metric => {
    if (typeof metric === 'string') {
      return metric;
    }
    return metric.text;
  });
}
