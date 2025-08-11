/**
 * Template loader for HTML template files
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { CONFIG } from '../core/config.ts';
import { getTemplate } from '../core/embedded-assets.ts';

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
 * @param templateDir - Directory containing templates (optional)
 * @returns Template content as string
 */
export function loadTemplate(templateName: string, templateDir: string = CONFIG.TEMPLATE_DIR): string {
  const cacheKey = `${templateDir}:${templateName}`;

  const cached = templateCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  const templatePath = join(templateDir, `${templateName}.html`);

  let content: string;

  // Try to load from external file first
  if (existsSync(templatePath)) {
    try {
      content = readFileSync(templatePath, 'utf-8');
    } catch (error) {
      // Fallback to embedded template
      content = getTemplate(templateName);
      if (!content) {
        const message = error instanceof Error ? error.message : 'Unknown error';
        throw new Error(`Failed to load template "${templateName}": ${message}`);
      }
    }
  } else {
    // Use embedded template
    content = getTemplate(templateName);
    if (!content) {
      throw new Error(`Template not found: "${templateName}" (no embedded fallback available)`);
    }
  }

  // Limit cache size to prevent memory issues
  if (templateCache.size >= MAX_CACHE_SIZE) {
    const firstKey = templateCache.keys().next().value;
    if (firstKey) templateCache.delete(firstKey);
  }

  templateCache.set(cacheKey, content);
  return content;
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
 * @param templateDir - Directory containing templates (optional)
 * @returns Processed template content
 */
export function processTemplate(
  templateName: string,
  variables: Record<string, string> = {},
  templateDir?: string
): string {
  const template = loadTemplate(templateName, templateDir);
  return replaceTemplateVariables(template, variables);
}

/**
 * Clears the template cache (useful for testing)
 */
export function clearTemplateCache(): void {
  templateCache.clear();
}
