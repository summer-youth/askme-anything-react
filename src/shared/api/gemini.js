const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
import { AI_MODEL } from '@shared/config/ai.js';
import { SYSTEM_PROMPT, buildUserPrompt } from '@shared/config/prompt.js';

const CANDIDATE_MODELS = [
  AI_MODEL,
  'gemini-1.5-flash-latest',
  'gemini-2.0-flash',
  'gemini-1.5-pro-latest',
  'gemini-2.0-pro-latest',
];

export async function generateContent(prompt) {
  if (!API_KEY) {
    throw new Error('API 키가 설정되지 않았어요. VITE_GEMINI_API_KEY를 확인해주세요.');
  }
  const body = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: SYSTEM_PROMPT },
          { text: buildUserPrompt(prompt) },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.9,
      topP: 0.95,
      maxOutputTokens: 300,
    },
  };
  let lastErrorText = '';
  for (const model of CANDIDATE_MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1/models/${model}:generateContent?key=${API_KEY}`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join('\n');
      if (!text) {
        throw new Error('응답을 이해할 수 없어요.');
      }
      return text.trim();
    }
    const t = await res.text();
    lastErrorText = t;
    // 404면 다음 모델로 시도
    if (res.status !== 404) {
      throw new Error(`Gemini 요청 실패 (${res.status}): ${t}`);
    }
  }
  throw new Error(`Gemini 모델 탐색 실패 (404). 마지막 응답: ${lastErrorText}`);
}

// 디버깅용: 사용 가능한 모델 목록 조회
export async function listModels() {
  if (!API_KEY) {
    throw new Error('API 키가 설정되지 않았어요.');
  }
  const url = `https://generativelanguage.googleapis.com/v1/models?key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`ListModels 실패 (${res.status}): ${t}`);
  }
  const data = await res.json();
  return data;
}


