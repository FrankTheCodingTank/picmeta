/**
 * EXIF date parser and formatter.
 *
 * BUG (#3): formatDate ignores the OffsetTimeOriginal tag (0x9011).
 * EXIF stores dates as "YYYY:MM:DD HH:MM:SS" with NO timezone info
 * in the DateTimeOriginal tag itself. The timezone is in a separate
 * OffsetTimeOriginal tag (e.g. "-05:00"). We currently ignore this
 * and return the date as-is, which means all dates appear to be UTC.
 *
 * Real-world impact: a photo taken at 14:30 in Toronto (UTC-5) shows
 * as 14:30 UTC instead of 14:30 EST. If a consumer converts to local
 * time, they get 09:30 EST — 5 hours off.
 */

/**
 * Parse an EXIF date string to components.
 *
 * EXIF format: "YYYY:MM:DD HH:MM:SS"
 *
 * @param {string} exifDate
 * @returns {{ year, month, day, hour, minute, second }}
 */
export function parseExifDate(exifDate) {
  if (!exifDate || typeof exifDate !== 'string') return null;
  const match = exifDate.match(/^(\d{4}):(\d{2}):(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/);
  if (!match) return null;
  return {
    year: parseInt(match[1], 10),
    month: parseInt(match[2], 10),
    day: parseInt(match[3], 10),
    hour: parseInt(match[4], 10),
    minute: parseInt(match[5], 10),
    second: parseInt(match[6], 10),
  };
}

/**
 * Format an EXIF date for display.
 *
 * BUG: ignores offsetTime parameter even when provided.
 *
 * @param {string} exifDate — "YYYY:MM:DD HH:MM:SS"
 * @param {string} [offsetTime] — e.g. "-05:00" (IGNORED — BUG)
 * @returns {string}
 */
export function formatDate(exifDate, offsetTime) {
  const parsed = parseExifDate(exifDate);
  if (!parsed) return 'Invalid date';
  const { year, month, day, hour, minute, second } = parsed;

  // BUG: offsetTime is accepted but never used
  // Should apply offset to produce correct local time display
  const pad = (n) => String(n).padStart(2, '0');
  return `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
}
