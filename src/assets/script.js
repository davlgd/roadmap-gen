// Roadmap Interactive Features

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

  currentPeriod = `${quarter}-${currentYear}`;

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
    // Click handler (for future expansion)
    row.addEventListener('click', e => {
      if (e.target.classList.contains('issue-link')) {
        return; // Let links work normally
      }

      // Future: modal with project details
      console.log('Project clicked:', row.querySelector('.project-name').textContent);
    });

    // Enhanced hover effects
    row.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-1px)';
      this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
    });

    row.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
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
};
