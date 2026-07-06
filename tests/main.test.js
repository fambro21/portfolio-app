describe("Portfolio UI", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <header id="header"></header>

      <button id="menuButton" aria-expanded="false">
        <span id="menuIcon"></span>
      </button>

      <div id="mobileMenu" class="mobile-menu" aria-hidden="true"></div>

      <button id="closeMenuButton"></button>

      <div id="heroContent"></div>

      <strong id="fps">0</strong>
      <strong id="scrollY">0px</strong>
      <strong id="viewport">0x0</strong>

      <button class="filter-btn active" data-filter="all" aria-pressed="true">All</button>
      <button class="filter-btn" data-filter="react" aria-pressed="false">React</button>

      <div class="projects-grid">
        <article class="project-card" data-category="react"></article>
        <article class="project-card" data-category="angular"></article>
      </div>

      <div class="fill" data-width="95"></div>

      <span id="availabilityDot"></span>
      <span id="availabilityText"></span>

      <div class="footer-copyright">
        <span></span>
      </div>

      <button class="projects-btn"></button>
      <section id="projects"></section>

      <button class="contact-btn"></button>
      <section id="contact"></section>

      <button class="linkedIn-btn"></button>
      <button class="file-text-btn"></button>
      <button class="mail-btn"></button>

      <ul class="mobile-nav-list">
        <li><a href="#projects">Projects</a></li>
      </ul>
    `;

    global.lucide = {
      createIcons: jest.fn(),
    };

    global.requestAnimationFrame = jest.fn();
  });

  afterEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });

  test("updates footer copyright year", () => {
    require("../assets/js/main.js");

    const year = new Date().getFullYear();

    expect(document.querySelector(".footer-copyright span").textContent).toBe(
      `© ${year} — JONATHAN FAMBRO`,
    );
  });

  test("opens the mobile menu", () => {
    require("../assets/js/main.js");

    document.querySelector("#menuButton").click();

    expect(
      document.querySelector("#mobileMenu").classList.contains("open"),
    ).toBe(true);

    expect(
      document.querySelector("#heroContent").classList.contains("hidden"),
    ).toBe(true);

    expect(
      document.querySelector("#menuButton").getAttribute("aria-expanded"),
    ).toBe("true");

    expect(
      document.querySelector("#mobileMenu").getAttribute("aria-hidden"),
    ).toBe("false");
  });

  test("closes the mobile menu", () => {
    require("../assets/js/main.js");

    document.querySelector("#menuButton").click();
    document.querySelector("#closeMenuButton").click();

    expect(
      document.querySelector("#mobileMenu").classList.contains("open"),
    ).toBe(false);

    expect(
      document.querySelector("#heroContent").classList.contains("hidden"),
    ).toBe(false);

    expect(
      document.querySelector("#menuButton").getAttribute("aria-expanded"),
    ).toBe("false");

    expect(
      document.querySelector("#mobileMenu").getAttribute("aria-hidden"),
    ).toBe("true");
  });

  test("filters project cards by category", () => {
    require("../assets/js/main.js");

    document.querySelector('[data-filter="react"]').click();

    const reactCard = document.querySelector('[data-category="react"]');
    const angularCard = document.querySelector('[data-category="angular"]');

    expect(reactCard.classList.contains("is-hidden")).toBe(false);
    expect(angularCard.classList.contains("is-hidden")).toBe(true);
  });

  test("sets active filter button aria state", () => {
    require("../assets/js/main.js");

    const allButton = document.querySelector('[data-filter="all"]');
    const reactButton = document.querySelector('[data-filter="react"]');

    reactButton.click();

    expect(allButton.classList.contains("active")).toBe(false);
    expect(allButton.getAttribute("aria-pressed")).toBe("false");

    expect(reactButton.classList.contains("active")).toBe(true);
    expect(reactButton.getAttribute("aria-pressed")).toBe("true");
  });

  test("sets availability status", () => {
    require("../assets/js/main.js");

    expect(document.querySelector("#availabilityText").textContent).toBe(
      "CURRENTLY AVAILABLE FOR OPPORTUNITIES",
    );

    expect(
      document
        .querySelector("#availabilityDot")
        .classList.contains("unavailable"),
    ).toBe(false);
  });

  test("updates viewport text on resize", () => {
    require("../assets/js/main.js");

    window.innerWidth = 1200;
    window.innerHeight = 800;

    window.dispatchEvent(new Event("resize"));

    expect(document.querySelector("#viewport").textContent).toBe("1200x800");
  });

  test("adds scrolled class when page is scrolled", () => {
    require("../assets/js/main.js");

    Object.defineProperty(window, "scrollY", {
      value: 100,
      writable: true,
    });

    window.dispatchEvent(new Event("scroll"));

    expect(
      document.querySelector("#header").classList.contains("scrolled"),
    ).toBe(true);
  });
});
