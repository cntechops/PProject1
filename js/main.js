// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
const topBtn = document.getElementById('topBtn');

window.addEventListener('scroll', () => {
  if (navbar && !navbar.classList.contains('scrolled') || window.scrollY > 50) {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  }
  if (topBtn) {
    topBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  }
});

// ===== BACK TO TOP =====
function topFunction() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== MOBILE MENU =====
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  navToggle.classList.toggle('is-active', isOpen);
});

navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle?.classList.remove('is-active');
  });
});

// ===== TYPING ANIMATION =====
const typedEl = document.querySelector('.typed-text');
if (typedEl) {
  const phrases = [
    'Cybersecurity Specialist',
    'AWS Cloud Professional',
    'IT Security Analyst',
    'Penetration Tester',
    'Python Developer',
  ];
  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let delay       = 110;

  function type() {
    const current = phrases[phraseIndex];
    if (isDeleting) {
      typedEl.textContent = current.slice(0, --charIndex);
      delay = 55;
    } else {
      typedEl.textContent = current.slice(0, ++charIndex);
      delay = 110;
    }
    if (!isDeleting && charIndex === current.length) {
      delay = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting  = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay       = 400;
    }
    setTimeout(type, delay);
  }

  setTimeout(type, 1600);
}

// ===== SCROLL REVEAL =====
if (typeof ScrollReveal !== 'undefined') {
  const sr = ScrollReveal({
    origin:   'bottom',
    distance: '28px',
    duration: 750,
    delay:    80,
    easing:   'cubic-bezier(0.5, 0, 0, 1)',
    reset:    false,
  });

  sr.reveal('.section-header',     { delay: 100 });
  sr.reveal('.about-image-wrap',   { origin: 'left',  delay: 200 });
  sr.reveal('.about-text',         { origin: 'right', delay: 300 });
  sr.reveal('.timeline-item',      { interval: 140 });
  sr.reveal('.skill-card',         { interval: 90 });
  sr.reveal('.cert-card',          { interval: 100 });
  sr.reveal('.goal-card',          { interval: 90 });
  sr.reveal('.project-card',       { interval: 130 });
  sr.reveal('.blog-card',          { interval: 130 });
  sr.reveal('.footer-inner > *',   { interval: 80 });
}

// ===== CERT MODAL =====
const certModal   = document.getElementById('certModal');
const modalFrame  = document.getElementById('modalFrame');
const modalTitle  = document.getElementById('modalTitle');
const modalClose  = document.getElementById('modalClose');

function openCertModal(title, embedUrl) {
  modalTitle.textContent = title;
  modalFrame.src = embedUrl;
  certModal.classList.add('active', 'fade-in');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  certModal.classList.remove('active', 'fade-in');
  document.body.style.overflow = '';
  // Delay src clear so iframe doesn't flash blank while animating
  setTimeout(() => { modalFrame.src = ''; }, 300);
}

document.querySelectorAll('.cert-clickable').forEach(card => {
  card.addEventListener('click', () => {
    openCertModal(card.dataset.title, card.dataset.embed);
  });
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openCertModal(card.dataset.title, card.dataset.embed);
    }
  });
});

modalClose?.addEventListener('click', closeCertModal);

certModal?.addEventListener('click', e => {
  if (e.target === certModal) closeCertModal();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && certModal?.classList.contains('active')) {
    closeCertModal();
  }
});

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
