export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}