# BIM 기반 생태면적률 시스템 — 설문조사 랜딩페이지

서울대학교 환경설계학과 석사과정 이지은의 학위 논문 연구 설문조사 안내 사이트입니다.

---

## 파일 구조

```
설문지/
├── index.html          메인 랜딩페이지
├── thank-you.html      폼 제출 후 완료 페이지
├── style.css           커스텀 CSS (Pretendard 폰트, 컴포넌트)
├── main.js             스크롤 애니메이션, FAQ, 폼 유효성 검사
└── src/assets/
    └── images/
        └── 증명사진.jpg  프로필 사진 (배포 전 profile.jpg로 rename 권장)
```

---

## 배포 전 필수 교체 항목

아래 4가지 값을 코드에서 찾아 교체해야 합니다. `[대괄호]`로 표시된 자리표시자를 검색하세요.

### 1. YouTube 영상 ID

`index.html`의 Video 섹션에서 주석 처리된 iframe 코드를 활성화하고 ID를 입력합니다.

```html
<!-- 현재 placeholder (이 부분을 삭제하고 아래 iframe으로 교체) -->
<div id="video-container"> ... </div>

<!-- 교체할 iframe -->
<iframe
  src="https://www.youtube.com/embed/[여기에_YouTube_ID_입력]?rel=0"
  ...
></iframe>
```

YouTube ID는 영상 URL `https://www.youtube.com/watch?v=XXXXXXXXXXX`에서 `v=` 뒤 11자리입니다.

### 2. Google Forms 설문 URL

`index.html`에서 `[설문 링크]`를 검색하여 실제 URL로 교체합니다. (2곳)  
`thank-you.html`에도 1곳 있습니다.

```html
<a href="[설문 링크]" ...>
```

### 3. Formspree 엔드포인트

1. [formspree.io](https://formspree.io) 가입 후 새 폼 생성
2. 이메일을 `jieun9870@snu.ac.kr`로 설정
3. 생성된 엔드포인트 URL을 복사 (예: `https://formspree.io/f/xabcdefg`)
4. `index.html`에서 `[Formspree URL]`을 교체:

```html
<form action="[Formspree URL]" method="POST">
```

### 4. 프로필 사진 파일명 (권장)

한글 파일명은 일부 환경에서 인코딩 오류가 발생할 수 있습니다.

```
증명사진.jpg  →  profile.jpg  로 rename
```

rename 후 `index.html`의 이미지 경로도 수정:

```html
<img src="src/assets/images/profile.jpg" ...>
```

---

## GitHub Pages 배포 절차

### 1단계: GitHub 저장소 생성

1. GitHub 로그인 → [New repository](https://github.com/new)
2. Repository name: `survey-landing` (또는 원하는 이름)
3. Public으로 설정
4. README 없이 생성 (이미 있으므로)

### 2단계: 로컬에서 Git 초기화 및 푸시

```bash
git init
git add .
git commit -m "초기 커밋: 설문 랜딩페이지"
git branch -M main
git remote add origin https://github.com/[GitHub계정]/[저장소명].git
git push -u origin main
```

### 3단계: GitHub Pages 활성화

1. 저장소 → **Settings** → 좌측 **Pages**
2. Source: `Deploy from a branch`
3. Branch: `main` / `/ (root)` 선택 후 **Save**
4. 약 1~2분 후 `https://[GitHub계정].github.io/[저장소명]/` 접속 확인

### 4단계: HTTPS 확인

Pages 설정에서 **Enforce HTTPS** 옵션이 활성화되어 있는지 확인합니다.  
Formspree 폼은 HTTPS 환경에서만 정상 동작합니다.

---

## 운영 중 수정 방법

파일 수정 후:

```bash
git add [수정된 파일명]
git commit -m "수정 내용 요약"
git push
```

약 30초~1분 후 사이트에 자동 반영됩니다.

---

## 운영 종료 후 처리

1. Formspree 대시보드에서 수집된 이메일 데이터 삭제
2. GitHub 저장소를 Private으로 전환 또는 삭제
3. Google Forms 응답 수집 중단

---

## 문의

이지은 · jieun9870@snu.ac.kr  
서울대학교 환경대학원 환경설계학과
