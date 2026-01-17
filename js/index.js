const CONFIG = {
    SCROLL_OFFSET: 100,
    ANIMATION_DURATION: 800,
    MOBILE_BREAKPOINT: 1199,
    CAROUSEL_SPEED_MOBILE: 30000, // Más lento en móvil
    CAROUSEL_SPEED_DESKTOP: 20000
};


const acordeonData = [
    {
        id: 1,
        title: "Gestión de proyectos",
        slug: "services1",
        isOpen: false,
        items: [
            {
                description: "Planificación, ejecución y seguimiento de proyectos o programas, asegurando que se cumplan los objetivos propuestos por las organizaciones.",
                modality: "Online o Presencial (Mar del Plata)",
                dedication: "A definir según el programa",
                icon: "📊",
            }
        ],
        whatsappMessage: "Hola%20UMI,%20me%20interesa%20obtener%20más%20información%20sobre%20Gestión%20de%20Proyectos",
        buttonText: "Quiero más información"
    },
    {
        id: 2,
        title: "Búsqueda y gestión de talento",
        slug: "services2",
        isOpen: false,
        generalDescription: "Servicio especializado de sourcing y reclutamiento integral. Retroalimentación constructiva, comunicación interna, programas para el compromiso del talento, clima y cultura, análisis de datos para la toma de decisiones.",
        whatsappMessage: "Hola%20UMI,%20me%20interesa%20obtener%20más%20información%20sobre%20Búsqueda%20y%20Gestión%20de%20Talento",
        buttonText: "Quiero más información"
    },
    {
        id: 3,
        title: "Orientación laboral - profesional",
        slug: "services3",
        isOpen: false,
        generalDescription: "Encuentros de guía y acompañamiento para quienes desean formar parte del mercado laboral, potenciar su crecimiento profesional o reorientar su trayectoria actual.",
        items: [
            {
                title: "¡Conectá con Oportunidades!",
                description: "Diseño de CV/Portfolio y optimización de LinkedIn.",
                dedication: "1 a 2 encuentros",
                modality: "Online o Presencial (Mar del Plata)",
                icon: "💼"
            }
        ],
        whatsappMessage: "Hola%20UMI,%20me%20interesa%20obtener%20más%20información%20sobre%20Orientación%20Laboral",
        buttonText: "Quiero más información"
    },
    {
        id: 4,
        title: "Bienestar",
        slug: "services4",
        isOpen: false,
        generalDescription: "Sesiones de mindfulness, mentalización y respiración, administración del estrés y emociones. Planes formativos a medida.",
        items: [
            {
                title: "Sesiones de Mindfulness, mentalización y respiración",
                description: "Te ofrecerán beneficios para tu salud mental, emocional y física.",
                dedication: "4 encuentros, frecuencia semanal",
                modality: "Online y Presencial (Mar del Plata)",
                icon: "🧘‍♂️"
            },
        ],
        whatsappMessage: "Hola%20UMI,%20me%20interesa%20obtener%20más%20información%20sobre%20Bienestar",
        buttonText: "Quiero más información"
    },
    {
        id: 5,
        title: "¡Sumate!",
        slug: "services5",
        isOpen: false,
        generalDescription: "Si tenés un conocimiento valioso para compartir, ¡te invitamos a crear tu microformación!",
        items: [
            {
                title: "Crear mi microformación",
                description: "¿Tenés experiencia o conocimientos específicos que podrían ayudar a otros? Desarrollá tu propio contenido formativo con nuestro acompañamiento.",
                icon: "🚀"
            },
        ],
        whatsappMessage: "Hola%20UMI,%20me%20interesa%20sumarme%20a%20UMI%20Consultoría",
        buttonText: "Me apunto"
    },
];

