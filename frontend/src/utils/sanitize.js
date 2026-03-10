// frontend/src/utils/sanitize.js

import DOMPurify from "dompurify";

/**
 * Sanitize Utility Functions for XSS Protection
 *
 * Uses DOMPurify to sanitize user-generated content before rendering.
 * Prevents XSS attacks by removing malicious scripts and dangerous HTML.
 */

/**
 * Default DOMPurify configuration
 * - Allows safe HTML tags for formatting
 * - Removes scripts, iframes, and other dangerous elements
 * - Preserves links with safe protocols (http, https, mailto)
 */
const defaultConfig = {
  ALLOWED_TAGS: [
    "b",
    "i",
    "em",
    "strong",
    "a",
    "p",
    "br",
    "ul",
    "ol",
    "li",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "blockquote",
    "code",
    "pre",
  ],
  ALLOWED_ATTR: ["href", "title", "target", "rel"],
  ALLOWED_URI_REGEXP:
    /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.-]+(?:[^a-z+.-:]|$))/i,
  KEEP_CONTENT: true,
  RETURN_TRUSTED_TYPE: false,
};

/**
 * Sanitize HTML content with default configuration
 *
 * @param {string} dirty - Unsanitized HTML string from user input
 * @returns {string} - Sanitized HTML safe for rendering
 *
 * @example
 * const userInput = '<script>alert("XSS")</script>Hello <b>World</b>';
 * const clean = sanitizeHTML(userInput); // Returns: 'Hello <b>World</b>'
 */
export const sanitizeHTML = (dirty) => {
  if (!dirty || typeof dirty !== "string") {
    return "";
  }
  return DOMPurify.sanitize(dirty, defaultConfig);
};

/**
 * Sanitize plain text (strips all HTML)
 * Used for titles, names, and other fields that should never contain HTML
 *
 * @param {string} dirty - Unsanitized text
 * @returns {string} - Plain text with all HTML removed
 *
 * @example
 * const userInput = 'Task <script>alert("XSS")</script>Name';
 * const clean = sanitizeText(userInput); // Returns: 'Task Name'
 */
export const sanitizeText = (dirty) => {
  if (!dirty || typeof dirty !== "string") {
    return "";
  }
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], KEEP_CONTENT: true });
};

/**
 * Sanitize URL to prevent javascript: and data: URI attacks
 *
 * @param {string} url - URL to sanitize
 * @returns {string} - Safe URL or empty string if invalid
 *
 * @example
 * sanitizeURL('javascript:alert("XSS")'); // Returns: ''
 * sanitizeURL('https://example.com'); // Returns: 'https://example.com'
 */
export const sanitizeURL = (url) => {
  if (!url || typeof url !== "string") {
    return "";
  }

  // Remove leading/trailing whitespace
  const trimmed = url.trim();

  // Block dangerous protocols
  const dangerousProtocols = /^(javascript|data|vbscript|file|about):/i;
  if (dangerousProtocols.test(trimmed)) {
    return "";
  }

  // Allow only safe protocols
  const safeProtocols = /^(https?|mailto|tel|sms):/i;
  if (
    !safeProtocols.test(trimmed) &&
    !trimmed.startsWith("/") &&
    !trimmed.startsWith("#")
  ) {
    return "";
  }

  return trimmed;
};

/**
 * Sanitize content with custom configuration
 * For advanced use cases where default config is too restrictive
 *
 * @param {string} dirty - Unsanitized content
 * @param {Object} config - Custom DOMPurify configuration
 * @returns {string} - Sanitized content
 */
export const sanitizeWithConfig = (dirty, config = {}) => {
  if (!dirty || typeof dirty !== "string") {
    return "";
  }
  return DOMPurify.sanitize(dirty, { ...defaultConfig, ...config });
};

/**
 * Sanitize an object's string properties recursively
 * Useful for sanitizing entire objects before storing/rendering
 *
 * @param {Object} obj - Object with potentially unsafe strings
 * @param {Array<string>} fields - Array of field names to sanitize
 * @returns {Object} - Object with sanitized fields
 *
 * @example
 * const task = {
 *   title: 'Task <script>alert("XSS")</script>',
 *   description: 'Description with <b>HTML</b>',
 *   category: 'Work'
 * };
 * const clean = sanitizeObject(task, ['title', 'description']);
 */
export const sanitizeObject = (obj, fields = []) => {
  if (!obj || typeof obj !== "object") {
    return obj;
  }

  const sanitized = { ...obj };

  fields.forEach((field) => {
    if (sanitized[field] && typeof sanitized[field] === "string") {
      sanitized[field] = sanitizeHTML(sanitized[field]);
    }
  });

  return sanitized;
};

/**
 * Hook for sanitizing content in React components
 * Memoizes the sanitization to avoid re-computing on every render
 *
 * @param {string} dirty - Content to sanitize
 * @param {Object} config - Optional DOMPurify config
 * @returns {string} - Sanitized content
 */
export const useSanitizedContent = (dirty, config = defaultConfig) => {
  if (!dirty) return "";
  return DOMPurify.sanitize(dirty, config);
};

export default {
  sanitizeHTML,
  sanitizeText,
  sanitizeURL,
  sanitizeWithConfig,
  sanitizeObject,
  useSanitizedContent,
};
