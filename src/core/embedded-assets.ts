/**
 * Embedded assets for default theme
 * These assets are bundled into the binary for standalone usage
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

/**
 * Embedded CSS content for default theme
 */
export const DEFAULT_CSS = `/* Roadmap Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background: #0a0f1c;
    color: #e2e8f0;
    line-height: 1.4;
    font-size: 14px;
}

.container {
    max-width: 95vw;
    margin: 0 auto;
    padding: 15px;
}

/* Header */
.header {
    background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
    padding: 40px;
    text-align: center;
    border-radius: 8px;
    margin-bottom: 25px;
    border: 1px solid #334155;
}

.header h1 {
    font-size: 2.2rem;
    font-weight: 700;
    color: #f1f5f9;
    margin-bottom: 15px;
}

.header .subtitle {
    font-size: 1.1rem;
    color: #cbd5e1;
    font-style: italic;
    opacity: 0.9;
}

/* Category Sections */
.category-section {
    margin-bottom: 40px;
    background: #1e2532;
    border-radius: 8px;
    border: 1px solid #374151;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
}

.category-header {
    background: linear-gradient(135deg, #334155 0%, #1e293b 100%);
    padding: 15px 20px;
    display: flex;
    align-items: center;
    border-bottom: 2px solid #475569;
}

.category-icon {
    font-size: 1.3rem;
    margin-right: 12px;
}

.category-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: white;
    flex: 1;
}

.project-count {
    background: rgba(255, 255, 255, 0.2);
    color: white;
    padding: 4px 10px;
    border-radius: 12px;
    font-size: 0.8rem;
    font-weight: 500;
}

/* Tables */
.category-table-container {
    overflow-x: auto;
    background: #2a3441;
}

.projects-table {
    width: 100%;
    border-collapse: collapse;
    min-width: 1200px;
}

.projects-table th {
    background: #374151;
    color: #f1f5f9;
    padding: 12px 8px;
    text-align: center;
    font-weight: 600;
    font-size: 0.85rem;
    border-right: 1px solid #475569;
    position: sticky;
    top: 0;
    z-index: 10;
}

.project-header {
    width: 280px;
    min-width: 280px;
    text-align: left !important;
    position: sticky;
    left: 0;
    z-index: 11;
    background: #374151 !important;
    border-right: 2px solid #4b5563 !important;
}

.quarter-header {
    width: 220px;
    min-width: 220px;
}

.quarter-header.next-quarter {
    background: linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 100%);
    color: #e2e8f0;
    font-weight: 700;
    box-shadow: inset 0 0 0 1px rgba(59, 130, 246, 0.2);
}

.quarter-header.past-quarter {
    background: #4b5563;
    color: #d1d5db;
}

/* Project Rows */
.project-row {
    border-bottom: 2px solid #475569;
}

.project-row:hover {
    background: transparent !important;
}

.project-info {
    width: 280px;
    min-width: 280px;
    padding: 15px 12px;
    background: #334155;
    border-right: 2px solid #4b5563;
    position: sticky;
    left: 0;
    z-index: 1;
}

.project-name {
    font-weight: 600;
    color: #f1f5f9;
    font-size: 0.95rem;
    margin-bottom: 8px;
    line-height: 1.3;
}

.project-link {
    color: #60a5fa;
    text-decoration: none;
    transition: color 0.2s ease;
}

.project-link:hover {
    color: #93c5fd;
}

.issue-arrow {
    opacity: 0.7;
    margin-left: 4px;
    font-size: 0.8em;
    transition: opacity 0.2s ease;
}

.project-link:hover .issue-arrow {
    opacity: 1;
}

.project-meta {
    font-size: 0.75rem;
    color: #94a3b8;
    line-height: 1.4;
}

.project-meta strong {
    color: #cbd5e1;
}

/* Quarter Cells */
.quarter-cell {
    width: 220px;
    min-width: 220px;
    padding: 12px 8px;
    vertical-align: top;
    border-right: 1px solid #475569;
    position: relative;
}

.quarter-cell.next-quarter {
    background: linear-gradient(135deg, rgba(30, 64, 175, 0.08) 0%, rgba(29, 78, 216, 0.08) 100%);
    border-right-color: #2563eb;
}

.quarter-cell.past-quarter {
    background: #2a3441;
}

.quarter-cell.empty {
    opacity: 0.6;
}

.quarter-cell.completed {
    border-left: 3px solid #059669;
}

.quarter-cell.in-progress {
    border-left: 3px solid #d97706;
}

.quarter-cell.planned {
    border-left: 3px solid #2563eb;
}

.quarter-cell.on-hold {
    border-left: 3px solid #6b7280;
    opacity: 0.8;
}

/* Status Badges */
.status-badge {
    display: inline-block;
    padding: 3px 7px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 600;
    margin-bottom: 6px;
    white-space: nowrap;
}

.status-badge.completed {
    background: #059669;
    color: white;
}

.status-badge.in-progress {
    background: #d97706;
    color: white;
}

.status-badge.planned {
    background: #2563eb;
    color: white;
}

.status-badge.on-hold {
    background: #6b7280;
    color: white;
}

.status-badge.no-info {
    background: #4b5563;
    color: #9ca3af;
}

/* Quarter Content */
.quarter-content {
    font-size: 0.8rem;
    color: #cbd5e1;
}

.quarter-description {
    margin-bottom: 8px;
    line-height: 1.4;
    font-weight: 500;
}

.quarter-details {
    font-size: 0.75rem;
    color: #94a3b8;
    margin-bottom: 8px;
}

.detail-item {
    margin-bottom: 3px;
    line-height: 1.3;
}

.extra-info {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.extra-info > div {
    margin-bottom: 6px;
    font-size: 0.7rem;
}

.progress-info {
    color: #fbbf24;
}

.metrics-info {
    color: #34d399;
}

.risks-info {
    color: #f87171;
}

.objectives-info {
    color: #60a5fa;
}

.dependencies-info {
    color: #a78bfa;
}

/* Metrics Section */
.metrics-section {
    background: #1e2532;
    border-radius: 8px;
    padding: 25px;
    margin-top: 30px;
    border: 1px solid #374151;
}

.metrics-title {
    font-size: 1.4rem;
    font-weight: 600;
    color: #f1f5f9;
    margin-bottom: 20px;
    text-align: center;
}

.metrics-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.kpis-list {
    background: #2a3441;
    padding: 20px;
    border-radius: 6px;
    border-left: 4px solid #059669;
}

.kpis-list h3 {
    color: #f1f5f9;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

.kpi-item,
.risk-item {
    margin-bottom: 8px;
    font-size: 0.9rem;
    color: #cbd5e1;
}

.risks-section {
    background: #2a3441;
    padding: 20px;
    border-radius: 6px;
    border-left: 4px solid #f87171;
}

.risks-section h3 {
    color: #f1f5f9;
    margin-bottom: 15px;
    font-size: 1.1rem;
}

/* Legend */
.legend-section {
    background: #1e2532;
    border-radius: 8px;
    padding: 20px;
    margin-top: 25px;
    border: 1px solid #374151;
}

.legend-section h3 {
    color: #f1f5f9;
    margin-bottom: 15px;
    text-align: center;
}

.legend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 12px;
}

.legend-item {
    display: flex;
    align-items: center;
    padding: 8px 12px;
    background: #2a3441;
    border-radius: 4px;
}

.legend-status {
    width: 12px;
    height: 12px;
    border-radius: 2px;
    margin-right: 8px;
}

.legend-status.completed {
    background: #059669;
}
.legend-status.in-progress {
    background: #d97706;
}
.legend-status.planned {
    background: #2563eb;
}
.legend-status.on-hold {
    background: #6b7280;
}

.legend-item span {
    color: #cbd5e1;
    font-size: 0.85rem;
}

.next-quarters-info {
    text-align: center;
    margin-top: 15px;
    padding: 10px;
    background: rgba(37, 99, 235, 0.08);
    border-radius: 4px;
    border: 1px solid #2563eb;
    color: #7dd3fc;
    font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 1400px) {
    .container {
        max-width: 100vw;
        padding: 10px;
    }

    .projects-table {
        min-width: 1000px;
    }

    .quarter-header,
    .quarter-cell {
        width: 180px;
        min-width: 180px;
    }

    .project-header,
    .project-info {
        width: 240px;
        min-width: 240px;
    }
}

@media (max-width: 768px) {
    .header {
        padding: 20px 15px;
    }

    .header h1 {
        font-size: 1.8rem;
    }

    .metrics-content {
        grid-template-columns: 1fr;
        gap: 20px;
    }

    .projects-table {
        min-width: 800px;
    }

    .quarter-header,
    .quarter-cell {
        width: 150px;
        min-width: 150px;
        font-size: 0.75rem;
    }

    .project-header,
    .project-info {
        width: 200px;
        min-width: 200px;
    }
}

/* Animations */
.category-section {
    animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Scrollbars */
.category-table-container::-webkit-scrollbar {
    height: 8px;
}

.category-table-container::-webkit-scrollbar-track {
    background: #374151;
}

.category-table-container::-webkit-scrollbar-thumb {
    background: #4b5563;
    border-radius: 4px;
}

.category-table-container::-webkit-scrollbar-thumb:hover {
    background: #6b7280;
}`;

