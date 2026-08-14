# CySec Lab 웹사이트

정적 HTML, CSS, JavaScript로 구성된 연구실 소개 페이지입니다. 빌드 과정이나 외부 라이브러리는 필요하지 않습니다.

## 실행

- 가장 간단한 방법: `index.html`을 브라우저로 열기
- 로컬 서버: 프로젝트 폴더에서 `python -m http.server 8080` 실행 후 `http://localhost:8080` 접속

## 파일별 역할

```text
Labweb/
├─ index.html                    # 화면 구조, 연구 분야·제품·연구실 콘텐츠
├─ script.js                    # 제품·연구·교수진 모달, 영상 제어, 패럴랙스, 스크롤 등장 효과
├─ styles.css                   # 이전 Live Preview 호환용 CSS 진입점
├─ styles/
│  ├─ base.css                  # 색상 변수, 기본 리셋, 포커스·모션 접근성
│  ├─ layout.css                # 헤더와 푸터
│  ├─ featured.css              # 상단 연구 분야 카드, SVG 애니메이션, 스크롤 화살표
│  ├─ product-modal.css         # 제품 소개 모달과 영상 카드
│  ├─ research-modal.css        # 특허·논문·프로젝트 연구 실적 모달
│  ├─ people-modal.css          # 교수 사진과 소개용 교수진 모달
│  └─ lab-intro.css             # Welcome 영역과 연구실 링크
└─ assets/
   ├─ Daegu_Univ_Logo.svg       # 파비콘과 Welcome 로고
   ├─ images/                   # 향후 실제 이미지 교체용 폴더
   ├─ placeholders/             # 영상 포스터와 Welcome 배경
   └─ videos/                   # 제품 시연 영상
```

`index.html`은 분리된 CSS 파일을 직접 불러옵니다. `styles.css`는 오래된 Live Preview가 기존 단일 CSS 경로를 요청할 때를 위한 호환 파일이므로 유지합니다.

## 제품 영상

영상 경로와 파일명은 `index.html`의 `<source>` 요소에서 관리합니다. 현재 연결된 영상은 `assets/videos/README.md`에 정리되어 있습니다.
