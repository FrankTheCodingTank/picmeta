/**
 * EXIF date parser and formatter.
 *
 * EXIF stores dates as "YYYY:MM:DD HH:MM:SS" with NO timezone info
 * in the DateTimeOriginal tag itself. The timezone is in a separate
 * OffsetTimeOriginal tag (e.g. "-05:00").
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
 * @param {string} exifDate — "YYYY:MM:DD HH:MM:SS"
 * @param {string} [offsetTime] — e.g. "-05:00"
 * @returns {string}
 */
export function formatDate(exifDate, offsetTime) {
  const parsed = parseExifDate(exifDate);
  if (!parsed) return 'Invalid date';
  const { year, month, day, hour, minute, second } = parsed;

  const pad = (n) => String(n).padStart(2, '0');
  const formatted = `${year}-${pad(month)}-${pad(day)} ${pad(hour)}:${pad(minute)}:${pad(second)}`;
  return isValidOffset(offsetTime) ? `${formatted} ${offsetTime}` : formatted;
}

function isValidOffset(offsetTime) {
  return typeof offsetTime === 'string' && /^[+-]\d{2}:\d{2}$/.test(offsetTime);
}
