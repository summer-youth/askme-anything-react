/**
 * Answer entity: represents an AI-generated reply.
 */

export function createAnswer({
  id = crypto.randomUUID?.() || String(Date.now()),
  text,
  promptText,
  provider = 'gemini',
  model = 'gemini-1.5-flash',
  meta = {},
}) {
  if (!text || !text.trim()) {
    throw new Error('Answer text is required');
  }
  return {
    id,
    text: text.trim(),
    promptText: promptText || '',
    provider,
    model,
    meta,
    createdAt: new Date().toISOString(),
  };
}

export function isAnswer(value) {
  return (
    value != null &&
    typeof value === 'object' &&
    typeof value.id === 'string' &&
    typeof value.text === 'string'
  );
}


