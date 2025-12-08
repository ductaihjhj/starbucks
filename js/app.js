// ========================================
// STARBUCKS VIETNAM - MODERN JAVASCRIPT
// ========================================

document.addEventListener("DOMContentLoaded", function () {
  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById("mainNavbar");
  let lastScroll = 0;

  function handleScroll() {
    if (!navbar) return;
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
  }

  handleScroll();
  window.addEventListener("scroll", handleScroll);

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#!') {
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

  // ===== CART FUNCTIONALITY =====
  let cartCount = parseInt(localStorage.getItem("cartCount") || "0");
  const cartBadge = document.getElementById("cartCountBadge");

  function updateCartBadge() {
    if (!cartBadge) return;
    if (cartCount > 0) {
      cartBadge.classList.remove("d-none");
      cartBadge.textContent = cartCount.toString();
    } else {
      cartBadge.classList.add("d-none");
    }
  }

  updateCartBadge();

  // Cart Toast
  const cartToastEl = document.getElementById("cartToast");
  const cartToastMessage = document.getElementById("cartToastMessage");
  let cartToast;
  
  if (cartToastEl) {
    cartToast = new bootstrap.Toast(cartToastEl, {
      delay: 3000
    });
  }

  // Add to cart function
  function addToCart(itemName) {
    cartCount += 1;
    localStorage.setItem("cartCount", cartCount.toString());
    updateCartBadge();

    // Show toast notification
    if (cartToast && cartToastMessage) {
      cartToastMessage.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <span class="material-icons-outlined">check_circle</span>
          <span>Đã thêm <strong>"${itemName}"</strong> vào giỏ hàng!</span>
        </div>
      `;
      cartToast.show();
    }

    // Animate cart icon
    if (cartBadge) {
      cartBadge.style.animation = 'none';
      setTimeout(() => {
        cartBadge.style.animation = 'bounce 0.5s ease';
      }, 10);
    }
  }

  // Attach event listeners to all add-to-cart buttons
  document.querySelectorAll(".add-to-cart-btn").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      const itemName = this.getAttribute("data-item") || "Món ăn/Thức uống";
      addToCart(itemName);

      // Button animation
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 200);
    });
  });

  // ===== MENU FILTER =====
  const filterBtns = document.querySelectorAll(".menu-filter-btn");
  const menuCards = document.querySelectorAll(".menu-item-card");

  if (filterBtns.length && menuCards.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        const filter = this.getAttribute("data-filter") || "all";

        // Update button styles
        filterBtns.forEach(function (b) {
          b.classList.remove("btn-success", "text-white");
          b.classList.add("btn-outline-success");
        });
        this.classList.remove("btn-outline-success");
        this.classList.add("btn-success", "text-white");

        // Filter cards with animation
        menuCards.forEach(function (card, index) {
          const category = card.getAttribute("data-category");
          
          if (filter === "all" || category === filter) {
            setTimeout(() => {
              card.style.display = 'block';
              card.style.animation = 'fadeIn 0.6s ease-out';
            }, index * 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ===== MEDIA LIGHTBOX =====
  const mediaModalEl = document.getElementById("mediaModal");
  const mediaModalImg = document.getElementById("mediaModalImg");
  let mediaModal;

  if (mediaModalEl) {
    mediaModal = new bootstrap.Modal(mediaModalEl);
  }

  if (mediaModal && mediaModalImg) {
    document.querySelectorAll(".media-item").forEach(function (item) {
      item.addEventListener("click", function () {
        const src = this.getAttribute("data-src");
        if (src) {
          mediaModalImg.setAttribute("src", src);
          mediaModal.show();
        }
      });
    });
  }

  // ===== CONTACT FORM =====
  const contactForm = document.getElementById("contactForm");
  const contactStatus = document.getElementById("contactStatus");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      
      // Get form values
      const name = document.getElementById("name")?.value;
      const email = document.getElementById("email")?.value;
      const message = document.getElementById("message")?.value;

      if (contactStatus) {
        // Show loading state
        contactStatus.innerHTML = `
          <div class="alert alert-info mt-3 d-flex align-items-center gap-2" role="alert">
            <div class="loading"></div>
            <span>Đang gửi tin nhắn...</span>
          </div>
        `;

        // Simulate sending (replace with actual API call)
        setTimeout(() => {
          contactStatus.innerHTML = `
            <div class="alert alert-success mt-3" role="alert">
              <div class="d-flex align-items-start gap-2">
                <span class="material-icons-outlined">check_circle</span>
                <div>
                  <strong>Cảm ơn bạn, ${name}!</strong>
                  <p class="mb-0 mt-1">Tin nhắn của bạn đã được gửi thành công. Chúng tôi sẽ phản hồi qua email <strong>${email}</strong> trong thời gian sớm nhất.</p>
                </div>
              </div>
            </div>
          `;
          contactForm.reset();

          // Auto hide after 5 seconds
          setTimeout(() => {
            contactStatus.innerHTML = '';
          }, 5000);
        }, 1500);
      }
    });
  }

  // ===== SEARCH FUNCTIONALITY =====
  const searchBtn = document.querySelector('[title="Tìm kiếm"]');
  const searchModal = document.createElement('div');
  searchModal.className = 'search-modal';
  searchModal.innerHTML = `
    <div class="container">
      <div class="d-flex flex-column align-items-center gap-4">
        <input type="text" class="search-input" placeholder="Tìm kiếm món ăn, thức uống..." id="searchInput">
        <button class="btn btn-light" id="closeSearch">
          <span class="material-icons-outlined">close</span>
        </button>
      </div>
    </div>
  `;
  document.body.appendChild(searchModal);

  if (searchBtn) {
    searchBtn.addEventListener('click', function(e) {
      e.preventDefault();
      searchModal.classList.add('active');
      setTimeout(() => {
        document.getElementById('searchInput')?.focus();
      }, 300);
    });
  }

  document.getElementById('closeSearch')?.addEventListener('click', function() {
    searchModal.classList.remove('active');
  });

  // Close search on ESC key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && searchModal.classList.contains('active')) {
      searchModal.classList.remove('active');
    }
  });

  // ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe elements
  document.querySelectorAll('.card, .blog-card, .favorite-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  // ===== PARALLAX EFFECT FOR HERO =====
  const heroBg = document.querySelector('.hero-bg');
  
  if (heroBg) {
    window.addEventListener('scroll', function() {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.5;
      heroBg.style.transform = `translateY(${rate}px)`;
    });
  }

  // ===== CURSOR TRAIL EFFECT (OPTIONAL) =====
  const trail = [];
  const trailLength = 10;

  document.addEventListener('mousemove', function(e) {
    if (window.innerWidth > 768) { // Only on desktop
      const dot = document.createElement('div');
      dot.style.position = 'fixed';
      dot.style.width = '6px';
      dot.style.height = '6px';
      dot.style.borderRadius = '50%';
      dot.style.background = 'rgba(0, 112, 74, 0.3)';
      dot.style.pointerEvents = 'none';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      dot.style.zIndex = '9998';
      dot.style.transition = 'opacity 0.5s ease';
      
      document.body.appendChild(dot);
      trail.push(dot);

      if (trail.length > trailLength) {
        const oldDot = trail.shift();
        oldDot.style.opacity = '0';
        setTimeout(() => oldDot.remove(), 500);
      }
    }
  });

  // ===== AUTO HIDE NAVBAR ON SCROLL DOWN =====
  let scrollPos = 0;
  
  window.addEventListener('scroll', function() {
    const currentScrollPos = window.pageYOffset;
    
    if (navbar && currentScrollPos > 100) {
      if (scrollPos > currentScrollPos) {
        navbar.style.transform = 'translateY(0)';
      } else {
        navbar.style.transform = 'translateY(-100%)';
      }
    } else if (navbar) {
      navbar.style.transform = 'translateY(0)';
    }
    
    scrollPos = currentScrollPos;
  });

  // ===== LAZY LOADING IMAGES =====
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src || img.src;
        img.classList.add('loaded');
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });

  // ===== BACK TO TOP BUTTON =====
  const backToTop = document.createElement('button');
  backToTop.innerHTML = '<span class="material-icons-outlined">arrow_upward</span>';
  backToTop.className = 'btn btn-primary position-fixed bottom-0 end-0 m-4 rounded-circle';
  backToTop.style.width = '50px';
  backToTop.style.height = '50px';
  backToTop.style.display = 'none';
  backToTop.style.zIndex = '1000';
  backToTop.style.padding = '0';
  backToTop.style.boxShadow = '0 4px 12px rgba(0, 112, 74, 0.4)';
  
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
      backToTop.style.display = 'flex';
      backToTop.style.alignItems = 'center';
      backToTop.style.justifyContent = 'center';
    } else {
      backToTop.style.display = 'none';
    }
  });

  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  console.log('🎉 Starbucks Vietnam - Website loaded successfully!');
});
