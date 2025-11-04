import React from 'react';
import { Button } from '@ui/Button.jsx';

export function NotFoundPage() {
  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="container" style={{ textAlign: 'center', paddingTop: '120px' }}>
      <div style={{ fontSize: '120px', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '16px' }}>
        404
      </div>
      <h1 style={{ fontSize: '32px', marginBottom: '12px' }}>페이지를 찾을 수 없어요</h1>
      <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '18px' }}>
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.
      </p>
      <Button onClick={handleGoHome}>홈으로 돌아가기</Button>
    </div>
  );
}

