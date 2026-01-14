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
      button.addEventListener('click', () => {
        const targetId = button.getAttribute('data-target');
        if (targetId) {
          const target = document.querySelector(targetId);
          if (target) {
            target.classList.toggle('show');
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
  }
  
  show() {
    this.element.classList.add('show');
    
    if (this.options.autohide) {
      setTimeout(() => {
        this.hide();
      }, this.options.delay);
    }
  }
  
  hide() {
    this.element.classList.remove('show');
  }
}

// ========== MODAL COMPONENT ==========
class Modal {
  constructor(element) {
    this.element = element;
    this.init();
  }
  
  init() {
    // Close buttons
    const closeBtns = this.element.querySelectorAll('[data-dismiss="modal"]');
    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => this.hide());
    });
    
    // Click outside to close
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.hide();
      }
    });
    
    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.element.classList.contains('show')) {
        this.hide();
      }
    });
  }
  
  show() {
    this.element.classList.add('show');
    this.element.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => {
      this.element.classList.add('fade-in');
    }, 10);
  }
  
  hide() {
    this.element.classList.remove('fade-in');
    
    setTimeout(() => {
      this.element.classList.remove('show');
      this.element.style.display = 'none';
      document.body.style.overflow = '';
    }, 150);
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
