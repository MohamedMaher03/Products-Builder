/**
 * Slices the input text to a specified maximum length.
 * @param {string} text - The input text to be sliced.
 * @param {number} maxLength - The maximum length of the sliced text.
 * @returns {string} - The sliced text with "..." appended if it exceeds maxLength.
 */
export function txtSlicer(text: string, maxLength: number = 50): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
