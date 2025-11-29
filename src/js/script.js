document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('navLinks');

    // Typing animation elements
    const typingText = document.getElementById('typing-text');
    let phrases = [
        "Financial Management, Simple and Global",
        "Multilingual Support for Persian & Arabic",
        "Track Transactions Effortlessly",
        "Multi-Currency Management Made Easy",
        "Smart Financial Insights at Your Fingertips"
    ];
    let i = 0;
    let j = 0;
    let currentPhrase = [];
    let isDeleting = false;
    let isEnd = false;
    let typingSpeed = 100;

    // Typing animation function
    function loop() {
        isEnd = false;

        if (i < phrases.length) {
            // Typing forward
            if (!isDeleting && j <= phrases[i].length) {
                currentPhrase.push(phrases[i].charAt(j));
                j++;
                typingText.innerHTML = currentPhrase.join("");
            }

            // Deleting backward
            if (isDeleting && j >= 0) {
                currentPhrase.pop();
                j--;
                typingText.innerHTML = currentPhrase.join("");
            }

            // When phrase is fully typed
            if (j === phrases[i].length) {
                isEnd = true;
                isDeleting = true;
                typingSpeed = 100;
            }

            // When phrase is fully deleted
            if (isDeleting && j === 0) {
                currentPhrase = [];
                isDeleting = false;
                i++;

                // Reset to first phrase after last phrase
                if (i === phrases.length) {
                    i = 0;
                }

                typingSpeed = 200;
            }
        }

        // Adjust typing speed based on action
        const speed = isEnd ? 2000 : isDeleting ? 50 : typingSpeed;

        setTimeout(loop, speed);
    }

    // Function to update typing phrases (called by localization system)
    window.updateTypingPhrases = function (newPhrases) {
        phrases = newPhrases;
        // Reset animation if it's running
        i = 0;
        j = 0;
        currentPhrase = [];
        isDeleting = false;
        isEnd = false;
        if (typingText) {
            typingText.innerHTML = "";
            setTimeout(() => {
                loop();
            }, 1000);
        }
    };

    // Start typing animation if element exists
    if (typingText) {
        // Apply gradient styling to typing text
        typingText.style.background = "linear-gradient(90deg, var(--primary), var(--tertiary))";
        typingText.style.webkitBackgroundClip = "text";
        typingText.style.backgroundClip = "text";
        typingText.style.color = "transparent";

        // Add a slight delay before starting the animation to ensure elements are loaded
        setTimeout(() => {
            loop();
        }, 1000);
    }

    // ==============================================
    // ENHANCED GALLERY FUNCTIONALITY
    // ==============================================

    // Gallery data with screenshot information
    const galleryData = [
        {
            id: 'dashboard',
            category: 'dashboard',
            title: 'Dashboard Overview',
            description: 'Clean, intuitive dashboard showing your financial overview at a glance',
            images: {
                thumb: 'assets/images/gallery-1_thumb.webp',
                thumbJpg: 'assets/images/gallery-1_thumb.jpg',
                medium: 'assets/images/gallery-1_medium.webp',
                mediumJpg: 'assets/images/gallery-1_medium.jpg',
                full: 'assets/images/gallery-1.webp',
                fullJpg: 'assets/images/gallery-1.jpg'
            }
        },
        {
            id: 'charts',
            category: 'analytics',
            title: 'Financial Analytics',
            description: 'Comprehensive charts and graphs for detailed financial analysis',
            images: {
                thumb: 'assets/images/gallery-2_thumb.webp',
                thumbJpg: 'assets/images/gallery-2_thumb.jpg',
                medium: 'assets/images/gallery-2_medium.webp',
                mediumJpg: 'assets/images/gallery-2_medium.jpg',
                full: 'assets/images/gallery-2.webp',
                fullJpg: 'assets/images/gallery-2.jpg'
            }
        },
        {
            id: 'accounts',
            category: 'accounts',
            title: 'Multi-Currency Management',
            description: 'Manage multiple accounts and currencies in one unified interface',
            images: {
                thumb: 'assets/images/gallery-3_thumb.webp',
                thumbJpg: 'assets/images/gallery-3_thumb.jpg',
                medium: 'assets/images/gallery-3_medium.webp',
                mediumJpg: 'assets/images/gallery-3_medium.jpg',
                full: 'assets/images/gallery-3.webp',
                fullJpg: 'assets/images/gallery-3.jpg'
            }
        },
        {
            id: 'transfers',
            category: 'transactions',
            title: 'Transaction Management',
            description: 'Easy transaction entry and transfer management system',
            images: {
                thumb: 'assets/images/gallery-4_thumb.webp',
                thumbJpg: 'assets/images/gallery-4_thumb.jpg',
                medium: 'assets/images/gallery-4_medium.webp',
                mediumJpg: 'assets/images/gallery-4_medium.jpg',
                full: 'assets/images/gallery-4.webp',
                fullJpg: 'assets/images/gallery-4.jpg'
            }
        },
        {
            id: 'calendar',
            category: 'settings',
            title: 'Dual Calendar Support',
            description: 'Persian and Gregorian calendar support for international users',
            images: {
                thumb: 'assets/images/gallery-5_thumb.webp',
                thumbJpg: 'assets/images/gallery-5_thumb.jpg',
                medium: 'assets/images/gallery-5_medium.webp',
                mediumJpg: 'assets/images/gallery-5_medium.jpg',
                full: 'assets/images/gallery-5.webp',
                fullJpg: 'assets/images/gallery-5.jpg'
            }
        },
        {
            id: 'reports',
            category: 'reports',
            title: 'Export & Reporting',
            description: 'Generate and export detailed financial reports in multiple formats',
            images: {
                thumb: 'assets/images/gallery-6_thumb.webp',
                thumbJpg: 'assets/images/gallery-6_thumb.jpg',
                medium: 'assets/images/gallery-6_medium.webp',
                mediumJpg: 'assets/images/gallery-6_medium.jpg',
                full: 'assets/images/gallery-6.webp',
                fullJpg: 'assets/images/gallery-6.jpg'
            }
        }
    ];

    // Gallery Elements
    const gallerySection = document.getElementById('gallery');
    const viewToggleBtns = document.querySelectorAll('.view-toggle-btn');
    const carouselView = document.getElementById('carousel-view');
    const gridView = document.getElementById('grid-view');

    // Carousel Elements
    const carouselTrack = document.getElementById('carousel-track');
    const carouselPrevBtn = document.getElementById('carousel-prev');
    const carouselNextBtn = document.getElementById('carousel-next');
    const carouselDots = document.querySelectorAll('.carousel-dot');
    const featureTitle = document.getElementById('current-feature-title');
    const featureDescription = document.getElementById('current-feature-description');
    const currentSlideSpan = document.getElementById('current-slide');
    const totalSlidesSpan = document.getElementById('total-slides');

    // Grid Elements
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    // Lightbox Elements
    const enhancedLightbox = document.getElementById('gallery-lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxCategory = document.getElementById('lightbox-category');
    const lightboxCurrent = document.getElementById('lightbox-current');
    const lightboxTotal = document.getElementById('lightbox-total');
    const enhancedLightboxClose = document.getElementById('lightbox-close');
    const enhancedLightboxPrev = document.getElementById('lightbox-prev');
    const enhancedLightboxNext = document.getElementById('lightbox-next');
    const lightboxZoomIn = document.getElementById('lightbox-zoom-in');
    const lightboxZoomOut = document.getElementById('lightbox-zoom-out');
    const lightboxOverlay = enhancedLightbox ? enhancedLightbox.querySelector('.lightbox-overlay') : null;
    const lightboxLoading = document.getElementById('lightbox-loading');

    // Gallery State
    let currentView = 'carousel';
    let currentCarouselSlide = 0;
    let currentFilter = 'all';
    let currentLightboxIndex = 0;
    let lightboxZoomed = false;
    let touchStartX = 0;
    let touchEndX = 0;

    // Initialize Gallery
    function initGallery() {
        if (!gallerySection) return;

        // Set total slides
        if (totalSlidesSpan) {
            totalSlidesSpan.textContent = galleryData.length;
        }
        if (lightboxTotal) {
            lightboxTotal.textContent = galleryData.length;
        }

        // Initialize carousel
        updateCarouselSlide(0);

        // Initialize grid filter with default 'all' state
        // This sets initial aria-pressed attributes
        filterGalleryItems('all');

        // Initialize image lazy loading
        initImageLazyLoading();

        // Set up event listeners
        setupGalleryEventListeners();

        // Update localized text
        updateGalleryLocalizedText();

        console.log('Enhanced gallery initialized');
    }

    // View Toggle Functionality
    function switchView(view) {
        if (currentView === view) return;

        currentView = view;

        // Update toggle buttons
        viewToggleBtns.forEach(btn => {
            const isActive = btn.dataset.view === view;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive);

            // Update aria-label for better context
            if (isActive) {
                btn.setAttribute('aria-label', `${btn.textContent.trim()} view - Currently active`);
            } else {
                btn.setAttribute('aria-label', `Switch to ${btn.textContent.trim()} view`);
            }
        });

        // Switch views with animation
        if (view === 'carousel') {
            gridView.classList.remove('active');
            setTimeout(() => {
                carouselView.classList.add('active');
            }, 200);
        } else {
            carouselView.classList.remove('active');
            setTimeout(() => {
                gridView.classList.add('active');
            }, 200);
        }

        // Update accessibility
        carouselView.setAttribute('aria-hidden', view !== 'carousel');
        gridView.setAttribute('aria-hidden', view !== 'grid');
    }

    // Carousel Functionality
    function updateCarouselSlide(index) {
        if (!carouselTrack || index < 0 || index >= galleryData.length) return;

        currentCarouselSlide = index;
        const slideData = galleryData[index];

        // Update carousel track position
        const translateX = -index * 100;
        carouselTrack.style.transform = `translateX(${translateX}%)`;

        // Update carousel dots
        carouselDots.forEach((dot, i) => {
            const isActive = i === index;
            dot.classList.toggle('active', isActive);

            // Update ARIA selected state
            dot.setAttribute('aria-selected', isActive ? 'true' : 'false');

            // Update ARIA label with slide title
            const slideTitle = galleryData[i]?.title || `Slide ${i + 1}`;
            dot.setAttribute('aria-label', `${slideTitle} - Slide ${i + 1} of ${galleryData.length}`);
        });

        // Update slides
        const slides = document.querySelectorAll('.carousel-slide');
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });

        // Update feature description
        if (featureTitle && featureDescription) {
            featureTitle.textContent = slideData.title;
            featureDescription.textContent = slideData.description;
        }

        // Update counter
        if (currentSlideSpan) {
            currentSlideSpan.textContent = index + 1;
        }

        // Update aria-live region
        carouselTrack.setAttribute('aria-live', 'polite');
    }

    function nextCarouselSlide() {
        const nextIndex = (currentCarouselSlide + 1) % galleryData.length;
        updateCarouselSlide(nextIndex);
    }

    function prevCarouselSlide() {
        const prevIndex = currentCarouselSlide === 0 ? galleryData.length - 1 : currentCarouselSlide - 1;
        updateCarouselSlide(prevIndex);
    }

    // Grid Filter Functionality
    function filterGalleryItems(filter) {
        currentFilter = filter;

        // Update filter buttons
        filterBtns.forEach(btn => {
            const isActive = btn.dataset.filter === filter;
            btn.classList.toggle('active', isActive);

            // Update ARIA pressed state
            btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
        });

        // Filter gallery items
        galleryItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const shouldShow = filter === 'all' || itemCategory === filter;

            if (shouldShow) {
                item.classList.remove('filtered-out');
                item.setAttribute('aria-hidden', 'false');
            } else {
                item.classList.add('filtered-out');
                item.setAttribute('aria-hidden', 'true');
            }
        });
    }

    // Lightbox Functionality
    function openLightbox(index) {
        if (!enhancedLightbox || index < 0 || index >= galleryData.length) return;

        currentLightboxIndex = index;
        const slideData = galleryData[index];

        // Store currently focused element
        lastFocusedElement = document.activeElement;

        // Show lightbox
        enhancedLightbox.classList.add('active');
        enhancedLightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Update content
        updateLightboxContent(slideData, index);

        // Add keyboard listener
        document.addEventListener('keydown', handleLightboxKeydown);

        // Initialize focus trap
        addLightboxFocusTrap();

        // Focus management - move focus to first focusable element
        // Use setTimeout to ensure DOM is updated and focus trap is initialized
        setTimeout(() => {
            if (lightboxFocusableElements && lightboxFocusableElements.length > 0) {
                lightboxFocusableElements[0].focus();
            } else if (enhancedLightboxClose) {
                // Fallback to close button if no other focusable elements found
                enhancedLightboxClose.focus();
            }
        }, 0);
    }

    function closeLightbox() {
        if (!enhancedLightbox) return;

        enhancedLightbox.classList.remove('active');
        enhancedLightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        lightboxZoomed = false;

        if (lightboxImage) {
            lightboxImage.classList.remove('zoomed');
        }

        // Remove keyboard listener
        document.removeEventListener('keydown', handleLightboxKeydown);

        // Return focus to last focused element
        if (lastFocusedElement && lastFocusedElement.focus) {
            lastFocusedElement.focus();
            lastFocusedElement = null;
        }

        removeLightboxFocusTrap();
    }

    // Lightbox Focus Trap
    let lightboxFocusableElements = [];
    let lastFocusedElement = null;
    const lightboxFocusTrapHandler = (e) => {
        if (e.key === 'Tab') {
            const firstElement = lightboxFocusableElements[0];
            const lastElement = lightboxFocusableElements[lightboxFocusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };

    function addLightboxFocusTrap() {
        if (!enhancedLightbox) return;

        lightboxFocusableElements = Array.from(
            enhancedLightbox.querySelectorAll(
                'button:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        );

        if (lightboxFocusableElements.length > 0) {
            enhancedLightbox.addEventListener('keydown', lightboxFocusTrapHandler);
        }
    }

    function removeLightboxFocusTrap() {
        if (enhancedLightbox) {
            enhancedLightbox.removeEventListener('keydown', lightboxFocusTrapHandler);
        }
    }

    function updateLightboxContent(slideData, index) {
        if (!lightboxImage || !lightboxTitle || !lightboxDescription) return;

        // Show loading
        if (lightboxLoading) {
            lightboxLoading.classList.remove('hidden');
        }

        // Update image with progressive loading
        const img = new Image();
        img.onload = function () {
            lightboxImage.src = this.src;
            if (lightboxLoading) {
                lightboxLoading.classList.add('hidden');
            }
        };

        // Try WebP first, fallback to JPG
        img.onerror = function () {
            if (this.src.includes('.webp')) {
                this.src = slideData.images.fullJpg;
            }
        };
        img.src = slideData.images.full;

        // Update text content
        lightboxTitle.textContent = slideData.title;
        lightboxDescription.textContent = slideData.description;
        if (lightboxCategory) {
            lightboxCategory.textContent = slideData.category.charAt(0).toUpperCase() + slideData.category.slice(1);
        }

        // Update counter
        if (lightboxCurrent) {
            lightboxCurrent.textContent = index + 1;
        }

        // Update alt text
        lightboxImage.alt = slideData.title;
    }

    function nextLightboxImage() {
        const nextIndex = (currentLightboxIndex + 1) % galleryData.length;
        currentLightboxIndex = nextIndex;
        updateLightboxContent(galleryData[nextIndex], nextIndex);
    }

    function prevLightboxImage() {
        const prevIndex = currentLightboxIndex === 0 ? galleryData.length - 1 : currentLightboxIndex - 1;
        currentLightboxIndex = prevIndex;
        updateLightboxContent(galleryData[prevIndex], prevIndex);
    }

    function toggleLightboxZoom() {
        if (!lightboxImage) return;

        lightboxZoomed = !lightboxZoomed;
        lightboxImage.classList.toggle('zoomed', lightboxZoomed);
    }

    // Image Lazy Loading
    function initImageLazyLoading() {
        const images = document.querySelectorAll('.gallery-image');

        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Load the image
                    img.onload = function () {
                        this.classList.add('loaded');
                    };

                    // Progressive enhancement: WebP with JPG fallback
                    img.onerror = function () {
                        if (this.src.includes('.webp')) {
                            this.src = this.src.replace('.webp', '.jpg');
                        }
                    };

                    // Start loading
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }

                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px'
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Event Listeners
    function setupGalleryEventListeners() {
        // View Toggle
        viewToggleBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                switchView(btn.dataset.view);
            });
        });

        // Carousel Controls
        if (carouselPrevBtn) {
            carouselPrevBtn.addEventListener('click', prevCarouselSlide);
        }
        if (carouselNextBtn) {
            carouselNextBtn.addEventListener('click', nextCarouselSlide);
        }

        // Carousel Dots
        carouselDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateCarouselSlide(index);
            });

            // Add keyboard support
            dot.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    updateCarouselSlide(index);
                }
            });
        });

        // Grid Filters
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterGalleryItems(btn.dataset.filter);
            });

            // Add keyboard support
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    filterGalleryItems(btn.dataset.filter);
                }
            });
        });

        // Gallery Items Click
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                openLightbox(index);
            });

            // Keyboard accessibility
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(index);
                }
            });
        });

        // Carousel slides click for lightbox
        const carouselSlides = document.querySelectorAll('.carousel-slide');
        carouselSlides.forEach((slide, index) => {
            slide.addEventListener('click', () => {
                openLightbox(index);
            });
        });

        // Lightbox Controls
        if (enhancedLightboxClose) {
            enhancedLightboxClose.addEventListener('click', closeLightbox);
        }
        if (lightboxOverlay) {
            lightboxOverlay.addEventListener('click', closeLightbox);

            // Add keyboard activation for overlay
            lightboxOverlay.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    closeLightbox();
                }
            });
        }
        if (enhancedLightboxPrev) {
            enhancedLightboxPrev.addEventListener('click', prevLightboxImage);
        }
        if (enhancedLightboxNext) {
            enhancedLightboxNext.addEventListener('click', nextLightboxImage);
        }
        if (lightboxZoomIn) {
            lightboxZoomIn.addEventListener('click', toggleLightboxZoom);
        }
        if (lightboxZoomOut) {
            lightboxZoomOut.addEventListener('click', toggleLightboxZoom);
        }

        // Touch/Swipe Support
        setupTouchEvents();

        // Keyboard Navigation
        setupKeyboardNavigation();
    }

    // Touch Events for Mobile
    function setupTouchEvents() {
        // Carousel swipe
        if (carouselTrack) {
            carouselTrack.addEventListener('touchstart', handleTouchStart, { passive: true });
            carouselTrack.addEventListener('touchend', handleTouchEnd, { passive: true });
        }

        // Lightbox swipe
        if (lightboxImage) {
            lightboxImage.addEventListener('touchstart', handleTouchStart, { passive: true });
            lightboxImage.addEventListener('touchend', handleTouchEnd, { passive: true });
        }
    }

    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchEnd(e) {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipeGesture();
    }

    function handleSwipeGesture() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) < swipeThreshold) return;

        const isRTL = document.documentElement.dir === 'rtl';
        const swipeLeft = swipeDistance < 0;
        const swipeRight = swipeDistance > 0;

        if (enhancedLightbox && enhancedLightbox.classList.contains('active')) {
            // Lightbox navigation
            if ((swipeLeft && !isRTL) || (swipeRight && isRTL)) {
                nextLightboxImage();
            } else if ((swipeRight && !isRTL) || (swipeLeft && isRTL)) {
                prevLightboxImage();
            }
        } else if (currentView === 'carousel') {
            // Carousel navigation
            if ((swipeLeft && !isRTL) || (swipeRight && isRTL)) {
                nextCarouselSlide();
            } else if ((swipeRight && !isRTL) || (swipeLeft && isRTL)) {
                prevCarouselSlide();
            }
        }
    }

    // Keyboard Navigation
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            // Skip if user is typing in an input
            if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

            const isRTL = document.documentElement.dir === 'rtl';

            if (currentView === 'carousel' && carouselView.classList.contains('active')) {
                if (e.key === 'ArrowLeft') {
                    e.preventDefault();
                    isRTL ? nextCarouselSlide() : prevCarouselSlide();
                } else if (e.key === 'ArrowRight') {
                    e.preventDefault();
                    isRTL ? prevCarouselSlide() : nextCarouselSlide();
                }
            }
        });
    }

    function handleLightboxKeydown(e) {
        const isRTL = document.documentElement.dir === 'rtl';

        switch (e.key) {
            case 'Escape':
                e.preventDefault();
                closeLightbox();
                break;
            case 'ArrowLeft':
                e.preventDefault();
                isRTL ? nextLightboxImage() : prevLightboxImage();
                break;
            case 'ArrowRight':
                e.preventDefault();
                isRTL ? prevLightboxImage() : nextLightboxImage();
                break;
            case '+':
            case '=':
                e.preventDefault();
                if (!lightboxZoomed) toggleLightboxZoom();
                break;
            case '-':
                e.preventDefault();
                if (lightboxZoomed) toggleLightboxZoom();
                break;
        }
    }

    // Localized Text Updates (called by localization system)
    function updateGalleryLocalizedText() {
        // This will be called by the localization system
        // Update dynamic text elements
        try {
            const currentLang = window.LocalizationManager ? window.LocalizationManager.currentLanguage : 'en';
            const translations = window.LocalizationManager ? window.LocalizationManager.translations[currentLang] : null;

            if (translations && translations.gallery) {
                // Update view toggle buttons
                const carouselBtn = document.querySelector('[data-view="carousel"] span');
                const gridBtn = document.querySelector('[data-view="grid"] span');

                if (carouselBtn && translations.gallery.view_toggle) {
                    carouselBtn.textContent = translations.gallery.view_toggle.carousel;
                }
                if (gridBtn && translations.gallery.view_toggle) {
                    gridBtn.textContent = translations.gallery.view_toggle.grid;
                }

                // Update filter buttons
                filterBtns.forEach(btn => {
                    const filter = btn.dataset.filter;
                    if (translations.gallery.filters && translations.gallery.filters[filter]) {
                        btn.textContent = translations.gallery.filters[filter];
                    }
                });

                // Update carousel hint
                const carouselHint = document.querySelector('.carousel-hint');
                if (carouselHint && translations.gallery.carousel) {
                    carouselHint.textContent = translations.gallery.carousel.swipe_hint;
                }

                // Update gallery hint
                const galleryHint = document.querySelector('#grid-view .gallery-hint');
                if (galleryHint) {
                    galleryHint.textContent = translations.gallery.click_to_view;
                }

                // Update feature spotlight label
                const featureLabel = document.querySelector('.feature-label');
                if (featureLabel && translations.gallery.carousel) {
                    featureLabel.textContent = translations.gallery.carousel.feature_highlight;
                }
            }
        } catch (error) {
            console.warn('Error updating gallery localized text:', error);
        }
    }

    // Expose gallery functions globally for localization system integration
    window.updateGalleryLocalizedText = updateGalleryLocalizedText;

    // Initialize gallery when DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGallery);
    } else {
        initGallery();
    }

    // Lightbox elements
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentImageIndex = 0;
    let galleryImages = [];

    // Interactive hero container elements
    const splashScreen = document.getElementById('splash-screen');
    const splashContainer = document.querySelector('.splash-container');
    const splashLogo = document.querySelector('.splash-logo');
    const heroSection = document.querySelector('.hero');
    const heroImage = document.querySelector('.hero-image-container');

    // Add floating animation to hero image
    function addFloatingAnimation() {
        if (!heroImage) return;

        let floatInterval;

        function floatElement() {
            const floatY = Math.sin(Date.now() / 1200) * 5;
            heroImage.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${floatY}px)`;
        }

        // Start floating animation
        floatInterval = setInterval(floatElement, 50);

        // Pause animation on hover
        heroImage.addEventListener('mouseenter', () => {
            clearInterval(floatInterval);
        });

        // Resume animation on mouse leave
        heroImage.addEventListener('mouseleave', () => {
            floatInterval = setInterval(floatElement, 50);
        });
    }

    // Mouse move interaction for parallax effect in hero section
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 50;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 50;

            if (heroImage) {
                heroImage.style.transform = `perspective(1000px) rotateY(${-5 + xAxis / 2}deg) rotateX(${5 - yAxis / 2}deg) scale(1.02)`;
            }
        });

        // Reset positions when mouse leaves
        heroSection.addEventListener('mouseleave', () => {
            if (heroImage) {
                heroImage.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
                // Resume floating animation
                addFloatingAnimation();
            }
        });
    }

    // Mouse move interaction for parallax effect
    if (splashScreen) {
        splashScreen.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;

            if (splashContainer) {
                splashContainer.style.transform = `translate(${xAxis}px, ${yAxis}px)`;
            }

            if (splashLogo) {
                const logoXAxis = (window.innerWidth / 2 - e.pageX) / 50;
                const logoYAxis = (window.innerHeight / 2 - e.pageY) / 50;
                splashLogo.style.transform = `translate(${logoXAxis}px, ${logoYAxis}px) rotate(${logoXAxis * 0.1}deg)`;
            }
        });

        // Reset positions when mouse leaves
        splashScreen.addEventListener('mouseleave', () => {
            if (splashContainer) {
                splashContainer.style.transform = 'translate(0px, 0px)';
            }

            if (splashLogo) {
                splashLogo.style.transform = 'translate(0px, 0px) rotate(0deg)';
            }
        });
    }

    // Function to apply theme
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
            themeToggle.setAttribute('aria-label', 'Switch to light mode. Current theme: dark mode');
            themeToggle.setAttribute('aria-pressed', 'true');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
            themeToggle.setAttribute('aria-label', 'Switch to dark mode. Current theme: light mode');
            themeToggle.setAttribute('aria-pressed', 'false');
        }
    };

    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (systemPrefersDark) {
        applyTheme('dark');
    }

    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || (systemPrefersDark ? 'dark' : 'light');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });

    // Sticky Header with Glassmorphism on Scroll
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    const scrollThreshold = 50; // پیکسل

    function handleHeaderScroll() {
        if (!header) return;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScrollTop = scrollTop;
    }

    // Throttle scroll event for performance
    let scrollTimeout;
    if (header) {
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(() => {
                handleHeaderScroll();
            });
        }, { passive: true });
    }

    // Initial check
    handleHeaderScroll();



    // Hamburger menu event listener with enhanced animation
    hamburger.addEventListener('click', () => {
        // Toggle aria-expanded for accessibility
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);

        // Update aria-label
        if (!isExpanded) {
            hamburger.setAttribute('aria-label', 'Close navigation menu');
        } else {
            hamburger.setAttribute('aria-label', 'Open navigation menu');
        }

        // Add animation classes
        navLinksContainer.classList.toggle('active');

        if (navLinksContainer.classList.contains('active')) {
            // When opening
            navLinksContainer.style.display = 'flex';
            setTimeout(() => {
                navLinksContainer.style.transform = 'translateY(0)';
                navLinksContainer.style.opacity = '1';
            }, 10);
            addFocusTrap();
        } else {
            // When closing
            navLinksContainer.style.transform = 'translateY(-10px)';
            navLinksContainer.style.opacity = '0';
            setTimeout(() => {
                if (!navLinksContainer.classList.contains('active')) {
                    navLinksContainer.style.display = 'none';
                }
            }, 300);
            removeFocusTrap();
            hamburger.focus(); // Return focus to hamburger
        }
    });

    let focusableElements = [];
    const focusTrapHandler = (e) => {
        if (e.key === 'Escape') {
            // Close mobile menu
            navLinksContainer.classList.remove('active');
            navLinksContainer.style.transform = 'translateY(-10px)';
            navLinksContainer.style.opacity = '0';
            setTimeout(() => {
                if (!navLinksContainer.classList.contains('active')) {
                    navLinksContainer.style.display = 'none';
                }
            }, 300);
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.setAttribute('aria-label', 'Open navigation menu');
            removeFocusTrap();
            hamburger.focus(); // Return focus to hamburger
            return;
        }

        if (e.key === 'Tab') {
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (e.shiftKey && document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            } else if (!e.shiftKey && document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };

    function addFocusTrap() {
        focusableElements = Array.from(navLinksContainer.querySelectorAll('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'));
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
            navLinksContainer.addEventListener('keydown', focusTrapHandler);
        }
    }

    function removeFocusTrap() {
        navLinksContainer.removeEventListener('keydown', focusTrapHandler);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinksContainer.classList.contains('active') &&
            !navLinksContainer.contains(e.target) &&
            !hamburger.contains(e.target)) {
            navLinksContainer.classList.remove('active');
            navLinksContainer.style.transform = 'translateY(-10px)';
            navLinksContainer.style.opacity = '0';
            setTimeout(() => {
                if (!navLinksContainer.classList.contains('active')) {
                    navLinksContainer.style.display = 'none';
                }
            }, 300);
            hamburger.setAttribute('aria-expanded', 'false');
            removeFocusTrap();
        }
    });

    // Handle contact form submission if on contact page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Get validation messages from localization
            const messages = window.formValidationMessages || {
                fill_required: 'Please fill in all required fields.',
                email_invalid: 'Please enter a valid email address.',
                thank_you: 'Thank you for your message! We will get back to you soon.'
            };

            // Simple validation
            if (!name || !email || !message) {
                alert(messages.fill_required);
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert(messages.email_invalid);
                return;
            }

            // In a real implementation, you would send this data to your server
            // For now, we'll just show a success message
            alert(messages.thank_you);

            // Reset form
            this.reset();
        });
    }

    // Add scroll event listener for back to top button
    window.addEventListener('scroll', () => {
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            if (window.pageYOffset > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }
    });

    // Smooth Scroll for Navigation Links
    const navLinkItems = document.querySelectorAll('.nav-links a');
    navLinkItems.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });

                    // Close mobile menu if open
                    const navLinksContainer = document.querySelector('.nav-links');
                    if (navLinksContainer.classList.contains('active')) {
                        navLinksContainer.classList.remove('active');
                    }
                }
            }
        });
    });

    // Contact form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;

            // Reset errors
            [name, email, message].forEach(input => {
                input.classList.remove('error');
                const errorMsg = input.nextElementSibling;
                if (errorMsg && errorMsg.classList.contains('error-message')) {
                    errorMsg.remove();
                }
            });

            // Get validation messages from localization
            const messages = window.formValidationMessages || {
                name_required: 'Name is required.',
                email_required: 'Email is required.',
                email_invalid: 'Please enter a valid email address.',
                message_required: 'Message is required.'
            };

            // Validate name
            if (name.value.trim() === '') {
                isValid = false;
                showError(name, messages.name_required);
            }

            // Validate email
            if (email.value.trim() === '') {
                isValid = false;
                showError(email, messages.email_required);
            } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
                isValid = false;
                showError(email, messages.email_invalid);
            }

            // Validate message
            if (message.value.trim() === '') {
                isValid = false;
                showError(message, messages.message_required);
            }

            if (isValid) {
                // Show loading spinner
                const submitButton = contactForm.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                submitButton.innerHTML = '<span class="loading-spinner"></span> Sending...';
                submitButton.disabled = true;

                // Simulate form submission (in a real app, you would send data to a server)
                setTimeout(() => {
                    console.log('Form submitted:', { name: name.value, email: email.value, message: message.value });
                    const thankYouMessage = window.formValidationMessages?.thank_you || 'Thank you for your message! We will get back to you soon.';
                    alert(thankYouMessage);
                    contactForm.reset();
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                }, 1500);
            }
        });
    }

    function showError(input, message) {
        input.classList.add('error');

        // Generate unique ID for error message
        const errorId = `${input.id}-error`;

        const error = document.createElement('div');
        error.className = 'error-message';
        error.id = errorId;
        error.setAttribute('role', 'alert'); // Announce to screen readers
        error.style.color = 'var(--error)';
        error.style.fontSize = '0.875rem';
        error.style.marginTop = '0.25rem';
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);

        // Link error message to input
        input.setAttribute('aria-describedby', errorId);
        input.setAttribute('aria-invalid', 'true');
    }

    // Lazy load images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy-load');
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        images.forEach(img => {
            imageObserver.observe(img);
        });
    }

    // Gallery animation functions
    function animateGallery() {
        const gallerySection = document.querySelector('.gallery');
        if (!gallerySection) return;

        // Animate gallery section
        const gallerySectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `slideUpLarge ${getComputedStyle(document.documentElement).getPropertyValue('--animation-duration')} ease-out forwards`;
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    gallerySectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        gallerySection.style.opacity = 0;
        gallerySection.style.transform = 'translateY(30px)';
        gallerySectionObserver.observe(gallerySection);

        // Animate gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        const galleryItemObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = `slideUp ${getComputedStyle(document.documentElement).getPropertyValue('--animation-duration')} ease-out forwards`;
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                        entry.target.classList.add('fade-in');
                    }, index * 100);
                    galleryItemObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        galleryItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            galleryItemObserver.observe(item);
        });
    }

    // Animation functions
    function animateOnScroll() {
        // Animate feature cards on scroll
        const featureCards = document.querySelectorAll('.feature-card');
        const featureCardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = `slideUp ${getComputedStyle(document.documentElement).getPropertyValue('--animation-duration')} ease-out forwards`;
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 50); // Reduced delay for smoother animation with more cards
                    featureCardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        featureCards.forEach(card => {
            card.style.opacity = 0;
            card.style.transform = 'translateY(20px)';
            featureCardObserver.observe(card);
        });

        // Animate download buttons
        const downloadButtons = document.querySelectorAll('.btn-download');
        const downloadButtonObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    // Set CSS variable for animation delay
                    entry.target.style.setProperty('--delay', index);
                    setTimeout(() => {
                        entry.target.style.animation = `slideUp ${getComputedStyle(document.documentElement).getPropertyValue('--animation-duration')} ease-out forwards`;
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    downloadButtonObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        downloadButtons.forEach((button, index) => {
            button.style.opacity = 0;
            button.style.transform = 'translateY(20px)';
            downloadButtonObserver.observe(button);
        });

        // Animate FAQ items
        const faqItems = document.querySelectorAll('.faq-accordion details');
        const faqItemObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.animation = `slideUp ${getComputedStyle(document.documentElement).getPropertyValue('--animation-duration')} ease-out forwards`;
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                    faqItemObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        faqItems.forEach(item => {
            item.style.opacity = 0;
            item.style.transform = 'translateY(20px)';
            faqItemObserver.observe(item);
        });

        // Animate sections
        const sections = document.querySelectorAll('.features, .cta-section, .download, .faq, .about, .contact');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `slideUpLarge ${getComputedStyle(document.documentElement).getPropertyValue('--animation-duration')} ease-out forwards`;
                    entry.target.style.opacity = 1;
                    entry.target.style.transform = 'translateY(0)';
                    sectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => {
            section.style.opacity = 0;
            section.style.transform = 'translateY(30px)';
            sectionObserver.observe(section);
        });

        // Animate download section elements
        const downloadHeading = document.querySelector('.download h2');
        const downloadParagraph = document.querySelector('.download p');

        if (downloadHeading) {
            const headingObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = `fadeInUp 1s ease-out forwards`;
                        entry.target.style.opacity = 1;
                        headingObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            downloadHeading.style.opacity = 0;
            headingObserver.observe(downloadHeading);
        }

        if (downloadParagraph) {
            const paragraphObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = `fadeInUp 1s ease-out forwards`;
                        entry.target.style.opacity = 1;
                        paragraphObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            downloadParagraph.style.opacity = 0;
            paragraphObserver.observe(downloadParagraph);
        }

        // Animate gallery
        animateGallery();

        // Animate download section logo
        const downloadLogo = document.querySelector('.download .logo-container');
        if (downloadLogo) {
            const logoObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = `fadeInUp 1s ease-out forwards`;
                        entry.target.style.opacity = 1;
                        logoObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            downloadLogo.style.opacity = 0;
            logoObserver.observe(downloadLogo);
        }
    }

    // Initialize animations
    animateOnScroll();

    // Initialize lazy loading
    lazyLoadImages();

    // Add floating animation to hero image
    addFloatingAnimation();

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('visible');
            } else {
                backToTopButton.classList.remove('visible');
            }
        });

        backToTopButton.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Active Navigation Link Highlighting
    const sections = document.querySelectorAll('section[id]');

    function highlightActiveSection() {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100; // offset برای header
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection, { passive: true });

    // Enhanced keyboard navigation for accordion
    const accordionItems = document.querySelectorAll('.faq-accordion summary');
    accordionItems.forEach(item => {
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                item.parentElement.open = !item.parentElement.open;
            }
        });
    });

    // Lightbox functionality
    function initLightbox() {
        // Get all gallery images
        galleryImages = document.querySelectorAll('.gallery-item img');

        // Add click event to each gallery image
        galleryImages.forEach((img, index) => {
            img.addEventListener('click', function (e) {
                e.preventDefault();
                openLightbox(index);
            });
        });

        // Close lightbox when clicking on close button
        lightboxClose.addEventListener('click', closeLightbox);

        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        // Navigate with arrow keys
        document.addEventListener('keydown', function (e) {
            if (lightbox.style.display === 'block') {
                if (e.key === 'Escape') {
                    closeLightbox();
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });

        // Navigate with prev/next buttons
        lightboxPrev.addEventListener('click', showPrevImage);
        lightboxNext.addEventListener('click', showNextImage);
    }

    function openLightbox(index) {
        currentImageIndex = index;
        const img = galleryImages[index];
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
        lightbox.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open

        // Update navigation button visibility
        updateNavigationButtons();
    }

    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
        updateLightbox();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
        updateLightbox();
    }

    function updateLightbox() {
        const img = galleryImages[currentImageIndex];
        lightboxImg.src = img.src;
        lightboxCaption.textContent = img.alt;
        updateNavigationButtons();
    }

    function updateNavigationButtons() {
        // Hide prev button if at first image
        lightboxPrev.style.display = currentImageIndex === 0 ? 'none' : 'flex';
        // Hide next button if at last image
        lightboxNext.style.display = currentImageIndex === galleryImages.length - 1 ? 'none' : 'flex';
    }

    // Initialize lightbox
    initLightbox();

    // Listen for language changes
    document.addEventListener('languageChanged', function (event) {
        const { language, isRTL } = event.detail;

        // Update animations for RTL
        if (isRTL) {
            // Add RTL-specific animation classes
            document.body.classList.add('rtl-animations');
        } else {
            document.body.classList.remove('rtl-animations');
        }

        // Update any other RTL-specific functionality
        updateRTLFeatures(isRTL);
    });

    function updateRTLFeatures(isRTL) {
        // Update any elements that need special RTL handling
        const heroImage = document.querySelector('.hero-image-container');
        if (heroImage && isRTL) {
            // Adjust hero image positioning for RTL
            heroImage.style.transform = 'perspective(1000px) rotateY(5deg) rotateX(5deg)';
        } else if (heroImage && !isRTL) {
            // Reset to LTR positioning
            heroImage.style.transform = 'perspective(1000px) rotateY(-5deg) rotateX(5deg)';
        }
    }
});

window.addEventListener('scroll', () => {
  const bar = document.getElementById('fixedDownloadBar');
  if (bar) {
    if (window.scrollY > 800) {
      bar.classList.add('visible');
    } else {
      bar.classList.remove('visible');
    }
  }
});

