const initializeWebsite = () => {
    // Navigation scroll effect
    const nav = document.querySelector('.nav-container');
    const navHeight = nav.offsetHeight;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > navHeight) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply saved theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = navHeight;
                const elementPosition = target.offsetTop;
                window.scrollTo({
                    top: elementPosition - offset,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Skills animation
    const skillBars = document.querySelectorAll('.skill-bar');
    const observeSkills = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const level = skillBar.dataset.level;
                skillBar.style.width = level + '%';
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observeSkills.observe(bar));

    // Project filtering
    const projectFilters = document.querySelectorAll('.filter-btn');
    const projects = document.querySelectorAll('.project-card');

    projectFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            // Remove active class from all filters
            projectFilters.forEach(f => f.classList.remove('active'));
            // Add active class to clicked filter
            this.classList.add('active');
            
            const category = this.dataset.filter;
            
            projects.forEach(project => {
                if (category === 'all') {
                    project.style.display = 'block';
                    project.style.animation = 'fadeInUp 0.5s ease forwards';
                } else if (project.dataset.category === category) {
                    project.style.display = 'block';
                    project.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    project.style.display = 'none';
                }
            });
        });
    });

    // Form validation and animation
    const form = document.querySelector('.contact-form');
    if (form) {
        const inputs = form.querySelectorAll('.form-input');

        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });

            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });

            input.addEventListener('input', function() {
                if (this.value) {
                    this.parentElement.classList.add('focused');
                }
            });
        });

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value && input.hasAttribute('required')) {
                    isValid = false;
                    input.parentElement.classList.add('error');
                } else {
                    input.parentElement.classList.remove('error');
                }
            });

            if (isValid) {
                const submitBtn = form.querySelector('.submit-btn');
                const btnText = submitBtn.querySelector('.btn-text');
                const btnIcon = submitBtn.querySelector('i');
                
                btnText.textContent = 'Sending...';
                btnIcon.className = 'fas fa-spinner fa-spin';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    btnText.textContent = 'Message Sent!';
                    btnIcon.className = 'fas fa-check';
                    form.reset();
                    
                    // Reset form after 3 seconds
                    setTimeout(() => {
                        btnText.textContent = 'Send Message';
                        btnIcon.className = 'fas fa-paper-plane';
                        submitBtn.disabled = false;
                        inputs.forEach(input => {
                            input.parentElement.classList.remove('focused');
                        });
                    }, 3000);
                }, 1500);
            }
        });
    }

    // Scroll animations for content
    const observeContent = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observeContent.observe(element);
    });

    // Scroll indicator click
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => {
            document.querySelector('#about').scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    // Typing animation for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 500);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        }
    });

    // Add loading animation
    window.addEventListener('load', () => {
        document.body.classList.add('loaded');
    });
};

// Initialize everything when the DOM is loaded
document.addEventListener('DOMContentLoaded', initializeWebsite);