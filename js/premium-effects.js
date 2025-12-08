/**
 * STARBUCKS VIETNAM - PREMIUM EFFECTS
 * Advanced JavaScript for ultra-modern interactions
 */

// ========== LOADING SCREEN ==========
window.addEventListener('load', () => {
  const loadingScreen = document.querySelector('.loading-screen');
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
      document.body.style.overflow = 'auto';
    }, 2000);
  }
});

// ========== DARK MODE TOGGLE ==========
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.setupToggle();
    this.updateIcon();
  }

  setupToggle() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    this.updateIcon();
    this.animateToggle();
  }

  updateIcon() {
    const icon = document.querySelector('#themeToggle .material-icons-outlined');
    if (icon) {
      icon.textContent = this.currentTheme === 'light' ? 'dark_mode' : 'light_mode';
    }
  }

  animateToggle() {
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// ========== SCROLL PROGRESS BAR ==========
class ScrollProgress {
  constructor() {
    this.progressBar = document.querySelector('.scroll-progress');
    if (this.progressBar) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => this.updateProgress());
  }

  updateProgress() {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    this.progressBar.style.width = `${scrolled}%`;
  }
}

new ScrollProgress();

// ========== SCROLL REVEAL ANIMATIONS ==========
class ScrollReveal {
  constructor() {
    this.elements = {
      reveal: document.querySelectorAll('.reveal'),
      revealLeft: document.querySelectorAll('.reveal-left'),
      revealRight: document.querySelectorAll('.reveal-right'),
      revealScale: document.querySelectorAll('.reveal-scale')
    };
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    Object.values(this.elements).forEach(nodeList => {
      nodeList.forEach(element => this.observer.observe(element));
    });
  }
}

new ScrollReveal();

// ========== BACK TO TOP BUTTON ==========
class BackToTop {
  constructor() {
    this.button = document.querySelector('.back-to-top');
    if (this.button) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => this.toggleVisibility());
    this.button.addEventListener('click', () => this.scrollToTop());
  }

  toggleVisibility() {
    if (window.scrollY > 300) {
      this.button.classList.add('show');
    } else {
      this.button.classList.remove('show');
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

new BackToTop();

// ========== CUSTOM CURSOR ==========
class CustomCursor {
  constructor() {
    this.dot = null;
    this.ring = null;
    this.init();
  }

  init() {
    // Only initialize on desktop
    if (window.innerWidth < 768) return;

    this.createCursor();
    this.setupEventListeners();
  }

  createCursor() {
    this.dot = document.createElement('div');
    this.dot.className = 'cursor-dot';
    document.body.appendChild(this.dot);

    this.ring = document.createElement('div');
    this.ring.className = 'cursor-ring';
    document.body.appendChild(this.ring);
  }

  setupEventListeners() {
    document.addEventListener('mousemove', (e) => {
      this.moveCursor(e);
    });

    // Enlarge cursor on hover over clickable elements
    const clickables = document.querySelectorAll('a, button, .cursor-pointer');
    clickables.forEach(el => {
      el.addEventListener('mouseenter', () => this.enlargeCursor());
      el.addEventListener('mouseleave', () => this.resetCursor());
    });
  }

  moveCursor(e) {
    const x = e.clientX;
    const y = e.clientY;

    if (this.dot) {
      this.dot.style.left = `${x}px`;
      this.dot.style.top = `${y}px`;
    }

    if (this.ring) {
      this.ring.style.left = `${x}px`;
      this.ring.style.top = `${y}px`;
    }
  }

  enlargeCursor() {
    if (this.ring) {
      this.ring.style.width = '60px';
      this.ring.style.height = '60px';
      this.ring.style.borderWidth = '3px';
    }
  }

  resetCursor() {
    if (this.ring) {
      this.ring.style.width = '40px';
      this.ring.style.height = '40px';
      this.ring.style.borderWidth = '2px';
    }
  }
}

new CustomCursor();

// ========== FLOATING COFFEE BEANS ==========
class FloatingCoffeeBeans {
  constructor() {
    this.container = null;
    this.init();
  }

  init() {
    this.container = document.createElement('div');
    this.container.className = 'coffee-beans';
    document.body.appendChild(this.container);

    this.createBeans(9);
  }

  createBeans(count) {
    const beanEmojis = ['☕', '🫘'];
    
    for (let i = 0; i < count; i++) {
      const bean = document.createElement('div');
      bean.className = 'coffee-bean';
      bean.textContent = beanEmojis[Math.floor(Math.random() * beanEmojis.length)];
      bean.style.left = `${(i / count) * 100}%`;
      bean.style.fontSize = `${Math.random() * 20 + 20}px`;
      this.container.appendChild(bean);
    }
  }
}

new FloatingCoffeeBeans();

// ========== PARALLAX EFFECT ==========
class ParallaxEffect {
  constructor() {
    this.elements = document.querySelectorAll('.parallax-layer');
    if (this.elements.length > 0) {
      this.init();
    }
  }

  init() {
    window.addEventListener('scroll', () => this.updateParallax());
    this.updateParallax(); // Initial call
  }

  updateParallax() {
    const scrolled = window.scrollY;

    this.elements.forEach((element, index) => {
      const speed = (index + 1) * 0.1;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  }
}

new ParallaxEffect();

// ========== 3D CARD TILT EFFECT ==========
class CardTilt {
  constructor() {
    this.cards = document.querySelectorAll('.card-3d');
    if (this.cards.length > 0) {
      this.init();
    }
  }

  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  }

  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  }

  handleMouseLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  }
}

new CardTilt();

// ========== STAGGERED ANIMATIONS ==========
class StaggeredAnimation {
  constructor() {
    this.containers = document.querySelectorAll('[data-stagger]');
    if (this.containers.length > 0) {
      this.init();
    }
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateChildren(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    this.containers.forEach(container => this.observer.observe(container));
  }

  animateChildren(container) {
    const children = container.children;
    Array.from(children).forEach((child, index) => {
      child.classList.add('stagger-item');
      child.style.animationDelay = `${index * 0.1}s`;
    });
  }
}

new StaggeredAnimation();

// ========== MENU FILTER ENHANCEMENT ==========
class MenuFilterEnhanced {
  constructor() {
    this.filterButtons = document.querySelectorAll('.menu-filter-btn');
    this.menuItems = document.querySelectorAll('.menu-item-card');
    
    if (this.filterButtons.length > 0) {
      this.init();
    }
  }

  init() {
    this.filterButtons.forEach(button => {
      button.addEventListener('click', () => this.filter(button));
    });
  }

  filter(activeButton) {
    const category = activeButton.dataset.category;

    // Update active button
    this.filterButtons.forEach(btn => btn.classList.remove('active'));
    activeButton.classList.add('active');

    // Filter items with animation
    this.menuItems.forEach((item, index) => {
      item.style.animation = 'none';
      
      setTimeout(() => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.animation = `fadeIn 0.6s ease ${index * 0.1}s forwards`;
          }, 10);
        } else {
          item.style.display = 'none';
        }
      }, 10);
    });
  }
}

