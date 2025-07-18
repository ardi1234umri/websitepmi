// Mobile menu toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.getElementById('nav-menu');

mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Smooth scrolling for navigation links
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
        // Close mobile menu if open
        navMenu.classList.remove('active');
    });
});

// Add scroll effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(231, 76, 60, 0.95), rgba(192, 57, 43, 0.95))';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        header.style.backdropFilter = 'none';
    }
});

// Intersection Observer for animations (example for service cards if added later)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Example: observe elements with class 'service-card' if present
document.querySelectorAll('.service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

//stok//
// Page navigation
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');
}

// Form submission
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Jadwal berhasil ditambahkan!');
    this.reset();
});

// Real-time clock (if needed)
function updateClock() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('id-ID');
    const dateString = now.toLocaleDateString('id-ID');
    
    const clockElements = document.querySelectorAll('.clock');
    clockElements.forEach(clock => {
        clock.textContent = `${dateString} ${timeString}`;
    });
}

setInterval(updateClock, 1000);
updateClock();

// Animation for stats cards
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const text = stat.textContent;
        const hasPercent = text.includes('%');
        const finalValue = parseInt(text);
        let currentValue = 0;
        const increment = finalValue / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= finalValue) {
                stat.textContent = finalValue + (hasPercent ? '%' : '');
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(currentValue) + (hasPercent ? '%' : '');
            }
        }, 30);
    });
}

// Trigger animation on page load
window.addEventListener('load', animateStats);

// Mobile menu toggle (optional)
let lastScrollTop = 0;
window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > lastScrollTop) {
        // Scrolling down
        document.body.style.paddingTop = '0';
    } else {
        // Scrolling up
        document.body.style.paddingTop = '0';
    }
    lastScrollTop = scrollTop;
});

// Touch gestures for mobile (optional)
let touchStartX = 0;
let touchStartY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

document.addEventListener('touchmove', function(e) {
    if (!touchStartX || !touchStartY) return;
    
    let touchEndX = e.touches[0].clientX;
    let touchEndY = e.touches[0].clientY;
    
    let diffX = touchStartX - touchEndX;
    let diffY = touchStartY - touchEndY;
    
    // Prevent default scrolling behavior for horizontal swipes
    if (Math.abs(diffX) > Math.abs(diffY)) {
        e.preventDefault();
    }
});

// Responsive chart sizing
function resizeChart() {
    const pieChart = document.querySelector('.pie-chart');
    
    if (window.innerWidth < 480) {
        pieChart.style.width = '200px';
        pieChart.style.height = '200px';
    } else if (window.innerWidth < 768) {
        pieChart.style.width = '250px';
        pieChart.style.height = '250px';
    } else {
        pieChart.style.width = '300px';
        pieChart.style.height = '300px';
    }
}

window.addEventListener('resize', resizeChart);
resizeChart();

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS for notification animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