/**
 * Embedded JavaScript content for default theme
 */
export const DEFAULT_JS = `// Roadmap Interactive Features

document.addEventListener('DOMContentLoaded', function () {
  console.log('Roadmap loaded');

  initializeNavigation();
  highlightCurrentPeriod();
  enhanceProjectRows();
  logStatistics();
});

/**
 * Initialize enhanced navigation
 */
function initializeNavigation() {
  document.querySelectorAll('.category-table-container').forEach(container => {
    // Horizontal scrolling with mouse wheel
    container.addEventListener('wheel', e => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault();
        container.scrollLeft += e.deltaX;
      }
    });

    // Keyboard navigation
    container.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        container.scrollLeft -= 100;
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        container.scrollLeft += 100;
      }
    });

    // Focus for keyboard navigation
    container.setAttribute('tabindex', '0');
  });
}

/**
 * Highlight current quarter
 */
function highlightCurrentPeriod() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  let currentPeriod = '';
  let quarter = '';
  if (currentMonth >= 10) quarter = 'Q4';
  else if (currentMonth >= 7) quarter = 'Q3';
  else if (currentMonth >= 4) quarter = 'Q2';
  else quarter = 'Q1';

  currentPeriod = \`\${quarter}-\${currentYear}\`;

  if (currentPeriod) {
    document.querySelectorAll('.quarter-header').forEach(header => {
      if (header.textContent.trim() === currentPeriod) {
        header.style.background = 'linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)';
        header.style.boxShadow = 'inset 0 0 0 1px rgba(185, 28, 28, 0.3)';
        header.insertAdjacentHTML('beforeend', ' <span style="font-size: 0.7rem; opacity: 0.9;">📍 CURRENT</span>');
      }
    });
  }
}

/**
 * Enhance project row interactions
 */
function enhanceProjectRows() {
  document.querySelectorAll('.project-row').forEach(row => {
    row.addEventListener('click', e => {
      if (e.target.closest('.project-link')) {
        return;
      }
      console.log('Project clicked:', row.querySelector('.project-name').textContent);
    });
  });
}

/**
 * Log statistics for debugging
 */
function logStatistics() {
  const stats = {
    categories: document.querySelectorAll('.category-section').length,
    projects: document.querySelectorAll('.project-row').length,
    quarters: document.querySelectorAll('.quarter-header').length,
    completedProjects: document.querySelectorAll('.quarter-cell.completed').length,
    inProgressProjects: document.querySelectorAll('.quarter-cell.in-progress').length,
    plannedProjects: document.querySelectorAll('.quarter-cell.planned').length,
  };

  console.log('📊 Roadmap statistics:', stats);

  // Storage for analytics (if needed)
  window.roadmapStats = stats;
}

/**
 * Utility for smooth scroll to element
 */
function scrollToElement(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

/**
 * Export utility functions
 */
window.roadmapUtils = {
  scrollToElement,
  getCurrentPeriod: () => {
    const today = new Date();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();

    if (currentYear === 2025) {
      if (currentMonth >= 10) return 'Q4-2025';
      if (currentMonth >= 7) return 'Q3-2025';
      if (currentMonth >= 4) return 'Q2-2025';
      return 'Q1-2025';
    } else if (currentYear === 2026) {
      if (currentMonth <= 3) return 'Q1-2026';
      if (currentMonth <= 6) return 'Q2-2026';
      if (currentMonth <= 9) return 'Q3-2026';
      return 'Q4-2026';
    }
    return null;
  },
};`;

