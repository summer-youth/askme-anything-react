import React from 'react';
import { Textarea } from '@ui/Textarea.jsx';
import { Button } from '@ui/Button.jsx';

export function QuestionForm({ value, onChange, onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading || !value.trim()) return;
    onSubmit();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) {
      e.preventDefault();
      if (!isLoading && value.trim()) onSubmit();
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <Textarea
        placeholder="예: 오늘 점심 메뉴로 마라탕 vs 돈까스 중에 골라줘"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={6}
        disabled={isLoading}
      />
      <div className="actions">
        <Button type="submit" disabled={isLoading || !value.trim()}>
          {isLoading ? '물어보는 중...' : '물어보기!'}
        </Button>
      </div>
    </form>
  );
}


