import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ProjectActionLinks } from './App';

describe('作品詳細頁外部操作', () => {
  it('只有版本紀錄時顯示版本紀錄，不顯示直接下載', () => {
    const markup = renderToStaticMarkup(
      <ProjectActionLinks links={{ releases: 'https://github.com/example/app/releases' }} />,
    );

    expect(markup).toContain('版本紀錄');
    expect(markup).not.toContain('下載 Windows 版');
  });

  it('提供已核實的下載網址時顯示直接下載，且不使用 download 屬性', () => {
    const markup = renderToStaticMarkup(
      <ProjectActionLinks links={{
        github: 'https://github.com/example/app',
        releases: 'https://github.com/example/app/releases',
        download: 'https://github.com/example/app/releases/download/v1.0.0/app.zip',
      }} />,
    );

    expect(markup).toContain('GitHub 原始碼');
    expect(markup).toContain('版本紀錄');
    expect(markup).toContain('下載 Windows 版');
    expect(markup).toContain('https://github.com/example/app/releases/download/v1.0.0/app.zip');
    expect(markup).not.toMatch(/\sdownload=/i);
  });

  it('不呈現不安全或無效的下載網址', () => {
    const markup = renderToStaticMarkup(
      <ProjectActionLinks links={{ download: 'http://example.com/app.zip' }} />,
    );

    expect(markup).not.toContain('下載 Windows 版');
    expect(markup).not.toContain('http://example.com');
  });
});
