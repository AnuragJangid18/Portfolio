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
        function showSection(sectionId) {
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
            event.currentTarget.classList.add('active');
            
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

            // Optional: simple honeypot (add a hidden input with id="company" in the form to reduce spam)
            const honey = document.getElementById('company');
            if (honey && honey.value) return; // bot detected, silently stop

            // Disable button while sending
            const originalText = btn ? btn.textContent : null;
            if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

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
                    alert(`Thanks, ${name}! Your message has been sent ✅`);
                    event.target.reset();
                })
                .catch((err) => {
                    console.error(err);
                    alert('Sorry, there was a problem sending your message. Please try again.');
                })
                .finally(() => {
                    if (btn) { btn.disabled = false; btn.textContent = originalText || 'Send Message'; }
                });
        
            }