class Utils {
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    static throttle(func, limit) {
        let inThrottle;
        return function () {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    static escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    static isMobile() {
        return window.innerWidth <= CONFIG.MOBILE_BREAKPOINT;
    }

    static smoothScrollTo(targetElement, offset = CONFIG.SCROLL_OFFSET) {
        if (!targetElement) return;

        const targetPosition = targetElement.offsetTop - offset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = CONFIG.ANIMATION_DURATION;
        let start = null;

        function animation(currentTime) {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = Utils.ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        }

        requestAnimationFrame(animation);
    }

    static ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
}

class AcordeonScrollManager {
    constructor() {
        this.acordeonItems = [];
        this.container = document.getElementById('acordeon-container');
        this.acordeonSection = document.querySelector('.acordeon-section');
        this.header = document.querySelector("header");
        this.sections = document.querySelectorAll("section[id]");
        this.navLinks = document.querySelectorAll(".menu a, .mobile-menu a");
        this.menuToggle = document.getElementById('menu-toggle');
        this.closeMenuBtn = document.getElementById('close-menu');
        this.mobileOverlay = document.getElementById('mobile-overlay');
        this.mobileMenu = document.getElementById('mobile-menu');

        this.isMobileMenuOpen = false;

        this.init();
    }

    init() {
        if (!this.container) return;

        this.renderAcordeon();
        this.setupEventListeners();
        this.handleInitialHash();
        this.setupResizeHandler();
    }

    renderAcordeon() {
        this.container.innerHTML = '';
        this.acordeonItems = [];

        acordeonData.forEach(itemData => {
            const acordeonItem = this.createAcordeonItem(itemData);
            this.container.appendChild(acordeonItem);
            this.acordeonItems.push(acordeonItem);
        });
    }

    createAcordeonItem(itemData) {
        const item = document.createElement('div');
        item.className = `acordeon-item ${itemData.isOpen ? 'active' : ''}`;
        item.dataset.id = itemData.id;
        item.id = itemData.slug;
        item.setAttribute('role', 'region');
        item.setAttribute('aria-labelledby', `acordeon-header-${itemData.id}`);

        const header = document.createElement('button');
        header.className = 'acordeon-header';
        header.id = `acordeon-header-${itemData.id}`;
        header.setAttribute('aria-expanded', itemData.isOpen);
        header.setAttribute('aria-controls', `acordeon-content-${itemData.id}`);
        header.innerHTML = `
            <div class="header-left">
                <div class="header-text">
                    <h3>${itemData.title}</h3>
                </div>
            </div>
            <div class="header-right">
                <span class="toggle-icon" aria-hidden="true">
                    <i class="fas ${itemData.isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}"></i>
                </span>
            </div>
        `;

        const content = document.createElement('div');
        content.className = 'acordeon-content';
        content.id = `acordeon-content-${itemData.id}`;
        content.setAttribute('role', 'region');
        content.setAttribute('aria-labelledby', `acordeon-header-${itemData.id}`);
        content.style.maxHeight = itemData.isOpen ? '1000px' : '0px';
        content.setAttribute('aria-hidden', !itemData.isOpen);

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'content-wrapper';

        if (itemData.generalDescription && itemData.generalDescription.trim()) {
            const generalDescription = document.createElement('div');
            generalDescription.className = 'acordeon-general-description';
            generalDescription.innerHTML = `<p>${itemData.generalDescription}</p>`;
            contentWrapper.appendChild(generalDescription);
        }

        if (itemData.items && itemData.items.length > 0) {
            const itemsContainer = document.createElement('div');
            itemsContainer.className = 'items-container';

            itemData.items.forEach((subItem, index) => {
                const subtituloItem = this.createSubtituloItem(subItem, index);
                itemsContainer.appendChild(subtituloItem);
            });

            contentWrapper.appendChild(itemsContainer);
        }

        const whatsappButton = this.createWhatsAppButton(itemData);
        contentWrapper.appendChild(whatsappButton);

        content.appendChild(contentWrapper);
        item.appendChild(header);
        item.appendChild(content);

        return item;
    }

    createSubtituloItem(subItem, index) {
        const item = document.createElement('div');
        item.className = 'subtitulo-item';

        const hasDedication = subItem.dedication && subItem.dedication.trim();
        const hasModality = subItem.modality && subItem.modality.trim();
        const showDetails = hasDedication || hasModality;

        let detailsHTML = '';
        if (showDetails) {
            detailsHTML = '<div class="subtitulo-details">';
            if (hasDedication) {
                detailsHTML += `
                    <div class="detail-box">
                        <span class="detail-label">Dedicación</span>
                        <span class="detail-value">${subItem.dedication}</span>
                    </div>
                `;
            }
            if (hasModality) {
                detailsHTML += `
                    <div class="detail-box">
                        <span class="detail-label">Modalidad</span>
                        <span class="detail-value">${subItem.modality}</span>
                    </div>
                `;
            }
            detailsHTML += '</div>';
        }

        if (!subItem.title || subItem.title.trim() === '') {
            item.innerHTML = `
                <div class="icon-line-container">
                    <div class="icon-circle">
                        <span class="emoji-icon">${subItem.icon}</span>
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="content-container">
                    <p class="subtitulo-descripcion">${subItem.description}</p>
                    ${detailsHTML}
                </div>
            `;
        } else {
            item.innerHTML = `
                <div class="icon-line-container">
                    <div class="icon-circle">
                        <span class="emoji-icon">${subItem.icon}</span>
                    </div>
                    <div class="horizontal-line"></div>
                </div>
                <div class="content-container">
                    <div class="subtitulo-header">
                        <h4>${subItem.title}</h4>
                    </div>
                    <p class="subtitulo-descripcion">${subItem.description}</p>
                    ${detailsHTML}
                </div>
            `;
        }

        return item;
    }

    createWhatsAppButton(itemData) {
        const container = document.createElement('div');
        container.className = 'whatsapp-button-container';

        container.innerHTML = `
            <a href="https://wa.me/5491121936762?text=${itemData.whatsappMessage}" 
               target="_blank" 
               rel="noopener noreferrer"
               class="whatsapp-category-button"
               aria-label="${itemData.buttonText} por WhatsApp">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 448 512" aria-hidden="true">
                    <path d="M380.9 97.1C339 55.2 283.1 32 224 32 100.3 32 0 132.3 0 256c0 45.2 12 89.4 34.8 128.1L0 480l98.5-34.3C136.6 468 179.9 480 224 480c123.7 0 224-100.3 224-224 0-59.1-23.2-115-67.1-158.9zM224 433.9c-38.7 0-76.6-10.4-109.7-30.1l-7.8-4.6-58.5 20.4 20.4-58.5-4.6-7.8C62.5 320.6 52.1 282.7 52.1 244 52.1 142 122 72.1 224 72.1c54.3 0 105.3 21.1 143.7 59.4S440 189.7 440 244c0 102-69.9 189.9-216 189.9zm100.7-138.5l-34.7-17.4c-4.7-2.3-10.1-1.5-13.8 2l-14.4 14.7c-34.8-17.8-62.7-45.7-80.5-80.5l14.7-14.4c3.5-3.7 4.3-9.1 2-13.8l-17.4-34.7c-3.4-6.7-11.6-9.3-18-5.9l-25.1 12.6c-6.6 3.3-10.7 10.1-10.7 17.3 0 91.7 74.3 166 166 166 7.2 0 14-4.1 17.3-10.7l12.6-25.1c3.4-6.4.8-14.6-5.9-18z"/>
                </svg>
                ${itemData.buttonText}
            </a>
        `;

        return container;
    }

    setupEventListeners() {
        this.container.addEventListener('click', (e) => {
            const header = e.target.closest('.acordeon-header');
            if (header) {
                this.toggleAcordeon(header);
                e.preventDefault();
                e.stopPropagation();
            }
        });

        this.container.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const header = e.target.closest('.acordeon-header');
                if (header) {
                    e.preventDefault();
                    this.toggleAcordeon(header);
                }
            }
        });

        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const targetId = link.getAttribute('href');
            if (targetId === '#') return;

