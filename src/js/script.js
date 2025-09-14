document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    
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
    window.updateTypingPhrases = function(newPhrases) {
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
                heroImage.style.transform = `perspective(1000px) rotateY(${-5 + xAxis/2}deg) rotateX(${5 - yAxis/2}deg) scale(1.02)`;
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
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
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

    // Hamburger menu event listener with enhanced animation
    hamburger.addEventListener('click', () => {
        // Toggle aria-expanded for accessibility
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        // Add animation classes
        navLinks.classList.toggle('active');
        
        if (navLinks.classList.contains('active')) {
            // When opening
            navLinks.style.display = 'flex';
            setTimeout(() => {
                navLinks.style.transform = 'translateY(0)';
                navLinks.style.opacity = '1';
            }, 10);
            addFocusTrap();
        } else {
            // When closing
            navLinks.style.transform = 'translateY(-10px)';
            navLinks.style.opacity = '0';
            setTimeout(() => {
                if (!navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
            }, 300);
            removeFocusTrap();
        }
    });

    let focusableElements = [];
    const focusTrapHandler = (e) => {
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
        focusableElements = Array.from(navLinks.querySelectorAll('a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'));
        if (focusableElements.length > 0) {
            focusableElements[0].focus();
            navLinks.addEventListener('keydown', focusTrapHandler);
        }
    }

    function removeFocusTrap() {
        navLinks.removeEventListener('keydown', focusTrapHandler);
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navLinks.classList.remove('active');
            navLinks.style.transform = 'translateY(-10px)';
            navLinks.style.opacity = '0';
            setTimeout(() => {
                if (!navLinks.classList.contains('active')) {
                    navLinks.style.display = 'none';
                }
            }, 300);
            hamburger.setAttribute('aria-expanded', 'false');
            removeFocusTrap();
        }
    });

    // Handle contact form submission if on contact page
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Adjust for fixed header
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navLinks.style.transform = 'translateY(-10px)';
                    navLinks.style.opacity = '0';
                    setTimeout(() => {
                        if (!navLinks.classList.contains('active')) {
                            navLinks.style.display = 'none';
                        }
                    }, 300);
                    hamburger.setAttribute('aria-expanded', 'false');
                    removeFocusTrap();
                }
            }
        });
    });

    // Contact form validation
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
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
        const error = document.createElement('div');
        error.className = 'error-message';
        error.style.color = 'var(--error)';
        error.style.fontSize = '0.875rem';
        error.style.marginTop = '0.25rem';
        error.textContent = message;
        input.parentNode.insertBefore(error, input.nextSibling);
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

    // Active nav link highlighting on scroll
    const sections = document.querySelectorAll('main section[id]');
    const navLi = document.querySelectorAll('.nav-links li a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLi.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, { rootMargin: '-50% 0px -50% 0px' });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

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
            img.addEventListener('click', function(e) {
                e.preventDefault();
                openLightbox(index);
            });
        });
        
        // Close lightbox when clicking on close button
        lightboxClose.addEventListener('click', closeLightbox);
        
        // Close lightbox when clicking outside the image
        lightbox.addEventListener('click', function(e) {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
        
        // Navigate with arrow keys
        document.addEventListener('keydown', function(e) {
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
    document.addEventListener('languageChanged', function(event) {
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