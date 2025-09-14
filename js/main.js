// iOS Performance Optimizations
document.addEventListener('DOMContentLoaded', function() {
  // Reduce animations on low-power devices
  if (navigator.userAgent.match(/iPhone|iPad|iPod/i)) {
    // Disable heavy animations on older iOS devices
    const isOldDevice = /iPhone [1-6]|iPad [1-4]|iPod/.test(navigator.userAgent);
    if (isOldDevice) {
      document.body.classList.add('reduce-motion');
    }
  }

  // Optimize touch events for iOS
  document.body.addEventListener('touchstart', function() {}, { passive: true });
  document.body.addEventListener('touchmove', function() {}, { passive: true });
});

// Sidebar menu with iOS optimizations
const menuBtn = document.getElementById('menu-btn');
const closeBtn = document.getElementById('close-btn');
const sidebar = document.getElementById('sidebar');

// Add touch event handlers for better iOS responsiveness
function openSidebar() {
  sidebar.classList.add('open');
  sidebar.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling on iOS
}

function closeSidebar() {
  sidebar.classList.remove('open');
  sidebar.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = ''; // Restore scrolling
}

menuBtn.addEventListener('click', openSidebar);
menuBtn.addEventListener('touchend', openSidebar, { passive: true });
closeBtn.addEventListener('click', closeSidebar);
closeBtn.addEventListener('touchend', closeSidebar, { passive: true });

// Close sidebar when clicking outside (iOS friendly)
sidebar.addEventListener('click', function(e) {
  if (e.target === sidebar) {
    closeSidebar();
  }
});

// Optimize image loading for mobile
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src;
  });
} else {
  // Fallback for older browsers
  const script = document.createElement('script');
  script.src = 'https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver';
  document.head.appendChild(script);
}

// Carousel functionality
let currentSlide = 0;
let slides = [];
let indicators = [];
let totalSlides = 0;

function showSlide(index) {
  // Remove active class from all slides and indicators
  slides.forEach(slide => slide.classList.remove('active', 'prev'));
  indicators.forEach(indicator => indicator.classList.remove('active'));
  
  // Add active class to current slide and indicator
  slides[index].classList.add('active');
  indicators[index].classList.add('active');
  
  // Add prev class to previous slide for animation
  if (index > 0) {
    slides[index - 1].classList.add('prev');
  } else if (index === 0 && currentSlide === totalSlides - 1) {
    slides[totalSlides - 1].classList.add('prev');
  }
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  showSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  showSlide(currentSlide);
}

function goToSlide(index) {
  currentSlide = index;
  showSlide(currentSlide);
}

// Auto-play carousel every 5 seconds
let autoplayInterval;

function startAutoplay() {
  autoplayInterval = setInterval(nextSlide, 5000);
}

function stopAutoplay() {
  clearInterval(autoplayInterval);
}

// Initialize carousel when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize carousel elements
  slides = document.querySelectorAll('.carousel-slide');
  indicators = document.querySelectorAll('.indicator');
  totalSlides = slides.length;
  
  // Debug: Check if images are loading
  const images = document.querySelectorAll('.sponsor-logo');
  images.forEach((img, index) => {
    img.addEventListener('load', function() {
      console.log(`Image ${index + 1} loaded successfully: ${this.src}`);
    });
    img.addEventListener('error', function() {
      console.error(`Failed to load image ${index + 1}: ${this.src}`);
    });
  });
  
  if (slides.length > 0) {
    showSlide(0);
    startAutoplay();
    
    // Pause autoplay on hover
    const carousel = document.getElementById('sponsorCarousel');
    if (carousel) {
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
    }
  }
});

// Touch/swipe support for mobile
let startX = 0;
let endX = 0;

document.getElementById('sponsorCarousel')?.addEventListener('touchstart', function(e) {
  startX = e.touches[0].clientX;
});

document.getElementById('sponsorCarousel')?.addEventListener('touchend', function(e) {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = startX - endX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextSlide();
    } else {
      prevSlide();
    }
  }
}
