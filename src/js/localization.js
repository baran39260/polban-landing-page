/**
 * Localization System for Polban Landing Page
 * Supports English and Persian with RTL layout
 * Uses data-translate attributes for maintainable translations
 */

class LocalizationManager {
    constructor(config = {}) {
        this.config = {
            basePath: './src/locales/',
            autoCreateSwitcher: true,
            initialLanguage: null,
            performanceMode: true,
            ...config
        };
        this.currentLanguage = 'en';
        this.translations = {};
        this.rtlLanguages = ['fa', 'ar'];
        this.initStartTime = null;
        this.loadStartTime = null;
    }

    async init() {
        try {
            this.initStartTime = performance.now();
            console.log('🚀 Initializing Polban localization system...');

            // Load translations first
            await this.loadTranslations();

            // Set initial language based on config, saved preference, or browser preference
            if (this.config.initialLanguage && this.isLanguageSupported(this.config.initialLanguage)) {
                this.currentLanguage = this.config.initialLanguage;
            } else {
                const savedLang = this.getSavedLanguage();
                const browserLang = navigator.language.split('-')[0];

                if (savedLang && this.isLanguageSupported(savedLang)) {
                    this.currentLanguage = savedLang;
                } else if (this.isLanguageSupported(browserLang)) {
                    this.currentLanguage = browserLang;
                }
            }

            // Apply initial language
            this.applyLanguage(this.currentLanguage);

            // Create language switcher if enabled
            if (this.config.autoCreateSwitcher) {
                this.createLanguageSwitcher();
            }

            const initTime = performance.now() - this.initStartTime;
            console.log(`✅ Localization system initialized with language: ${this.currentLanguage} (${initTime.toFixed(2)}ms)`);

            return this;
        } catch (error) {
            console.error('❌ Failed to initialize localization system:', error);
            throw error;
        }
    }

    async loadTranslations() {
        try {
            this.loadStartTime = performance.now();
            console.log('📥 Loading translation files...');

            const [enTranslations, faTranslations] = await Promise.all([
                fetch(this.config.basePath + 'en.json').then(response => {
                    if (!response.ok) throw new Error(`Failed to load en.json: ${response.status}`);
                    return response.json();
                }),
                fetch(this.config.basePath + 'fa.json').then(response => {
                    if (!response.ok) throw new Error(`Failed to load fa.json: ${response.status}`);
                    return response.json();
                })
            ]);

            this.translations = {
                en: enTranslations,
                fa: faTranslations
            };

            const loadTime = performance.now() - this.loadStartTime;
            const enKeys = this.countKeys(enTranslations);
            const faKeys = this.countKeys(faTranslations);

            console.log(`✅ Translations loaded successfully (${loadTime.toFixed(2)}ms)`);
            console.log(`   • English: ${enKeys} translation keys`);
            console.log(`   • Persian: ${faKeys} translation keys`);

        } catch (error) {
            console.error('❌ Error loading translations:', error);
            console.warn('⚠️  Falling back to embedded translations');

            // Fallback to basic translations if files fail to load
            this.translations = {
                en: this.getFallbackTranslations('en'),
                fa: this.getFallbackTranslations('fa')
            };
        }
    }

