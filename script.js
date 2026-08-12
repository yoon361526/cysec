/* 공통 연도만 자동으로 갱신합니다. 별도의 라이브러리는 필요하지 않습니다. */
document.querySelectorAll("[data-year]").forEach((element) => {
  element.textContent = String(new Date().getFullYear());
});

/* 이미지 경로가 잘못되어도 깨진 이미지 아이콘 대신 기본 배경을 표시합니다. */
document.querySelectorAll("img").forEach((image) => {
  if (image.complete && image.naturalWidth === 0) {
    image.hidden = true;
  }

  image.addEventListener("error", () => {
    image.hidden = true;
  });
});
