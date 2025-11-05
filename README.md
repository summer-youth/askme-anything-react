## 물어봐이브 (Mureo-Vibe)

https://askme-anything-react.netlify.app/


React (Vite) + Gemini로 만드는 인터랙티브 Q&A 웹 앱.

### 시작하기

1. 환경변수 설정

```
cp .env.example .env   # 파일이 없으면 직접 생성하세요
```

`.env`에 다음을 추가하세요:

```
VITE_GEMINI_API_KEY=YOUR_KEY
```

2. 개발 서버 실행

```
npm run dev
```

### 폴더 구조 (FSD)

```
src/
  app/
  pages/
    home/ui/
  features/
    question/ui/
    answer/ui/
  shared/
    api/
    config/
    ui/
```


