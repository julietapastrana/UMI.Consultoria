// ===== VARIABLES GLOBALES =====
const SCROLL_OFFSET = 100;

// ===== DATOS DEL ACORDEÓN =====
const acordeonData = [
    {
        id: 1,
        title: "Gestión de proyectos",
        isOpen: false,
        items: [
            {
                title: "Aprendizaje basado en proyectos",
                description: "Laboratorios de entrenamiento intensivos en áreas IT y digitales, de corta duración y alto impacto. Diseñados para adquirir de manera rápida las habilidades técnicas e interpersonales demandadas por el mercado hoy.",
                modality: "Online o Presencial (Mar del Plata)",
                dedication: "         ",
                icon: "📊",
            }
        ],
        whatsappMessage: "Hola%20UMI,%20me%20interesa%20obtener%20más%20información%20sobre%20Gestión%20de%20Proyectos",
        buttonText: "Quiero más información"
    },
    {
        id: 2,
        title: "Orientación laboral - profesional",
        isOpen: false,
        items: [
            {
                title: "¡Conectá con Oportunidades!",
                description: "Diseño de CV/Portfolio y optimización de LinkedIn.",
                dedication: "1 a 2 encuentros.",
                modality: "Online o Presencial (Mar del Plata)",
                icon: "💼"
            }
        ],
        whatsappMessage: "Hola%20UMI,%20me%20interesa%20obtener%20más%20información%20sobre%20Orientación%20Laboral",
        buttonText: "Quiero más información"
    },
    {
        id: 3,
        title: "Capacitación y bienestar",
        isOpen: false,
        items: [
            {
                title: "Sesiones de Mindfulness, mentalización y respiración",
                description: "Te ofrecerán beneficios para tu salud mental, emocional y física.",
                dedication: "4 encuentros, frecuencia semanal.",
                modality: "Online y Presencial (Mar del Plata)",
                icon: "🧘‍♂️"
            },
        ],
        whatsappMessage: "Hola%20UMI,%20me%20interesa%20obtener%20más%20información%20sobre%20Capacitación%20y%20Bienestar",
        buttonText: "Quiero más información"
    },
    {
        id: 4,
        title: "¡Sumate!",
        isOpen: false,
        items: [
            {
                title: "Crear mi microformación",
                description: "Si tenés un conocimiento valioso para compartir, ¡te invitamos a crear tu microformación!",
                icon: "🚀"
            },
        ],
        whatsappMessage: "Hola%20UMI,%20me%20interesa%20sumarme%20a%20UMI%20Consultoría",
        buttonText: "Me apunto"
    },
];


// ===== FUNCIONES DEL ACORDEÓN =====
class AcordeonManager {
    constructor() {
        this.acordeonItems = [];
        this.container = document.getElementById('acordeon-container');
        this.init();
    }

    init() {
        this.renderAcordeon();
        this.setupEventListeners();
    }

    renderAcordeon() {
        if (!this.container) return;

        this.container.innerHTML = '';

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

        const header = document.createElement('div');
        header.className = 'acordeon-header';
        header.innerHTML = `
            <div class="header-left">
                <div class="header-text">
                    <h3>${itemData.title}</h3>
                </div>
            </div>
            <div class="header-right">
                <span class="toggle-icon">
                    <i class="fas ${itemData.isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}"></i>
                </span>
            </div>
        `;

        const content = document.createElement('div');
        content.className = 'acordeon-content';
        content.style.maxHeight = itemData.isOpen ? '1000px' : '0px';

        const contentWrapper = document.createElement('div');
        contentWrapper.className = 'content-wrapper';

        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'items-container';

        itemData.items.forEach((subItem, index) => {
            const subtituloItem = this.createSubtituloItem(subItem, index);
            itemsContainer.appendChild(subtituloItem);
        });

        contentWrapper.appendChild(itemsContainer);

        const whatsappButton = this.createWhatsAppButton(itemData);
        contentWrapper.appendChild(whatsappButton);

        content.appendChild(contentWrapper);
        item.appendChild(header);
        item.appendChild(content);

        if (itemData.isOpen) {
            setTimeout(() => {
                const subtitulos = item.querySelectorAll('.subtitulo-item');
                subtitulos.forEach((subtitulo, index) => {
                    setTimeout(() => {
                        subtitulo.style.opacity = '1';
                        subtitulo.style.transform = 'translateY(0)';
                    }, 100 * (index + 1));
                });
            }, 10);
        }

        return item;
    }