            if (targetId.startsWith('#services')) {
                e.preventDefault();
                this.openAcordeonAndScroll(targetId);
                this.closeMobileMenu();
                return;
            }

            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                Utils.smoothScrollTo(target);
                this.updateActiveNavLink(targetId);
                this.closeMobileMenu();
            }
        });

        if (this.menuToggle) {
            this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
            this.menuToggle.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleMobileMenu();
                }
            });
        }

        if (this.closeMenuBtn) {
            this.closeMenuBtn.addEventListener('click', () => this.closeMobileMenu());
        }

        if (this.mobileOverlay) {
            this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMobileMenuOpen) {
                this.closeMobileMenu();
            }
        });

        window.addEventListener('scroll', Utils.throttle(() => this.onScroll(), 100));
    }

    setupResizeHandler() {
        window.addEventListener('resize', Utils.debounce(() => {
            this.handleResize();
        }, 250));
    }

    handleResize() {
        this.acordeonItems.forEach(item => {
            if (item.classList.contains('active')) {
                const content = item.querySelector('.acordeon-content');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });

        if (!Utils.isMobile() && this.isMobileMenuOpen) {
            this.closeMobileMenu();
        }
    }

    openAcordeonAndScroll(targetId) {
        const targetAcordeon = document.querySelector(targetId);
        if (!targetAcordeon) return;

        this.closeAllAcordeons();

        setTimeout(() => {
            this.openAcordeon(targetAcordeon);

            const acordeonPosition = this.acordeonSection.getBoundingClientRect().top + window.pageYOffset;
            const headerHeight = this.header ? this.header.offsetHeight : 80;
            const targetPosition = acordeonPosition - headerHeight - 20;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });

            history.pushState(null, null, targetId);
            this.updateActiveNavLink('#service');
        }, 100);
    }

    handleInitialHash() {
        setTimeout(() => {
            if (window.location.hash) {
                const hash = window.location.hash;

                if (hash.startsWith('#services')) {
                    const acordeonElement = document.querySelector(hash);
                    if (acordeonElement && acordeonElement.classList.contains('acordeon-item')) {
                        this.closeAllAcordeons();
                        setTimeout(() => {
                            this.openAcordeon(acordeonElement);
                            setTimeout(() => {
                                const acordeonPosition = this.acordeonSection.getBoundingClientRect().top + window.pageYOffset;
                                const headerHeight = this.header ? this.header.offsetHeight : 80;
                                const targetPosition = acordeonPosition - headerHeight - 20;
                                window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                            }, 300);
                        }, 100);
                    }
                } else {
                    const target = document.querySelector(hash);
                    if (target) {
                        Utils.smoothScrollTo(target);
                        this.updateActiveNavLink(hash);
                    }
                }
            }
        }, 500);
    }

    toggleAcordeon(header) {
        const item = header.closest('.acordeon-item');
        if (!item) return;

        const isActive = item.classList.contains('active');

        if (!isActive) {
            this.closeAllAcordeons();
            this.openAcordeon(item);
        } else {
            this.closeAcordeon(item);
        }
    }

    openAcordeon(item) {
        item.classList.add('active');
        const content = item.querySelector('.acordeon-content');
        const icon = item.querySelector('.toggle-icon i');
        const header = item.querySelector('.acordeon-header');

        if (content) {
            content.style.maxHeight = content.scrollHeight + 'px';
            content.setAttribute('aria-hidden', 'false');
        }

        if (icon) {
            icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
        }

        if (header) {
            header.setAttribute('aria-expanded', 'true');
        }
    }

    closeAcordeon(item) {
        item.classList.remove('active');
        const content = item.querySelector('.acordeon-content');
        const icon = item.querySelector('.toggle-icon i');
        const header = item.querySelector('.acordeon-header');

        if (content) {
            content.style.maxHeight = '0';
            content.setAttribute('aria-hidden', 'true');
        }

        if (icon) {
            icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
        }

        if (header) {
            header.setAttribute('aria-expanded', 'false');
        }
    }

    closeAllAcordeons() {
        this.acordeonItems.forEach(item => {
            if (item.classList.contains('active')) {
                this.closeAcordeon(item);
            }
        });
    }

    onScroll() {
        if (this.header) {
            this.header.classList.toggle("scrolled", window.scrollY > 50);
        }

        let currentSection = "";
        this.sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 150;
            const sectionHeight = sec.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = sec.id;
            }
        });

        this.updateActiveNavLink(currentSection ? `#${currentSection}` : null);
    }

    updateActiveNavLink(targetId) {
        this.navLinks.forEach(link => {
            const linkHref = link.getAttribute("href");
            const isActive = targetId ? linkHref === targetId : false;
            link.classList.toggle("active", isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    }

    toggleMobileMenu() {
        if (this.isMobileMenuOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileOverlay.classList.add('active');
        this.mobileMenu.classList.add('active');
        document.body.classList.add('mobile-menu-open');
        document.body.style.overflow = 'hidden';
        this.menuToggle.setAttribute('aria-expanded', 'true');
        this.menuToggle.innerHTML = '<span class="sr-only">Cerrar menú</span><i class="fas fa-times" aria-hidden="true"></i>';
        this.isMobileMenuOpen = true;

        setTimeout(() => {
            const firstMenuItem = this.mobileMenu.querySelector('.mobile-menu-item');
            if (firstMenuItem) firstMenuItem.focus();
        }, 100);
    }

    closeMobileMenu() {
        this.mobileOverlay.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.classList.remove('mobile-menu-open');
        document.body.style.overflow = '';
        this.menuToggle.setAttribute('aria-expanded', 'false');
        this.menuToggle.innerHTML = '<span class="sr-only">Menú</span><i class="fas fa-bars" aria-hidden="true"></i>';
        this.isMobileMenuOpen = false;

        this.menuToggle.focus();
    }
}

class InfiniteCarousel {
    constructor() {
        this.container = document.getElementById("carousel-container");
        this.isMobile = Utils.isMobile();

        this.events = [
            { image: "img/trayecto/IMG_0294.jpg", title: "", subtitle: "", position: "center" },
            { image: "img/trayecto/IMG_0410.jpg", title: "", subtitle: "", position: "top" },
            { image: "img/trayecto/IMG_0989.jpg", title: "", subtitle: "", position: "center" },
            { image: "img/trayecto/IMG_0991.jpg", title: "", subtitle: "", position: "center" },
            { image: "img/trayecto/IMG_2833.jpg", title: "", subtitle: "", position: "center" },
            { image: "img/trayecto/kari y gabi.jpg", title: "", subtitle: "", position: "center" }
        ];

        this.speeds = {
            desktop: { top: 120, bottom: 140 },
            tablet: { top: 150, bottom: 170 },
            mobile: { top: 180, bottom: 200 }
        };

        this.init();
    }

    init() {
        if (!this.container) return;

        this.container.innerHTML = `
            <h2 id="trayecto-title" class="text-center">Nuestro Trayecto</h2>
            <div class="tracks-container">
                <div class="track" id="top-track">
                    <div class="track-content"></div>
                </div>
                <div class="track" id="bottom-track">
                    <div class="track-content"></div>
                </div>
            </div>
        `;

        this.renderTracks();
        this.applyAnimations();
        this.bindEvents();
    }

    renderTracks() {
        document.querySelectorAll('.track-content').forEach(track => {
            track.innerHTML = '';
            const items = [...this.events, ...this.events, ...this.events];

            items.forEach(event => {
                const item = document.createElement('div');
                item.className = 'carousel-item';

                item.innerHTML = `
                    <img src="${event.image}"
                         class="carousel-img pos-${event.position}"
                         loading="lazy"
                         alt="">
                `;

                track.appendChild(item);
            });
        });
    }

    applyAnimations() {
        const top = document.querySelector('#top-track .track-content');
        const bottom = document.querySelector('#bottom-track .track-content');

        if (!top || !bottom) return;

        let mode = 'desktop';
        if (window.innerWidth <= 599) mode = 'mobile';
        else if (window.innerWidth <= 991) mode = 'tablet';

        top.style.animation = `scroll-left ${this.speeds[mode].top}s linear infinite`;
        bottom.style.animation = `scroll-right ${this.speeds[mode].bottom}s linear infinite`;
    }

    bindEvents() {
        window.addEventListener('resize', Utils.debounce(() => {
            this.applyAnimations();
        }, 300));
    }
}

let acordeonScrollManager, carousel;

document.addEventListener('DOMContentLoaded', () => {
    try {
        acordeonScrollManager = new AcordeonScrollManager();

        if (document.getElementById("carousel-container")) {
            carousel = new InfiniteCarousel();
        }

        preloadCriticalImages();

    } catch (error) {
        console.error('Error durante la inicialización:', error);
    }
});

window.openAllAcordeons = () => {
    if (acordeonScrollManager) acordeonScrollManager.openAllAcordeons();
};

window.closeAllAcordeons = () => {
    if (acordeonScrollManager) acordeonScrollManager.closeAllAcordeons();
};

window.scrollToContact = () => {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        Utils.smoothScrollTo(contactSection);
        if (acordeonScrollManager) {
            acordeonScrollManager.updateActiveNavLink('#contact');
        }
    }
};

window.openMobileMenu = () => {
    if (acordeonScrollManager) acordeonScrollManager.openMobileMenu();
};

window.closeMobileMenu = () => {
    if (acordeonScrollManager) acordeonScrollManager.closeMobileMenu();
};

function preloadCriticalImages() {
    const criticalImages = [
        'img/umi_logo.jpg',
        'img/fondo.jpg',
        'img/ola-verde.png',
        'img/trayecto/IMG_0294.jpg',
        'img/trayecto/IMG_0410.jpg',
        'img/trayecto/IMG_0989.jpg',
        'img/trayecto/IMG_0991.jpg',
        'img/trayecto/IMG_2833.jpg',
        'img/trayecto/kari y gabi.jpg'
    ];

    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
        img.onerror = () => {
            console.warn(`No se pudo cargar la imagen: ${src}`);
        };
    });
}

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').catch(error => {
            console.log('Service Worker registration failed:', error);
        });
    });
}