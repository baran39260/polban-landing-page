/**
 * Localization System for Polban Landing Page
 * Supports English and Persian with RTL layout
 */

class LocalizationManager {
    constructor() {
        this.currentLanguage = 'en';
        this.translations = {};
        this.rtlLanguages = ['fa', 'ar'];
        this.init();
    }

    async init() {
        // Load translations first
        await this.loadTranslations();
        
        // Set initial language based on browser preference or saved preference
        const savedLang = localStorage.getItem('polban-language');
        const browserLang = navigator.language.split('-')[0];
        
        if (savedLang && this.isLanguageSupported(savedLang)) {
            this.currentLanguage = savedLang;
        } else if (this.isLanguageSupported(browserLang)) {
            this.currentLanguage = browserLang;
        }
        
        // Apply initial language
        this.applyLanguage(this.currentLanguage);
        
        // Create language switcher
        this.createLanguageSwitcher();
        
        console.log('Localization system initialized with language:', this.currentLanguage);
    }

    async loadTranslations() {
        try {
            const [enTranslations, faTranslations] = await Promise.all([
                fetch('./src/locales/en.json').then(response => {
                    if (!response.ok) throw new Error(`Failed to load en.json: ${response.status}`);
                    return response.json();
                }),
                fetch('./src/locales/fa.json').then(response => {
                    if (!response.ok) throw new Error(`Failed to load fa.json: ${response.status}`);
                    return response.json();
                })
            ]);
            
            this.translations = {
                en: enTranslations,
                fa: faTranslations
            };
            
            console.log('Translations loaded successfully:', this.translations);
        } catch (error) {
            console.error('Error loading translations:', error);
            // Fallback to basic translations if files fail to load
            this.translations = {
                en: this.getFallbackTranslations('en'),
                fa: this.getFallbackTranslations('fa')
            };
        }
    }

    getFallbackTranslations(lang) {
        if (lang === 'fa') {
            return {
                meta: { title: "پولبان - اپلیکیشن مدیریت مالی", description: "مدیریت مالی چندزبانه" },
                navigation: { features: "ویژگی‌ها", about: "درباره", gallery: "گالری", faq: "سوالات", contact: "تماس", download: "دانلود", blog: "وبلاگ" },
                hero: { title: "پولبان - ", subtitle: "همراه شخصی مالی شما", cta_explore: "کشف ویژگی‌ها", cta_download: "دانلود کنید" },
                common: { skip_to_content: "رفتن به محتوا", back_to_top: "بازگشت به بالا" }
            };
        }
        return {
            meta: { title: "Polban - Financial Management App", description: "Multilingual financial management" },
            navigation: { features: "Features", about: "About", gallery: "Gallery", faq: "FAQ", contact: "Contact", download: "Download", blog: "Blog" },
            hero: { title: "Polban - ", subtitle: "Your Personal Finance Companion", cta_explore: "Explore Features", cta_download: "Download Now" },
            common: { skip_to_content: "Skip to main content", back_to_top: "Back to top" }
        };
    }

    isLanguageSupported(lang) {
        return ['en', 'fa'].includes(lang);
    }

    isRTL(lang) {
        return this.rtlLanguages.includes(lang);
    }

