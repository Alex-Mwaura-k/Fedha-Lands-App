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


// Gallery
/* =========================================
   GALLERY FILTER LOGIC
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            
            // 1. Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 2. Add 'active' class to clicked button
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            // 3. Loop through items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.classList.remove('hide');
                    item.classList.add('show');
                } else {
                    item.classList.add('hide');
                    item.classList.remove('show');
                }
            });
        });
    });
});