    countKeys(obj, prefix = '') {
        let count = 0;
        for (const key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                count += this.countKeys(obj[key], prefix + key + '.');
            } else {
                count++;
            }
        }
        return count;
    }

    getFallbackTranslations(lang) {
        if (lang === 'fa') {
            return {
                "meta": {
                    "title": "پولبان - اپلیکیشن مدیریت مالی چندزبانه",
                    "description": "پولبان یک اپلیکیشن قدرتمند مدیریت مالی است",
                    "keywords": "مدیریت مالی، چندزبانه، فارسی"
                },
                "navigation": {
                    "features": "ویژگی‌ها",
                    "about": "درباره ما",
                    "gallery": "گالری",
                    "faq": "سوالات متداول",
                    "contact": "تماس",
                    "download": "دانلود",
                    "blog": "وبلاگ"
                },
                "common": {
                    "loading": "در حال بارگذاری...",
                    "error": "خطا در بارگذاری"
                }
            };
        }
        return {
            "meta": {
                "title": "Polban - Multilingual Financial Management App",
                "description": "Polban is a powerful financial management application",
                "keywords": "financial management, multilingual"
            },
            "navigation": {
                "features": "Features",
                "about": "About",
                "gallery": "Gallery",
                "faq": "FAQ",
                "contact": "Contact",
                "download": "Download",
                "blog": "Blog"
            },
            "common": {
                "loading": "Loading...",
                "error": "Loading error"
            }
        };
    }

    getSavedLanguage() {
        try {
            return localStorage.getItem('polban-language');
        } catch (error) {
            console.warn('⚠️  localStorage not available:', error);
            return null;
        }
    }

    saveLanguage(lang) {
        try {
            localStorage.setItem('polban-language', lang);
        } catch (error) {
            console.warn('⚠️  Cannot save language to localStorage:', error);
        }
    }

    isLanguageSupported(lang) {
        return ['en', 'fa'].includes(lang);
    }

    isRTL(lang) {
        return this.rtlLanguages.includes(lang);
    }

    applyLanguage(lang) {
        const startTime = performance.now();

        if (!this.translations[lang]) {
            console.warn(`⚠️  Translations for language ${lang} not found`);
            return;
        }

        console.log(`🔄 Applying language: ${lang}`);

        this.currentLanguage = lang;
        this.saveLanguage(lang);

        // Update HTML attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = this.isRTL(lang) ? 'rtl' : 'ltr';

        // Update meta tags
        this.updateMetaTags();

        // Update all translatable elements using data-translate attributes
        this.updateElements();

        // Update typing animation phrases
        this.updateTypingAnimation();

        // Update language switcher display
        this.updateLanguageSwitcher();

        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang, isRTL: this.isRTL(lang) }
        }));

        const applyTime = performance.now() - startTime;
        console.log(`✅ Language ${lang} applied successfully (${applyTime.toFixed(2)}ms)`);
    }

    updateMetaTags() {
        const meta = this.translations[this.currentLanguage].meta;

        if (!meta) {
            console.warn('⚠️  Meta translations not found');
            return;
        }

        // Update title
        if (meta.title) {
            document.title = meta.title;
        }

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc && meta.description) {
            metaDesc.content = meta.description;
        }

        // Update meta keywords
        const metaKeywords = document.querySelector('meta[name="keywords"]');
        if (metaKeywords && meta.keywords) {
            metaKeywords.content = meta.keywords;
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle && meta.title) {
            ogTitle.content = meta.title;
        }

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc && meta.description) {
            ogDesc.content = meta.description;
        }

        console.log('📝 Meta tags updated');
    }

    updateElements() {
        const startTime = performance.now();
        let updatedCount = 0;

        // Find all elements with data-translate attribute
        const elements = document.querySelectorAll('[data-translate]');

        console.log(`🔍 Found ${elements.length} elements with data-translate attribute`);

        elements.forEach(element => {
            const key = element.getAttribute('data-translate');
            const translateAttr = element.getAttribute('data-translate-attr');

            if (!key) return;

            const translation = this.getTranslation(key);

            if (translation) {
                if (translateAttr) {
                    // Update specific attribute (e.g., placeholder, aria-label, alt)
                    element.setAttribute(translateAttr, translation);
                } else {
                    // Update text content by default
                    element.textContent = translation;
                }
                updatedCount++;
            } else {
                console.warn(`⚠️  Translation not found for key: ${key}`);
            }
        });

        const updateTime = performance.now() - startTime;
        console.log(`✅ Updated ${updatedCount} elements (${updateTime.toFixed(2)}ms)`);
    }

    updateTypingAnimation() {
        const phrases = this.getTranslation('hero.typing_phrases');

        if (!phrases || !Array.isArray(phrases)) {
            console.warn('⚠️  Typing phrases not found');
            return;
        }

        console.log(`🔤 Updating typing animation with ${phrases.length} phrases`);

        // Update the phrases array in the main script
        if (window.updateTypingPhrases) {
            window.updateTypingPhrases(phrases);
        } else {
            console.warn('⚠️  updateTypingPhrases function not found');
        }
    }

    createLanguageSwitcher() {
        console.log('🎨 Creating language switcher...');

        // Create language switcher button
        const headerActions = document.querySelector('.header-actions');
        if (!headerActions) {
            console.error('❌ Header actions not found');
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
            console.log(`🔄 Switching language from ${this.currentLanguage} to ${newLang}`);
            this.applyLanguage(newLang);
        });

        // Insert before theme toggle
        headerActions.insertBefore(languageSwitcher, headerActions.firstChild);

        console.log('✅ Language switcher created');
    }

    updateLanguageSwitcher() {
        const switcher = document.querySelector('.language-switcher span');
        if (switcher) {
            switcher.textContent = this.currentLanguage.toUpperCase();
        }
    }

    getTranslation(key) {
        if (!key) return null;

        const keys = key.split('.');
        let translation = this.translations[this.currentLanguage];

        for (const k of keys) {
            if (translation && translation[k] !== undefined) {
                translation = translation[k];
            } else {
                return null; // Return null if translation not found
            }
        }

        return translation;
    }

    // Utility method to get translation with fallback
    t(key, fallback = null) {
        const translation = this.getTranslation(key);
        return translation !== null ? translation : (fallback || key);
    }

    // Get current language
    getCurrentLanguage() {
        return this.currentLanguage;
    }

    // Check if current language is RTL
    isCurrentRTL() {
        return this.isRTL(this.currentLanguage);
    }

    // Get all available languages
    getAvailableLanguages() {
        return Object.keys(this.translations);
    }

    // Get translation statistics
    getStats() {
        return {
            currentLanguage: this.currentLanguage,
            isRTL: this.isCurrentRTL(),
            availableLanguages: this.getAvailableLanguages(),
            translationKeys: {
                en: this.countKeys(this.translations.en || {}),
                fa: this.countKeys(this.translations.fa || {})
            }
        };
    }
}

