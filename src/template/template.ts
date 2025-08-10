/**
 * HTML template generator for roadmap
 */

import type { RoadmapData } from '../core/types.ts';
import { processTemplate } from './template-loader.ts';

/**
 * Generates the complete HTML document structure
 *
 * @param roadmap - The roadmap data
 * @param categoriesHTML - Generated HTML for all categories
 * @param metricsHTML - Generated HTML for metrics section
 * @returns Complete HTML document as string
 */
export function generateHTMLTemplate(roadmap: RoadmapData, categoriesHTML: string, metricsHTML: string): string {
  const nextQuartersText = roadmap.next_quarters?.join(', ') ?? '';
  const headerHTML = generateHeaderHTML(roadmap);
  const legendHTML = generateLegendHTML(nextQuartersText);

  return processTemplate('main', {
    title: roadmap.title,
    header: headerHTML,
    categories: categoriesHTML,
    metrics: metricsHTML,
    legend: legendHTML,
  });
}

/**
 * Generates the header section HTML
 */
function generateHeaderHTML(roadmap: RoadmapData): string {
  return processTemplate('header', {
    title: roadmap.title,
    vision: roadmap.vision,
  });
}

/**
 * Generates the legend section HTML
 */
function generateLegendHTML(nextQuartersText: string): string {
  return processTemplate('legend', {
    nextQuarters: nextQuartersText,
  });
}
