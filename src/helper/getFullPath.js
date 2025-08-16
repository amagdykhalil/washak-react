// utils/path.js
export function getFullPath(page_slug, href) {
    if (!page_slug && !href) return '#';
    
    return page_slug
      ? `/${page_slug}${href || ''}`
      : `${href || ''}`;
  }
  