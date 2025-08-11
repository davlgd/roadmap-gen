// Shared Roadmap Interactive Features
// Common JavaScript for all themes

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
 * Highlight current quarter with theme-specific styling
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

  currentPeriod = `${quarter}-${currentYear}`;

  if (currentPeriod) {
    document.querySelectorAll('.quarter-header').forEach(header => {
      if (header.textContent.trim() === currentPeriod) {
        // Check if light theme is active
        const isLightTheme = getComputedStyle(document.body).backgroundColor === 'rgb(255, 255, 255)';

        if (isLightTheme) {
          // Light theme styling
          header.style.background = 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)';
          header.style.color = '#ffffff';
          header.style.fontWeight = '700';
          header.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.3)';
          header.style.boxShadow = 'inset 0 0 0 1px rgba(239, 68, 68, 0.3)';
          header.insertAdjacentHTML(
            'beforeend',
            ' <span style="font-size: 0.7rem; opacity: 1; color: #fff; ' +
              'font-weight: 600; text-shadow: 0 1px 2px rgba(0, 0, 0, 0.4);">📍 CURRENT</span>'
          );
        } else {
          // Dark theme styling (default)
          header.style.background = 'linear-gradient(135deg, #991b1b 0%, #b91c1c 100%)';
          header.style.boxShadow = 'inset 0 0 0 1px rgba(185, 28, 28, 0.3)';
          header.insertAdjacentHTML('beforeend', ' <span style="font-size: 0.7rem; opacity: 0.9;">📍 CURRENT</span>');
        }
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
 * Get current period dynamically (no hardcoded years)
 */
function getCurrentPeriod() {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();

  let quarter = '';
  if (currentMonth >= 10) quarter = 'Q4';
  else if (currentMonth >= 7) quarter = 'Q3';
  else if (currentMonth >= 4) quarter = 'Q2';
  else quarter = 'Q1';

  return `${quarter}-${currentYear}`;
}

/**
 * Export utility functions
 */
window.roadmapUtils = {
  scrollToElement,
  getCurrentPeriod,
};