// Factory function to initialize localization system with configuration
async function initPolbanLocalization(options = {}) {
    console.log('🔧 Initializing Polban localization system with options:', options);
    try {
        // Merge provided options with defaults
        const config = {
            basePath: './src/locales/',
            autoCreateSwitcher: true,
            initialLanguage: null,
            performanceMode: true,
            ...options
        };

        // Create the localization manager
        const manager = new LocalizationManager(config);

        // Initialize the manager and wait for completion
        await manager.init();

        // Assign to global window object for access from other scripts
        window.localizationManager = manager;

        console.log('✅ Polban localization system ready');
        return manager;
    } catch (error) {
        console.error('❌ Failed to initialize Polban localization system:', error);
        throw error;
    }
}

// Export for use in other scripts
window.LocalizationManager = LocalizationManager;
window.initPolbanLocalization = initPolbanLocalization;

// Debug function to manually test language switching
window.testLanguageSwitch = function(lang) {
    if (window.localizationManager) {
        console.log(`🧪 Testing language switch to: ${lang}`);
        window.localizationManager.applyLanguage(lang);
    } else {
        console.error('❌ Localization manager not found');
    }
};

// Debug function to check current state
window.debugLocalization = function() {
    if (window.localizationManager) {
        const stats = window.localizationManager.getStats();
        console.log('📊 Localization Debug Info:');
        console.log('  Current Language:', stats.currentLanguage);
        console.log('  Is RTL:', stats.isRTL);
        console.log('  Available Languages:', stats.availableLanguages);
        console.log('  Translation Keys:', stats.translationKeys);
        console.log('  Current Translations:', window.localizationManager.translations[stats.currentLanguage]);

        // Count elements with data-translate
        const translatableElements = document.querySelectorAll('[data-translate]');
        console.log('  Elements with data-translate:', translatableElements.length);

        return stats;
    } else {
        console.error('❌ Localization manager not found');
        return null;
    }
};

// Helper function to get translation from anywhere
window.t = function(key, fallback = null) {
    if (window.localizationManager) {
        return window.localizationManager.t(key, fallback);
    }
    return fallback || key;
};
