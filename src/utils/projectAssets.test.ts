import { describe, expect, it } from 'vitest';
import { getSafeHttpsUrl, resolveProjectImageUrl } from './projectAssets';

describe('作品外部連結與圖片路徑', () => {
  it('僅接受沒有帳密資訊的 HTTPS 連結', () => {
    expect(getSafeHttpsUrl('https://github.com/example/release')).toBe('https://github.com/example/release');
    expect(getSafeHttpsUrl('http://example.com/file.zip')).toBeUndefined();
    expect(getSafeHttpsUrl('javascript:alert(1)')).toBeUndefined();
    expect(getSafeHttpsUrl('https://user:password@example.com/file.zip')).toBeUndefined();
  });

  it('將本機作品圖片路徑加上 Vite base，並保留外部 HTTPS 圖片', () => {
    expect(resolveProjectImageUrl('/images/projects/window.png', '/SoftwarePortfolio/'))
      .toBe('/SoftwarePortfolio/images/projects/window.png');
    expect(resolveProjectImageUrl('images/projects/window.png', '/'))
      .toBe('/images/projects/window.png');
    expect(resolveProjectImageUrl('https://images.example.com/window.png', '/SoftwarePortfolio/'))
      .toBe('https://images.example.com/window.png');
    expect(resolveProjectImageUrl('/images/projects/../secret.png', '/SoftwarePortfolio/')).toBeUndefined();
  });
});