/**
 * Embedded HTML templates for default theme
 */
export const EMBEDDED_TEMPLATES: Record<string, string> = {
  main: `<!doctype html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Strategic roadmap for {{title}}" />
        <title>{{title}}</title>
        <link rel="stylesheet" href="./styles.css" />
    </head>
    <body>
        <div class="container">{{header}}{{categories}}{{metrics}}{{legend}}</div>
        <script src="./script.js"></script>
    </body>
</html>`,

  header: `<div class="header">
    <h1>{{title}}</h1>
    <div class="subtitle">{{vision}}</div>
</div>`,

  category: `<div class="category-section">
    <div class="category-header">
        <span class="category-icon">{{icon}}</span>
        <h2 class="category-title">{{name}}</h2>
        <span class="project-count">{{projectCount}} {{projectLabel}}</span>
    </div>
    <div class="category-table-container">
        <table class="projects-table">
            <thead>
                <tr>
                    <th class="project-header">Project</th>
                    {{headerHTML}}
                </tr>
            </thead>
            <tbody>
                {{projectsHTML}}
            </tbody>
        </table>
    </div>
</div>`,

  'project-row': `<tr class="project-row">
    <td class="project-info">
        <div class="project-name">{{nameHTML}}</div>
        <div class="project-meta">{{infoHTML}}</div>
    </td>
    {{quartersHTML}}
</tr>`,

  'quarter-cell': `<td class="quarter-cell {{periodClass}} {{statusClass}}">
    <div class="status-badge {{statusClass}}">{{statusText}}</div>
    <div class="quarter-content">
        <div class="quarter-description">{{description}}</div>
        {{detailsHTML}}
    </div>
</td>`,

  'quarter-cell-empty': `<td class="quarter-cell {{periodClass}} empty">
    <div class="status-badge no-info">No info</div>
</td>`,

  legend: `<div class="legend-section">
    <h3>📌 Legend</h3>
    <div class="legend-grid">
        <div class="legend-item">
            <span class="legend-status completed"></span>
            <span><strong>Completed</strong> - Objectives achieved</span>
        </div>
        <div class="legend-item">
            <span class="legend-status in-progress"></span>
            <span><strong>In Progress</strong> - Active development</span>
        </div>
        <div class="legend-item">
            <span class="legend-status planned"></span>
            <span><strong>Planned</strong> - Approved and scheduled</span>
        </div>
        <div class="legend-item">
            <span class="legend-status on-hold"></span>
            <span><strong>On Hold</strong> - Temporarily suspended</span>
        </div>
    </div>
    <div class="next-quarters-info">{{nextQuartersInfo}}</div>
</div>`,

  metrics: `<div class="metrics-section">
    <h2 class="metrics-title">📊 Metrics & Risk Management</h2>
    <div class="metrics-content">
    <div class="kpis-list">
      <h3>KPIs & Metrics</h3>
      {{kpisSection}}
    </div>
    <div class="risks-section">
      <h3>Risks & Mitigations</h3>
      {{risksSection}}
    </div></div>
</div>`,
};

