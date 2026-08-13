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

/* 제품 소개 모달: 연구 분야별 제품 목록을 열고 닫습니다. */
const productDialog = document.querySelector("[data-product-dialog]");

if (productDialog) {
  const productSets = productDialog.querySelectorAll("[data-product-set]");
  const productTitle = productDialog.querySelector("[data-product-modal-title]");
  const productEyebrow = productDialog.querySelector("[data-product-modal-eyebrow]");
  const productCount = productDialog.querySelector("[data-product-modal-count]");
  const productFocus = productDialog.querySelector("[data-product-modal-focus]");
  const productBody = productDialog.querySelector(".product-modal__body");
  const closeButton = productDialog.querySelector("[data-product-close]");
  const productAreas = {
    "hyun-woo": {
      title: "Cryptocurrency & Cyber Threat Intelligence",
      theme: "crypto",
      eyebrow: "DIGITAL ASSET INTELLIGENCE / PRODUCT SUITE",
      focus: "BLOCKCHAIN / CTI",
    },
    "ji-young": {
      title: "AI Agent–Based Social Media Simulation",
      theme: "agents",
      eyebrow: "MULTI-AGENT SYSTEMS / PRODUCT SUITE",
      focus: "AGENTS / SOCIAL",
    },
  };
  let productOpener;

  /* 영상과 설명의 시각·탐색 순서를 일치시킵니다. */
  productDialog.querySelectorAll(".product-item").forEach((productItem) => {
    const productVideo = productItem.querySelector(".product-video");
    if (productVideo) productItem.prepend(productVideo);
  });

  const pauseVideos = () => {
    productDialog.querySelectorAll("video").forEach((video) => {
      video.pause();
    });
  };

  document.querySelectorAll("[data-product-modal]").forEach((button) => {
    button.addEventListener("click", () => {
      const areaKey = button.dataset.productModal;
      const productArea = productAreas[areaKey];
      let activeSet;

      productSets.forEach((productSet) => {
        productSet.hidden = productSet.dataset.productSet !== areaKey;
        if (!productSet.hidden) activeSet = productSet;
      });

      pauseVideos();
      productDialog.dataset.theme = productArea?.theme || "crypto";
      productTitle.textContent = productArea?.title || "Products";
      productEyebrow.textContent = productArea?.eyebrow || "PRODUCTS / OVERVIEW";
      productFocus.textContent = productArea?.focus || "RESEARCH SYSTEM";
      productCount.textContent = `${String(activeSet?.querySelectorAll(".product-category").length || 0).padStart(2, "0")} PRODUCTS`;
      productBody.scrollTop = 0;
      productOpener = button;
      document.body.classList.add("product-modal-open");
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

  productDialog.addEventListener("close", () => {
    document.body.classList.remove("product-modal-open");
    pauseVideos();
    productOpener?.focus();
  });

  productDialog.querySelectorAll(".product-category").forEach((category) => {
    category.addEventListener("toggle", () => {
      if (!category.open) {
        category.querySelectorAll("video").forEach((video) => video.pause());
      }
    });
  });

  productDialog.querySelectorAll("video").forEach((video) => {
    video.addEventListener("play", () => {
      productDialog.querySelectorAll("video").forEach((otherVideo) => {
        if (otherVideo !== video) otherVideo.pause();
      });
    });
  });

}

/* 연구 분야 배경: 마우스 위치를 따라 그래픽 레이어가 부드럽게 이동합니다. */
const researchVisualCards = document.querySelectorAll("[data-research-visual]");
const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const clamp = (value, minimum, maximum) =>
  Math.min(maximum, Math.max(minimum, value));

researchVisualCards.forEach((card) => {
  const state = {
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  };
  let frameId = 0;
  let cardBounds;

  const motionIsEnabled = () => finePointer.matches && !reducedMotion.matches;

  const renderMotion = () => {
    if (!motionIsEnabled()) {
      frameId = 0;
      return;
    }

    state.x += (state.targetX - state.x) * 0.095;
    state.y += (state.targetY - state.y) * 0.095;

    card.style.setProperty("--far-x", `${state.x * -6}px`);
    card.style.setProperty("--far-y", `${state.y * -5}px`);
    card.style.setProperty("--mid-x", `${state.x * 11}px`);
    card.style.setProperty("--mid-y", `${state.y * 9}px`);
    card.style.setProperty("--near-x", `${state.x * 20}px`);
    card.style.setProperty("--near-y", `${state.y * 15}px`);

    const stillMoving =
      Math.abs(state.targetX - state.x) > 0.002 ||
      Math.abs(state.targetY - state.y) > 0.002;

    frameId = stillMoving ? requestAnimationFrame(renderMotion) : 0;
  };

  const scheduleMotion = () => {
    if (!frameId && motionIsEnabled()) {
      frameId = requestAnimationFrame(renderMotion);
    }
  };

  const returnToRest = () => {
    state.targetX = 0;
    state.targetY = 0;
    cardBounds = undefined;
    scheduleMotion();
  };

  const resetMotion = () => {
    if (frameId) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }

    Object.assign(state, {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    });

    ["--far-x", "--far-y", "--mid-x", "--mid-y", "--near-x", "--near-y"].forEach(
      (property) => card.style.removeProperty(property),
    );
  };

  card.addEventListener("pointerenter", () => {
    if (motionIsEnabled()) {
      cardBounds = card.getBoundingClientRect();
    }
  });

  card.addEventListener("pointermove", (event) => {
    if (!motionIsEnabled() || event.pointerType === "touch") return;

    cardBounds ||= card.getBoundingClientRect();
    const pointerX = clamp((event.clientX - cardBounds.left) / cardBounds.width, 0, 1);
    const pointerY = clamp((event.clientY - cardBounds.top) / cardBounds.height, 0, 1);

    state.targetX = pointerX * 2 - 1;
    state.targetY = pointerY * 2 - 1;
    scheduleMotion();
  });

  card.addEventListener("pointerleave", returnToRest);
  window.addEventListener("resize", () => {
    cardBounds = undefined;
  });
  finePointer.addEventListener("change", resetMotion);
  reducedMotion.addEventListener("change", resetMotion);
});

if ("IntersectionObserver" in window) {
  const visualObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visual-paused", !entry.isIntersecting);
      });
    },
    { threshold: 0.01 },
  );

  researchVisualCards.forEach((card) => visualObserver.observe(card));
}

