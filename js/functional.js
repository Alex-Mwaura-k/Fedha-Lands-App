// NAVBAR: Handle multi-level dropdowns
document.querySelectorAll('.dropdown-submenu > .dropdown-toggle').forEach(function (element) {
  element.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Close any other open submenus at the same level
    const parentMenu = this.closest('.dropdown-menu');
    parentMenu.querySelectorAll('.dropdown-submenu .dropdown-menu.show').forEach(function (submenu) {
      if (submenu !== element.nextElementSibling) {
        submenu.classList.remove('show');
      }
    });

    // Toggle current submenu
    let submenu = this.nextElementSibling;
    if (submenu) {
      submenu.classList.toggle('show');
    }
  });
});

// Close all submenus when the parent dropdown closes
document.querySelectorAll('.dropdown').forEach(function (dropdown) {
  dropdown.addEventListener('hide.bs.dropdown', function () {
    this.querySelectorAll('.dropdown-menu.show').forEach(function (submenu) {
      submenu.classList.remove('show');
    });
  });
});
// END OF NAVBAR