    applyLanguage(lang) {
        if (!this.translations[lang]) {
            console.warn(`Translations for language ${lang} not found`);
            return;
        }

        console.log(`Applying language: ${lang}`, this.translations[lang]);
        
        this.currentLanguage = lang;
        localStorage.setItem('polban-language', lang);
        
        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = this.isRTL(lang) ? 'rtl' : 'ltr';
        
        // Update meta tags
        this.updateMetaTags();
        
        // Update all translatable elements
        this.updateElements();
        
        // Update typing animation phrases
        this.updateTypingAnimation();
        
        // Update form validation messages
        this.updateFormValidation();
        
        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang, isRTL: this.isRTL(lang) }
        }));
        
        console.log(`Language ${lang} applied successfully`);
    }

    updateMetaTags() {
        const meta = this.translations[this.currentLanguage].meta;
        
        // Update title
        document.title = meta.title;
        
        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) metaDesc.content = meta.description;
        
        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords) metaKeywords.content = meta.keywords;
        
        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) ogTitle.content = meta.title;
        
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.content = meta.description;
    }

    updateElements() {
        const t = this.translations[this.currentLanguage];
        
        console.log('Updating elements for language:', this.currentLanguage);
        console.log('Available translations:', t);
        
        try {
            // Navigation
            if (t.navigation) this.updateNavigation(t.navigation);
            
            // Hero section
            if (t.hero) this.updateHero(t.hero);
            
            // Features section
            if (t.features) this.updateFeatures(t.features);
            
            // CTA section
            if (t.cta) this.updateCTA(t.cta);
            
            // Download section
            if (t.download) this.updateDownload(t.download);
            
            // Gallery section
            if (t.gallery) this.updateGallery(t.gallery);
            
            // FAQ section
            if (t.faq) this.updateFAQ(t.faq);
            
            // About section
            if (t.about) this.updateAbout(t.about);
            
            // Upcoming section
            if (t.upcoming) this.updateUpcoming(t.upcoming);
            
            // Footer
            if (t.footer) this.updateFooter(t.footer);
            
            // Common elements
            if (t.common) this.updateCommon(t.common);
            
            console.log('Elements updated successfully');
        } catch (error) {
            console.error('Error updating elements:', error);
        }
    }

    updateNavigation(nav) {
        console.log('Updating navigation with:', nav);
        const navLinks = document.querySelectorAll('.nav-links a');
        const navTexts = [nav.features, nav.about, nav.gallery, nav.faq, nav.contact, nav.download, nav.blog];
        
        console.log('Found nav links:', navLinks.length);
        console.log('Nav texts:', navTexts);
        
        navLinks.forEach((link, index) => {
            if (navTexts[index]) {
                console.log(`Updating nav link ${index}: ${link.textContent} -> ${navTexts[index]}`);
                link.textContent = navTexts[index];
            }
        });
    }

    updateHero(hero) {
        console.log('Updating hero with:', hero);
        
        // Update hero title
        const heroTitle = document.querySelector('#hero-heading .static-text');
        if (heroTitle) {
            console.log('Updating hero title:', heroTitle.textContent, '->', hero.title);
            heroTitle.textContent = hero.title;
        }
        
        // Update hero subtitle
        const heroSubtitle = document.querySelector('.hero-subheading');
        if (heroSubtitle) {
            console.log('Updating hero subtitle:', heroSubtitle.textContent, '->', hero.subtitle);
            heroSubtitle.textContent = hero.subtitle;
        }
        
        // Update hero description
        const heroDesc = document.querySelector('.hero p');
        if (heroDesc) {
            console.log('Updating hero description');
            heroDesc.textContent = hero.description;
        }
        
        // Update CTA buttons
        const ctaButtons = document.querySelectorAll('.hero .btn');
        if (ctaButtons[0]) {
            console.log('Updating CTA button 1:', ctaButtons[0].textContent, '->', hero.cta_explore);
            ctaButtons[0].textContent = hero.cta_explore;
        }
        if (ctaButtons[1]) {
            console.log('Updating CTA button 2:', ctaButtons[1].textContent, '->', hero.cta_download);
            ctaButtons[1].textContent = hero.cta_download;
        }
    }

    updateFeatures(features) {
        console.log('Updating features with:', features);
        
        // Update features title
        const featuresTitle = document.querySelector('#features-heading');
        if (featuresTitle) {
            console.log('Updating features title:', featuresTitle.textContent, '->', features.title);
            featuresTitle.textContent = features.title;
        }
        
        // Update feature cards
        const featureCards = document.querySelectorAll('.feature-card');
        const featureKeys = [
            'multilingual', 'quick_signup', 'unlimited_accounts', 'unlimited_categories',
            'transaction_tagging', 'dual_calendars', 'multi_currency', 'transaction_types',
            'scheduled_transactions', 'smart_suggestions', 'financial_charts', 'pie_charts',
            'report_storage', 'transaction_filters', 'balance_sheet', 'graphical_distribution',
            'transaction_analysis', 'customization', 'advanced_reporting'
        ];
        
        console.log('Found feature cards:', featureCards.length);
        console.log('Feature keys:', featureKeys);
        
        featureCards.forEach((card, index) => {
            const key = featureKeys[index];
            if (key && features[key]) {
                const title = card.querySelector('h3');
                const description = card.querySelector('p');
                
                if (title) {
                    console.log(`Updating feature ${index} title:`, title.textContent, '->', features[key].title);
                    title.textContent = features[key].title;
                }
                if (description) {
                    console.log(`Updating feature ${index} description`);
                    description.textContent = features[key].description;
                }
            }
        });
    }

    updateCTA(cta) {
        console.log('Updating CTA with:', cta);
        
        const ctaTitle = document.querySelector('#cta-heading');
        if (ctaTitle) {
            console.log('Updating CTA title:', ctaTitle.textContent, '->', cta.title);
            ctaTitle.textContent = cta.title;
        }
        
        const ctaDesc = document.querySelector('.cta-section p');
        if (ctaDesc) {
            console.log('Updating CTA description');
            ctaDesc.textContent = cta.description;
        }
        
        const ctaButton = document.querySelector('.cta-section .btn');
        if (ctaButton) {
            console.log('Updating CTA button:', ctaButton.textContent, '->', cta.button);
            ctaButton.textContent = cta.button;
        }
    }

    updateDownload(download) {
        console.log('Updating download with:', download);
        
        const downloadTitle = document.querySelector('#download-heading');
        if (downloadTitle) {
            console.log('Updating download title:', downloadTitle.textContent, '->', download.title);
            downloadTitle.textContent = download.title;
        }
        
        const downloadDesc = document.querySelector('.download p');
        if (downloadDesc) {
            console.log('Updating download description');
            downloadDesc.textContent = download.description;
        }
        
        const downloadButtons = document.querySelectorAll('.btn-download span');
        const buttonTexts = [download.cafe_bazaar, download.google_play, download.windows, download.app_store];
        
        console.log('Found download buttons:', downloadButtons.length);
        console.log('Button texts:', buttonTexts);
        
        downloadButtons.forEach((button, index) => {
            if (buttonTexts[index]) {
                console.log(`Updating download button ${index}:`, button.innerHTML, '->', buttonTexts[index]);
                button.innerHTML = buttonTexts[index].replace(' <br> ', '<br>');
            }
        });
        
        const platformNotice = document.querySelector('.platform-notice');
        if (platformNotice) {
            console.log('Updating platform notice');
            platformNotice.textContent = download.platform_notice;
        }
    }

    updateGallery(gallery) {
        console.log('Updating gallery with:', gallery);
        
        const galleryTitle = document.querySelector('#gallery-heading');
        if (galleryTitle) {
            console.log('Updating gallery title:', galleryTitle.textContent, '->', gallery.title);
            galleryTitle.textContent = gallery.title;
        }
        
        const galleryDesc = document.querySelector('.gallery p');
        if (galleryDesc) {
            console.log('Updating gallery description');
            galleryDesc.textContent = gallery.description;
        }
        
        const clickToView = document.querySelector('.gallery .text-center p');
        if (clickToView) {
            console.log('Updating click to view text');
            clickToView.textContent = gallery.click_to_view;
        }
        
        // Update alt texts
        const galleryImages = document.querySelectorAll('.gallery-item img');
        const altKeys = ['dashboard', 'charts', 'accounts', 'transfers', 'calendar', 'reports'];
        
        console.log('Found gallery images:', galleryImages.length);
        console.log('Alt keys:', altKeys);
        
        galleryImages.forEach((img, index) => {
            const key = altKeys[index];
            if (key && gallery.alt_texts[key]) {
                console.log(`Updating gallery image ${index} alt text:`, img.alt, '->', gallery.alt_texts[key]);
                img.alt = gallery.alt_texts[key];
            }
        });
    }

    updateFAQ(faq) {
        console.log('Updating FAQ with:', faq);
        
        const faqTitle = document.querySelector('#faq-heading');
        if (faqTitle) {
            console.log('Updating FAQ title:', faqTitle.textContent, '->', faq.title);
            faqTitle.textContent = faq.title;
        }
        
        const faqItems = document.querySelectorAll('.faq-accordion details');
        const faqKeys = ['free_use', 'security', 'import_data', 'languages', 'multi_currency', 'scheduled', 'reports'];
        
        console.log('Found FAQ items:', faqItems.length);
        console.log('FAQ keys:', faqKeys);
        
        faqItems.forEach((item, index) => {
            const key = faqKeys[index];
            if (key && faq.questions[key]) {
                const summary = item.querySelector('summary');
                const answer = item.querySelector('p');
                
                if (summary) {
                    console.log(`Updating FAQ ${index} question:`, summary.textContent, '->', faq.questions[key].question);
                    summary.textContent = faq.questions[key].question;
                }
                if (answer) {
                    console.log(`Updating FAQ ${index} answer`);
                    answer.textContent = faq.questions[key].answer;
                }
            }
        });
    }

    updateAbout(about) {
        console.log('Updating about with:', about);
        
        const aboutTitle = document.querySelector('#about-heading');
        if (aboutTitle) {
            console.log('Updating about title:', aboutTitle.textContent, '->', about.title);
            aboutTitle.textContent = about.title;
        }
        
        const aboutDesc = document.querySelector('.about p');
        if (aboutDesc) {
            console.log('Updating about description');
            aboutDesc.textContent = about.description;
        }
        
        const designedTitle = document.querySelector('.about h3');
        if (designedTitle) {
            console.log('Updating designed title:', designedTitle.textContent, '->', about.designed_for_everyone);
            designedTitle.textContent = about.designed_for_everyone;
        }
        
        const designedDesc = document.querySelector('.about h3 + p');
        if (designedDesc) {
            console.log('Updating designed description');
            designedDesc.textContent = about.designed_description;
        }
        
        const benefitsTitle = document.querySelector('.about h3:nth-of-type(2)');
        if (benefitsTitle) {
            console.log('Updating benefits title:', benefitsTitle.textContent, '->', about.key_benefits);
            benefitsTitle.textContent = about.key_benefits;
        }
        
        // Update benefit cards
        const benefitCards = document.querySelectorAll('.benefit-card');
        const benefitKeys = ['global_accessibility', 'multi_currency_simplicity', 'smart_automation', 'comprehensive_analytics'];
        
        console.log('Found benefit cards:', benefitCards.length);
        console.log('Benefit keys:', benefitKeys);
        
        benefitCards.forEach((card, index) => {
            const key = benefitKeys[index];
            if (key && about.benefits[key]) {
                const title = card.querySelector('h4');
                const description = card.querySelector('p');
                
                if (title) {
                    console.log(`Updating benefit ${index} title:`, title.textContent, '->', about.benefits[key].title);
                    title.textContent = about.benefits[key].title;
                }
                if (description) {
                    console.log(`Updating benefit ${index} description`);
                    description.textContent = about.benefits[key].description;
                }
            }
        });
    }

    updateUpcoming(upcoming) {
        console.log('Updating upcoming with:', upcoming);
        
        const upcomingTitle = document.querySelector('#upcoming-heading');
        if (upcomingTitle) {
            console.log('Updating upcoming title:', upcomingTitle.textContent, '->', upcoming.title);
            upcomingTitle.textContent = upcoming.title;
        }
        
        const upcomingCards = document.querySelectorAll('.upcoming .feature-card');
        const upcomingKeys = ['windows', 'ios'];
        
        console.log('Found upcoming cards:', upcomingCards.length);
        console.log('Upcoming keys:', upcomingKeys);
        
        upcomingCards.forEach((card, index) => {
            const key = upcomingKeys[index];
            if (key && upcoming[key]) {
                const title = card.querySelector('h3');
                const description = card.querySelector('p');
                
                if (title) {
                    console.log(`Updating upcoming ${index} title:`, title.textContent, '->', upcoming[key].title);
                    title.textContent = upcoming[key].title;
                }
                if (description) {
                    console.log(`Updating upcoming ${index} description`);
                    description.textContent = upcoming[key].description;
                }
            }
        });
    }

    updateFooter(footer) {
        console.log('Updating footer with:', footer);
        
        const copyright = document.querySelector('footer p');
        if (copyright) {
            console.log('Updating footer copyright:', copyright.textContent, '->', footer.copyright);
            copyright.textContent = footer.copyright;
        }
        
        const footerLinks = document.querySelectorAll('.footer-links a');
        const linkTexts = [footer.privacy, footer.terms];
        
        console.log('Found footer links:', footerLinks.length);
        console.log('Link texts:', linkTexts);
        
        footerLinks.forEach((link, index) => {
            if (linkTexts[index]) {
                console.log(`Updating footer link ${index}:`, link.textContent, '->', linkTexts[index]);
                link.textContent = linkTexts[index];
            }
        });
    }

    updateCommon(common) {
        console.log('Updating common with:', common);
        
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            console.log('Updating skip link:', skipLink.textContent, '->', common.skip_to_content);
            skipLink.textContent = common.skip_to_content;
        }
        
        const backToTop = document.querySelector('.back-to-top');
        if (backToTop) {
            console.log('Updating back to top aria-label:', backToTop.getAttribute('aria-label'), '->', common.back_to_top);
            backToTop.setAttribute('aria-label', common.back_to_top);
        }
    }

    updateTypingAnimation() {
        const phrases = this.translations[this.currentLanguage].hero.typing_phrases;
        
        console.log('Updating typing animation with phrases:', phrases);
        
        // Update the phrases array in the main script
        if (window.updateTypingPhrases) {
            console.log('Calling updateTypingPhrases function');
            window.updateTypingPhrases(phrases);
        } else {
            console.warn('updateTypingPhrases function not found');
        }
    }

    updateFormValidation() {
        // This will be handled by the main script when form validation is needed
        const formErrors = this.translations[this.currentLanguage].common.form_errors;
        console.log('Updating form validation messages:', formErrors);
        window.formValidationMessages = formErrors;
    }

    createLanguageSwitcher() {
        console.log('Creating language switcher...');
        
        // Create language switcher button
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) {
            console.error('Header actions not found');
            return;
        }
        
        // Remove existing language switcher if any
        const existingSwitcher = document.querySelector('.language-switcher');
        if (existingSwitcher) {
            existingSwitcher.remove();
        }
        
        const languageSwitcher = document.createElement('button');
        languageSwitcher.className = 'language-switcher';
        languageSwitcher.setAttribute('aria-label', 'Switch language');
        languageSwitcher.innerHTML = `
            <i class="fas fa-globe" aria-hidden="true"></i>
            <span>${this.currentLanguage.toUpperCase()}</span>
        `;
        
        // Add click handler
        languageSwitcher.addEventListener('click', () => {
            const newLang = this.currentLanguage === 'en' ? 'fa' : 'en';
            console.log('Switching language from', this.currentLanguage, 'to', newLang);
            this.applyLanguage(newLang);
            this.updateLanguageSwitcher(newLang);
        });
        
        // Insert before theme toggle
        headerActions.insertBefore(languageSwitcher, headerActions.firstChild);
        
        console.log('Language switcher created successfully');
    }

    updateLanguageSwitcher(lang) {
        const switcher = document.querySelector('.language-switcher span');
        if (switcher) {
            console.log('Updating language switcher to:', lang);
            switcher.textContent = lang.toUpperCase();
        } else {
            console.warn('Language switcher span not found');
        }
    }

    getTranslation(key) {
        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];
        
        console.log('Getting translation for key:', key, 'in language:', this.currentLanguage);
        
        for (const k of keys) {
            if (translation && translation[k]) {
                translation = translation[k];
            } else {
                console.warn(`Translation not found for key: ${key}`);
                return key; // Return key if translation not found
            }
        }
        
        console.log('Translation found:', translation);
        return translation;
    }
}

