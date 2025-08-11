/**
 * HTML generator for roadmap components
 */

import type { RoadmapData, Project, Category, QuarterData } from '../core/types.ts';
import { STATUS_MAP } from '../core/config.ts';
import { generateHTMLTemplate } from './template.ts';
import { processTemplate } from './template-loader.ts';
import {
  generateListItems,
  createInfoSection,
  createInfoList,
  escapeHtml,
  sanitizeUrl,
  detailEntriesToStrings,
  metricEntriesToStrings,
} from './html-utils.ts';

/**
 * Generates complete HTML for the roadmap
 *
 * @param roadmap - The roadmap data structure
 * @returns Complete HTML document as string
 */
export function generateHTML(roadmap: RoadmapData): string {
  const categoriesHTML = roadmap.categories
    .map(category => generateCategorySection(category, roadmap.quarters, roadmap.next_quarters))
    .join('');

  const metricsHTML = generateMetricsSection(roadmap.metrics);

  return generateHTMLTemplate(roadmap, categoriesHTML, metricsHTML);
}

/**
 * Generates HTML for a quarter cell in the project table
 */
function generateQuarterCell(
  quarterData: QuarterData | undefined,
  quarter: string,
  isNext: boolean,
  templateDir?: string
): string {
  const periodClass = isNext ? 'next-quarter' : 'past-quarter';

  if (!quarterData) {
    return processTemplate(
      'quarter-cell-empty',
      {
        periodClass,
      },
      templateDir
    );
  }

  let statusInfo = STATUS_MAP[quarterData.status];
  if (!statusInfo) {
    console.warn(`Unknown status "${quarterData.status}", defaulting to "planned"`);
    statusInfo = STATUS_MAP['planned'];
  }
  const detailsHTML = buildDetailsHTML(quarterData);

  return processTemplate(
    'quarter-cell',
    {
      periodClass,
      statusClass: statusInfo.class,
      statusText: statusInfo.text,
      description: escapeHtml(quarterData.description || ''),
      detailsHTML,
    },
    templateDir
  );
}

/**
 * Builds the details HTML section for a quarter cell
 */
function buildDetailsHTML(quarterData: QuarterData): string {
  let detailsHTML = '';

  if (quarterData.details && quarterData.details.length > 0) {
    const detailStrings = detailEntriesToStrings(quarterData.details);
    const detailItems = detailStrings.map(detail => `<div class="detail-item">• ${escapeHtml(detail)}</div>`).join('');
    detailsHTML += `<div class="quarter-details">${detailItems}</div>`;
  }

  const extraInfo = buildExtraInfoSections(quarterData);
  if (extraInfo.length > 0) {
    detailsHTML += `<div class="extra-info">${extraInfo.join('')}</div>`;
  }

  return detailsHTML;
}

/**
 * Builds additional info sections (progress, metrics, risks, etc.)
 */
function buildExtraInfoSections(quarterData: QuarterData): string[] {
  const sections: string[] = [];

  if (quarterData.progress) {
    sections.push(createInfoSection('Progress:', quarterData.progress, 'progress-info'));
  }

  if (quarterData.metrics) {
    sections.push(createInfoList('Metrics:', quarterData.metrics, 'metrics-info'));
  }

  if (quarterData.risks) {
    sections.push(createInfoList('Risks:', quarterData.risks, 'risks-info'));
  }

  if (quarterData.objectives) {
    sections.push(createInfoList('Objectives:', quarterData.objectives, 'objectives-info'));
  }

  if (quarterData.dependencies) {
    sections.push(createInfoList('Dependencies:', quarterData.dependencies, 'dependencies-info'));
  }

  return sections;
}

/**
 * Generates HTML for a project row in the table
 */
function generateProjectRow(project: Project, quarters: string[], nextQuarters?: string[]): string {
  const infoHTML = buildProjectInfoHTML(project);

  const quartersHTML = quarters
    .map(quarter => {
      const quarterData = project.quarters?.[quarter];
      const isNext = nextQuarters?.includes(quarter) ?? false;
      return generateQuarterCell(quarterData, quarter, isNext);
    })
    .join('');

  const nameHTML = buildProjectNameHTML(project);

  return processTemplate('project-row', {
    nameHTML,
    infoHTML,
    quartersHTML,
  });
}

/**
 * Builds the project name HTML with optional issue link
 */
function buildProjectNameHTML(project: Project): string {
  const projectName = escapeHtml(project.name);

  if (project.issue) {
    const safeUrl = sanitizeUrl(project.issue);
    return (
      `<a href="${safeUrl}" target="_blank" class="project-link">${projectName} ` +
      '<span class="issue-arrow">↗</span></a>'
    );
  }

  return projectName;
}

/**
 * Builds the project information HTML (responsible only)
 */
function buildProjectInfoHTML(project: Project): string {
  const infoParts: string[] = [];

  if (project.responsible) {
    infoParts.push(`<strong>Responsible:</strong> ${escapeHtml(project.responsible)}`);
  }

  return infoParts.join(' | ');
}

/**
 * Generates HTML for a category section
 */
function generateCategorySection(category: Category, quarters: string[], nextQuarters?: string[]): string {
  const headerHTML = quarters
    .map(quarter => {
      const isNext = nextQuarters?.includes(quarter) ?? false;
      return `<th class="quarter-header ${isNext ? 'next-quarter' : 'past-quarter'}">${escapeHtml(quarter)}</th>`;
    })
    .join('');

  const projectsHTML = category.projects.map(project => generateProjectRow(project, quarters, nextQuarters)).join('');

  const projectCount = category.projects.length;
  const projectLabel = projectCount === 1 ? 'project' : 'projects';

  return processTemplate('category', {
    icon: escapeHtml(category.icon),
    name: escapeHtml(category.name),
    projectCount: projectCount.toString(),
    projectLabel,
    headerHTML,
    projectsHTML,
  });
}

/**
 * Generates HTML for the metrics section
 */
function generateMetricsSection(metrics?: RoadmapData['metrics']): string {
  if (!metrics) return '';

  const kpisHTML = generateKPIsSection(metrics.kpis);
  const risksHTML = generateRisksSection(metrics.risks);

  return processTemplate('metrics', {
    kpisSection: kpisHTML,
    risksSection: risksHTML,
  });
}

/**
 * Generates KPIs section HTML
 */
function generateKPIsSection(kpis?: RoadmapData['metrics']['kpis']): string {
  if (!kpis) return '';

  const kpiStrings = metricEntriesToStrings(kpis);
  return generateListItems(kpiStrings, 'kpi-item', '• ');
}

/**
 * Generates risks section HTML
 */
function generateRisksSection(risks?: RoadmapData['metrics']['risks']): string {
  if (!risks) return '';

  const riskStrings = metricEntriesToStrings(risks);
  return generateListItems(riskStrings, 'risk-item', '• ');
}
