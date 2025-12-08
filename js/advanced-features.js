// ========================================
// STARBUCKS VIETNAM - ADVANCED FEATURES
// Ultimate JavaScript functionality
// ========================================

(function() {
  'use strict';

  // ===== LOADING SCREEN =====
  window.addEventListener('load', function() {
    setTimeout(() => {
      const loadingScreen = document.getElementById('loading-screen');
      if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => loadingScreen.remove(), 500);
      }
    }, 1500);
  });

  document.addEventListener('DOMContentLoaded', function() {
    
    // ===== DARK MODE TOGGLE =====
    const initDarkMode = () => {
      const savedTheme = localStorage.getItem('theme') || 'light';
      document.documentElement.setAttribute('data-theme', savedTheme);
      
      const themeToggle = document.querySelector('.theme-toggle');
      if (themeToggle) {
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', () => {
          const currentTheme = document.documentElement.getAttribute('data-theme');
          const newTheme = currentTheme === 'light' ? 'dark' : 'light';
          
          document.documentElement.setAttribute('data-theme', newTheme);
          localStorage.setItem('theme', newTheme);
          updateThemeIcon(newTheme);
          
          // Animate toggle
          themeToggle.style.transform = 'rotate(360deg) scale(1.2)';
          setTimeout(() => {
            themeToggle.style.transform = '';
          }, 500);
        });
      }
    };

    const updateThemeIcon = (theme) => {
      const icon = document.querySelector('.theme-toggle .material-icons-outlined');
      if (icon) {
        icon.textContent = theme === 'light' ? 'dark_mode' : 'light_mode';
      }
    };

    initDarkMode();

    // ===== SCROLL PROGRESS BAR =====
    const createScrollProgress = () => {
      let progressBar = document.querySelector('.scroll-progress');
      if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.prepend(progressBar);
      }

      window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
      });
    };

    createScrollProgress();

    // ===== PARTICLES.JS INTEGRATION =====
    const initParticles = () => {
      if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
          particles: {
            number: {
              value: 80,
              density: {
                enable: true,
                value_area: 800
              }
            },
            color: {
              value: '#00704A'
            },
            shape: {
              type: 'circle'
            },
            opacity: {
              value: 0.5,
              random: true
            },
            size: {
              value: 3,
              random: true
            },
            line_linked: {
              enable: true,
              distance: 150,
              color: '#00A862',
              opacity: 0.4,
              width: 1
            },
            move: {
              enable: true,
              speed: 2,
              direction: 'none',
              random: false,
              straight: false,
              out_mode: 'out',
              bounce: false
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'repulse'
              },
              onclick: {
                enable: true,
                mode: 'push'
              },
              resize: true
            }
          },
          retina_detect: true
        });
      }
    };

    // Load particles.js dynamically
    if (!document.getElementById('particles-js')) {
      const particlesDiv = document.createElement('div');
      particlesDiv.id = 'particles-js';
      document.body.prepend(particlesDiv);
    }

    const particlesScript = document.createElement('script');
    particlesScript.src = 'https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js';
    particlesScript.onload = initParticles;
    document.head.appendChild(particlesScript);

    // ===== FLOATING COFFEE BEANS =====
    const createFloatingBeans = () => {
      const container = document.createElement('div');
      container.className = 'floating-beans';
      document.body.appendChild(container);

      for (let i = 0; i < 10; i++) {
        const bean = document.createElement('div');
        bean.className = 'bean';
        bean.style.left = Math.random() * 100 + '%';
        bean.style.animationDelay = Math.random() * 20 + 's';
        bean.style.animationDuration = (20 + Math.random() * 10) + 's';
        container.appendChild(bean);
      }
    };

    createFloatingBeans();

    // ===== 3D TILT EFFECT FOR CARDS =====
    const init3DTilt = () => {
      const tiltCards = document.querySelectorAll('.card, .favorite-card, .blog-card');
      
      tiltCards.forEach(card => {
        card.classList.add('tilt-card');
        
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          const centerX = rect.width / 2;
          const centerY = rect.height / 2;
          
          const rotateX = (y - centerY) / 10;
          const rotateY = (centerX - x) / 10;
          
          card.style.setProperty('--rx', -rotateX + 'deg');
          card.style.setProperty('--ry', rotateY + 'deg');
        });
        
        card.addEventListener('mouseleave', () => {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        });
      });
    };

    init3DTilt();

    // ===== TYPING EFFECT =====
    const initTypingEffect = () => {
      const typingElements = document.querySelectorAll('[data-typing]');
      
      typingElements.forEach(element => {
        const text = element.getAttribute('data-typing');
        element.textContent = '';
        element.classList.add('typing-text');
        
        let index = 0;
        const type = () => {
          if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
          }
        };
        
        // Start typing when element is in viewport
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              type();
              observer.unobserve(entry.target);
            }
          });
        });
        
        observer.observe(element);
      });
    };

    initTypingEffect();

    // ===== CONFETTI CELEBRATION =====
    window.celebrateWithConfetti = function() {
      const colors = ['#00704A', '#00A862', '#D4E9E2', '#FFD700'];
      const confettiCount = 100;
      
      for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.animationDelay = Math.random() * 3 + 's';
        confetti.style.animationDuration = (2 + Math.random() * 2) + 's';
        
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
      }
    };

    // ===== COUNTDOWN TIMER =====
    window.createCountdown = function(targetDate, containerId) {
      const container = document.getElementById(containerId);
      if (!container) return;

      const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = new Date(targetDate).getTime() - now;

        if (distance < 0) {
          container.innerHTML = '<h2 class="text-success">🎉 Đã Đến Lúc!</h2>';
          return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        container.innerHTML = `
          <div class="countdown-container">
            <div class="countdown-item">
              <span class="countdown-number">${days}</span>
              <span class="countdown-label">Ngày</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number">${hours}</span>
              <span class="countdown-label">Giờ</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number">${minutes}</span>
              <span class="countdown-label">Phút</span>
            </div>
            <div class="countdown-item">
              <span class="countdown-number">${seconds}</span>
              <span class="countdown-label">Giây</span>
            </div>
          </div>
        `;
      };

      updateCountdown();
      setInterval(updateCountdown, 1000);
    };

    // ===== SMOOTH REVEAL ON SCROLL =====
    const revealOnScroll = () => {
      const reveals = document.querySelectorAll('.reveal-on-scroll');
      
      const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.15
      });

      reveals.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(element);
      });

      // Add revealed class styling
      const style = document.createElement('style');
      style.textContent = `
        .reveal-on-scroll.revealed {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }
      `;
      document.head.appendChild(style);
    };

    revealOnScroll();

    // ===== DYNAMIC GRADIENT BACKGROUND =====
    const animateGradient = (element) => {
      if (!element) return;
      
      let hue = 0;
      setInterval(() => {
        hue = (hue + 1) % 360;
        element.style.background = `linear-gradient(135deg, 
          hsl(${hue}, 70%, 40%), 
          hsl(${(hue + 60) % 360}, 70%, 50%))`;
      }, 50);
    };

    // ===== PARALLAX MOUSE MOVE =====
    const initParallaxMouse = () => {
      document.addEventListener('mousemove', (e) => {
        const layers = document.querySelectorAll('.parallax-layer');
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        layers.forEach((layer, index) => {
          const speed = (index + 1) * 10;
          const x = (window.innerWidth - e.pageX * speed) / 100;
          const y = (window.innerHeight - e.pageY * speed) / 100;
          layer.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
      });
    };

    initParallaxMouse();

    // ===== GLITCH TEXT EFFECT =====
    const initGlitchText = () => {
      const glitchElements = document.querySelectorAll('[data-glitch]');
      
      glitchElements.forEach(element => {
        const text = element.textContent;
        element.setAttribute('data-text', text);
        element.classList.add('glitch');
      });
    };

    initGlitchText();

    // ===== NOTIFICATION SYSTEM =====
    window.showNotification = function(message, type = 'success') {
      const notification = document.createElement('div');
      notification.className = `alert alert-${type} position-fixed top-0 end-0 m-3 shadow-lg`;
      notification.style.zIndex = '9999';
      notification.style.minWidth = '300px';
      notification.style.animation = 'slideInRight 0.5s ease';
      notification.innerHTML = `
        <div class="d-flex align-items-center gap-2">
          <span class="material-icons-outlined">${type === 'success' ? 'check_circle' : 'info'}</span>
          <span>${message}</span>
          <button type="button" class="btn-close ms-auto" onclick="this.parentElement.parentElement.remove()"></button>
        </div>
      `;
      
      document.body.appendChild(notification);
      
      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => notification.remove(), 500);
      }, 3000);
    };

    // ===== IMAGE LAZY LOAD WITH BLUR EFFECT =====
    const lazyLoadImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.style.filter = 'blur(20px)';
            img.style.transition = 'filter 0.5s';
            
            img.src = img.dataset.src;
            img.onload = () => {
              img.style.filter = 'blur(0)';
              img.removeAttribute('data-src');
            };
            
            imageObserver.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    lazyLoadImages();

    // ===== FPS COUNTER (DEBUG) =====
    if (window.location.search.includes('debug')) {
      const fpsCounter = document.createElement('div');
      fpsCounter.style.cssText = 'position:fixed;top:10px;left:10px;background:rgba(0,0,0,0.8);color:#0f0;padding:10px;font-family:monospace;z-index:99999;border-radius:8px;';
      document.body.appendChild(fpsCounter);

      let lastTime = performance.now();
      let frames = 0;

      function updateFPS() {
        frames++;
        const now = performance.now();
        if (now >= lastTime + 1000) {
          fpsCounter.textContent = `FPS: ${frames}`;
          frames = 0;
          lastTime = now;
        }
        requestAnimationFrame(updateFPS);
      }
      updateFPS();
    }

    // ===== SMOOTH SCROLL ENHANCEMENT =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#!') {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });

    // ===== EASTER EGG: KONAMI CODE =====
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          celebrateWithConfetti();
          showNotification('🎮 Cheat Code Activated! Free Coffee! ☕', 'success');
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });

    // ===== PERFORMANCE MONITORING =====
    if ('PerformanceObserver' in window) {
      const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            console.log('LCP:', entry.startTime);
          }
        }
      });
      
      perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    }

    console.log('%c🎉 Starbucks Vietnam - Ultimate Edition', 'color: #00704A; font-size: 20px; font-weight: bold;');
    console.log('%c✨ All advanced features loaded!', 'color: #00A862; font-size: 14px;');
    console.log('%c💡 Try the Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A', 'color: #666; font-size: 12px;');
  });

})();
