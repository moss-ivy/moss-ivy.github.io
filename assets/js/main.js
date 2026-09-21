/**
 * Dobiasova Design - Hlavní interaktivní skript
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeroSlider();
  initFilterBars();
  initContactForm();
  initEmailCopy();
  highlightActiveNav();
});

/* Mobilní menu hamburger */
function initMobileMenu() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!toggleBtn || !navLinks) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggleBtn.setAttribute('aria-expanded', isOpen);
  });

  // Zavření při kliknutí na odkaz
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Zavření při kliknutí mimo
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggleBtn.contains(e.target)) {
      navLinks.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    }
  });
}

/* Celošířkový Hero Slider na homepage */
function initHeroSlider() {
  const track = document.querySelector('.slider-track');
  const slides = document.querySelectorAll('.hero-slide');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const dots = document.querySelectorAll('.slider-dot');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  function updateSlider(index) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      updateSlider(currentIndex + 1);
    }, 6000);
  }

  function stopAutoplay() {
    if (autoplayTimer) clearInterval(autoplayTimer);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateSlider(currentIndex - 1);
      startAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateSlider(currentIndex + 1);
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const idx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
      updateSlider(idx);
      startAutoplay();
    });
  });

  // Pozastavení při najetí myší
  const sliderElem = document.querySelector('.hero-slider');
  if (sliderElem) {
    sliderElem.addEventListener('mouseenter', stopAutoplay);
    sliderElem.addEventListener('mouseleave', startAutoplay);
  }

  // Podpora gest tažení (swipe) na dotykových displejích
  let touchStartX = 0;
  let touchEndX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchStartX - touchEndX > 50) {
      updateSlider(currentIndex + 1); // swipe left
    } else if (touchEndX - touchStartX > 50) {
      updateSlider(currentIndex - 1); // swipe right
    }
  }, { passive: true });

  startAutoplay();
}

/* Filtrování v sekcích Projekty a Obchod */
function initFilterBars() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length === 0) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const targetCategory = e.currentTarget.getAttribute('data-filter');
      const grid = e.currentTarget.closest('section').querySelector('.products-grid, .projects-grid');
      if (!grid) return;

      // Změna aktivního tlačítka
      e.currentTarget.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.currentTarget.classList.add('active');

      const items = grid.querySelectorAll('.product-card, .project-card');
      items.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (targetCategory === 'all' || itemCat === targetCategory || (itemCat && itemCat.includes(targetCategory))) {
          item.style.display = 'flex';
          setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(10px)';
          setTimeout(() => { item.style.display = 'none'; }, 250);
        }
      });
    });
  });
}

/* Kopírování e-mailu do schránky s notifikací */
function initEmailCopy() {
  const copyBtns = document.querySelectorAll('.js-copy-email');
  copyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'ivana@dobiasova.design';
      
      navigator.clipboard.writeText(email).then(() => {
        showToast(window.i18n ? window.i18n.t('contact.toast.copied') : 'Email copied to clipboard!');
      }).catch(() => {
        // Fallback pro starší prohlížeče
        prompt('Copy email:', email);
      });
    });
  });
}

/* Odeslání kontaktního formuláře */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const subject = form.querySelector('[name="subject"]').value;
    const message = form.querySelector('[name="message"]').value;

    const mailtoSubject = encodeURIComponent(`[Dobiasova.design] ${subject} - ${name}`);
    const mailtoBody = encodeURIComponent(`From: ${name} (${email})\n\n${message}`);

    // Zobraz notifikaci a otevři výchozího poštovního klienta
    showToast(window.i18n ? window.i18n.t('contact.toast.sent') : 'Opening your email client...');
    
    setTimeout(() => {
      window.location.href = `mailto:ivana@dobiasova.design?subject=${mailtoSubject}&body=${mailtoBody}`;
    }, 600);
  });
}

/* Toast notifikace */
function showToast(message) {
  let toast = document.querySelector('.toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

/* Zvýraznění aktivní stránky v navigaci */
function highlightActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const linkPath = link.getAttribute('href');
    if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