    createSubtituloItem(subItem, index) {
        const item = document.createElement('div');
        item.className = 'subtitulo-item';
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;

        const detailsHTML = subItem.dedication && subItem.modality ? `
            <div class="subtitulo-details">
                <div class="detail-box">
                    <span class="detail-label">Dedicación</span>
                    <span class="detail-value">${subItem.dedication}</span>
                </div>
                <div class="detail-box">
                    <span class="detail-label">Modalidad</span>
                    <span class="detail-value">${subItem.modality}</span>
                </div>
            </div>
        ` : '';

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

        return item;
    }

    createWhatsAppButton(itemData) {
        const container = document.createElement('div');
        container.className = 'whatsapp-button-container';

        container.innerHTML = `
            <a href="https://wa.me/5491121936762?text=${itemData.whatsappMessage}" 
               target="_blank" 
               class="whatsapp-category-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 448 512">
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

        this.setupHoverEffects();
    }

    setupHoverEffects() {
        setTimeout(() => {
            document.querySelectorAll('.subtitulo-item').forEach(subtitulo => {
                subtitulo.addEventListener('mouseenter', () => {
                    const icon = subtitulo.querySelector('.icon-circle');
                    const line = subtitulo.querySelector('.horizontal-line');

                    if (icon) {
                        icon.style.transform = 'scale(1.05)';
                        icon.style.boxShadow = '0 8px 30px rgba(212, 225, 87, 0.2)';
                    }

                    if (line) {
                        line.style.width = '60px';
                        line.style.background = 'linear-gradient(90deg, var(--lima), #4CAF50)';
                    }
                });

                subtitulo.addEventListener('mouseleave', () => {
                    const icon = subtitulo.querySelector('.icon-circle');
                    const line = subtitulo.querySelector('.horizontal-line');

                    if (icon) {
                        icon.style.transform = 'scale(1)';
                        icon.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.08)';
                    }

                    if (line) {
                        line.style.width = '';
                        line.style.background = '';
                    }
                });
            });
        }, 100);
    }

    toggleAcordeon(header) {
        const item = header.closest('.acordeon-item');
        if (!item) return;

        const isActive = item.classList.contains('active');

        if (!isActive) {
            this.closeAllAcordeons();
        }

        if (isActive) {
            this.closeAcordeon(item);
        } else {
            this.openAcordeon(item);
        }
    }

    openAcordeon(item) {
        item.classList.add('active');
        const content = item.querySelector('.acordeon-content');
        const icon = item.querySelector('.toggle-icon i');

        if (content) {
            content.style.maxHeight = content.scrollHeight + 'px';
        }

        if (icon) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }

        const subtitulos = item.querySelectorAll('.subtitulo-item');
        subtitulos.forEach((subtitulo, index) => {
            setTimeout(() => {
                subtitulo.style.opacity = '1';
                subtitulo.style.transform = 'translateY(0)';
            }, 100 * (index + 1));
        });
    }

    closeAcordeon(item) {
        item.classList.remove('active');
        const content = item.querySelector('.acordeon-content');
        const icon = item.querySelector('.toggle-icon i');

        if (content) {
            content.style.maxHeight = '0';
        }

        if (icon) {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }

        const subtitulos = item.querySelectorAll('.subtitulo-item');
        subtitulos.forEach(subtitulo => {
            subtitulo.style.opacity = '0';
            subtitulo.style.transform = 'translateY(20px)';
        });
    }

    closeAllAcordeons() {
        this.acordeonItems.forEach(item => {
            if (item.classList.contains('active')) {
                this.closeAcordeon(item);
            }
        });
    }

    openAllAcordeons() {
        this.acordeonItems.forEach(item => {
            this.openAcordeon(item);
        });
    }

    refreshContentHeights() {
        this.acordeonItems.forEach(item => {
            if (item.classList.contains('active')) {
                const content = item.querySelector('.acordeon-content');
                if (content) {
                    content.style.maxHeight = content.scrollHeight + 'px';
                }
            }
        });
    }
}

// ===== FUNCIONES DE NAVEGACIÓN Y SCROLL =====
class NavigationManager {
    constructor() {
        this.header = document.querySelector("header");
        this.sections = document.querySelectorAll("section");
        this.navLinks = document.querySelectorAll(".menu a, .mobile-menu a");
        this.init();
    }

    init() {
        this.setupSmoothScroll();
        this.setupScrollUI();
        this.initializeScrollState();
        this.setupMobileMenuLinks();
    }

    setupSmoothScroll() {
        document.addEventListener("click", e => {
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const targetId = link.getAttribute("href");
            if (targetId === "#") return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - SCROLL_OFFSET,
                behavior: "smooth"
            });

            this.updateActiveNavLink(targetId);
            this.closeMobileMenu();
        });
    }

    setupScrollUI() {
        window.addEventListener('scroll', () => {
            this.onScrollUI();
        });
    }

    initializeScrollState() {
        this.onScrollUI();
    }

    onScrollUI() {
        if (this.header) {
            this.header.classList.toggle("scrolled", window.scrollY > 50);
        }

        let currentSection = "";
        this.sections.forEach(sec => {
            const sectionTop = sec.offsetTop - 200;
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
        });
    }

    setupMobileMenuLinks() {
        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.closeMobileMenu();
            });
        });
    }

    closeMobileMenu() {
        const overlay = document.getElementById('mobile-overlay');
        const menu = document.getElementById('mobile-menu');
        if (overlay && menu) {
            overlay.classList.remove('active');
            menu.classList.remove('active');
            document.body.style.overflow = '';

            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }
}

// ===== CARRUSEL =====
class InfiniteCarousel {
    constructor() {
        this.events = [
            {
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
                title: "Workshop Innovación",
                subtitle: "Metodologías ágiles"
            },
            {
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop",
                title: "Networking Digital",
                subtitle: "Conexiones profesionales"
            },
            {
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
                title: "Capacitación IT",
                subtitle: "Tecnologías emergentes"
            },
            {
                image: "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=400&h=300&fit=crop",
                title: "Liderazgo",
                subtitle: "Desarrollo directivo"
            },
            {
                image: "https://images.unsplash.com/photo-1487956382158-bb926046304a?w=400&h=300&fit=crop",
                title: "Mindfulness",
                subtitle: "Bienestar laboral"
            },
            {
                image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
                title: "Mentorías",
                subtitle: "Crecimiento personal"
            },
            {
                image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=300&fit=crop",
                title: "Taller CV",
                subtitle: "Oportunidades laborales"
            },
            {
                image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
                title: "Proyectos Colaborativos",
                subtitle: "Trabajo en equipo"
            },
            {
                image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop",
                title: "Charlas Inspiradoras",
                subtitle: "Historias de éxito"
            },
            {
                image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
                title: "Formación Continua",
                subtitle: "Aprendizaje constante"
            }
        ];

        this.tracks = [
            { id: "top-track", speed: 120 },
            { id: "middle-track", speed: 100 },
            { id: "bottom-track", speed: 140 }
        ];

        this.container = document.getElementById("carousel-container");
        this.init();
    }

    init() {
        if (!this.container) return;

        this.container.innerHTML = `
            <h2>Nuestro Trayecto</h2>
            
            <div class="tracks-container">
                ${this.tracks.map(track => `
                    <div class="track" id="${track.id}">
                        <div class="track-content"></div>
                    </div>
                `).join('')}
            </div>
        `;

        this.renderTracks();

        this.waitForImages().then(() => {
            this.bindEvents();
        });
    }

    renderTracks() {
        this.tracks.forEach((track, index) => {
            const trackEl = document.getElementById(track.id);
            if (!trackEl) return;

            const trackContent = trackEl.querySelector('.track-content');

            let itemsHTML = '';
            for (let i = 0; i < 5; i++) {
                this.events.forEach(event => {
                    itemsHTML += this.createCarouselItem(event);
                });
            }

            trackContent.innerHTML = itemsHTML;
        });
    }

    createCarouselItem(event) {
        return `
            <div class="carousel-item">
                <img src="${event.image}" 
                     alt="${event.title}"
                     loading="lazy"
                     onerror="this.src='https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop'">
                <div class="item-overlay">
                    <h3>${this.escapeHTML(event.title)}</h3>
                    <p>${this.escapeHTML(event.subtitle)}</p>
                </div>
            </div>
        `;
    }

    async waitForImages() {
        const images = document.querySelectorAll('.carousel-item img');
        const promises = Array.from(images).map(img => {
            if (img.complete) return Promise.resolve();
            return new Promise(resolve => {
                img.onload = resolve;
                img.onerror = resolve;
            });
        });

        await Promise.all(promises);
    }


    escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ===== MENÚ MÓVIL =====
class MobileMenuManager {
    constructor() {
        this.menuToggle = document.getElementById('menu-toggle');
        this.mobileOverlay = document.getElementById('mobile-overlay');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.init();
    }

    init() {
        if (!this.menuToggle || !this.mobileMenu) return;

        this.menuToggle.addEventListener('click', () => this.toggleMobileMenu());
        this.mobileOverlay.addEventListener('click', () => this.closeMobileMenu());

        const mobileLinks = document.querySelectorAll('.mobile-menu a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeMobileMenu();
        });
    }

    toggleMobileMenu() {
        if (this.mobileMenu.classList.contains('active')) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.mobileOverlay.classList.add('active');
        this.mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    }

    closeMobileMenu() {
        this.mobileOverlay.classList.remove('active');
        this.mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        this.menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
}

// ===== INICIALIZACIÓN =====
let acordeonManager, navigationManager, carousel, mobileMenuManager;

document.addEventListener('DOMContentLoaded', function () {
    console.log('Inicializando UMI...');

    acordeonManager = new AcordeonManager();

    navigationManager = new NavigationManager();

    mobileMenuManager = new MobileMenuManager();

    if (document.getElementById("carousel-container")) {
        carousel = new InfiniteCarousel();
    }

    window.addEventListener('resize', function () {
        if (acordeonManager) {
            acordeonManager.refreshContentHeights();
        }
    });

    function handleResize() {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileOverlay = document.getElementById('mobile-overlay');

        if (window.innerWidth > 992) {
            mobileMenu.classList.remove('active');
            mobileOverlay.classList.remove('active');
            document.body.style.overflow = '';

            const menuToggle = document.getElementById('menu-toggle');
            if (menuToggle) {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    }

    window.addEventListener('resize', handleResize);
});

// ===== FUNCIONES GLOBALES =====
window.openAllAcordeons = function () {
    if (acordeonManager) {
        acordeonManager.openAllAcordeons();
    }
};

window.closeAllAcordeons = function () {
    if (acordeonManager) {
        acordeonManager.closeAllAcordeons();
    }
};

window.toggleAcordeon = function (header) {
    if (acordeonManager) {
        acordeonManager.toggleAcordeon(header);
    }
};

window.scrollToContact = function () {
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
        window.scrollTo({
            top: contactSection.offsetTop - SCROLL_OFFSET,
            behavior: "smooth"
        });

        if (navigationManager) {
            navigationManager.updateActiveNavLink('#contact');
        }
    }
};

window.openMobileMenu = function () {
    if (mobileMenuManager) {
        mobileMenuManager.openMobileMenu();
    }
};

window.closeMobileMenu = function () {
    if (mobileMenuManager) {
        mobileMenuManager.closeMobileMenu();
    }
};