/* ═══════════════════════════════════════════════════════
   BURRA KATHA — SCRIPT.JS
   Interactive behaviors & animations
═══════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL BEHAVIOR ────────────────────── */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Navbar sticky style
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button
    if (scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  /* ─── BACK TO TOP ───────────────────────────────── */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── HAMBURGER MENU ────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  // Close on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ─── SMOOTH SCROLL FOR ANCHOR LINKS ───────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // navbar height
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── INTERSECTION OBSERVER — REVEAL ANIMATIONS ─ */
  const revealElements = document.querySelectorAll(
    '.service-card, .why-feature, .work-card, .testimonial-card, ' +
    '.process-step, .about-grid, .contact-grid, .comparison-card, ' +
    '.stat-item, .pillar'
  );

  revealElements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${(i % 4) * 0.1}s, transform 0.6s ease ${(i % 4) * 0.1}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealElements.forEach(el => observer.observe(el));

  /* ─── SECTION HEADERS ANIMATION ─────────────────── */
  const sectionHeaders = document.querySelectorAll('.section-header, .about-content, .contact-info');
  sectionHeaders.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  });

  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  sectionHeaders.forEach(el => headerObserver.observe(el));

  /* ─── FLOATING PARTICLES ────────────────────────── */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const colors = ['#E8431A', '#FF6B3D', '#FF9A6C', '#FFD4C2'];
    const count = 20;

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 8 + 6;
      const color = colors[Math.floor(Math.random() * colors.length)];

      particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        bottom: ${Math.random() * 20}%;
        background: ${color};
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        border-radius: 50%;
      `;

      particlesContainer.appendChild(particle);
    }
  }

  /* ─── ACTIVE NAV LINK ON SCROLL ─────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinksAll = document.querySelectorAll('.nav-link:not(.nav-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinksAll.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${id}`) {
            link.style.color = 'var(--orange)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => sectionObserver.observe(section));

  /* ─── CONTACT FORM HANDLER ──────────────────────── */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  function showToast(message, isError = false) {
    toastMsg.textContent = message;
    toast.style.borderColor = isError ? 'rgba(239,68,68,0.4)' : 'rgba(52,211,153,0.4)';
    toast.style.color = isError ? '#f87171' : '#34d399';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const phone = document.getElementById('form-phone').value.trim();
      const business = document.getElementById('form-business').value;
      const service = document.getElementById('form-service').value;

      if (!name || !phone || !business || !service) {
        showToast('Please fill in all required fields.', true);
        return;
      }

      if (phone.length < 10) {
        showToast('Please enter a valid phone number.', true);
        return;
      }

      // Simulate form submission
      const submitBtn = document.getElementById('form-submit');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        showToast("Message sent! We'll get back to you soon. 🎉");
        contactForm.reset();
        submitBtn.textContent = 'Send Message 🚀';
        submitBtn.disabled = false;
      }, 1500);

      /* 
        PLACEHOLDER: Integrate with a real form backend:
        - Formspree: https://formspree.io (add action="https://formspree.io/f/YOUR_ID" to form)
        - EmailJS: for direct email sending from JavaScript
        - Google Forms: embed or use their API
        - WhatsApp API: direct message with wa.me link
      */
    });
  }

  /* ─── COUNTER ANIMATION FOR STATS ───────────────── */
  function animateCounter(el, target, suffix = '') {
    const start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const step = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const text = el.textContent;
        const num = parseInt(text.replace(/[^0-9]/g, ''));
        const suffix = text.replace(/[0-9]/g, '');
        animateCounter(el, num, suffix);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  statNumbers.forEach(el => statsObserver.observe(el));

  /* ─── TILT EFFECT ON SERVICE CARDS ──────────────── */
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${y * -8}deg) rotateY(${x * 8}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  /* ─── WORK CARD HOVER COLORS ─────────────────────── */
  const workColors = [
    'rgba(251, 146, 60, 0.1)',
    'rgba(167, 139, 250, 0.1)',
    'rgba(52, 211, 153, 0.1)',
    'rgba(251, 191, 36, 0.1)',
    'rgba(99, 179, 237, 0.1)',
  ];
  document.querySelectorAll('.work-card').forEach((card, i) => {
    card.addEventListener('mouseenter', () => {
      card.style.background = workColors[i % workColors.length];
    });
    card.addEventListener('mouseleave', () => {
      card.style.background = '';
    });
  });

  /* ─── LOGO CLICK EASTER EGG ─────────────────────── */
  let logoClicks = 0;
  const navLogo = document.getElementById('nav-logo-link');
  if (navLogo) {
    navLogo.addEventListener('click', () => {
      logoClicks++;
      if (logoClicks === 5) {
        showToast('🎺 బుర్ర కథ — The voice of your brand! 🔥');
        logoClicks = 0;
      }
    });
  }

  console.log('%c🎺 Burra Katha', 'color: #E8431A; font-size: 24px; font-weight: bold; font-family: sans-serif;');
  console.log('%cYour Story, Told Boldly.', 'color: #A0A0AB; font-size: 14px; font-family: sans-serif;');
});
