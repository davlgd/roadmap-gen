/**
 * Template loader for HTML template files
 */

import { readFileSync } from 'fs';
import { join } from 'path';
import { CONFIG } from '../core/config.ts';

/**
 * Template cache to avoid repeated file reads
 * Limited to prevent memory issues
 */
const templateCache = new Map<string, string>();
const MAX_CACHE_SIZE = 100; // Maximum number of templates to cache

/**
 * Loads a template file from the templates directory
 *
 * @param templateName - Name of the template file (without .html extension)
 * @returns Template content as string
 */
export function loadTemplate(templateName: string): string {
  const cacheKey = templateName;

  const cached = templateCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  const templatePath = join(CONFIG.TEMPLATES_DIR, `${templateName}.html`);

  try {
    const content = readFileSync(templatePath, 'utf-8');

    // Limit cache size to prevent memory issues
    if (templateCache.size >= MAX_CACHE_SIZE) {
      const firstKey = templateCache.keys().next().value;
      if (firstKey) templateCache.delete(firstKey);
    }

    templateCache.set(cacheKey, content);
    return content;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to load template "${templateName}": ${message}`);
  }
}

/**
 * Replaces template variables with actual values
 *
 * @param template - Template string with {{variable}} placeholders
 * @param variables - Object with variable name-value pairs
 * @returns Template with variables replaced
 */
export function replaceTemplateVariables(template: string, variables: Record<string, string>): string {
  let result = template;

  // Replace all variables that are provided
  for (const [key, value] of Object.entries(variables)) {
    const placeholder = `{{${key}}}`;
    const escapedPlaceholder = placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    result = result.replace(new RegExp(escapedPlaceholder, 'g'), value ?? '');
  }

  // Replace any remaining undefined variables with empty strings
  result = result.replace(/\{\{[^}]+\}\}/g, '');

  return result;
}

/**
 * Loads and processes a template with variables
 *
 * @param templateName - Name of the template file
 * @param variables - Variables to replace in template
 * @returns Processed template content
 */
export function processTemplate(templateName: string, variables: Record<string, string> = {}): string {
  const template = loadTemplate(templateName);
  return replaceTemplateVariables(template, variables);
}

/**
 * Clears the template cache (useful for testing)
 */
export function clearTemplateCache(): void {
  templateCache.clear();
}
