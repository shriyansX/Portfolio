// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
if (currentTheme === 'light') {
    body.setAttribute('data-theme', 'light');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
} else {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.add('theme-transition');
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    themeToggle.innerHTML = newTheme === 'dark' 
        ? '<i class="fas fa-sun"></i> Light Mode'
        : '<i class="fas fa-moon"></i> Dark Mode';
    
    // Remove transition class after animation completes
    setTimeout(() => body.classList.remove('theme-transition'), 300);
});

// Typing Animation
const typed = new Typed('#element', {
    strings: [
        'Web Developer 💻',
        'Video Editor 🎥',
        'UI/UX Designer 🎨'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    startDelay: 500,
    loop: true,
    showCursor: true,
    cursorChar: '|',
    fadeOut: true,
    fadeOutClass: 'typed-fade-out',
    fadeOutDelay: 500
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const navHeight = document.querySelector('nav').offsetHeight;
        
        window.scrollTo({
            top: targetElement.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});

// Navbar Scroll Effect
const nav = document.querySelector('nav');
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Scroll to Top Button
const scrollTopBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('section, .skills-grid li, .social-links a').forEach(el => {
    observer.observe(el);
});

// Active Section Highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('nav ul li a');

window.addEventListener('scroll', () => {
    let current = '';
    const navHeight = nav.offsetHeight;

    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Contact Form Handling
const contactForm = document.querySelector('#contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button');
    const originalBtnText = submitBtn.textContent;
    
    // Form validation
    const formData = new FormData(contactForm);
    let isValid = true;
    
    formData.forEach((value, key) => {
        const input = contactForm.querySelector(`[name=${key}]`);
        if (!value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
        }
    });
    
    if (!isValid) return;
    
    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    try {
        // Simulate form submission (replace with actual API call)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success
        alert('Message sent successfully!');
        contactForm.reset();
    } catch (error) {
        alert('Failed to send message. Please try again.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
    }
});

// Mobile Nav Toggle
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        document.documentElement.classList.toggle('nav-open');
    });
    // Close nav when clicking a link
    document.querySelectorAll('nav ul a').forEach(link => link.addEventListener('click', () => {
        document.documentElement.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
    }));
}

// Resume Modal Logic
const resumeModal = document.getElementById('resume-modal');
const openResumeBtns = document.querySelectorAll('[data-open-resume]');
const closeResumeBtns = document.querySelectorAll('[data-close-resume]');
let lastFocusedElement = null;

function openResume() {
    if (!resumeModal) return;
    lastFocusedElement = document.activeElement;
    resumeModal.classList.add('show');
    resumeModal.setAttribute('aria-hidden', 'false');
    // Focus first actionable element
    const focusTarget = resumeModal.querySelector('.modal-actions .btn, [data-close-resume]') || resumeModal;
    focusTarget.focus({ preventScroll: true });
    document.body.style.overflow = 'hidden';
}

function closeResume() {
    if (!resumeModal) return;
    resumeModal.classList.remove('show');
    resumeModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocusedElement) lastFocusedElement.focus({ preventScroll: true });
}

openResumeBtns.forEach(btn => btn.addEventListener('click', openResume));
// Direct listeners (fix close icon not working when clicking inner <i>)
closeResumeBtns.forEach(btn => btn.addEventListener('click', closeResume));

// Delegated (backdrop + any dynamically added close buttons)
resumeModal?.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop') || e.target.closest('[data-close-resume]')) {
        closeResume();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('show')) {
        closeResume();
    }
    // Basic focus trap
    if (e.key === 'Tab' && resumeModal?.classList.contains('show')) {
        const focusable = resumeModal.querySelectorAll('a[href], button:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
});

// Animated counters in hero
const counters = document.querySelectorAll('[data-counter]');
const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const el = entry.target;
            const target = parseInt(el.getAttribute('target'),10) || 0;
            const suffix = el.getAttribute('data-suffix') || '';
            const numEl = el.querySelector('.number');
            let start = 0; const duration = 1400; const startTime = performance.now();
            function tick(now){
                const progress = Math.min((now - startTime)/duration,1);
                const value = Math.floor(progress*target);
                numEl.textContent = value + suffix;
                if(progress < 1) requestAnimationFrame(tick); else numEl.textContent = target + suffix;
            }
            requestAnimationFrame(tick);
            counterObserver.unobserve(el);
        }
    });
},{ threshold:0.4 });
counters.forEach(c=>counterObserver.observe(c));

// Skill bar fill
const skillBars = document.querySelectorAll('.bar');
const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const level = entry.target.getAttribute('data-level');
            const fill = entry.target.querySelector('.bar-track div');
            requestAnimationFrame(()=>{ fill.style.width = level + '%'; });
            barObserver.unobserve(entry.target);
        }
    });
},{ threshold:0.3 });
skillBars.forEach(b=>barObserver.observe(b));