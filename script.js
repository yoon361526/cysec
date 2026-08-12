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

/* 제품 소개 모달: 연구자별 제품 목록을 열고 닫습니다. */
const productDialog = document.querySelector("[data-product-dialog]");

if (productDialog) {
  const productSets = productDialog.querySelectorAll("[data-product-set]");
  const productTitle = productDialog.querySelector("[data-product-modal-title]");
  const closeButton = productDialog.querySelector("[data-product-close]");
  const productOwners = {
    "hyun-woo": "Hyun-woo Lee의 제품",
    "ji-young": "Ji-young Lee의 제품",
  };

  const pauseVideos = () => {
    productDialog.querySelectorAll("video").forEach((video) => {
      video.pause();
    });
  };

  document.querySelectorAll("[data-product-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const owner = button.dataset.productModal;

      productSets.forEach((productSet) => {
        productSet.hidden = productSet.dataset.productSet !== owner;
      });

      productTitle.textContent = productOwners[owner] || "제품 소개";
      productDialog.showModal();
    });
  });

  closeButton.addEventListener("click", () => {
    productDialog.close();
  });

  productDialog.addEventListener("click", (event) => {
    if (event.target === productDialog) {
      productDialog.close();
    }
  });

  productDialog.addEventListener("close", pauseVideos);
}
