(function () {
  const menuButton = document.getElementById("menuButton");
  const menuIcon = document.getElementById("menuIcon");
  const mobileMenu = document.getElementById("mobileMenu");
  const closeMenuButton = document.getElementById("closeMenuButton");
  const heroContent = document.getElementById("heroContent");

  let isOpen = false;

  function renderIcon() {
    mobileMenu.classList.toggle("open", isOpen);

    heroContent.classList.toggle("hidden", isOpen);

    menuIcon.innerHTML = isOpen
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';

    lucide.createIcons();
  }

  menuButton.addEventListener("click", () => {
    isOpen = true;
    renderIcon();
  });

  closeMenuButton.addEventListener("click", () => {
    isOpen = false;
    renderIcon();
  });

  renderIcon();
})();
