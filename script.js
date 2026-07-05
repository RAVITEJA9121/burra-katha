/* ═══════════════════════════════════════════════════════
   BURRA KATHA — SCRIPT.JS
   Interactive behaviors & animations
═══════════════════════════════════════════════════════ */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL BEHAVIOR ────────────────────── */
  const navbar     = document.getElementById('navbar');
  const backToTop  = document.getElementById('back-to-top');

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 60);
    backToTop.classList.toggle('visible', y > 400);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* ─── BACK TO TOP ───────────────────────────────── */
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ─── HAMBURGER MENU ────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  const closeMenu = () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target) && navLinks.classList.contains('open')) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) closeMenu();
  });

  /* ─── SMOOTH SCROLL FOR ANCHOR LINKS ───────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const offset = 72;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── ACTIVE NAV LINK ON SCROLL ─────────────────── */
  const sections     = document.querySelectorAll('section[id]');
  const navLinkItems = document.querySelectorAll('.nav-link:not(.nav-cta)');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinkItems.forEach(link => {
          const active = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', active);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => sectionObserver.observe(s));

  /* ─── INTERSECTION OBSERVER — SCROLL REVEAL ──────── */
  const revealConfig = {
    '.service-card':        { cls: 'reveal-up', delay: true },
    '.why-feature':         { cls: 'reveal-up', delay: true },
    '.testimonial-card':    { cls: 'reveal-up', delay: true },
    '.process-step':        { cls: 'reveal-up', delay: true },
    '.comparison-card':     { cls: 'reveal-up', delay: false },
    '.pillar':              { cls: 'reveal-up', delay: true },
    '.portfolio-card--main':{ cls: 'reveal-up', delay: true },
    '.contact-form-wrap':   { cls: 'reveal-right', delay: false },
    '.contact-info':        { cls: 'reveal-left',  delay: false },
    '.about-visual':        { cls: 'reveal-left',  delay: false },
    '.about-content':       { cls: 'reveal-right', delay: false },
    '.section-header':      { cls: 'reveal-up',    delay: false },
    '.hero-stats':          { cls: 'reveal-up',    delay: false },
    '.why-features':        { cls: 'reveal-up',    delay: false },
    '.work-cta':            { cls: 'reveal-up',    delay: false },
  };

  // Delay classes for staggered group items
  const delayClasses = ['delay-1','delay-2','delay-3','delay-4','delay-5','delay-6'];

  Object.entries(revealConfig).forEach(([selector, cfg]) => {
    const els = document.querySelectorAll(selector);
    els.forEach((el, i) => {
      el.classList.add(cfg.cls);
      if (cfg.delay) {
        el.classList.add(delayClasses[i % delayClasses.length]);
      }
    });
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale')
    .forEach(el => revealObserver.observe(el));

  /* ─── FLOATING PARTICLES ────────────────────────── */
  const particlesContainer = document.getElementById('particles');
  if (particlesContainer) {
    const colors = ['#E8431A', '#FF6B3D', '#FF9A6C', '#FFD4C2'];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.classList.add('particle');
      const size     = Math.random() * 4 + 2;
      const left     = Math.random() * 100;
      const delay    = Math.random() * 10;
      const duration = Math.random() * 8 + 6;
      const color    = colors[Math.floor(Math.random() * colors.length)];
      p.style.cssText = `
        width:${size}px;height:${size}px;left:${left}%;
        bottom:${Math.random()*20}%;background:${color};
        animation-duration:${duration}s;animation-delay:${delay}s;border-radius:50%;
      `;
      particlesContainer.appendChild(p);
    }
  }

  /* ─── COUNTER ANIMATION FOR STATS ───────────────── */
  function animateCounter(el, target, suffix = '') {
    const duration = 1800;
    const start    = performance.now();
    const step = (now) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el   = entry.target;
        const text = el.textContent;
        const num  = parseInt(text.replace(/\D/g, ''), 10);
        const suf  = text.replace(/\d/g, '');
        if (!isNaN(num)) animateCounter(el, num, suf);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.8 });

  document.querySelectorAll('.stat-number').forEach(el => statsObserver.observe(el));

  /* ─── 3D TILT EFFECT ON SERVICE CARDS ───────────── */
  const isTouchDevice = window.matchMedia('(hover: none)').matches;
  if (!isTouchDevice) {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform = `translateY(-8px) rotateX(${y * -7}deg) rotateY(${x * 7}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* ─── PORTFOLIO CARD GLOW ON HOVER ──────────────── */
  document.querySelectorAll('.portfolio-card--main').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const r = card.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width)  * 100;
      const y = ((e.clientY - r.top)  / r.height) * 100;
      card.style.setProperty('--gx', `${x}%`);
      card.style.setProperty('--gy', `${y}%`);
    });
  });

  /* ─── CONTACT FORM — WHATSAPP + EMAIL HANDLER ───── */
  const contactForm = document.getElementById('contact-form');
  const toast       = document.getElementById('toast');
  const toastMsg    = document.getElementById('toast-message');
  let toastTimer;

  function showToast(message, isError = false) {
    clearTimeout(toastTimer);
    toastMsg.textContent = message;
    toast.style.borderColor = isError ? 'rgba(239,68,68,0.4)' : 'rgba(52,211,153,0.4)';
    toast.style.color       = isError ? '#f87171' : '#34d399';
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 4200);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name     = document.getElementById('form-name').value.trim();
      const phone    = document.getElementById('form-phone').value.trim();
      const email    = document.getElementById('form-email').value.trim();
      const business = document.getElementById('form-business').value;
      const service  = document.getElementById('form-service').value;
      const message  = document.getElementById('form-message').value.trim();

      if (!name || !phone || !business || !service) {
        showToast('Please fill in all required fields.', true);
        return;
      }

      if (!/^[+\d\s\-()]{7,}$/.test(phone)) {
        showToast('Please enter a valid phone number.', true);
        return;
      }

      const submitBtn = document.getElementById('form-submit');
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Build WhatsApp message
      const waText = encodeURIComponent(
        `*New Inquiry — Burra Katha Website*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        (email  ? `✉️ *Email:* ${email}\n` : '') +
        `🏢 *Business Type:* ${business}\n` +
        `🎯 *Service Required:* ${service}\n` +
        (message ? `💬 *Message:* ${message}` : '')
      );

      // WhatsApp number — update this to the real number when available
      const waNumber = '91XXXXXXXXXX';
      const waLink   = `https://wa.me/${waNumber}?text=${waText}`;

      setTimeout(() => {
        showToast("Opening WhatsApp... We'll respond soon! 🎉");
        contactForm.reset();
        submitBtn.textContent = "Let's Tell Your Story 🎤";
        submitBtn.disabled = false;

        // Open WhatsApp in a new tab
        window.open(waLink, '_blank', 'noopener,noreferrer');
      }, 800);
    });
  }

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

  /* ─── CURSOR GLOW (Desktop Only) ────────────────── */
  if (!isTouchDevice) {
    let glowEl = document.createElement('div');
    glowEl.style.cssText = `
      position:fixed;width:320px;height:320px;
      border-radius:50%;pointer-events:none;z-index:0;
      background:radial-gradient(circle,rgba(232,67,26,0.04) 0%,transparent 65%);
      transform:translate(-50%,-50%);
      transition:opacity 0.6s ease;top:50%;left:50%;
    `;
    document.body.appendChild(glowEl);

    let cursorX = window.innerWidth / 2;
    let cursorY = window.innerHeight / 2;
    let glowX = cursorX;
    let glowY = cursorY;

    document.addEventListener('mousemove', (e) => {
      cursorX = e.clientX;
      cursorY = e.clientY;
    });
    document.addEventListener('mouseleave', () => { glowEl.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { glowEl.style.opacity = '1'; });

    (function animateGlow() {
      glowX += (cursorX - glowX) * 0.07;
      glowY += (cursorY - glowY) * 0.07;
      glowEl.style.left = glowX + 'px';
      glowEl.style.top  = glowY + 'px';
      requestAnimationFrame(animateGlow);
    })();
  }

  /* ─── PROCESS STEP PROGRESSIVE REVEAL ───────────── */
  const processSteps = document.querySelectorAll('.process-step');
  const processObs   = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, Array.from(processSteps).indexOf(entry.target) * 80);
        processObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  processSteps.forEach(el => processObs.observe(el));

  /* ─── SECTION HEADER PARALLAX ───────────────────── */
  if (!isTouchDevice) {
    const heroVisual = document.getElementById('hero-visual');
    window.addEventListener('scroll', () => {
      if (heroVisual) {
        const y = window.scrollY;
        heroVisual.style.transform = `translateY(${y * 0.08}px)`;
      }
    }, { passive: true });
  }

  console.log('%c🎺 Burra Katha', 'color:#E8431A;font-size:24px;font-weight:bold;font-family:sans-serif;');
  console.log('%cYour Story, Told Boldly.', 'color:#A0A0AB;font-size:14px;font-family:sans-serif;');

}); // end DOMContentLoaded
