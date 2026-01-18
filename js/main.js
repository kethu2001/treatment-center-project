// ==================== MAIN JAVASCRIPT FILE ====================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // ==================== MOBILE NAVIGATION TOGGLE ====================
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');

            const spans = navToggle.querySelectorAll('span');
            if (navToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                spans.forEach(span => span.style = '');
            }
        });
    }

    // ==================== CLOSE MOBILE MENU ====================
    const navLinks = document.querySelectorAll('.navbar__link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768 && navMenu && navToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    });

    // ==================== SMOOTH SCROLLING ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '') return;

            e.preventDefault();
            const target = document.getElementById(href.substring(1));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== ACTIVE NAVIGATION ====================
    const sections = document.querySelectorAll('section[id]');
    function highlightNavigation() {
        const scrollY = window.pageYOffset;
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`.navbar__link[href="#${id}"]`);

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(l => l.classList.remove('active'));
                if (link) link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', highlightNavigation);

    // ==================== BACK TO TOP ====================
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            backToTopBtn.classList.toggle('visible', window.scrollY > 300);
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ==================== HEADER SHADOW ====================
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // ==================== PLAY / PAUSE VIDEO ====================
    const video = document.getElementById('missionVideo');
    const controlBtn = document.getElementById('videoControl');

    if (video && controlBtn) {
        controlBtn.addEventListener('click', function() {
            if (video.paused) {
                video.play();
                controlBtn.textContent = '❚❚';
                controlBtn.style.opacity = '0';
            } else {
                video.pause();
                controlBtn.textContent = '▶';
                controlBtn.style.opacity = '1';
            }
        });

        video.addEventListener('pause', () => {
            controlBtn.textContent = '▶';
            controlBtn.style.opacity = '1';
        });
    }

    // ==================== ANIMATION ON SCROLL ====================
    const animatedItems = document.querySelectorAll('.event-card, .news-card, .mission__text');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    animatedItems.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

});


// ==================== UTILITY FUNCTIONS ====================
function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
