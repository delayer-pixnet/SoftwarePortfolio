/** 只允許沒有帳密資訊的 HTTPS 外部網址。 */
export function getSafeHttpsUrl(value?: string): string | undefined {
  if (!value?.trim()) return undefined;

  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:' || url.username || url.password || !url.hostname) return undefined;
    return url.href;
  } catch {
    return undefined;
  }
}

/** 將作品公開圖片路徑加上 Vite base；HTTPS 外部圖片維持原網址。 */
export function resolveProjectImageUrl(source: string, baseUrl: string): string | undefined {
  const externalUrl = getSafeHttpsUrl(source);
  if (externalUrl) return externalUrl;

  const path = source.trim().replace(/^\/+/, '');
  const segments = path.split('/');
  if (!path.startsWith('images/projects/') || segments.some((segment) => !segment || segment === '.' || segment === '..')) {
    return undefined;
  }

  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  return `${normalizedBase}${path}`;
}
