import projectData from '../data/projects.json';
import type { IProjectService, ProjectQuery } from './IProjectService';
import type { PortfolioProject } from '../types/project';

const projects = projectData as PortfolioProject[];

/** 集中提供作品查詢、搜尋、分類及排序功能。 */
export class ProjectService implements IProjectService {
  /** 依分類與關鍵字篩選作品，並套用指定排序。 */
  getAll(query: ProjectQuery = {}): PortfolioProject[] {
    const keyword = query.keyword?.trim().toLocaleLowerCase('zh-Hant-TW') ?? '';
    const filtered = projects.filter((project) => {
      const matchesCategory = !query.category || query.category === '全部' || project.category === query.category;
      const searchable = [project.name, project.summary, project.category, ...project.technologies].join(' ').toLocaleLowerCase('zh-Hant-TW');
      return matchesCategory && (!keyword || searchable.includes(keyword));
    });

    return filtered.sort((left, right) => {
      if (query.sort === 'name-asc') return left.name.localeCompare(right.name, 'zh-Hant-TW');
      return (right.updatedAt ?? '').localeCompare(left.updatedAt ?? '') || left.name.localeCompare(right.name, 'zh-Hant-TW');
    });
  }

  /** 取得精選作品。 */
  getFeatured(): PortfolioProject[] {
    return projects.filter((project) => project.featured);
  }

  /** 取得最近更新的作品；尚未填寫日期的作品排在後方。 */
  getRecent(limit = 3): PortfolioProject[] {
    return [...projects]
      .sort((left, right) => (right.updatedAt ?? '').localeCompare(left.updatedAt ?? ''))
      .slice(0, Math.max(0, limit));
  }

  /** 依網址代稱尋找作品；找不到時回傳 undefined。 */
  getBySlug(slug: string): PortfolioProject | undefined {
    return projects.find((project) => project.slug === slug);
  }
}

export const projectService = new ProjectService();
