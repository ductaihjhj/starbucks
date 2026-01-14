/* ========================================
   PURE JS BOOTSTRAP REPLACEMENT
   Complete Bootstrap 5 JS replacement without any framework
   All components implemented from scratch
   ======================================== */

// ========== NAVBAR TOGGLE (Collapse) ==========
class NavbarCollapse {
  constructor() {
    this.init();
  }

  init() {
    const togglers = document.querySelectorAll('.navbar-toggler');
    togglers.forEach(toggler => {
      toggler.addEventListener('click', (e) => {
        e.preventDefault();
        const target = toggler.getAttribute('data-bs-target') || toggler.getAttribute('data-target');
        if (target) {
          const collapse = document.querySelector(target);
          if (collapse) {
            this.toggle(collapse);
          }
        }
      });
    });
  }

  toggle(element) {
    if (element.classList.contains('show')) {
      this.hide(element);
    } else {
      this.show(element);
    }
  }

  show(element) {
    element.style.display = 'block';
    element.style.height = '0px';
    element.classList.add('collapsing');
    element.classList.remove('collapse');

    setTimeout(() => {
      element.style.height = element.scrollHeight + 'px';
    }, 10);

    setTimeout(() => {
      element.classList.remove('collapsing');
      element.classList.add('collapse', 'show');
      element.style.height = '';
    }, 350);
  }

  hide(element) {
    element.style.height = element.scrollHeight + 'px';
    element.classList.add('collapsing');
    element.classList.remove('collapse', 'show');

    setTimeout(() => {
      element.style.height = '0px';
    }, 10);

    setTimeout(() => {
      element.classList.remove('collapsing');
      element.classList.add('collapse');
      element.style.display = '';
      element.style.height = '';
    }, 350);
  }
}

// ========== MODAL ==========
class Modal {
  constructor(element, options = {}) {
    this.element = element;
    this.options = options;
    this.backdrop = null;
    this.isShown = false;
  }

  show() {
    if (this.isShown) return;

    this.isShown = true;
    document.body.style.overflow = 'hidden';

    // Create backdrop
    this.backdrop = document.createElement('div');
    this.backdrop.className = 'modal-backdrop';
    document.body.appendChild(this.backdrop);

    // Force reflow
    this.backdrop.offsetHeight;

    // Show backdrop
    setTimeout(() => {
      this.backdrop.classList.add('show');
    }, 10);

    // Show modal
    this.element.style.display = 'block';
    this.element.classList.add('show');

    // Handle close buttons
    const closeButtons = this.element.querySelectorAll('[data-bs-dismiss="modal"], [data-dismiss="modal"]');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => this.hide());
    });

    // Handle backdrop click
    this.element.addEventListener('click', (e) => {
      if (e.target === this.element) {
        this.hide();
      }
    });
  }

  hide() {
    if (!this.isShown) return;

    this.isShown = false;

    // Hide modal
    this.element.classList.remove('show');

    // Hide backdrop
    if (this.backdrop) {
      this.backdrop.classList.remove('show');
    }

    // Remove after transition
    setTimeout(() => {
      this.element.style.display = 'none';
      if (this.backdrop) {
        this.backdrop.remove();
        this.backdrop = null;
      }
      document.body.style.overflow = '';
    }, 150);
  }

  static getInstance(element) {
    return element._modal || null;
  }

  static getOrCreateInstance(element) {
    if (!element._modal) {
      element._modal = new Modal(element);
    }
    return element._modal;
  }
}

// Auto-initialize modals
document.addEventListener('DOMContentLoaded', () => {
  const modalTriggers = document.querySelectorAll('[data-bs-toggle="modal"], [data-toggle="modal"]');
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const target = trigger.getAttribute('data-bs-target') || trigger.getAttribute('data-target');
      if (target) {
        const modalElement = document.querySelector(target);
        if (modalElement) {
          const modal = Modal.getOrCreateInstance(modalElement);
          modal.show();
        }
      }
    });
  });
});

// ========== TOAST ==========
class Toast {
  constructor(element, options = {}) {
    this.element = element;
    this.options = {
      autohide: options.autohide !== false,
      delay: options.delay || 5000
    };
    this.timeoutId = null;
  }

  show() {
    this.element.classList.remove('hide');
    this.element.classList.add('show');
    this.element.style.display = 'block';

    if (this.options.autohide) {
      this.timeoutId = setTimeout(() => {
        this.hide();
      }, this.options.delay);
    }

    // Handle close button
    const closeButton = this.element.querySelector('[data-bs-dismiss="toast"], [data-dismiss="toast"]');
    if (closeButton) {
      closeButton.addEventListener('click', () => this.hide());
    }
  }

