// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - initializing menu');
    
    // Get elements
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.getElementById('navLinks');
    
    // Debug: Check if elements exist
    console.log('Mobile toggle found:', mobileMenuToggle !== null);
    console.log('Nav links found:', navLinks !== null);

    if (mobileMenuToggle && navLinks) {
        // Toggle menu on hamburger click
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Hamburger clicked!');
            
            navLinks.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            
            // Prevent body scroll when menu is open
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on direct links (not dropdowns)
        const directLinks = navLinks.querySelectorAll('a:not(.dropdown-toggle)');
        directLinks.forEach(link => {
            link.addEventListener('click', function() {
                // Only close on mobile
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    mobileMenuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideMenu = navLinks.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideMenu && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.error('Menu elements not found! Check your HTML.');
    }

    // Mobile Dropdown Toggle
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            console.log('Dropdown clicked');
            
            // On mobile, toggle the dropdown
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = this.parentElement;
                const menu = dropdown.querySelector('.dropdown-menu');
                
                if (menu) {
                    // Close all other dropdowns
                    document.querySelectorAll('.dropdown-menu').forEach(m => {
                        if (m !== menu) {
                            m.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    menu.classList.toggle('active');
                }
            } else {
                // On desktop, prevent navigation to "#"
                e.preventDefault();
            }
        });
    });

    // Handle window resize - reset menu state
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                // Desktop view - reset everything
                if (navLinks) {
                    navLinks.classList.remove('active');
                }
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                }
                document.body.style.overflow = '';
                
                // Remove active class from all dropdown menus
                document.querySelectorAll('.dropdown-menu').forEach(menu => {
                    menu.classList.remove('active');
                });
            }
        }, 250);
    });
});

// Smooth scrolling for anchor links (for IELTS page)
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only prevent default for actual anchor links (not just "#")
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});