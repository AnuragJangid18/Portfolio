        // Theme Management
        function toggleTheme() {
            const body = document.body;
            const themeToggle = document.getElementById('themeToggle');
            const currentTheme = body.getAttribute('data-theme');
            
            if (currentTheme === 'dark') {
                body.removeAttribute('data-theme');
                themeToggle.textContent = '🌙 Dark Mode';
                localStorage.setItem('theme', 'light');
            } else {
                body.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️ Light Mode';
                localStorage.setItem('theme', 'dark');
            }
        }
        
        // Load saved theme
        window.addEventListener('DOMContentLoaded', () => {
            const savedTheme = localStorage.getItem('theme');
            const themeToggle = document.getElementById('themeToggle');
            
            if (savedTheme === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                themeToggle.textContent = '☀️ Light Mode';
            }
        });
        
        // Navigation
        function showSection(sectionId, element) {
            const sections = document.querySelectorAll('.section');
            const navLinks = document.querySelectorAll('.nav-link');
            const navbarTitle = document.getElementById('navbarTitle');
            
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            
            document.getElementById(sectionId).classList.add('active');
            if (element) element.classList.add('active');
            
            // Update navbar title
            const titles = {
                'home': 'Home',
                'about': 'About Me',
                'dashboard': 'Dashboard',
                'contact': 'Contact'
            };
            navbarTitle.textContent = titles[sectionId];
            
            // Close mobile sidebar
            if (window.innerWidth <= 768) {
                document.getElementById('sidebar').classList.remove('mobile-open');
            }
        }
        
        // Sidebar Toggle
        function toggleSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('collapsed');
        }
        
        function toggleMobileSidebar() {
            const sidebar = document.getElementById('sidebar');
            sidebar.classList.toggle('mobile-open');
        }
        
        // EmailJS form submission
        function sendEmail(event) {
            event.preventDefault();

            const btn = event.submitter || event.target.querySelector('button[type="submit"]');
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            // Validation
            if (!name || name.length < 2) {
                showFormMessage('Please enter a valid name', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showFormMessage('Please enter a valid email address', 'error');
                return;
            }

            if (!message || message.length < 10) {
                showFormMessage('Please enter a message (at least 10 characters)', 'error');
                return;
            }

            // Optional: simple honeypot (add a hidden input with id="company" in the form to reduce spam)
            const honey = document.getElementById('company');
            if (honey && honey.value) return; // bot detected, silently stop

            // Disable button while sending
            const originalText = btn ? btn.textContent : null;
            if (btn) { 
                btn.disabled = true; 
                btn.textContent = '✉️ Sending…';
                btn.style.opacity = '0.7';
            }

            // Map to your EmailJS template variables
            const params = {
                from_name: name,     // {{from_name}} in your EmailJS template
                reply_to: email,     // {{reply_to}}
                message: message     // {{message}}
            };

            // Replace with your actual IDs from EmailJS
            const SERVICE_ID = 'service_ca6dgsd';
            const TEMPLATE_ID = 'template_8yxwved';

            emailjs.send(SERVICE_ID, TEMPLATE_ID, params)
                .then(() => {
                    showFormMessage(`Thanks, ${name}! Your message has been sent successfully ✅`, 'success');
                    event.target.reset();
                })
                .catch((err) => {
                    console.error('EmailJS Error:', err);
                    showFormMessage('Sorry, there was a problem sending your message. Please try again or contact me directly via email.', 'error');
                })
                .finally(() => {
                    if (btn) { 
                        btn.disabled = false; 
                        btn.textContent = originalText || 'Send Message';
                        btn.style.opacity = '1';
                    }
                });
        }

        // Email validation helper
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        // Form message display helper
        function showFormMessage(message, type) {
            // Remove existing message
            const existingMsg = document.getElementById('formMessage');
            if (existingMsg) existingMsg.remove();

            // Create new message
            const msgDiv = document.createElement('div');
            msgDiv.id = 'formMessage';
            msgDiv.className = `form-message form-message-${type}`;
            msgDiv.textContent = message;
            msgDiv.style.cssText = `
                padding: 1rem;
                margin: 1rem 0;
                border-radius: 8px;
                font-weight: 500;
                animation: slideIn 0.3s ease;
                ${type === 'success' ? 
                    'background-color: #d1fae5; color: #065f46; border: 1px solid #34d399;' : 
                    'background-color: #fee2e2; color: #991b1b; border: 1px solid #f87171;'}
            `;

            // Insert message
            const form = document.querySelector('.contact-form form');
            form.insertBefore(msgDiv, form.firstChild);

            // Auto-remove after 5 seconds
            setTimeout(() => {
                if (msgDiv && msgDiv.parentNode) {
                    msgDiv.style.animation = 'slideOut 0.3s ease';
                    setTimeout(() => msgDiv.remove(), 300);
                }
            }, 5000);
        }

        // Smooth scroll to top button
        function createScrollTopButton() {
            const scrollBtn = document.createElement('button');
            scrollBtn.id = 'scrollTopBtn';
            scrollBtn.innerHTML = '↑';
            scrollBtn.setAttribute('aria-label', 'Scroll to top');
            scrollBtn.style.cssText = `
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: var(--color-primary);
                color: white;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                opacity: 0;
                visibility: hidden;
                transition: all 0.3s ease;
                z-index: 1000;
                box-shadow: 0 4px 12px var(--color-shadow);
            `;

            scrollBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });

            document.body.appendChild(scrollBtn);

            // Show/hide on scroll
            window.addEventListener('scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollBtn.style.opacity = '1';
                    scrollBtn.style.visibility = 'visible';
                } else {
                    scrollBtn.style.opacity = '0';
                    scrollBtn.style.visibility = 'hidden';
                }
            });
        }

        // Initialize scroll to top button
        window.addEventListener('DOMContentLoaded', createScrollTopButton);

        // Mobile Browser Optimizations
        window.addEventListener('DOMContentLoaded', initMobileOptimizations);

        function initMobileOptimizations() {
            // Prevent pull-to-refresh on mobile
            let touchStartY = 0;
            document.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            }, { passive: false });

            document.addEventListener('touchmove', (e) => {
                const touchY = e.touches[0].clientY;
                const touchDiff = touchY - touchStartY;
                
                // Prevent pull-to-refresh at top of page
                if (window.scrollY === 0 && touchDiff > 0) {
                    e.preventDefault();
                }
            }, { passive: false });

            // Add touch feedback for buttons
            const buttons = document.querySelectorAll('.btn, .nav-link, .contact-icon');
            buttons.forEach(btn => {
                btn.addEventListener('touchstart', function() {
                    this.style.opacity = '0.7';
                }, { passive: true });
                
                btn.addEventListener('touchend', function() {
                    this.style.opacity = '1';
                }, { passive: true });
            });

            // Optimize images for mobile
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                img.setAttribute('loading', 'lazy');
                img.style.willChange = 'transform';
            });

            // Improve mobile menu accessibility
            const sidebar = document.getElementById('sidebar');
            let touchStartX = 0;
            let touchEndX = 0;

            // Swipe to close sidebar on mobile
            if (window.innerWidth <= 768) {
                sidebar.addEventListener('touchstart', (e) => {
                    touchStartX = e.changedTouches[0].screenX;
                }, { passive: true });

                sidebar.addEventListener('touchend', (e) => {
                    touchEndX = e.changedTouches[0].screenX;
                    handleSwipe();
                }, { passive: true });

                function handleSwipe() {
                    if (touchStartX - touchEndX > 50) {
                        // Swipe left - close sidebar
                        sidebar.classList.remove('mobile-open');
                    }
                }
            }

            // Add viewport height fix for mobile browsers
            function setVH() {
                let vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            }
            
            setVH();
            window.addEventListener('resize', setVH);
            window.addEventListener('orientationchange', setVH);

            // Prevent zoom on input focus (iOS)
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('focus', () => {
                    input.style.fontSize = '16px'; // Prevents auto-zoom on iOS
                });
            });

            // Add safe area padding for notched devices
            if (CSS.supports('padding-top: env(safe-area-inset-top)')) {
                document.querySelector('.navbar').style.paddingTop = 'calc(1rem + env(safe-area-inset-top))';
            }

            // Performance: Reduce animations on low-end devices
            if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
                document.body.classList.add('reduce-motion');
            }
        }