  hide() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.element.classList.remove('show');
    this.element.classList.add('hide');

    setTimeout(() => {
      this.element.style.display = 'none';
    }, 150);
  }

  static getInstance(element) {
    return element._toast || null;
  }

  static getOrCreateInstance(element, options) {
    if (!element._toast) {
      element._toast = new Toast(element, options);
    }
    return element._toast;
  }
}

// ========== DROPDOWN ==========
class Dropdown {
  constructor(element) {
    this.element = element;
    this.menu = null;
    this.isShown = false;
    this.init();
  }

  init() {
    const menuId = this.element.getAttribute('data-bs-target') || this.element.getAttribute('data-target');
    if (menuId) {
      this.menu = document.querySelector(menuId);
    } else {
      this.menu = this.element.nextElementSibling;
    }

    this.element.addEventListener('click', (e) => {
      e.preventDefault();
      this.toggle();
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!this.element.contains(e.target) && !this.menu.contains(e.target)) {
        this.hide();
      }
    });
  }

  toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (!this.menu) return;
    this.isShown = true;
    this.menu.classList.add('show');
    this.element.setAttribute('aria-expanded', 'true');
  }

  hide() {
    if (!this.menu) return;
    this.isShown = false;
    this.menu.classList.remove('show');
    this.element.setAttribute('aria-expanded', 'false');
  }
}

// Auto-initialize dropdowns
document.addEventListener('DOMContentLoaded', () => {
  const dropdownToggles = document.querySelectorAll('[data-bs-toggle="dropdown"], [data-toggle="dropdown"]');
  dropdownToggles.forEach(toggle => {
    new Dropdown(toggle);
  });
});

// ========== COLLAPSE (Generic) ==========
class Collapse {
  constructor(element, options = {}) {
    this.element = element;
    this.isShown = element.classList.contains('show');
    this.options = options;
  }

  toggle() {
    if (this.isShown) {
      this.hide();
    } else {
      this.show();
    }
  }

  show() {
    if (this.isShown) return;

    this.isShown = true;
    this.element.style.display = 'block';
    this.element.style.height = '0px';
    this.element.classList.add('collapsing');
    this.element.classList.remove('collapse');

    setTimeout(() => {
      this.element.style.height = this.element.scrollHeight + 'px';
    }, 10);

    setTimeout(() => {
      this.element.classList.remove('collapsing');
      this.element.classList.add('collapse', 'show');
      this.element.style.height = '';
    }, 350);
  }

  hide() {
    if (!this.isShown) return;

    this.isShown = false;
    this.element.style.height = this.element.scrollHeight + 'px';
    this.element.classList.add('collapsing');
    this.element.classList.remove('collapse', 'show');

    setTimeout(() => {
      this.element.style.height = '0px';
    }, 10);

    setTimeout(() => {
      this.element.classList.remove('collapsing');
      this.element.classList.add('collapse');
      this.element.style.display = '';
      this.element.style.height = '';
    }, 350);
  }

  static getInstance(element) {
    return element._collapse || null;
  }

  static getOrCreateInstance(element, options) {
    if (!element._collapse) {
      element._collapse = new Collapse(element, options);
    }
    return element._collapse;
  }
}

// Auto-initialize collapse toggles
document.addEventListener('DOMContentLoaded', () => {
  const collapseToggles = document.querySelectorAll('[data-bs-toggle="collapse"], [data-toggle="collapse"]');
  collapseToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const target = toggle.getAttribute('data-bs-target') || toggle.getAttribute('data-target') || toggle.getAttribute('href');
      if (target) {
        const collapseElement = document.querySelector(target);
        if (collapseElement) {
          const collapse = Collapse.getOrCreateInstance(collapseElement);
          collapse.toggle();
        }
      }
    });
  });
});

// Initialize navbar collapse
document.addEventListener('DOMContentLoaded', () => {
  new NavbarCollapse();
});

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.Modal = Modal;
  window.Toast = Toast;
  window.Dropdown = Dropdown;
  window.Collapse = Collapse;
  window.NavbarCollapse = NavbarCollapse;
}

// ========== Bootstrap compatibility object ==========
window.bootstrap = {
  Modal,
  Toast,
  Dropdown,
  Collapse
};

console.log('%c✅ Pure JS Bootstrap Replacement Loaded', 'color: #00704A; font-weight: bold; font-size: 14px;');
console.log('%cAll Bootstrap JS components replaced with pure JavaScript', 'color: #64748B; font-size: 12px;');
