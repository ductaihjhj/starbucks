/**
 * PURE JAVASCRIPT COMPONENTS
 * Replaces Bootstrap JS functionality
 * No dependencies required
 */

// ========== NAVBAR TOGGLE ==========
class NavbarToggle {
  constructor() {
    this.init();
  }
  
  init() {
    const toggleButtons = document.querySelectorAll('[data-toggle="collapse"]');
    
    toggleButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = button.getAttribute('data-target');
        if (targetId) {
          const target = document.querySelector(targetId);
          if (target) {
            const isOpen = target.classList.contains('show');
            
            // Close all other collapses
            document.querySelectorAll('.navbar-collapse.show').forEach(el => {
              if (el !== target) {
                el.classList.remove('show');
              }
            });
            
            // Toggle current
            if (isOpen) {
              target.classList.remove('show');
            } else {
              target.classList.add('show');
            }
          }
        }
      });
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      const navCollapse = document.querySelector('.navbar-collapse.show');
      if (navCollapse && !e.target.closest('.navbar')) {
        navCollapse.classList.remove('show');
      }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const navCollapse = document.querySelector('.navbar-collapse.show');
        if (navCollapse) {
          navCollapse.classList.remove('show');
        }
      }
    });
  }
}

// ========== TOAST COMPONENT ==========
class Toast {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autohide: options.autohide !== false,
      delay: options.delay || 3000
    };
    this.timeoutId = null;
    this.init();
  }
  
  init() {
    // Close button handler
    const closeBtn = this.element.querySelector('[data-dismiss="toast"]');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hide());
    }
  }
  
  show() {
    // Clear any existing timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
    
    // Show with animation
    this.element.classList.add('show');
    this.element.style.display = 'block';
    
    if (this.options.autohide) {
      this.timeoutId = setTimeout(() => {
        this.hide();
      }, this.options.delay);
    }
  }
  
  hide() {
    this.element.classList.remove('show');
    
    // Clear timeout
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
    
    // Hide after animation
    setTimeout(() => {
      if (!this.element.classList.contains('show')) {
        this.element.style.display = 'none';
      }
    }, 300);
  }
}

// ========== MODAL COMPONENT ==========
class Modal {
  constructor(element) {
    this.element = element;
    this.isShowing = false;
    this.init();
  }
  
  init() {
    // Close buttons
    const closeBtns = this.element.querySelectorAll('[data-dismiss="modal"]');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.hide();
      });
    });
    
    // Click outside to close
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.hide();
      }
    });
    
    // ESC key to close
    this.escapeHandler = (e) => {
      if (e.key === 'Escape' && this.isShowing) {
        this.hide();
      }
    };
  }
  
  show() {
    if (this.isShowing) return;
    
    this.isShowing = true;
    this.element.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Add ESC key listener
    document.addEventListener('keydown', this.escapeHandler);
    
    // Trigger animation
    requestAnimationFrame(() => {
      this.element.classList.add('show');
    });
  }
  
  hide() {
    if (!this.isShowing) return;
    
    this.isShowing = false;
    this.element.classList.remove('show');
    
    // Remove ESC key listener
    document.removeEventListener('keydown', this.escapeHandler);
    
    // Hide after animation
    setTimeout(() => {
      if (!this.isShowing) {
        this.element.style.display = 'none';
        document.body.style.overflow = '';
      }
    }, 300);
  }
}

// ========== DROPDOWN COMPONENT (if needed) ==========
class Dropdown {
  constructor(element) {
    this.element = element;
    this.menu = element.nextElementSibling;
    this.init();
  }
  
  init() {
    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target) && !this.menu.contains(e.target)) {
        this.close();
      }
    });
  }
  
  toggle() {
    this.menu.classList.toggle('show');
  }
  
  close() {
    this.menu.classList.remove('show');
  }
}

// ========== AUTO INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
  // Initialize navbar toggle
  new NavbarToggle();
  
  // Initialize all modals
  document.querySelectorAll('.modal').forEach(modal => {
    new Modal(modal);
  });
  
  // Initialize dropdowns
  document.querySelectorAll('[data-toggle="dropdown"]').forEach(dropdown => {
    new Dropdown(dropdown);
  });
});

// ========== EXPORT FOR GLOBAL USE ==========
window.Toast = Toast;
window.Modal = Modal;
window.Dropdown = Dropdown;
