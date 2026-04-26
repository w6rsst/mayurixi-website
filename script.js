// ── FLOATING STARS ──
function createStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  const symbols = ['✦','✧','★','☆','♡','✿','⋆','·'];
  for (let i = 0; i < 35; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    star.style.left = Math.random() * 100 + '%';
    star.style.fontSize = (8 + Math.random() * 18) + 'px';
    star.style.animationDuration = (18 + Math.random() * 30) + 's';
    star.style.animationDelay = -(Math.random() * 30) + 's';
    star.style.opacity = 0.15 + Math.random() * 0.25;
    container.appendChild(star);
  }
}

// ── SECTION NAVIGATION WITH TRANSITIONS ──
let isTransitioning = false;

function showSection(name) {
  if (isTransitioning) return;
  isTransitioning = true;

  const currentActive = document.querySelector('.section.active');
  const target = document.getElementById('sec-' + name);
  if (!target || currentActive === target) { isTransitioning = false; return; }

  // Fade out current
  if (currentActive) {
    currentActive.classList.add('fade-out');
    setTimeout(() => {
      currentActive.classList.remove('active', 'fade-out');
      // Show target
      target.classList.add('active', 'fade-in');
      window.scrollTo({ top: 0 });
      setTimeout(() => {
        target.classList.remove('fade-in');
        isTransitioning = false;
      }, 500);
    }, 350);
  } else {
    target.classList.add('active', 'fade-in');
    window.scrollTo({ top: 0 });
    setTimeout(() => {
      target.classList.remove('fade-in');
      isTransitioning = false;
    }, 500);
  }

  // Navbar visibility
  const nav = document.getElementById('navbar');
  if (name === 'home') {
    nav.classList.remove('visible');
  } else {
    nav.classList.add('visible');
  }

  // Active nav button
  document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.classList.toggle('active', btn.textContent.trim().toLowerCase() === name);
  });

  // Close mobile menu
  nav.classList.remove('mobile-open');

  // Update URL hash
  history.replaceState(null, '', '#' + name);
}

// ── FAQ TOGGLE ──
function toggleFaq(el) {
  const item = el.parentElement;
  // Close others
  document.querySelectorAll('.faq-item.open').forEach(i => {
    if (i !== item) i.classList.remove('open');
  });
  item.classList.toggle('open');
}

// ── MOBILE MENU ──
function toggleMobile() {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('mobile-open');
  if (!nav.classList.contains('visible')) nav.classList.add('visible');
}

// ── STAGGER ANIMATION FOR CARDS ──
function animateCards() {
  const active = document.querySelector('.section.active');
  if (!active) return;
  const cards = active.querySelectorAll('.card, .rule-card, .credit-card, .faq-item, .link-card, .schedule-day, .info-item');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 * i);
  });
}

// Watch for section changes to trigger card animations
const observer = new MutationObserver(() => {
  const active = document.querySelector('.section.active');
  if (active && !active.id.includes('home')) {
    setTimeout(animateCards, 400);
  }
});

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  createStars();

  // Observe section changes
  document.querySelectorAll('.section').forEach(sec => {
    observer.observe(sec, { attributes: true, attributeFilter: ['class'] });
  });

  // Handle hash navigation
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById('sec-' + hash)) {
    // Delay to let page load
    setTimeout(() => showSection(hash), 100);
  }

  // Add hover sound-like effect to buttons
  document.querySelectorAll('.nav-grid-btn, .nav-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
});
