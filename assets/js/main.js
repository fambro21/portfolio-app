(function () {
  const menuButton = document.getElementById("menuButton");
  const menuIcon = document.getElementById("menuIcon");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuButton = document.getElementById("closeMenuButton");
  const heroContent = document.getElementById("heroContent");

  const fpsEl = document.getElementById("fps");
  const scrollYEl = document.getElementById("scrollY");
  const viewportEl = document.getElementById("viewport");

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  const header = document.querySelector("#header");

  let lastFrameTime = performance.now();
  let frameCount = 0;
  let fps = 0;

  let isOpen = false;

  function updateViewport() {
    viewportEl.textContent = `${window.innerWidth}x${window.innerHeight}`;
  }

  function updateScroll() {
    scrollYEl.textContent = `${Math.round(window.scrollY)}px`;
  }

  function updateFPS(currentTime) {
    frameCount++;

    if (currentTime - lastFrameTime >= 1000) {
      fps = frameCount;
      frameCount = 0;
      lastFrameTime = currentTime;
      fpsEl.textContent = fps;
    }

    requestAnimationFrame(updateFPS);
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.dataset.category;

        const shouldShow = filter === "all" || category === filter;

        card.classList.toggle("is-hidden", !shouldShow);
      });
    });
  });

  window.addEventListener("scroll", updateScroll);
  window.addEventListener("resize", updateViewport);

  updateScroll();
  updateViewport();
  requestAnimationFrame(updateFPS);

  function renderMenu() {
    mobileMenu.classList.toggle("open", isOpen);
    heroContent.classList.toggle("hidden", isOpen);

    menuIcon.innerHTML = '<i data-lucide="menu"></i>';
    lucide.createIcons();
  }

  function openMenu() {
    isOpen = true;
    renderMenu();
  }

  function closeMenu() {
    isOpen = false;
    renderMenu();
  }

  menuButton.addEventListener("click", openMenu);
  closeMenuButton.addEventListener("click", closeMenu);

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  renderMenu();
})();
