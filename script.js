document.addEventListener('DOMContentLoaded', () => {
    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if(navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu on clicking an item
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.querySelector('i').classList.remove('fa-times');
            hamburger.querySelector('i').classList.add('fa-bars');
        });
    });

    // Navbar Scrolled Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active Navigation Link Update on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    });

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Animate on Scroll (Intersection Observer)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger Progress Bars Animation if in Skills section
                if(entry.target.classList.contains('skill-category')) {
                    const progressBars = entry.target.querySelectorAll('.progress');
                    progressBars.forEach(bar => {
                        const width = bar.getAttribute('data-width');
                        bar.style.width = width;
                    });
                }
                
                // Trigger Counters Animation if in About section
                if(entry.target.classList.contains('about-text')) {
                    const counters = entry.target.querySelectorAll('.counter');
                    const speed = 200; // The lower the slower

                    counters.forEach(counter => {
                        const updateCount = () => {
                            const target = +counter.getAttribute('data-target');
                            const count = +counter.innerText;

                            const inc = target / speed;

                            if (count < target) {
                                counter.innerText = Math.ceil(count + inc);
                                setTimeout(updateCount, 15);
                            } else {
                                counter.innerText = target + (counter.getAttribute('data-target') > 10 ? '+' : '');
                            }
                        };
                        updateCount();
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in, .scale-in');
    fadeElements.forEach(el => observer.observe(el));

    // Form Submission Handling (Prevent Default for Demo)
    const contactForm = document.getElementById('contactForm');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span>Sending...</span> <i class="fas fa-spinner fa-spin"></i>';
            btn.style.opacity = '0.8';
            btn.style.cursor = 'not-allowed';
            
            // Simulate API call
            setTimeout(() => {
                btn.innerHTML = '<span>Sent Successfully!</span> <i class="fas fa-check"></i>';
                btn.style.background = '#00c853';
                contactForm.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.style.opacity = '1';
                    btn.style.cursor = 'pointer';
                }, 3000);
            }, 2000);
        });
    }

    // Theme Switcher Logic
    const themeSwitcher = document.getElementById('themeSwitcher');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const themeColors = document.querySelectorAll('.theme-color');

    // Toggle drawer
    if (themeToggleBtn && themeSwitcher) {
        themeToggleBtn.addEventListener('click', () => {
            themeSwitcher.classList.toggle('open');
        });
        
        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!themeSwitcher.contains(e.target) && themeSwitcher.classList.contains('open')) {
                themeSwitcher.classList.remove('open');
            }
        });
    }

    // Handle theme change
    const setTheme = (themeName) => {
        // Remove existing theme classes
        document.body.classList.remove('theme-blue', 'theme-purple', 'theme-orange', 'theme-default');
        
        // Add new theme class
        document.body.classList.add(`theme-${themeName}`);
        
        // Update active class on options
        themeColors.forEach(color => {
            color.classList.remove('active');
            if (color.getAttribute('data-theme') === themeName) {
                color.classList.add('active');
            }
        });
        
        // Save to localStorage
        localStorage.setItem('portfolio-theme', themeName);
    };

    // Add click listeners to theme options
    themeColors.forEach(color => {
        color.addEventListener('click', () => {
            const theme = color.getAttribute('data-theme');
            setTheme(theme);
        });
    });

    // Load saved theme on initialization
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme('default');
    }
    // Curriculum Projects Toggle
    const curriculumItems = document.querySelectorAll('.curriculum-item');
    curriculumItems.forEach(item => {
        item.addEventListener('click', () => {
            const rowId = item.getAttribute('data-id');
            const descRow = document.getElementById(`desc-${rowId}`);
            
            // Toggle active class on the clicked row
            item.classList.toggle('active');
            
            // Toggle active class on the corresponding description row
            if (descRow) {
                descRow.classList.toggle('active');
            }
        });
    });

});