/*berita
class NewsCarousel {
    constructor() {
        this.wrapper = document.getElementById('carouselWrapper');
        this.dots = document.querySelectorAll('.carousel-dot');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.progressBar = document.getElementById('progressBar');
        this.continueButtons = document.querySelectorAll('.continue-reading');
        
        this.currentSlide = 0;
        this.totalSlides = document.querySelectorAll('.news-card').length;
        this.autoPlayInterval = 5000; // 5 seconds
        this.autoPlayTimer = null;
        this.progressTimer = null;
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startAutoPlay();
        this.updateProgressBar();
    }

    setupEventListeners() {
        // Dot navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // Arrow navigation
        this.prevBtn.addEventListener('click', () => {
            this.previousSlide();
            this.resetAutoPlay();
        });

        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });

        // Continue reading buttons
        this.continueButtons.forEach((button, index) => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                this.handleContinueReading(index);
            });
        });

        // Pause auto-play on hover
        this.wrapper.addEventListener('mouseenter', () => {
            this.pauseAutoPlay();
        });

        this.wrapper.addEventListener('mouseleave', () => {
            this.startAutoPlay();
        });

        // Touch events for mobile
        this.setupTouchEvents();

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                this.previousSlide();
                this.resetAutoPlay();
            } else if (e.key === 'ArrowRight') {
                this.nextSlide();
                this.resetAutoPlay();
            }
        });
    }

    setupTouchEvents() {
        let startX = 0;
        let startY = 0;
        let endX = 0;
        let endY = 0;

        this.wrapper.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        this.wrapper.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            endY = e.changedTouches[0].clientY;
            
            const diffX = startX - endX;
            const diffY = startY - endY;
            
            // Only handle horizontal swipes
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
                if (diffX > 0) {
                    this.nextSlide();
                } else {
                    this.previousSlide();
                }
                this.resetAutoPlay();
            }
        });
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateCarousel();
        this.updateDots();
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateCarousel();
        this.updateDots();
    }

    previousSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
        this.updateCarousel();
        this.updateDots();
    }

    updateCarousel() {
        const translateX = -this.currentSlide * 100;
        this.wrapper.style.transform = `translateX(${translateX}%)`;
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoPlay() {
        this.autoPlayTimer = setInterval(() => {
            this.nextSlide();
        }, this.autoPlayInterval);
        this.updateProgressBar();
    }

    pauseAutoPlay() {
        if (this.autoPlayTimer) {
            clearInterval(this.autoPlayTimer);
            this.autoPlayTimer = null;
        }
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
            this.progressTimer = null;
        }
    }

    resetAutoPlay() {
        this.pauseAutoPlay();
        this.startAutoPlay();
    }

    updateProgressBar() {
        if (this.progressTimer) {
            clearInterval(this.progressTimer);
        }
        
        let progress = 0;
        const increment = 100 / (this.autoPlayInterval / 50);
        
        this.progressTimer = setInterval(() => {
            progress += increment;
            this.progressBar.style.width = `${progress}%`;
            
            if (progress >= 100) {
                progress = 0;
                this.progressBar.style.width = '0%';
            }
        }, 50);
    }

    handleContinueReading(index) {
        // Add ripple effect
        const button = this.continueButtons[index];
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.width = '100px';
        ripple.style.height = '100px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.marginLeft = '-50px';
        ripple.style.marginTop = '-50px';
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);

        // Add CSS for ripple animation
        if (!document.querySelector('#ripple-style')) {
            const style = document.createElement('style');
            style.id = 'ripple-style';
            style.innerHTML = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }

        // Simulate navigation (you can replace this with actual navigation)
        setTimeout(() => {
            alert(`Navigating to full article: ${document.querySelectorAll('.news-title')[index].textContent}`);
        }, 300);
    }
}

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new NewsCarousel();
});

// Add smooth scrolling for better UX
document.documentElement.style.scrollBehavior = 'smooth'; */

