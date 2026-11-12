export function validateImageUrl(url: string): string {
  if (!url) return '';

  try {
    const parsedUrl = new URL(url);

    if (!['https:', 'http:'].includes(parsedUrl.protocol)) {
      return '';
    }

    return parsedUrl.href;
  } catch {
    return '';
  }
}