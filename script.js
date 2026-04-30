document.addEventListener('DOMContentLoaded', function() {
    
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuBtn && mobileMenu && menuIcon) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            
            document.body.classList.toggle('overflow-hidden');
            
            menuIcon.classList.toggle('bi-list');
            menuIcon.classList.toggle('bi-x-lg');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                document.body.classList.remove('overflow-hidden');
                menuIcon.classList.remove('bi-x-lg');
                menuIcon.classList.add('bi-list');
            });
        });
    }

    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const offset = 96; // ارتفاع هدر
                    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({
                        top: elementPosition - offset,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    const detailsElements = document.querySelectorAll('details[name="faq-group"]');
    detailsElements.forEach(targetDetail => {
        targetDetail.addEventListener("click", () => {
            detailsElements.forEach(detail => {
                if (detail !== targetDetail) {
                    detail.removeAttribute("open");
                }
            });
        });
    });

    const logClick = (type) => {
        console.log(`User Action: Clicked ${type}`);
    };
    document.querySelectorAll('a[href^="tel:"]').forEach(a => {
        a.addEventListener('click', () => logClick('Phone Call'));
    });
    document.querySelectorAll('a[href*="wa.me"]').forEach(a => {
        a.addEventListener('click', () => logClick('WhatsApp'));
    });

});