import React from "react";

/**
 * Enhances ASCII diagrams in markdown content by adding special styling
 * @param {React.ReactElement} content - The React element from rendered markdown
 * @returns {React.ReactElement} - Enhanced React element with styled diagrams
 */
export function enhanceMarkdownContent(content) {
  // For now, just return the content as is
  // We'll implement client-side enhancement using CSS only
  return content;
}

/**
 * Enhances tables in markdown content
 * @param {string} content - The HTML content from rendered markdown
 * @returns {string} - Enhanced HTML content with styled tables
 */
export function enhanceTables(content) {
  if (!content) return content;

  // Add responsive wrapper around tables
  const tableRegex = /(<table[^>]*>[\s\S]*?<\/table>)/g;

  return content.replace(tableRegex, (match) => {
    return `<div class="overflow-x-auto">${match}</div>`;
  });
}
