/**
 * TypeScript definitions for roadmap data structures
 */

export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'on-hold';

export interface StatusInfo {
  class: ProjectStatus;
  color: string;
  text: string;
}

export interface QuarterData {
  status: ProjectStatus;
  description: string;
  details?: string[];
  progress?: string;
  metrics?: string[];
  risks?: string[];
  objectives?: string[];
  dependencies?: string[];
}

export interface Project {
  name: string;
  responsible?: string;
  issue?: string;
  quarters: Record<string, QuarterData>;
}

export interface Category {
  name: string;
  icon: string;
  projects: Project[];
}

export interface Metrics {
  kpis?: string[];
  risks?: string[];
}

export interface RoadmapData {
  title: string;
  vision: string;
  quarters: string[];
  next_quarters?: string[];
  categories: Category[];
  metrics?: Metrics;
}

export interface BuildStats {
  categories: number;
  projects: number;
  quarters: number;
  htmlSize: string;
}
