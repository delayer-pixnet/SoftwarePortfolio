export type ProjectCategory = 'WinForms' | 'WPF' | 'Web' | '其他';
export type ProjectStatus = '進行中' | '已完成' | '維護中' | '待補資料';

export interface ProjectLinks {
  github?: string;
  releases?: string;
  demo?: string;
  download?: string;
}

export interface ProjectScreenshot {
  src: string;
  alt: string;
  caption?: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  name: string;
  summary: string;
  category: ProjectCategory;
  technologies: string[];
  version: string | null;
  updatedAt: string | null;
  features: string[];
  screenshots: ProjectScreenshot[];
  status: ProjectStatus;
  featured: boolean;
  links: ProjectLinks;
  architecture?: string;
}
