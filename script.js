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

  // True Crossfade
  if (currentActive) {
    // Scroll to top instantly before animating so the new page renders at the top
    window.scrollTo({ top: 0, behavior: 'instant' });
    
    currentActive.classList.add('fade-out');
    target.classList.add('active', 'fade-in');
    
    animateCards(target);
    
    setTimeout(() => {
      currentActive.classList.remove('active', 'fade-out');
      target.classList.remove('fade-in');
      isTransitioning = false;
    }, 600); // Wait for new 0.6s magical CSS animation to finish
  } else {
    target.classList.add('active', 'fade-in');
    window.scrollTo({ top: 0, behavior: 'instant' });
    animateCards(target);
    setTimeout(() => {
      target.classList.remove('fade-in');
      isTransitioning = false;
    }, 600);
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
function animateCards(section) {
  if (!section) return;
  const cards = section.querySelectorAll('.card, .rule-card, .credit-card, .faq-item, .link-card, .schedule-day, .info-item, .about-image');
  
  // Reset elements first
  cards.forEach((card) => {
    card.style.transition = 'none';
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px)';
  });
  
  // Trigger browser reflow to apply resets
  void section.offsetWidth;
  
  // Apply staggered animation
  cards.forEach((card, i) => {
    card.style.transition = `opacity 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 40}ms, transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 40}ms`;
    card.style.opacity = '1';
    card.style.transform = 'translateY(0)';
  });
}

// ── INIT ──
document.addEventListener('DOMContentLoaded', () => {
  createStars();

  // Handle hash navigation on load
  const hash = window.location.hash.replace('#', '');
  if (hash && document.getElementById('sec-' + hash)) {
    setTimeout(() => showSection(hash), 100);
  }

  // Add hover effect to buttons
  document.querySelectorAll('.nav-grid-btn, .nav-btn, .special-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
});
