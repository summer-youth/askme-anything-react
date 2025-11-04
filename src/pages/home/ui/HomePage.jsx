import React, { useCallback, useEffect, useState } from 'react';
import { Button } from '@ui/Button.jsx';
import { QuestionForm } from '@features/question/ui/QuestionForm.jsx';
import { AnswerPanel } from '@features/answer/ui/AnswerPanel.jsx';
import { createQuestion } from '@entities/question/model.js';
import { createAnswer } from '@entities/answer/model.js';

export function HomePage() {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // TEMP: 환경변수 주입 확인용 (확인 후 제거하세요)
  console.log('VITE_GEMINI_API_KEY:', import.meta.env.VITE_GEMINI_API_KEY);

  // TEMP: 접근 가능한 모델 목록 일부 로그 (개발 환경에서만)
  if (import.meta.env.DEV) {
    import('@shared/api/gemini.js')
      .then(({ listModels }) => listModels().then((m) => {
        const ids = Array.isArray(m.models) ? m.models.map((x) => x.name).slice(0, 10) : m;
      }))
      .catch(() => {});
  }

  // 최근 세션 자동 복구: 마지막 질문/결과를 로드
  useEffect(() => {
    try {
      const raw = localStorage.getItem('mv:lastSession');
      if (!raw) return;
      const data = JSON.parse(raw);
      if (typeof data?.prompt === 'string') setPrompt(data.prompt);
      if (typeof data?.result === 'string') setResult(data.result);
    } catch {}
  }, []);

  // 최근 세션 자동 저장: 질문/결과 변경 시 로컬스토리지에 저장
  useEffect(() => {
    try {
      const payload = JSON.stringify({ prompt, result, ts: Date.now() });
      localStorage.setItem('mv:lastSession', payload);
    } catch {}
  }, [prompt, result]);

  const clearHistory = useCallback(() => {
    try { localStorage.removeItem('mv:lastSession'); } catch {}
    setPrompt('');
    setResult('');
    setError(null);
  }, []);

  const handleAsk = useCallback(async () => {
    if (!prompt.trim()) return;
    setIsLoading(true);
    setError(null);
    setResult('');
    try {
      const question = createQuestion({ text: prompt });
      const { generateContent } = await import('@shared/api/gemini.js');
      const answerText = await generateContent(question.text);
      const answer = createAnswer({ text: answerText, promptText: question.text });
      setResult(answer.text);
    } catch (e) {
      setError(e?.message || '문제가 발생했어요. 잠시 후 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  const handleAnother = useCallback(async () => {
    await handleAsk();
  }, [handleAsk]);

  return (
    <div className="container">
      <header className="header">
        <h1>물어봐이브</h1>
        <p className="subtitle">무엇이든 물어보면 AI가 재치 있게 답해드려요</p>
      </header>

      <QuestionForm
        value={prompt}
        onChange={setPrompt}
        onSubmit={handleAsk}
        isLoading={isLoading}
      />

      <AnswerPanel
        result={result}
        isLoading={isLoading}
        error={error}
        onAnother={handleAnother}
      />

      <div className="actions" style={{ justifyContent: 'flex-start' }}>
        <Button variant="secondary" onClick={clearHistory} disabled={isLoading}>기록 지우기</Button>
      </div>

      <footer className="footer">Made with ❤️, React + Vite + Gemini</footer>
    </div>
  );
}


