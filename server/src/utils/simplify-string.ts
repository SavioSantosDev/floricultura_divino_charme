/**
 * It generate a simplified string to be used in searches and urls:
 *
 * Lírios => lirios;
 * Maçã => maca;
 * Pé-de-Manga => pe-de-manga
 */
export default function simplifyString(str: string): string {
  return typeof str === 'string'
    ? str
        .replace(/-/g, ' ')
        .trim()
        .replace(/\s{2,}/g, ' ')
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z\s])/g, '')
        .toLowerCase()
        .replace(/\s/g, '-')
    : '';
}
