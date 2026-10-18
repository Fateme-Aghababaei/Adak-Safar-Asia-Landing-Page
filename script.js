import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', function () {

    // Pointer-driven reflection, limited to small floating controls and navigation.
    // No scroll loop, device sensors, or animation when the pointer is idle.
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        document.querySelectorAll('.glass-material').forEach(surface => {
            let frame;
            surface.addEventListener('pointermove', event => {
                cancelAnimationFrame(frame);
                frame = requestAnimationFrame(() => {
                    const bounds = surface.getBoundingClientRect();
                    surface.style.setProperty('--glass-x', `${event.clientX - bounds.left}px`);
                    surface.style.setProperty('--glass-y', `${event.clientY - bounds.top}px`);
                });
            }, { passive: true });
            surface.addEventListener('pointerleave', () => {
                cancelAnimationFrame(frame);
                surface.style.removeProperty('--glass-x');
                surface.style.removeProperty('--glass-y');
            });
        });
    }

    // =========================================================
    //  SECTION 1 — MOBILE MENU
    // =========================================================

    const menuBtn     = document.getElementById('mobile-menu-btn');
    const mobileMenu  = document.getElementById('mobile-menu');
    const menuIcon    = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            menuBtn.setAttribute('aria-expanded', String(menuBtn.getAttribute('aria-expanded') !== 'true'));
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            document.body.classList.toggle('overflow-hidden');
            menuIcon.classList.toggle('bi-list');
            menuIcon.classList.toggle('bi-x-lg');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.setAttribute('aria-expanded', 'false');
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.classList.remove('overflow-hidden');
                menuIcon.classList.remove('bi-x-lg');
                menuIcon.classList.add('bi-list');
            });
        });
    }

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && menuBtn?.getAttribute('aria-expanded') === 'true') { menuBtn.click(); menuBtn.focus(); }
    });

    // =========================================================
    //  SECTION 2 — SMOOTH SCROLL
    // =========================================================

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const offset          = 96;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top:      elementPosition - offset,
                        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                    });
                }
            }
        });
    });

    // =========================================================
    //  SECTION 3 — FAQ ACCORDION
    // =========================================================

    const detailsElements = document.querySelectorAll('details[name="faq-group"]');
    detailsElements.forEach(targetDetail => {
        targetDetail.addEventListener('click', () => {
            detailsElements.forEach(detail => {
                if (detail !== targetDetail) {
                    detail.removeAttribute('open');
                }
            });
        });
    });

    // =========================================================
    //  SECTION 4 — ANALYTICS LOGGING
    // =========================================================

    const logClick = (type) => console.log(`User Action: Clicked ${type}`);
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        a.addEventListener('click', () => logClick('Phone Call'));
    });
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        a.addEventListener('click', () => logClick('WhatsApp'));
    });

    // =========================================================
    //  SECTION 5 — GSAP ANIMATIONS
    // =========================================================

    // Skip animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.querySelectorAll('.gsap-hero-child').forEach(el => {
            el.style.opacity = '1';
        });
        return;
    }

    // ---------------------------------------------------------
    //  5A — HEADER: elevated surface on scroll
    // ---------------------------------------------------------

    const header = document.querySelector('header');

    ScrollTrigger.create({
        start: 80,
        onEnter: () => {
            header.style.boxShadow = 'var(--glass-shadow)';
            header.classList.add('header-scrolled');
        },
        onLeaveBack: () => {
            header.style.boxShadow = '';
            header.classList.remove('header-scrolled');
        },
    });

    // ---------------------------------------------------------
    //  5B — HERO: staggered entrance sequence on page load
    // ---------------------------------------------------------

    const heroContent = document.getElementById('hero-content');

    if (heroContent) {
        const heroChildren = heroContent.querySelectorAll('.gsap-hero-child');

        const heroTl = gsap.timeline({
            defaults: { ease: 'power3.out' },
            delay:    0.15,
        });

        heroTl.fromTo(heroChildren, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .65, stagger: .08 });
    }

    // ---------------------------------------------------------
    //  5D — ABOUT SECTION
    // ---------------------------------------------------------

    gsap.fromTo(
        '#about-text',
        { x: 70, opacity: 0 },
        {
            x:             0,
            opacity:       1,
            duration:      1.1,
            ease:          'power3.out',
            scrollTrigger: { trigger: '#about', start: 'top 72%' },
        }
    );

    gsap.fromTo(
        '#about-image',
        { x: -70, opacity: 0 },
        {
            x:             0,
            opacity:       1,
            duration:      1.1,
            ease:          'power3.out',
            scrollTrigger: { trigger: '#about', start: 'top 72%' },
        }
    );

    gsap.fromTo(
        '#about-stats > div',
        { y: 35, opacity: 0, scale: 0.9 },
        {
            y:             0,
            opacity:       1,
            scale:         1,
            duration:      0.65,
            stagger:       0.14,
            ease:          'back.out(1.8)',
            scrollTrigger: { trigger: '#about-stats', start: 'top 88%' },
        }
    );

    // ---------------------------------------------------------
    //  5E — SERVICES SECTION
    // ---------------------------------------------------------

    gsap.fromTo(
        '#services-header > *',
        { y: 30, opacity: 0 },
        {
            y:             0,
            opacity:       1,
            duration:      0.75,
            stagger:       0.1,
            ease:          'power2.out',
            scrollTrigger: { trigger: '#services-header', start: 'top 82%' },
        }
    );

    gsap.fromTo(
        '#services-grid > div',
        { y: 60, opacity: 0 },
        {
            y:             0,
            opacity:       1,
            duration:      0.7,
            stagger:       { each: 0.1, from: 'start' },
            ease:          'power2.out',
            scrollTrigger: { trigger: '#services-grid', start: 'top 82%' },
        }
    );

    // ---------------------------------------------------------
    //  5F — SEO GUIDE SECTION
    // ---------------------------------------------------------

    gsap.fromTo(
        '#seo-title',
        { x: 50, opacity: 0 },
        {
            x:             0,
            opacity:       1,
            duration:      0.9,
            ease:          'power3.out',
            scrollTrigger: { trigger: '#seo-guide', start: 'top 80%' },
        }
    );

    gsap.fromTo(
        '#seo-article > *',
        { y: 28, opacity: 0 },
        {
            y:             0,
            opacity:       1,
            duration:      0.65,
            stagger:       0.13,
            ease:          'power2.out',
            scrollTrigger: { trigger: '#seo-article', start: 'top 85%' },
        }
    );

    // ---------------------------------------------------------
    //  5G — STANDARDS / FLEET SECTION
    // ---------------------------------------------------------

    gsap.fromTo(
        '#fleet-header > *',
        { y: 25, opacity: 0 },
        {
            y:             0,
            opacity:       1,
            duration:      0.7,
            stagger:       0.1,
            ease:          'power2.out',
            scrollTrigger: { trigger: '#fleet-header', start: 'top 82%' },
        }
    );

    gsap.fromTo(
        '#fleet-grid > div',
        { y: 55, opacity: 0, scale: 0.88 },
        {
            y:             0,
            opacity:       1,
            scale:         1,
            duration:      0.7,
            stagger:       0.14,
            ease:          'back.out(1.5)',
            scrollTrigger: { trigger: '#fleet-grid', start: 'top 82%' },
        }
    );

    // ---------------------------------------------------------
    //  5H — FAQ SECTION
    // ---------------------------------------------------------

    gsap.fromTo(
        '#faq-header > *',
        { y: 25, opacity: 0 },
        {
            y:             0,
            opacity:       1,
            duration:      0.7,
            stagger:       0.1,
            ease:          'power2.out',
            scrollTrigger: { trigger: '#faq-header', start: 'top 82%' },
        }
    );

    gsap.fromTo(
        '#faq-list > details',
        { x: -35, opacity: 0 },
        {
            x:             0,
            opacity:       1,
            duration:      0.55,
            stagger:       0.08,
            ease:          'power2.out',
            scrollTrigger: { trigger: '#faq-list', start: 'top 85%' },
        }
    );

    gsap.fromTo(
        '#faq-contact',
        { y: 45, opacity: 0, scale: 0.97 },
        {
            y:             0,
            opacity:       1,
            scale:         1,
            duration:      0.85,
            ease:          'power3.out',
            scrollTrigger: { trigger: '#faq-contact', start: 'top 90%' },
        }
    );

    // ---------------------------------------------------------
    //  5I — FOOTER
    // ---------------------------------------------------------

    gsap.fromTo(
        '#footer-heading',
        { y: 30, opacity: 0 },
        {
            y:             0,
            opacity:       1,
            duration:      0.8,
            ease:          'power2.out',
            scrollTrigger: { trigger: 'footer', start: 'top 88%' },
        }
    );

    gsap.fromTo(
        '#footer-grid > div',
        { y: 30, opacity: 0 },
        {
            y:             0,
            opacity:       1,
            duration:      0.65,
            stagger:       0.1,
            ease:          'power2.out',
            scrollTrigger: { trigger: '#footer-grid', start: 'top 92%' },
        }
    );

    // ---------------------------------------------------------
    //  5J — STAT CARD hover micro-interaction
    // ---------------------------------------------------------

    document.querySelectorAll('#about-stats > div').forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('stat-animate');
            card.addEventListener('animationend', () => {
                card.classList.remove('stat-animate');
            }, { once: true });
        });
    });

});