(function () {
  const SELECTORS = {
    menuButton: "#menuButton",
    menuIcon: "#menuIcon",
    mobileMenu: "#mobileMenu",
    closeMenuButton: "#closeMenuButton",
    heroContent: "#heroContent",
    fps: "#fps",
    scrollY: "#scrollY",
    viewport: "#viewport",
    filterButtons: ".filter-btn",
    projectCards: ".projects-grid .project-card",
    header: "#header",
    skillBars: ".fill",
    cards: ".upcomming-project-card",
    availabilityDot: "#availabilityDot",
    availabilityText: "#availabilityText",
    copyrightText: ".footer-copyright span",
    projectsButton: ".projects-btn",
    projectsSection: "#projects",
    contactsButton: ".contact-btn",
    contactSection: "#contact",
    linkedinButton: ".linkedIn-btn",
    indeedButton: ".file-text-btn",
    emailButton: ".mail-btn",
    mobileNavLinks: ".mobile-nav-list a",
  };

  const LINKS = {
    linkedin: "https://www.linkedin.com/in/jonathan-fambro-34a8b1241/",
    indeed:
      "https://resumes.indeed.com/?__cf_chl_f_tk=ur_uA_GCe6FVwLaaNRdyv9EsdyI3.DhQvqJ663OT9h8-1783348974-1.0.1.1-99QUpDl6Q2_LdGBNRqkVpE1WsZNw4PrWGN2rVfRvkXM",
    email: "mailto:fambrojonathan1985@gmail.com",
  };

  const dom = {
    menuButton: document.querySelector(SELECTORS.menuButton),
    menuIcon: document.querySelector(SELECTORS.menuIcon),
    mobileMenu: document.querySelector(SELECTORS.mobileMenu),
    closeMenuButton: document.querySelector(SELECTORS.closeMenuButton),
    heroContent: document.querySelector(SELECTORS.heroContent),
    fps: document.querySelector(SELECTORS.fps),
    scrollY: document.querySelector(SELECTORS.scrollY),
    viewport: document.querySelector(SELECTORS.viewport),
    filterButtons: document.querySelectorAll(SELECTORS.filterButtons),
    projectCards: document.querySelectorAll(SELECTORS.projectCards),
    header: document.querySelector(SELECTORS.header),
    skillBars: document.querySelectorAll(SELECTORS.skillBars),
    cards: document.querySelectorAll(SELECTORS.cards),
    availabilityDot: document.querySelector(SELECTORS.availabilityDot),
    availabilityText: document.querySelector(SELECTORS.availabilityText),
    copyrightText: document.querySelector(SELECTORS.copyrightText),
    projectsButton: document.querySelector(SELECTORS.projectsButton),
    projectsSection: document.querySelector(SELECTORS.projectsSection),
    contactsButton: document.querySelector(SELECTORS.contactsButton),
    contactSection: document.querySelector(SELECTORS.contactSection),
    linkedinButton: document.querySelector(SELECTORS.linkedinButton),
    indeedButton: document.querySelector(SELECTORS.indeedButton),
    emailButton: document.querySelector(SELECTORS.emailButton),
    mobileNavLinks: document.querySelectorAll(SELECTORS.mobileNavLinks),
  };

  const state = {
    isMenuOpen: false,
    lastFrameTime: performance.now(),
    frameCount: 0,
  };

  function renderMenu() {
    dom.mobileMenu.classList.toggle("open", state.isMenuOpen);
    dom.heroContent.classList.toggle("hidden", state.isMenuOpen);

    dom.menuButton.setAttribute("aria-expanded", String(state.isMenuOpen));
    dom.mobileMenu.setAttribute("aria-hidden", String(!state.isMenuOpen));

    dom.menuIcon.innerHTML = '<i data-lucide="menu" aria-hidden="true"></i>';
    lucide.createIcons();
  }

  function openMenu() {
    state.isMenuOpen = true;
    renderMenu();
  }

  function closeMenu() {
    state.isMenuOpen = false;
    renderMenu();
  }

  function updateViewport() {
    dom.viewport.textContent = `${window.innerWidth}x${window.innerHeight}`;
  }

  function updateScroll() {
    const scrollY = Math.round(window.scrollY);

    dom.scrollY.textContent = `${scrollY}px`;
    dom.header.classList.toggle("scrolled", scrollY > 0);
  }

  function updateFPS(currentTime) {
    state.frameCount++;

    if (currentTime - state.lastFrameTime >= 1000) {
      dom.fps.textContent = state.frameCount;
      state.frameCount = 0;
      state.lastFrameTime = currentTime;
    }

    requestAnimationFrame(updateFPS);
  }

  function filterProjects(activeButton) {
    const filter = activeButton.dataset.filter;

    dom.filterButtons.forEach((button) => {
      const isActive = button === activeButton;

      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });

    dom.projectCards.forEach((card) => {
      const shouldShow = filter === "all" || card.dataset.category === filter;

      card.classList.toggle("is-hidden", !shouldShow);
    });
  }

  function animateSkillBars() {
    requestAnimationFrame(() => {
      dom.skillBars.forEach((bar) => {
        bar.style.width = `${bar.dataset.width}%`;
      });
    });
  }

  function setAvailability(isAvailable) {
    dom.availabilityText.textContent = isAvailable
      ? "CURRENTLY AVAILABLE FOR OPPORTUNITIES"
      : "CURRENTLY UNAVAILABLE";

    dom.availabilityDot.classList.toggle("unavailable", !isAvailable);
  }

  function scrollToSection(section) {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function openExternalLink(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }

  function bindEvents() {
    dom.menuButton.addEventListener("click", openMenu);
    dom.closeMenuButton.addEventListener("click", closeMenu);

    dom.mobileNavLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    dom.filterButtons.forEach((button) => {
      button.addEventListener("click", () => filterProjects(button));
    });

    window.addEventListener("scroll", updateScroll, { passive: true });

    window.addEventListener("resize", () => {
      updateViewport();

      if (window.innerWidth >= 768) {
        closeMenu();
      }
    });

    dom.projectsButton.addEventListener("click", () => {
      scrollToSection(dom.projectsSection);
    });

    dom.contactsButton.addEventListener("click", () => {
      scrollToSection(dom.contactSection);
    });

    dom.linkedinButton.addEventListener("click", () => {
      openExternalLink(LINKS.linkedin);
    });

    dom.indeedButton.addEventListener("click", () => {
      openExternalLink(LINKS.indeed);
    });

    dom.emailButton.addEventListener("click", () => {
      window.location.href = LINKS.email;
    });
  }

  function init() {
    dom.copyrightText.textContent = `© ${new Date().getFullYear()} — JONATHAN FAMBRO`;

    bindEvents();
    updateScroll();
    updateViewport();
    animateSkillBars();
    setAvailability(true);
    renderMenu();

    requestAnimationFrame(updateFPS);
  }

  init();
})();
