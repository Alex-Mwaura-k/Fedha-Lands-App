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

document.addEventListener('DOMContentLoaded', () => {
    
    const counters = document.querySelectorAll('.counter-animate');
    
    // speed variable: The LOWER this number, the FASTER/BIGGER the chunks.
    // 200 = Slow (increments of 1 or 2)
    // 40 = Fast (increments of 10 or 15)
    const speed = 40; 

    const animateCounters = (counter) => {
        const target = +counter.getAttribute('data-target');
        
        // Get current number
        let count = +counter.innerText.replace(/\D/g, '');
        
        // Get the suffix (+ or %) to preserve it
        const suffix = counter.innerText.replace(/[0-9]/g, ''); 

        // Calculate chunk size
        const inc = Math.ceil(target / speed);

        if (count < target) {
            // Add the chunk
            count += inc;
            
            // If we overshot the target, clamp it to the target
            if (count > target) count = target;

            counter.innerText = count + suffix;
            
            // Run next frame fast (20ms)
            setTimeout(() => {
                // Only continue if we haven't hit target yet
                if (+counter.innerText.replace(/\D/g, '') < target) {
                    animateCounters(counter);
                }
            }, 20);
        } else {
            counter.innerText = target + suffix;
        }
    };

    const observerOptions = {
        threshold: 0.5 // Trigger when 50% visible
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const counter = entry.target;
            const suffix = counter.innerText.replace(/[0-9]/g, '');

            if (entry.isIntersecting) {
                // SECTION VISIBLE: Start Counting
                animateCounters(counter);
            } else {
                // SECTION HIDDEN: Reset to 0 so it can replay next time
                counter.innerText = "0" + suffix;
            }
        });
    }, observerOptions);

    counters.forEach(counter => {
        observer.observe(counter);
    });

});

/* =========================================
   SCROLL TO TOP LOGIC - UPDATED
   ========================================= */
document.addEventListener('DOMContentLoaded', () => {
  const scrollTopBtn = document.getElementById('scrollToTopBtn');

  window.addEventListener('scroll', () => {
    // TRIGGER AT 80dvh (0.8 of window height)
    if (window.scrollY > (window.innerHeight * 0.5)) {
      scrollTopBtn.classList.add('show');
    } else {
      scrollTopBtn.classList.remove('show');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});