/*
class NewsCarousel {
  constructor(options = {}) {
    // Gunakan opsi untuk ID/class agar bisa disesuaikan jika perlu
    this.wrapper = document.getElementById(options.wrapperId || 'carouselWrapper');
    this.dots = document.querySelectorAll(options.dotClass || '.news-carousel-dot');
    this.prevBtn = document.getElementById(options.prevBtnId || 'news-prevBtn');
    this.nextBtn = document.getElementById(options.nextBtnId || 'news-nextBtn');
    this.progressBar = document.getElementById(options.progressBarId || 'news-progressBar');
    this.continueButtons = document.querySelectorAll(options.continueBtnClass || '.continue-reading');

    if (!this.wrapper || !this.prevBtn || !this.nextBtn) {
      console.error('NewsCarousel: Element tidak ditemukan, pastikan ID/class benar.');
      return;
    }

    this.currentSlide = 0;
    this.totalSlides = this.wrapper.children.length;
    this.autoPlayInterval = options.autoPlayInterval || 5000; // default 5 detik
    this.autoPlayTimer = null;
    this.progressTimer = null;

    this.init();
  }

  init() {
    this.setupEventListeners();
    this.goToSlide(0);
    this.startAutoPlay();
    this.updateProgressBar();
  }

  setupEventListeners() {
    // Navigasi dot
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.goToSlide(index);
        this.resetAutoPlay();
      });
    });

    // Tombol panah
    this.prevBtn.addEventListener('click', () => {
      this.previousSlide();
      this.resetAutoPlay();
    });

    this.nextBtn.addEventListener('click', () => {
      this.nextSlide();
      this.resetAutoPlay();
    });

    // Tombol Continue Reading dengan efek ripple dan navigasi simulasi
    this.continueButtons.forEach((button, index) => {
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        this.handleContinueReading(index);
      });
    });

    // Pause auto-play saat hover
    this.wrapper.addEventListener('mouseenter', () => this.pauseAutoPlay());
    this.wrapper.addEventListener('mouseleave', () => this.startAutoPlay());

    // Swipe untuk mobile
    this.setupTouchEvents();

    // Navigasi keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        this.previousSlide();
        this.resetAutoPlay();
      } else if (e.key === 'ArrowRight') {
        this.nextSlide();
        this.resetAutoPlay();
      }
    });
  }

  setupTouchEvents() {
    let startX = 0;
    let startY = 0;

    this.wrapper.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    });

    this.wrapper.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;

      const diffX = startX - endX;
      const diffY = startY - endY;

      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        if (diffX > 0) {
          this.nextSlide();
        } else {
          this.previousSlide();
        }
        this.resetAutoPlay();
      }
    });
  }

  goToSlide(index) {
    if (index < 0 || index >= this.totalSlides) return;
    this.currentSlide = index;
    this.updateCarousel();
    this.updateDots();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
    this.updateCarousel();
    this.updateDots();
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
    this.updateDots();
  }

  updateCarousel() {
    const translateX = -this.currentSlide * 100;
    this.wrapper.style.transform = `translateX(${translateX}%)`;
  }

  updateDots() {
    this.dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentSlide);
    });
  }

  startAutoPlay() {
    if (this.autoPlayTimer) return;
    this.autoPlayTimer = setInterval(() => this.nextSlide(), this.autoPlayInterval);
    this.updateProgressBar();
  }

  pauseAutoPlay() {
    if (this.autoPlayTimer) {
      clearInterval(this.autoPlayTimer);
      this.autoPlayTimer = null;
    }
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
      this.progressTimer = null;
    }
  }

  resetAutoPlay() {
    this.pauseAutoPlay();
    this.startAutoPlay();
  }

  updateProgressBar() {
    if (!this.progressBar) return;
    if (this.progressTimer) clearInterval(this.progressTimer);

    let progress = 0;
    const increment = 100 / (this.autoPlayInterval / 50);

    this.progressTimer = setInterval(() => {
      progress += increment;
      this.progressBar.style.width = `${progress}%`;

      if (progress >= 100) {
        progress = 0;
        this.progressBar.style.width = '0%';
      }
    }, 50);
  }

  handleContinueReading(index) {
    const button = this.continueButtons[index];
    if (!button) return;

    // Ripple effect
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.width = '100px';
    ripple.style.height = '100px';
    ripple.style.background = 'rgba(255, 255, 255, 0.5)';
    ripple.style.borderRadius = '50%';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = '50%';
    ripple.style.top = '50%';
    ripple.style.marginLeft = '-50px';
    ripple.style.marginTop = '-50px';
    ripple.style.pointerEvents = 'none';

    button.style.position = 'relative';
    button.appendChild(ripple);

    setTimeout(() => ripple.remove(), 600);

    // Tambahkan style ripple jika belum ada
    if (!document.querySelector('#ripple-style')) {
      const style = document.createElement('style');
      style.id = 'ripple-style';
      style.innerHTML = `
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }

    // Simulasi navigasi, ganti dengan window.open(url) jika ada URL
    setTimeout(() => {
      const newsTitle = document.querySelectorAll('.news-title')[index];
      alert(`Navigating to full article: ${newsTitle ? newsTitle.textContent : 'Unknown'}`);
    }, 300);
  }
}

// Inisialisasi carousel setelah DOM siap
document.addEventListener('DOMContentLoaded', () => {
  // Jika ID/class berbeda, bisa di-pass lewat options
  new NewsCarousel({
    wrapperId: 'carouselWrapper',
    dotClass: '.news-carousel-dot',
    prevBtnId: 'news-prevBtn',
    nextBtnId: 'news-nextBtn',
    progressBarId: 'news-progressBar',
    continueBtnClass: '.continue-reading',
    autoPlayInterval: 5000
  });
});
*/

