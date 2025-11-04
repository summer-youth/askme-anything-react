/**
 * Question entity: represents a user's input prompt.
 */

export function createQuestion({ id = crypto.randomUUID?.() || String(Date.now()), text }) {
  if (!text || !text.trim()) {
    throw new Error('Question text is required');
  }
  return {
    id,
    text: text.trim(),
    createdAt: new Date().toISOString(),
  };
}

export function isQuestion(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.text === 'string'
  );
}


