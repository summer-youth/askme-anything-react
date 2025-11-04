import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Button } from '@ui/Button.jsx';
import { Spinner } from '@ui/Spinner.jsx';

export function AnswerPanel({ result, isLoading, error, onAnother }) {
  const [isHovered, setIsHovered] = useState(false);
  const handleCopy = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(result);
    } catch {}
  };

  return (
    <div className="card">
      {isLoading && (
        <div className="center">
          <Spinner />
          <div className="muted">AI가 답변을 준비 중이에요...</div>
        </div>
      )}
      {!isLoading && error && <div className="error">{error}</div>}
      {!isLoading && !error && result && (
        <div
          className={`result ${isHovered ? 'result-hover' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{result}</ReactMarkdown>
        </div>
      )}

      <div className="actions">
        <Button variant="secondary" onClick={handleCopy} disabled={!result || isLoading}>
          복사하기
        </Button>
        <Button onClick={onAnother} disabled={isLoading}>
          다른 답변 보기
        </Button>
      </div>
    </div>
  );
}