document.addEventListener("DOMContentLoaded", function() {
  const wrapper = document.getElementById("carouselWrapper");
  const cards = wrapper.querySelectorAll(".news-card");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const dots = document.querySelectorAll(".carousel-dot");

  let currentIndex = 0;
  const totalSlides = cards.length;

  function updateSlide(index) {
    // Geser wrapper sesuai index slide
    wrapper.style.transform = `translateX(-${index * 100}%)`;
    // Update active dot
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
    });
  }

  prevBtn.addEventListener("click", () => {
    currentIndex = currentIndex === 0 ? totalSlides - 1 : currentIndex - 1;
    updateSlide(currentIndex);
  });

  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlide(currentIndex);
  });

  dots.forEach((dot, idx) => {
    dot.addEventListener("click", () => {
      currentIndex = idx;
      updateSlide(currentIndex);
    });
  });

  // Inisialisasi slide pertama
  updateSlide(currentIndex);
});



//video//
class VideoPlayer {
    constructor() {
        this.currentVideo = null;
        this.videos = [
            {
                id: 'dQw4w9WgXcQ',
                title: 'Rick Astley - Never Gonna Give You Up',
                meta: '1.2B views • 13 years ago',
                description: 'The official video for Rick Astley\'s "Never Gonna Give You Up". A classic that became an internet phenomenon.'
            },
            {
                id: '9bZkp7q19f0',
                title: 'PSY - GANGNAM STYLE',
                meta: '4.7B views • 11 years ago',
                description: 'PSY\'s official music video for "GANGNAM STYLE". The song that took the world by storm and became a global sensation.'
            },
            {
                id: 'kffacxfA7G4',
                title: 'Baby Shark Dance | Sing and Dance!',
                meta: '13B views • 7 years ago',
                description: 'The beloved children\'s song that became the most-watched video on YouTube. Perfect for kids and families!'
            },
            {
                id: 'L_jWHffIx5E',
                title: 'Smash Mouth - All Star',
                meta: '234M views • 14 years ago',
                description: 'Smash Mouth\'s hit song "All Star" that became an internet meme and cultural phenomenon.'
            }
        ];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadDefaultVideo();
    }

    setupEventListeners() {
        // Close modal when clicking outside
        document.getElementById('videoModal').addEventListener('click', (e) => {
            if (e.target.id === 'videoModal') {
                this.closeModal();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeModal();
            }
        });

        // Removed search input event listener
    }

    loadDefaultVideo() {
        const defaultVideo = this.videos[0];
        this.loadVideo(defaultVideo.id, defaultVideo.title, defaultVideo.meta, defaultVideo.description);
    }

