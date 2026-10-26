import type { PortfolioProject, ProjectCategory } from '../types/project';

export type ProjectSort = 'updated-desc' | 'name-asc';

export interface ProjectQuery {
  category?: ProjectCategory | '全部';
  keyword?: string;
  sort?: ProjectSort;
}

export interface IProjectService {
  getAll(query?: ProjectQuery): PortfolioProject[];
  getFeatured(): PortfolioProject[];
  getRecent(limit?: number): PortfolioProject[];
  getBySlug(slug: string): PortfolioProject | undefined;
}
