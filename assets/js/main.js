(function () {
  const menuButton = document.getElementById("menuButton");
  const menuIcon = document.getElementById("menuIcon");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuButton = document.getElementById("closeMenuButton");
  const heroContent = document.getElementById("heroContent");

  let isOpen = false;

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

  renderMenu();
})();
