import { describe, expect, it } from 'vitest';
import { projectService } from './ProjectService';

describe('ProjectService', () => {
  it('依分類與不分大小寫的技術關鍵字篩選作品', () => {
    expect(projectService.getAll({ category: 'WinForms' })).toHaveLength(4);
    expect(projectService.getAll({ keyword: 'typescript' })).toHaveLength(0);
    expect(projectService.getAll({ keyword: 'sql server' }).map((project) => project.slug)).toEqual([
      'db-initializer-tool',
      'ap-performance-diagnostic-tool',
    ]);
  });

  it('未填更新日期時仍提供穩定排序，並可依名稱排序', () => {
    const firstSort = projectService.getAll({ sort: 'updated-desc' }).map((project) => project.slug);
    const secondSort = projectService.getAll({ sort: 'updated-desc' }).map((project) => project.slug);
    expect(firstSort).toEqual(secondSort);
    expect(firstSort[0]).toBe('db-initializer-tool');
    expect(projectService.getAll({ sort: 'name-asc' })[0].name).toBe('資料庫初始化工具');
  });

  it('精選、最新及無效代稱查詢皆能回傳有效結果', () => {
    expect(projectService.getFeatured().length).toBe(3);
    expect(projectService.getRecent(2)).toHaveLength(2);
    expect(projectService.getBySlug('missing-project')).toBeUndefined();
    expect(projectService.getAll({ keyword: 'no-match' })).toEqual([]);
  });
});