// Initialize localization system
function initializeLocalization() {
    console.log('Initializing localization system...');
    try {
        window.localizationManager = new LocalizationManager();
        console.log('Localization system initialized successfully');
    } catch (error) {
        console.error('Error initializing localization system:', error);
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    console.log('DOM is loading, waiting for DOMContentLoaded event');
    document.addEventListener('DOMContentLoaded', initializeLocalization);
} else {
    console.log('DOM is already loaded, initializing immediately');
    // DOM is already loaded
    initializeLocalization();
}

// Export for use in other scripts
window.LocalizationManager = LocalizationManager;

// Debug function to manually test language switching
window.testLanguageSwitch = function(lang) {
    if (window.localizationManager) {
        console.log('Manually switching to language:', lang);
        window.localizationManager.applyLanguage(lang);
    } else {
        console.error('Localization manager not found');
    }
};

// Debug function to check current state
window.debugLocalization = function() {
    if (window.localizationManager) {
        console.log('Current language:', window.localizationManager.currentLanguage);
        console.log('Available translations:', Object.keys(window.localizationManager.translations));
        console.log('Is RTL:', window.localizationManager.isRTL(window.localizationManager.currentLanguage));
        console.log('Current translations:', window.localizationManager.translations[window.localizationManager.currentLanguage]);
    } else {
        console.error('Localization manager not found');
    }
};