/**
 * Interface for embedded assets
 */
export interface EmbeddedAssets {
  css: string;
  js: string;
  templates: Record<string, string>;
}

/**
 * Gets embedded assets for the default theme
 */
export function getEmbeddedAssets(): EmbeddedAssets {
  return {
    css: DEFAULT_CSS,
    js: DEFAULT_JS,
    templates: EMBEDDED_TEMPLATES,
  };
}

/**
 * Loads external assets from theme directory or returns embedded assets
 */
export function loadThemeAssets(themeDir: string): EmbeddedAssets {
  if (themeDir === '<embedded>') {
    return getEmbeddedAssets();
  }
  return loadExternalThemeAssets(themeDir);
}

/**
 * Load external theme assets with validation
 */
function loadExternalThemeAssets(themeDir: string): EmbeddedAssets {
  const css = loadAssetFile(join(themeDir, 'assets', 'styles.css'), 'CSS');
  const js = loadAssetFile(join(themeDir, 'assets', 'script.js'), 'JS');
  const templates = loadTemplateFiles(themeDir);

  return { css, js, templates };
}

/**
 * Load asset file with validation
 */
function loadAssetFile(filePath: string, type: string): string {
  if (!existsSync(filePath)) {
    throw new Error(`Theme ${type} not found: ${filePath}`);
  }
  return readFileSync(filePath, 'utf8');
}

/**
 * Load template files with embedded fallbacks
 */
function loadTemplateFiles(themeDir: string): Record<string, string> {
  const templates = { ...EMBEDDED_TEMPLATES };
  const templateFiles = [
    'main',
    'header',
    'category',
    'project-row',
    'quarter-cell',
    'quarter-cell-empty',
    'legend',
    'metrics',
  ];

  for (const templateFile of templateFiles) {
    const templatePath = join(themeDir, `${templateFile}.html`);
    if (existsSync(templatePath)) {
      templates[templateFile] = readFileSync(templatePath, 'utf8');
    }
  }

  return templates;
}

/**
 * Gets a template by name with embedded fallback
 */
export function getTemplate(templateName: string, themeDir?: string): string {
  if (themeDir && themeDir !== '<embedded>') {
    try {
      const assets = loadThemeAssets(themeDir);
      return assets.templates[templateName] || EMBEDDED_TEMPLATES[templateName] || '';
    } catch {
      // Fallback to embedded if external theme fails
      return EMBEDDED_TEMPLATES[templateName] || '';
    }
  }

  return EMBEDDED_TEMPLATES[templateName] || '';
}
