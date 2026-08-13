
- 가장 간단한 방법: `index.html`을 브라우저로 열기
- 로컬 서버 사용: 이 폴더에서 `python -m http.server 8080` 실행 후 `http://localhost:8080` 접속

## 파일 구성

```text
webpage/
├─ assets/
│  └─ hero-research.png   # AI로 제작한 메인 기술 비주얼
├─ index.html             # 페이지 구조와 모든 콘텐츠
├─ styles/                # 기능별 스타일
│  ├─ base.css            # 변수, 리셋, 전역 접근성
│  ├─ layout.css          # 공통 헤더와 푸터
│  ├─ featured.css        # 상단 연구 분야 카드와 애니메이션
│  ├─ product-modal.css   # 제품 소개 모달
│  ├─ lab-intro.css       # 연구실 소개와 링크
│  └─ subpages.css        # 하위 페이지 공통 스타일
├─ styles.css             # 위 기능별 CSS를 불러오는 진입점
├─ script.js              # 메뉴, 프로젝트 필터, 상세 팝업
└─ README.md
```
