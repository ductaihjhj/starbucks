/**
 * STARBUCKS VIETNAM - OPTIMIZED JAVASCRIPT
 * Lightweight, Stable, Fast
 * Focus on core functionality
 */

// ========== LOADING SCREEN ==========
window.addEventListener('load', () => {
  const loading = document.querySelector('.loading-screen');
  if (loading) {
    setTimeout(() => {
      loading.classList.add('hidden');
      setTimeout(() => loading.remove(), 300);
    }, 800);
  }
});

// ========== NAVBAR SCROLL EFFECT ==========
const navbar = document.getElementById('mainNavbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 50) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
  }
  
  lastScroll = currentScroll;
});

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
if (themeToggle) {
  const icon = themeToggle.querySelector('.material-icons-outlined');
  if (icon) {
    icon.textContent = currentTheme === 'dark' ? 'light_mode' : 'dark_mode';
  }
}

// Toggle theme
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme');
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    const icon = themeToggle.querySelector('.material-icons-outlined');
    if (icon) {
      icon.textContent = newTheme === 'dark' ? 'light_mode' : 'dark_mode';
    }
  });
}

// ========== BACK TO TOP BUTTON ==========
const backToTop = document.querySelector('.back-to-top');

if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });
  
  backToTop.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ========== SHOPPING CART ==========
class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cart')) || [];
    this.init();
  }
  
  init() {
    this.updateBadge();
    this.attachEventListeners();
  }
  
  attachEventListeners() {
    const addButtons = document.querySelectorAll('.add-to-cart-btn');
    addButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const item = e.target.closest('button').dataset.item;
        if (item) {
          this.addItem(item);
        }
      });
    });
  }
  
  addItem(item) {
    this.items.push(item);
    localStorage.setItem('cart', JSON.stringify(this.items));
    this.updateBadge();
    this.showToast('Đã thêm vào giỏ hàng!');
  }
  
  updateBadge() {
    const badge = document.getElementById('cartCountBadge');
    if (badge) {
      const count = this.items.length;
      if (count > 0) {
        badge.textContent = count;
        badge.classList.remove('d-none');
      } else {
        badge.classList.add('d-none');
      }
    }
  }
  
  showToast(message) {
    const toastEl = document.getElementById('cartToast');
    const toastBody = document.getElementById('cartToastMessage');
    
    if (toastEl && toastBody) {
      toastBody.textContent = message;
      const toast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000
      });
      toast.show();
    }
  }
}

// Initialize cart
const cart = new ShoppingCart();

// ========== MENU FILTER ==========
const filterButtons = document.querySelectorAll('.menu-filter-btn');
const menuItems = document.querySelectorAll('.menu-item-card');

if (filterButtons.length > 0) {
  // Set first button as active
  filterButtons[0].classList.add('active');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter || button.dataset.category || 'all';
      
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items with animation
      menuItems.forEach(item => {
        const itemCategory = item.dataset.category;
        
        if (filter === 'all' || itemCategory === filter) {
          item.classList.remove('hidden');
          item.style.display = 'block';
          // Trigger animation
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.95)';
          setTimeout(() => {
            item.classList.add('hidden');
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

// ========== IMAGE LIGHTBOX (Media Page) ==========
const mediaItems = document.querySelectorAll('.media-item');
const modalId = 'mediaModal';

if (mediaItems.length > 0) {
  let currentIndex = 0;
  let modal = document.getElementById(modalId);
  
  // Create modal if doesn't exist
  if (!modal) {
    modal = document.createElement('div');
    modal.id = modalId;
    modal.className = 'modal-fullscreen-custom';
    modal.innerHTML = `
      <button class="btn btn-close position-absolute top-0 end-0 m-3" style="z-index: 10000; background: white; opacity: 1;"></button>
      <button class="btn btn-light position-absolute start-0 top-50 translate-middle-y ms-3" id="prevBtn">
        <span class="material-icons-outlined">chevron_left</span>
      </button>
      <img src="" alt="Gallery Image" id="modalImage">
      <button class="btn btn-light position-absolute end-0 top-50 translate-middle-y me-3" id="nextBtn">
        <span class="material-icons-outlined">chevron_right</span>
      </button>
    `;
    document.body.appendChild(modal);
  }
  
  const modalImage = modal.querySelector('#modalImage');
  const closeBtn = modal.querySelector('.btn-close');
  const prevBtn = modal.querySelector('#prevBtn');
  const nextBtn = modal.querySelector('#nextBtn');
  
  // Open modal
  mediaItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      currentIndex = index;
      showImage(currentIndex);
      modal.classList.add('show');
    });
  });
  
  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.classList.remove('show');
  });
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
    }
  });
  
  // Navigation
  prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + mediaItems.length) % mediaItems.length;
    showImage(currentIndex);
  });
  
  nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % mediaItems.length;
    showImage(currentIndex);
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('show')) return;
    
    if (e.key === 'Escape') {
      modal.classList.remove('show');
    } else if (e.key === 'ArrowLeft') {
      prevBtn.click();
    } else if (e.key === 'ArrowRight') {
      nextBtn.click();
    }
  });
  
  function showImage(index) {
    const img = mediaItems[index].querySelector('img');
    if (img) {
      modalImage.src = img.src;
      modalImage.alt = img.alt;
    }
  }
}

// ========== CONTACT FORM ==========
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;
    
    if (name && email && message) {
      // Show success message
      alert('Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi sớm nhất có thể.');
      contactForm.reset();
    } else {
      alert('Vui lòng điền đầy đủ thông tin!');
    }
  });
}

// ========== SEARCH MODAL ==========
const searchBtn = document.querySelector('[title="Tìm kiếm"]');
const searchModal = document.createElement('div');
searchModal.className = 'modal fade';
searchModal.id = 'searchModal';
searchModal.innerHTML = `
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header border-0">
        <h5 class="modal-title">Tìm kiếm</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body">
        <input type="text" class="form-control form-control-lg" placeholder="Tìm kiếm sản phẩm...">
      </div>
    </div>
  </div>
`;

if (searchBtn) {
  document.body.appendChild(searchModal);
  const bsModal = new bootstrap.Modal(searchModal);
  
  searchBtn.addEventListener('click', () => {
    bsModal.show();
    setTimeout(() => {
      searchModal.querySelector('input').focus();
    }, 300);
  });
}

// ========== LAZY LOADING IMAGES ==========
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.dataset.src;
        
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });
  
  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach(img => imageObserver.observe(img));
}

// ========== SMOOTH SCROLL FOR ANCHOR LINKS ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  });
});

// ========== CONSOLE MESSAGE ==========
console.log(
  '%c☕ Starbucks Vietnam',
  'color: #00704A; font-size: 20px; font-weight: bold;'
);
console.log(
  '%cOptimized & Lightweight Version',
  'color: #64748B; font-size: 12px;'
);

// ========== ERROR HANDLING ==========
window.addEventListener('error', (e) => {
  console.error('Error caught:', e.message);
  // In production, you might want to send this to a logging service
});

// ========== PERFORMANCE MONITORING (Optional) ==========
if (window.performance && window.performance.timing) {
  window.addEventListener('load', () => {
    setTimeout(() => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      console.log(`Page Load Time: ${pageLoadTime}ms`);
    }, 0);
  });
}