/* Welcome 영역: 이전 미리보기 HTML에도 스크롤 안내 요소를 자동으로 보강합니다. */
const featuredSites = document.querySelector(".featured-sites");
const labIntroSection = document.querySelector(".lab-intro");

if (featuredSites && labIntroSection) {
  labIntroSection.id ||= "lab-intro";
  labIntroSection.setAttribute("data-lab-reveal", "");

  const labIntroImage = labIntroSection.querySelector(".lab-intro__image");
  const labIntroImagePath = labIntroImage?.getAttribute("src")?.split("?")[0];

  if (labIntroImagePath?.endsWith("assets/placeholders/campus.svg")) {
    labIntroImage.src = `${labIntroImagePath}?v=20260813-12`;
  }

  if (!document.querySelector("[data-lab-scroll]")) {
    const labScrollCue = document.createElement("a");
    labScrollCue.className = "featured-scroll-cue";
    labScrollCue.href = "#lab-intro";
    labScrollCue.setAttribute("data-lab-scroll", "");
    labScrollCue.innerHTML = `
      <span class="featured-scroll-cue__label">EXPLORE THE LAB</span>
      <span class="featured-scroll-cue__arrow" aria-hidden="true">
        <svg viewBox="0 0 24 24" focusable="false">
          <path d="M12 4v14M6.5 12.5 12 18l5.5-5.5"></path>
        </svg>
      </span>
    `;
    featuredSites.insertAdjacentElement("afterend", labScrollCue);
  }

  if (!document.querySelector("[data-lab-scroll-float]")) {
    const floatingScrollCue = document.createElement("a");
    floatingScrollCue.className = "featured-scroll-float";
    floatingScrollCue.href = "#lab-intro";
    floatingScrollCue.setAttribute("data-lab-scroll-float", "");
    floatingScrollCue.setAttribute("aria-label", "Explore the lab");
    floatingScrollCue.innerHTML = `
      <span>SCROLL</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d="M12 4v14M6.5 12.5 12 18l5.5-5.5"></path>
      </svg>
    `;
    document.body.append(floatingScrollCue);
  }
}

/* 스크롤 또는 안내 화살표 이동 시 Welcome 영역이 아래에서 위로 나타납니다. */
const labIntro = document.querySelector("[data-lab-reveal]");

if (labIntro) {
  let labRevealObserver;
  const floatingScrollCue = document.querySelector("[data-lab-scroll-float]");

  const revealLabIntro = () => {
    labIntro.classList.add("is-visible");
    floatingScrollCue?.classList.add("is-hidden");
    labRevealObserver?.disconnect();
  };

  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    labIntro.classList.add("is-reveal-ready");
    labRevealObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) revealLabIntro();
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -20% 0px",
      },
    );
    labRevealObserver.observe(labIntro);
  } else {
    revealLabIntro();
  }

  reducedMotion.addEventListener("change", (event) => {
    if (event.matches) revealLabIntro();
  });
}
