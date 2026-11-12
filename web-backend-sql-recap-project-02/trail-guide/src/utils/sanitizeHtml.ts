
import sanitizeHtml from 'sanitize-html';

export function sanitizeDescription(description: string): string {
  return sanitizeHtml(description, {
    allowedTags: [
      'p',
      'strong',
      'em',
      'ul',
      'ol',
      'li',
      'a',
    ],

    allowedAttributes: {
      a: ['href', 'title'],
    },

    allowedSchemes: ['http', 'https', 'mailto'],

    disallowedTagsMode: 'discard',
  });
}
