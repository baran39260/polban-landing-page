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

            // Setup ARIA updates
            this.setupARIAUpdates();

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
                fetch(this.config.basePath + 'en.v2.json').then(response => {
                    if (!response.ok) throw new Error(`Failed to load en.v2.json: ${response.status}`);
                    return response.json();
                }),
                fetch(this.config.basePath + 'fa.v2.json').then(response => {
                    if (!response.ok) throw new Error(`Failed to load fa.v2.json: ${response.status}`);
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
                "features": {
                    "title": "پول‌بان دقیقاً همون چیزیه که تو ایران کم داشتی",
                    "subtitle": "۴ دلیل که چرا هزاران ایرانی دیگه بدون پول‌بان نمی‌تونن مالی‌شون رو مدیریت کنن",
                    "purchasing_power": {
                        "title": "الان با پول و طلاهات دقیقاً چی می‌تونی بخری؟",
                        "description": "پول‌بان با قیمت لحظه‌ای طلا، سکه و دلار بهت می‌گه همین امروز چند گرم طلا یا چند متر خونه می‌تونی بخری"
                    },
                    "inflation_impact": {
                        "title": "با این تورم، ماه پیش چقدر از دارایی‌هات آب رفت؟",
                        "description": "ارزش واقعی دارایی‌هات رو با تورم ایران محاسبه می‌کنه – می‌فهمی واقعاً چقدر ضرر کردی یا سود کردی"
                    },
                    "debt_management": {
                        "title": "بدهی و طلب به فامیل دیگه فراموشت نمی‌شه",
                        "description": "زمان‌بندی هوشمند یادآوری می‌کنه کی به کی بدهکاری، کی از کی طلبکاری – با نوتیفیکیشن و جزئیات کامل"
                    },
                    "unified_assets": {
                        "title": "همه ارزها و حساب‌ها رو همزمان مدیریت کن",
                        "description": "ریال، دلار، یورو، تتر، حساب بانکی، کیف پول دیجیتال – همه رو یک‌جا ببین و انتقال بده، با پشتیبانی تقویم شمسی و میلادی"
                    }
                },
                "video_demo": {
                    "title": "تجربه واقعی پولبان را در ۳۰ ثانیه ببینید"
                },
                "sticky_bar": {
                    "main_text": "همین حالا پولبان را رایگان دانلود کنید",
                    "meta_line_1": "نسخه ۲.۴.۱ • آخرین به‌روزرسانی: ۲۸ فروردین ۱۴۰۵",
                    "install_count": "بیش از ۱۰۰٬۰۰۰ نصب",
                    "rating_info": "۴.۸ (۲۳٬۴۰۰ نظر)",
                    "download_apk": "دانلود مستقیم APK",
                    "google_play_alt": "دریافت از گوگل پلی",
                    "google_play_badge": "assets/images/google-play-badge-fa.svg"
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
            "features": {
                "title": "Polban is Exactly What You've Been Missing in Iran",
                "subtitle": "4 reasons why thousands of Iranians can't manage their finances without Polban anymore",
                "purchasing_power": {
                    "title": "What Exactly Can You Buy with Your Assets Now?",
                    "description": "With real-time gold, coin, and dollar prices, Polban tells you exactly how many grams of gold or square meters of property you can afford today."
                },
                "inflation_impact": {
                    "title": "How Much Value Did You Lose to Inflation Last Month?",
                    "description": "Calculates the real value of your assets adjusted for Iran's inflation – understand your true profit or loss."
                },
                "debt_management": {
                    "title": "Never Forget Family Debts and Loans Again",
                    "description": "Smart scheduling reminds you who you owe and who owes you – with notifications and full details."
                },
                "unified_assets": {
                    "title": "Manage All Currencies and Accounts Simultaneously",
                    "description": "Rial, Dollar, Euro, Tether, bank accounts, digital wallets – view and transfer everything in one place, with Solar and Gregorian calendar support."
                }
            },
            "video_demo": {
                "title": "See the real experience of Polban in 30 seconds"
            },
            "sticky_bar": {
                "main_text": "Download Polban for Free Now",
                "meta_line_1": "Version 2.4.1 • Last Update: April 17, 2026",
                "install_count": "Over 100,000 Installs",
                "rating_info": "4.8 (23,400 Reviews)",
                "download_apk": "Direct APK Download",
                "google_play_alt": "Get it on Google Play",
                "google_play_badge": "assets/images/google-play-badge-en.svg"
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

        // Update language switcher ARIA
        this.updateLanguageSwitcherARIA(lang);

        // Update ARIA labels
        this.updateAllARIALabels(lang);

        // Trigger custom event for other scripts
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang, isRTL: this.isRTL(lang) }
        }));

        const applyTime = performance.now() - startTime;
        console.log(`✅ Language ${lang} applied successfully (${applyTime.toFixed(2)}ms)`);
    }

    // Event listener for languageChanged to update ARIA labels
    setupARIAUpdates() {
        document.addEventListener('languageChanged', (event) => {
            const { language, isRTL } = event.detail;

            // Update animations for RTL
            if (isRTL) {
                document.body.classList.add('rtl-animations');
            } else {
                document.body.classList.remove('rtl-animations');
            }

            // Update ARIA labels
            this.updateAllARIALabels(language);

            // Update RTL features if function exists
            if (typeof updateRTLFeatures === 'function') {
                updateRTLFeatures(isRTL);
            }
        });
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
        console.log('🎨 Setting up language switcher...');

        // Find existing language switcher button
        let languageSwitcher = document.querySelector('.language-switcher');

        if (!languageSwitcher) {
            // Create language switcher button if it doesn't exist
            const headerActions = document.querySelector('.header-actions');
            if (!headerActions) {
                console.error('❌ Header actions not found');
                return;
            }

            languageSwitcher = document.createElement('button');
            languageSwitcher.className = 'language-switcher';
            languageSwitcher.setAttribute('aria-label', 'Switch language');
            languageSwitcher.innerHTML = `
                <i class="fas fa-globe" aria-hidden="true"></i>
                <span>${this.currentLanguage.toUpperCase()}</span>
            `;

            // Insert before theme toggle
            headerActions.insertBefore(languageSwitcher, headerActions.firstChild);

            // Add click handler only for newly created button
            languageSwitcher.addEventListener('click', () => {
                const newLang = this.currentLanguage === 'en' ? 'fa' : 'en';
                console.log(`🔄 Switching language from ${this.currentLanguage} to ${newLang}`);
                this.applyLanguage(newLang);
            });
        } else {
            // Update existing button
            const langSpan = languageSwitcher.querySelector('span');
            if (langSpan) {
                langSpan.textContent = this.currentLanguage.toUpperCase();
            }

            // Ensure click handler exists (add if not already present)
            if (!languageSwitcher.hasAttribute('data-listener-attached')) {
                languageSwitcher.setAttribute('data-listener-attached', 'true');
                languageSwitcher.addEventListener('click', () => {
                    const newLang = this.currentLanguage === 'en' ? 'fa' : 'en';
                    console.log(`🔄 Switching language from ${this.currentLanguage} to ${newLang}`);
                    this.applyLanguage(newLang);
                });
            }
        }

        console.log('✅ Language switcher ready');
    }

    updateLanguageSwitcher() {
        const switcher = document.querySelector('.language-switcher span');
        if (switcher) {
            switcher.textContent = this.currentLanguage.toUpperCase();
        }

        const flag = document.getElementById('current-flag');
        if (flag) {
            flag.src = `assets/images/flags/${this.currentLanguage}.svg`;
            flag.alt = this.currentLanguage === 'en' ? 'English' : 'فارسی';
        }
    }

    updateLanguageSwitcherARIA(currentLang) {
        // Use class selector for consistency with setupLanguageSwitcher()
        const languageSwitcher = document.querySelector('.language-switcher');

        // Gracefully handle absence (e.g., on pages without switcher)
        if (!languageSwitcher) {
            console.log('ℹ️  Language switcher not found, skipping ARIA update');
            return;
        }

        const langNames = {
            'en': 'English',
            'fa': 'Persian (فارسی)'
        };

        // Get only supported languages from translations
        const availableLangs = this.getAvailableLanguages();
        const currentLangName = langNames[currentLang] || currentLang.toUpperCase();

        // Determine next language (cycle through supported languages only)
        const currentIndex = availableLangs.indexOf(currentLang);
        const nextIndex = (currentIndex + 1) % availableLangs.length;
        const nextLang = availableLangs[nextIndex];
        const nextLangName = langNames[nextLang] || nextLang.toUpperCase();

        languageSwitcher.setAttribute(
            'aria-label',
            `Switch language to ${nextLangName}. Current language: ${currentLangName}`
        );
    }

    getARIALabel(key, params = {}) {
        const translation = this.getTranslation(`aria.${key}`);
        if (!translation) return '';

        // Replace placeholders
        let result = translation;
        Object.keys(params).forEach(param => {
            result = result.replace(`{${param}}`, params[param]);
        });

        return result;
    }

    updateAllARIALabels(lang) {
        // Update filter buttons
        const filterBtns = document.querySelectorAll('.filter-btn');
        filterBtns.forEach(btn => {
            const filter = btn.dataset.filter;
            const label = this.getARIALabel(
                filter === 'all' ? 'filter_show_all' : 'filter_show_category',
                { category: btn.textContent.trim() }
            );
            if (label) btn.setAttribute('aria-label', label);
        });

        // Update carousel dots
        const carouselDots = document.querySelectorAll('.carousel-dot');
        carouselDots.forEach((dot, index) => {
            const slideData = window.galleryData ? window.galleryData[index] : null;
            if (slideData) {
                const label = this.getARIALabel('carousel_dot', {
                    title: slideData.title,
                    current: index + 1,
                    total: window.galleryData.length
                });
                if (label) dot.setAttribute('aria-label', label);
            }
        });

        // Update gallery items
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach((item, index) => {
            const slideData = window.galleryData ? window.galleryData[index] : null;
            if (slideData) {
                const label = this.getARIALabel('gallery_item', {
                    title: slideData.title
                });
                if (label) item.setAttribute('aria-label', label);
            }
        });
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
window.testLanguageSwitch = function (lang) {
    if (window.localizationManager) {
        console.log(`🧪 Testing language switch to: ${lang}`);
        window.localizationManager.applyLanguage(lang);
    } else {
        console.error('❌ Localization manager not found');
    }
};

// Debug function to check current state
window.debugLocalization = function () {
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
window.t = function (key, fallback = null) {
    if (window.localizationManager) {
        return window.localizationManager.t(key, fallback);
    }
    return fallback || key;
};
