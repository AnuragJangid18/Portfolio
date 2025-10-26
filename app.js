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
        
        // Form Submission
        function handleSubmit(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            alert(`Thank you, ${name}! Your message has been received. I'll get back to you at ${email} soon.`);
            
            // Reset form
            event.target.reset();
        }