    loadVideo(videoId, title, meta, description = '') {
        const mainPlayer = document.getElementById('mainPlayer');
        const mainTitle = document.getElementById('mainTitle');
        const mainDescription = document.getElementById('mainDescription');
        
        // Add loading animation
        this.showLoading();
        
        setTimeout(() => {
            mainPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0`;
            mainTitle.textContent = title;
            
            // Update meta information
            const metaParts = meta.split(' • ');
            document.getElementById('viewCount').textContent = metaParts[0];
            document.getElementById('uploadDate').textContent = metaParts[1] || 'Recently uploaded';
            
            // Update description
            const videoData = this.videos.find(v => v.id === videoId);
            mainDescription.textContent = videoData ? videoData.description : description || 'No description available.';
            
            this.currentVideo = { id: videoId, title, meta, description };
            this.hideLoading()});
            
            // Add smooth scroll to top
            //window.scrollTo({ top: 0, behavior: 'smooth' });
        //}, 500);
    }

    showLoading() {
        const player = document.getElementById('mainPlayer');
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'loading';
        loadingDiv.innerHTML = '<div class="spinner"></div>';
        loadingDiv.id = 'loadingIndicator';
        player.parentNode.insertBefore(loadingDiv, player);
        player.style.display = 'none';
    }

    hideLoading() {
        const loading = document.getElementById('loadingIndicator');
        const player = document.getElementById('mainPlayer');
        if (loading) {
            loading.remove();
        }
        player.style.display = 'block';
    }

    openModal(videoId, title) {
        const modal = document.getElementById('videoModal');
        const modalPlayer = document.getElementById('modalPlayer');
        const modalTitle = document.getElementById('modalTitle');
        
        modalPlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&controls=1&rel=0`;
        modalTitle.textContent = title;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        const modal = document.getElementById('videoModal');
        const modalPlayer = document.getElementById('modalPlayer');
        
        modalPlayer.src = '';
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    likeVideo() {
        if (this.currentVideo) {
            this.showNotification('👍 Liked!');
            // Add visual feedback
            const likeBtn = event.target;
            likeBtn.style.background = '#ff0000';
            setTimeout(() => {
                likeBtn.style.background = '#333';
            }, 1000);
        }
    }

    shareVideo() {
        if (this.currentVideo) {
            const shareData = {
                title: this.currentVideo.title,
                url: `https://www.youtube.com/watch?v=${this.currentVideo.id}`
            };
            
            if (navigator.share) {
                navigator.share(shareData);
            } else {
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(shareData.url).then(() => {
                    this.showNotification('📋 Link copied to clipboard!');
                });
            }
        }
    }

    saveVideo() {
        if (this.currentVideo) {
            this.showNotification('💾 Video saved to Watch Later!');
            // Add visual feedback
            const saveBtn = event.target;
            saveBtn.style.background = '#0066cc';
            setTimeout(() => {
                saveBtn.style.background = '#333';
            }, 1000);
        }
    }

    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        `;
        notification.textContent = message;
        
        // Add animation keyframes if not already added
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.innerHTML = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideIn 0.3s ease reverse';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
}

// Initialize the video player
const videoPlayer = new VideoPlayer();

// Global functions for HTML onclick events
function loadVideo(videoId, title, meta, description) {
    videoPlayer.loadVideo(videoId, title, meta, description);
}

function openModal(videoId, title) {
    videoPlayer.openModal(videoId, title);
}

function closeModal() {
    videoPlayer.closeModal();
}

function likeVideo() {
    videoPlayer.likeVideo();
}

function shareVideo() {
    videoPlayer.shareVideo();
}

function saveVideo() {
    videoPlayer.saveVideo();
}

// Add smooth scrolling behavior
document.documentElement.style.scrollBehavior = 'smooth';

// Add intersection observer for animations
//const observerOptions = {
//    threshold: 0.1,
//    rootMargin: '0px 0px -50px 0px'
//};

//const observer = new IntersectionObserver((entries) => {
//    entries.forEach(entry => {
//        if (entry.isIntersecting) {
//            entry.target.style.animation = 'fadeIn 0.6s ease forwards';
//        }
//    });
//}, observerOptions);

// Observe all sidebar videos
/*document.querySelectorAll('.sidebar-video').forEach(card => {
    observer.observe(card);
});*/

//map
// Smooth scrolling for navigation links
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

// Scroll animations
//const observerOptions = {
//    threshold: 0.1,
//    rootMargin: '0px 0px -50px 0px'
//};

//const observer = new IntersectionObserver((entries) => {
//    entries.forEach(entry => {
//        if (entry.isIntersecting) {
//            entry.target.classList.add('active');
//        }
//    });
//}, observerOptions);

document.querySelectorAll('.scroll-animate').forEach(el => {
    observer.observe(el);
});

// Add loading animation to map
const mapWrapper = document.querySelector('.map-wrapper');
const iframe = mapWrapper.querySelector('iframe');

iframe.addEventListener('load', () => {
    mapWrapper.style.opacity = '1';
});

// Add click animation to buttons
document.querySelectorAll('.cta-btn, .route-btn, .emergency-contact').forEach(btn => {
    btn.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Add parallax effect to hero section (if hero exists)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to info cards (if any)
const cards = document.querySelectorAll('.info-card');
cards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
});



//footer
// Smooth scrolling functionality
function scrollToFooter() {
    document.querySelector('.footer').scrollIntoView({
        behavior: 'smooth'
    });
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', () => {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    if (window.pageYOffset > 300) {
        scrollToTopBtn.classList.add('visible');
    } else {
        scrollToTopBtn.classList.remove('visible');
    }
});

// Add smooth hover effects to social icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add click effects to social icons
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Create ripple effect
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255,255,255,0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.left = '50%';
        ripple.style.top = '50%';
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.marginLeft = '-10px';
        ripple.style.marginTop = '-10px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for fade-in animations
//const observerOptions = {
//    threshold: 0.1,
//    rootMargin: '0px 0px -50px 0px'
//};

//onst observer = new IntersectionObserver((entries) => {
//    entries.forEach(entry => {
//        if (entry.isIntersecting) {
//            entry.target.style.opacity = '1';
//            entry.target.style.transform = 'translateY(0)';
//        }
//    });
//}, observerOptions);

// Apply fade-in animation to footer sections
document.querySelectorAll('.footer-section, .footer-brand').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});


