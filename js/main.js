document.addEventListener('DOMContentLoaded', () => {

    /*=============== MENU MOBILE ===============*/
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navClose = document.getElementById('nav-close');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }
    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }
    document.querySelectorAll('.nav__link').forEach(n => n.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    }));

    /*=============== HEADER SHADOW & ACTIVE LINK ===============*/
    const sections = document.querySelectorAll('section[id]');
    function scrollActive() {
        const scrollY = window.pageYOffset;
        document.getElementById('header').classList.toggle('scroll-header', scrollY >= 50);

        let currentSectionId = '';
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 58;
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                currentSectionId = current.getAttribute('id');
            }
        });

        document.querySelectorAll('.nav__menu a').forEach(link => {
            link.classList.remove('active-link');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active-link');
            }
        });
    }
    window.addEventListener('scroll', scrollActive);
    scrollActive();

    /*=============== ANIMASI KEMUNCULAN ELEMEN ===============*/
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });
    document.querySelectorAll('.reveal-text').forEach(el => observer.observe(el));

    /*=============== GALERI CAROUSEL OTOMATIS ===============*/
    const track = document.querySelector('.gallery__track');
    if (track) {
        // Gandakan konten untuk efek loop tak terbatas
        const cards = Array.from(track.children);
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            track.appendChild(clone);
        });
    }

    /*=============== EFEK KURSOR KUSTOM ===============*/
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    /*=============== EFEK KARTU INTERAKTIF "AURORA" ===============*/
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });
});