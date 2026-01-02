        // Объединенный JavaScript: script-2.js, script-3.js и script.js
        
        // Часть из script-2.js - кастомный курсор с улучшениями
        document.addEventListener('DOMContentLoaded', () => {
            const cursor = document.querySelector('.cursor');
            const follower = document.querySelector('.cursor-follower');
            
            // Проверяем, мобильное ли устройство
            function isTouchDevice() {
                return (('ontouchstart' in window) ||
                    (navigator.maxTouchPoints > 0) ||
                    (navigator.msMaxTouchPoints > 0));
            }
            
            // Если не мобильное устройство, активируем кастомный курсор
            if (!isTouchDevice()) {
                document.addEventListener('mousemove', (e) => {
                    cursor.style.left = e.clientX + 'px';
                    cursor.style.top = e.clientY + 'px';
                    
                    setTimeout(() => {
                        follower.style.left = e.clientX + 'px';
                        follower.style.top = e.clientY + 'px';
                    }, 100);
                });
                
                // Добавляем эффект при наведении на кликабельные элементы
                document.querySelectorAll('a, button, .btn, .theme-toggle, .filter-btn, .form-control, .social-link, .social-toggle, .social-button, .faq-question, .document-link, .cookie-btn').forEach(el => {
                    el.addEventListener('mouseenter', () => {
                        cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                        cursor.style.backgroundColor = '#ff00ff';
                        cursor.style.boxShadow = 
                            '0 0 15px #ff00ff,' +
                            '0 0 25px #ff00ff,' +
                            '0 0 35px #ff00ff,' +
                            '0 0 50px rgb(255, 0, 255),' +
                            '0 0 90px rgb(255, 0, 255),' +
                            '0 0 110px rgb(255, 0, 255)';
                    });
                    
                    el.addEventListener('mouseleave', () => {
                        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                        cursor.style.backgroundColor = '#a200ff';
                        cursor.style.boxShadow = 
                            '0 0 10px #c401ff,' +
                            '0 0 20px #5900ff,' +
                            '0 0 30px #86007b,' +
                            '0 0 40px rgb(60, 0, 128),' +
                            '0 0 70px rgb(64, 0, 77),' +
                            '0 0 80px rgb(0, 11, 110)';
                    });
                });
                
                // Специальный эффект для активных кнопок фильтров
                document.querySelectorAll('.filter-btn.active').forEach(btn => {
                    cursor.style.backgroundColor = '#4c63ff';
                });
                
                document.addEventListener('mousedown', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(0.7)';
                });
                
                document.addEventListener('mouseup', () => {
                    cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                });
            } else {
                // На мобильных устройствах скрываем кастомный курсор
                cursor.style.display = 'none';
                follower.style.display = 'none';
            }
        });
        
        // Часть из script-3.js - обработка лоадера
        const loader = document.getElementById('loader');
        
        // Плавное скрытие лоадера после загрузки страницы
        window.addEventListener('load', function() {
            // Имитация загрузки - можно убрать в реальном проекте
            setTimeout(function() {
                loader.classList.add('hidden');
                
                // Показываем основное содержимое
                document.body.style.opacity = '1';
                
                // Инициализация анимаций после загрузки
                initAnimations();
            }, 2000); // Задержка для демонстрации лоадера
        });
        
        function initAnimations() {
            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            const body = document.body;
            
            // Проверяем сохраненную тему
            const savedTheme = localStorage.getItem('theme') || 'dark';
            body.setAttribute('data-theme', savedTheme);
            
            themeToggle.addEventListener('click', () => {
                const currentTheme = body.getAttribute('data-theme');
                const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
                
                body.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
                
                // Анимация переключения
                themeToggle.style.transform = 'rotate(360deg)';
                setTimeout(() => {
                    themeToggle.style.transform = 'rotate(0deg)';
                }, 300);
            });
            
            // Cookie Consent Logic
            const cookieConsent = document.getElementById('cookieConsent');
            const cookieAccept = document.getElementById('cookieAccept');
            
            // Проверяем, давал ли пользователь согласие ранее
            const cookieAccepted = localStorage.getItem('cookieAccepted');
            
            // Если согласие не дано, показываем окно через 2 секунды после загрузки
            if (!cookieAccepted) {
                setTimeout(() => {
                    cookieConsent.classList.add('show');
                }, 2000);
            }
            
            // Обработчик нажатия на кнопку согласия
            cookieAccept.addEventListener('click', () => {
                // Сохраняем согласие в localStorage
                localStorage.setItem('cookieAccepted', 'true');
                
                // Скрываем окно с анимацией
                cookieConsent.classList.remove('show');
                setTimeout(() => {
                    cookieConsent.style.display = 'none';
                }, 500);
                
                // Показываем уведомление
                showNotification('Спасибо! Ваше согласие сохранено.', 'success');
            });
            
            // Particles.js config - из script.js
            particlesJS('particles-js', {
                particles: {
                    number: { value: 80, density: { enable: true, value_area: 800 } },
                    color: { value: "#6c63ff" },
                    shape: { type: "circle" },
                    opacity: { value: 0.5, random: true },
                    size: { value: 3, random: true },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: "#6c63ff",
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: "none",
                        random: true,
                        straight: false,
                        out_mode: "out",
                        bounce: false
                    }
                },
                interactivity: {
                    detect_on: "canvas",
                    events: {
                        onhover: { enable: true, mode: "repulse" },
                        onclick: { enable: true, mode: "push" },
                        resize: true
                    }
                },
                retina_detect: true
            });

            // Menu toggle - из script.js
            const menuToggle = document.getElementById('menuToggle');
            const navLinks = document.getElementById('navLinks');
            
            menuToggle.addEventListener('click', () => {
                navLinks.classList.toggle('active');
            });
            
            // Close menu when clicking on a link - из script.js
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('active');
                });
            });
            
            // Header scroll effect - из script.js
            window.addEventListener('scroll', () => {
                const header = document.querySelector('header');
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            });
            
            // Portfolio filtering - из script.js
            const filterBtns = document.querySelectorAll('.filter-btn');
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            
            filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Remove active class from all buttons
                    filterBtns.forEach(b => b.classList.remove('active'));
                    // Add active class to clicked button
                    btn.classList.add('active');
                    
                    const filter = btn.getAttribute('data-filter');
                    
                    portfolioItems.forEach(item => {
                        if (filter === 'all' || item.getAttribute('data-category') === filter) {
                            item.style.display = 'block';
                        } else {
                            item.style.display = 'none';
                        }
                    });
                });
            });
            
            // FAQ Accordion
            const faqItems = document.querySelectorAll('.faq-item');
            
            faqItems.forEach(item => {
                const question = item.querySelector('.faq-question');
                
                question.addEventListener('click', () => {
                    // Close all other items
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item && otherItem.classList.contains('active')) {
                            otherItem.classList.remove('active');
                        }
                    });
                    
                    // Toggle current item
                    item.classList.toggle('active');
                });
            });
            
            // Floating Social Button Toggle
            const socialToggle = document.getElementById('socialToggle');
            const socialButtons = document.getElementById('socialButtons');
            
            socialToggle.addEventListener('click', () => {
                socialButtons.classList.toggle('active');
            });
            
            // Close social buttons when clicking outside
            document.addEventListener('click', (e) => {
                if (!e.target.closest('.floating-social') && socialButtons.classList.contains('active')) {
                    socialButtons.classList.remove('active');
                }
            });
            
            // Scroll animations - из script.js
            function checkScroll() {
                const elements = document.querySelectorAll('.animate-on-scroll');
                
                elements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (elementPosition < screenPosition) {
                        element.classList.add('visible');
                    }
                });
            }
            
            window.addEventListener('scroll', checkScroll);
            checkScroll();
            
            // Form submission with Formspree - из script.js
            const contactForm = document.getElementById('contactForm');
            const notification = document.getElementById('notification');
            
            contactForm.addEventListener('submit', async function(e) {
                e.preventDefault();
                
                const formData = new FormData(contactForm);
                
                try {
                    const response = await fetch(contactForm.action, {
                        method: 'POST',
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    });
                    
                    if (response.ok) {
                        showNotification('Сообщение успешно отправлено!', 'success');
                        contactForm.reset();
                    } else {
                        showNotification('Произошла ошибка. Попробуйте еще раз.', 'error');
                    }
                } catch (error) {
                    showNotification('Ошибка сети. Проверьте подключение к интернету.', 'error');
                }
            });
            
            // Show notification function - из script.js
            function showNotification(message, type) {
                notification.textContent = message;
                notification.className = `notification ${type} show`;
                
                setTimeout(() => {
                    notification.classList.remove('show');
                }, 5000);
            }
            
            // Smooth scrolling for anchor links - из script.js
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
        }