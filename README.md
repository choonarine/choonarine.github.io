# choonarine.github.io

Astro.js와 Tailwind CSS로 만든 개인 웹사이트이자 블로그입니다.

GitHub Pages에 정적 페이지로 배포할 용도로 개발되었습니다.

**해당 프로젝트는 Claude Opus 4.5 및 GPT 5.2 등의 생성형 AI를 활용하여 제작했습니다.**

## 프로젝트 요약
- 정적 사이트 생성(SSG) 기반 블로그/포트폴리오
- MDX 콘텐츠, Shiki 빌드 타임 코드 하이라이트
- Fuse.js 검색 인덱스, Giscus 댓글, 이미지/비디오 최적화
- GitHub Actions로 GitHub Pages 자동 배포

## 사용 기술 스택
- Astro.js, Tailwind CSS (`@tailwindcss/typography`)
- MDX + Astro Content Collections
- Shiki 코드 하이라이팅, Fuse.js 검색, Sharp 이미지/비디오 최적화, Giscus 커멘트
- 동적 컴포넌트에 SolidJS 사용
- 배포: GitHub Actions → GitHub Pages

## 세팅 및 실행
```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # 프로덕션 빌드 (prebuild로 검색 인덱스 생성)
pnpm preview  # 빌드 결과 미리보기
```

## MDX 작성법 (예시)
`src/content/posts/`에 MDX 파일 생성:
```mdx
---
title: '제목'
description: '설명'
pubDate: 2024-01-15
tags: ['tag1', 'tag2']
category: '카테고리'
draft: false
---

본문을 MDX로 작성합니다.
```

필수: `title`, `description`, `pubDate`, `tags`, `category`

선택: `updatedDate`, `draft`

# TODO
자세한 사항은 **[TODO 파일](TODO.md)** 참고

→ Github에서 제공하는 Milestone 기능으로 이전 준비 중