new MenuFilterEnhanced();

// ========== IMAGE LAZY LOADING ==========
class LazyLoader {
  constructor() {
    this.images = document.querySelectorAll('img[data-src]');
    if (this.images.length > 0) {
      this.init();
    }
  }

  init() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage(entry.target);
          }
        });
      },
      { rootMargin: '50px' }
    );

    this.images.forEach(img => this.observer.observe(img));
  }

  loadImage(img) {
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.removeAttribute('data-src');
      img.addEventListener('load', () => {
        img.style.animation = 'fadeIn 0.5s ease';
      });
      this.observer.unobserve(img);
    }
  }
}

new LazyLoader();

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ========== RIPPLE EFFECT FOR BUTTONS ==========
class RippleEffect {
  constructor() {
    this.buttons = document.querySelectorAll('.btn-ripple, .btn');
    this.init();
  }

  init() {
    this.buttons.forEach(button => {
      button.addEventListener('click', (e) => this.createRipple(e, button));
    });
  }

  createRipple(e, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      pointer-events: none;
      transform: scale(0);
      animation: rippleAnimation 0.6s ease-out;
    `;

    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);
  }
}

new RippleEffect();

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleAnimation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ========== TOAST NOTIFICATION SYSTEM ==========
class ToastManager {
  constructor() {
    this.container = this.createContainer();
  }

  createContainer() {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    document.body.appendChild(container);
    return container;
  }

  show(message, type = 'success', duration = 3000) {
    const toast = document.createElement('div');
    const bgColor = type === 'success' ? 'linear-gradient(135deg, var(--color-primary), var(--color-accent))' : 
                    type === 'error' ? 'linear-gradient(135deg, #ff6b6b, #ff5252)' :
                    'linear-gradient(135deg, #4a90e2, #357abd)';
    
    toast.style.cssText = `
      background: ${bgColor};
      color: white;
      padding: 16px 24px;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      font-weight: 600;
      min-width: 300px;
      animation: slideInRight 0.4s ease;
      display: flex;
      align-items: center;
      gap: 12px;
    `;

    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    toast.innerHTML = `<span style="font-size: 20px;">${icon}</span><span>${message}</span>`;
    
    this.container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.4s ease';
      setTimeout(() => toast.remove(), 400);
    }, duration);
  }
}

// Add toast animations
const toastStyle = document.createElement('style');
toastStyle.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(400px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(400px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(toastStyle);

// Export for use in other scripts
window.toastManager = new ToastManager();

// ========== PERFORMANCE MONITORING ==========
class PerformanceMonitor {
  constructor() {
    this.init();
  }

  init() {
    if ('PerformanceObserver' in window) {
      this.observeLCP();
      this.observeFID();
      this.observeCLS();
    }
  }

  observeLCP() {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.renderTime || lastEntry.loadTime);
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }

  observeFID() {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    observer.observe({ entryTypes: ['first-input'] });
  }

  observeCLS() {
    let clsValue = 0;
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
          console.log('CLS:', clsValue);
        }
      });
    });
    observer.observe({ entryTypes: ['layout-shift'] });
  }
}

// Initialize performance monitoring in development
if (window.location.hostname === 'localhost' || window.location.hostname.includes('sandbox')) {
  new PerformanceMonitor();
}

// ========== CONSOLE WELCOME MESSAGE ==========
console.log(
  '%c🌟 Starbucks Vietnam %c- Powered by Premium Effects',
  'color: #00704A; font-size: 24px; font-weight: bold;',
  'color: #00A862; font-size: 16px;'
);

console.log(
  '%c✨ Ultra-modern website with advanced animations & interactions',
  'color: #64748B; font-size: 14px; font-style: italic;'
);
