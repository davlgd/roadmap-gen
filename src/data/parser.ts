/**
 * YAML parser and data validation for roadmap generation
 */

import yaml from 'js-yaml';
import type { RoadmapData, ProjectStatus, QuarterData } from '../core/types.ts';
import { STATUS_MAP, VALIDATION_RULES } from '../core/config.ts';

/**
 * Parses YAML content and returns structured roadmap data
 *
 * @param yamlContent - Raw YAML content as string
 * @returns Parsed roadmap data
 * @throws Error if YAML parsing fails
 */
export function parseYAML(yamlContent: string): RoadmapData | undefined {
  try {
    const data = yaml.load(yamlContent);

    // Handle empty YAML
    if (!data) {
      return undefined;
    }

    // Basic type validation
    if (typeof data !== 'object') {
      throw new Error('YAML must contain an object');
    }

    return data as RoadmapData;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown parsing error';
    throw new Error(`YAML parsing failed: ${message}`);
  }
}

/**
 * Validates roadmap data structure and content
 *
 * @param roadmap - Roadmap data to validate
 * @throws Error if validation fails
 */
export function validateRoadmap(roadmap: RoadmapData): void {
  validateBasicStructure(roadmap);
  validateCategories(roadmap.categories);
  validateQuarters(roadmap.quarters);
}

/**
 * Validates basic roadmap structure
 */
function validateBasicStructure(roadmap: RoadmapData): void {
  if (!roadmap.title || roadmap.title.length < VALIDATION_RULES.MIN_TITLE_LENGTH) {
    throw new Error(`Title must be at least ${VALIDATION_RULES.MIN_TITLE_LENGTH} characters long`);
  }

  if (!roadmap.vision || roadmap.vision.length < VALIDATION_RULES.MIN_VISION_LENGTH) {
    throw new Error(`Vision must be at least ${VALIDATION_RULES.MIN_VISION_LENGTH} characters long`);
  }

  if (!Array.isArray(roadmap.quarters)) {
    throw new Error('Quarters must be an array');
  }

  if (!Array.isArray(roadmap.categories)) {
    throw new Error('Categories must be an array');
  }
}

/**
 * Validates quarters configuration
 */
function validateQuarters(quarters: string[]): void {
  if (quarters.length < VALIDATION_RULES.MIN_QUARTERS) {
    throw new Error(`At least ${VALIDATION_RULES.MIN_QUARTERS} quarter required`);
  }

  if (quarters.length > VALIDATION_RULES.MAX_QUARTERS) {
    throw new Error(`Maximum ${VALIDATION_RULES.MAX_QUARTERS} quarters allowed`);
  }

  const quarterPattern = /^Q[1-4]-20\d{2}$/;
  for (const quarter of quarters) {
    if (!quarterPattern.test(quarter)) {
      throw new Error(`Invalid quarter format: ${quarter}. Expected format: Q1-2025`);
    }
  }
}

/**
 * Validates categories and their projects
 */
function validateCategories(categories: RoadmapData['categories']): void {
  if (categories.length < VALIDATION_RULES.MIN_CATEGORIES) {
    throw new Error(`At least ${VALIDATION_RULES.MIN_CATEGORIES} category required`);
  }

  if (categories.length > VALIDATION_RULES.MAX_CATEGORIES) {
    throw new Error(`Maximum ${VALIDATION_RULES.MAX_CATEGORIES} categories allowed`);
  }

  for (const category of categories) {
    validateCategory(category);
  }
}

/**
 * Validates a single category
 */
function validateCategory(category: RoadmapData['categories'][0]): void {
  if (!category.name) {
    throw new Error('Category name is required');
  }

  if (!category.projects || !Array.isArray(category.projects)) {
    throw new Error(`Category "${category.name}" must have projects array`);
  }

  for (const project of category.projects) {
    validateProject(project, category.name);
  }
}

/**
 * Validates a single project
 */
function validateProject(project: RoadmapData['categories'][0]['projects'][0], categoryName: string): void {
  if (!project.name) {
    throw new Error(`Project in category "${categoryName}" is missing name`);
  }

  const nameLength = project.name.length;
  const minLength = VALIDATION_RULES.MIN_PROJECT_NAME_LENGTH;
  const maxLength = VALIDATION_RULES.MAX_PROJECT_NAME_LENGTH;
  if (nameLength < minLength || nameLength > maxLength) {
    throw new Error(`Project name "${project.name}" must be between ${minLength} and ${maxLength} characters`);
  }

  if (project.quarters) {
    validateProjectQuarters(project.quarters, project.name);
  }
}

/**
 * Validates project quarters data
 */
function validateProjectQuarters(quarters: Record<string, QuarterData>, projectName: string): void {
  for (const [quarter, data] of Object.entries(quarters)) {
    if (data.status && !isValidStatus(data.status)) {
      throw new Error(
        `Invalid status "${data.status}" for project "${projectName}" in ${quarter}. ` +
          'Must be one of: completed, in-progress, planned, on-hold'
      );
    }

    if (data.progress && !isValidProgress(data.progress)) {
      throw new Error(
        `Invalid progress format "${data.progress}" for project "${projectName}" in ${quarter}. ` +
          'Progress must be non-empty. Examples: "75%", "3/5", "Phase 2", "MVP complete"'
      );
    }
  }
}

/**
 * Checks if a status is valid
 */
function isValidStatus(status: string): status is ProjectStatus {
  return status in STATUS_MAP;
}

/**
 * Validates progress format
 * Accepts various formats: "50%", "3/5", "Phase 2", "MVP complete", etc.
 */
function isValidProgress(progress: string): boolean {
  // Progress must be non-empty string
  if (!progress || progress.trim().length === 0) return false;

  // If it's a percentage, validate the range
  const percentMatch = progress.match(/^(\d{1,3})%$/);
  if (percentMatch) {
    const value = parseInt(percentMatch[1], 10);
    const MAX_PROGRESS = 100;
    return value >= 0 && value <= MAX_PROGRESS;
  }

  // Otherwise accept any non-empty string (like "3/5 tasks", "Phase 2", etc.)
  return true;
}
