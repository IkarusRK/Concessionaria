const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');

        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Fechar menu ao clicar em um link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
}

function animateNumbers() {
    const numbers = document.querySelectorAll('.stat-number, .number-value');

    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                const duration = 2000; 
                const increment = target / (duration / 16); // 60fps
                let current = 0;

                const updateNumber = () => {
                    current += increment;
                    if (current < target) {
                        entry.target.textContent = Math.floor(current);
                        requestAnimationFrame(updateNumber);
                    } else {
                        entry.target.textContent = target;
                    }
                };

                updateNumber();
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    numbers.forEach(number => {
        observer.observe(number);
    });
}

// Executar animação de números quando a página carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateNumbers);
} else {
    animateNumbers();
}

const categoryFilter = document.getElementById('categoryFilter');
const priceFilter = document.getElementById('priceFilter');
const yearFilter = document.getElementById('yearFilter');
const conditionFilter = document.getElementById('conditionFilter');
const clearFiltersBtn = document.getElementById('clearFilters');
const applyFiltersBtn = document.getElementById('applyFilters');
const catalogGrid = document.getElementById('catalogGrid');
const resultsCount = document.getElementById('resultsCount');

function applyFilters() {
    if (!catalogGrid) return;

    const vehicles = catalogGrid.querySelectorAll('.vehicle-card');
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all';
    const selectedPrice = priceFilter ? priceFilter.value : 'all';
    const selectedYear = yearFilter ? yearFilter.value : 'all';
    const selectedCondition = conditionFilter ? conditionFilter.value : 'all';

    let visibleCount = 0;

    vehicles.forEach(vehicle => {
        const category = vehicle.getAttribute('data-category');
        const price = parseInt(vehicle.getAttribute('data-price'));
        const year = parseInt(vehicle.getAttribute('data-year'));
        const condition = vehicle.getAttribute('data-condition');

        let showVehicle = true;

        // Filtro de categoria
        if (selectedCategory !== 'all' && category !== selectedCategory) {
            showVehicle = false;
        }

        // Filtro de preço
        if (selectedPrice !== 'all') {
            if (selectedPrice === '0-200k' && price > 200000) showVehicle = false;
            if (selectedPrice === '200k-400k' && (price < 200000 || price > 400000)) showVehicle = false;
            if (selectedPrice === '400k-600k' && (price < 400000 || price > 600000)) showVehicle = false;
            if (selectedPrice === '600k+' && price < 600000) showVehicle = false;
        }

        // Filtro de ano
        if (selectedYear !== 'all') {
            if (selectedYear === '2024' && year !== 2024) showVehicle = false;
            if (selectedYear === '2023' && year !== 2023) showVehicle = false;
            if (selectedYear === '2022' && year !== 2022) showVehicle = false;
            if (selectedYear === '2021' && year < 2021) showVehicle = false;
        }

        // Filtro de condição
        if (selectedCondition !== 'all' && condition !== selectedCondition) {
            showVehicle = false;
        }

        // Mostrar ou ocultar veículo
        if (showVehicle) {
            vehicle.style.display = 'block';
            visibleCount++;
        } else {
            vehicle.style.display = 'none';
        }
    });

    if (resultsCount) {
        if (visibleCount === vehicles.length) {
            resultsCount.textContent = `Exibindo todos os ${visibleCount} veículos`;
        } else {
            resultsCount.textContent = `Exibindo ${visibleCount} de ${vehicles.length} veículos`;
        }
    }
}

if (applyFiltersBtn) {
    applyFiltersBtn.addEventListener('click', applyFilters);
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', applyFilters);
}

if (priceFilter) {
    priceFilter.addEventListener('change', applyFilters);
}

if (yearFilter) {
    yearFilter.addEventListener('change', applyFilters);
}

if (conditionFilter) {
    conditionFilter.addEventListener('change', applyFilters);
}

// Limpar todos os filtros
if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', () => {
        if (categoryFilter) categoryFilter.value = 'all';
        if (priceFilter) priceFilter.value = 'all';
        if (yearFilter) yearFilter.value = 'all';
        if (conditionFilter) conditionFilter.value = 'all';
        applyFilters();
    });
}

const modal = document.getElementById('carModal');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');

function openModal(vehicleName, vehiclePrice) {
    if (!modal) return;

    if (modalTitle) modalTitle.textContent = vehicleName;
    if (modalPrice) modalPrice.textContent = vehiclePrice;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modal) return;

    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

if (modal) {
    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
        closeModal();
    }
});

window.openModal = openModal;
window.closeModal = closeModal;

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    if (question) {
        question.addEventListener('click', () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            item.classList.toggle('active');
        });
    }
});

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const assunto = document.getElementById('assunto').value;
        const mensagem = document.getElementById('mensagem').value.trim();
        const aceite = document.getElementById('aceite').checked;

        if (!nome || !email || !telefone || !assunto || !mensagem) {
            showFormMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        if (!aceite) {
            showFormMessage('Você deve aceitar a política de privacidade.', 'error');
            return;
        }

        showFormMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');

        setTimeout(() => {
            contactForm.reset();
            if (formMessage) {
                formMessage.style.display = 'none';
            }
        }, 3000);
    });
}

function showFormMessage(message, type) {
    if (!formMessage) return;

    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;
    formMessage.style.display = 'block';

    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

const telefoneInput = document.getElementById('telefone');

if (telefoneInput) {
    telefoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        if (value.length > 10) {
            value = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
        } else if (value.length > 6) {
            value = value.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
        } else if (value.length > 2) {
            value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
        } else if (value.length > 0) {
            value = value.replace(/^(\d*)/, '($1');
        }

        e.target.value = value;
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#' || href === '') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);

        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

function observeElements() {
    const animatedElements = document.querySelectorAll('.vehicle-card, .service-card, .testimonial-card, .team-card, .award-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';

                setTimeout(() => {
                    entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', observeElements);
} else {
    observeElements();
}

let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }

    lastScroll = currentScroll;
});

const searchForms = document.querySelectorAll('form[role="search"]');
searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
    });
});

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    observer.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

function setActiveNavLink() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');

        link.classList.remove('active');

        if (currentPath.includes(linkPath) && linkPath !== '#') {
            link.classList.add('active');
        }

        if ((currentPath === '/' || currentPath.includes('index.html')) && linkPath.includes('index.html')) {
            link.classList.add('active');
        }
    });
}

setActiveNavLink();

console.log('%c🚗 AutoElite Premium', 'font-size: 24px; font-weight: bold; color: #e94560;');
console.log('%cSite desenvolvido com tecnologias modernas', 'font-size: 14px; color: #1a1a2e;');
console.log('%cHTML5 • CSS3 • JavaScript ES6+', 'font-size: 12px; color: #6c757d;');

let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('Resize finalizado');
    }, 250);
});