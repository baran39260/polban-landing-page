// Initialize localization system for main page
function initLocalizationForPage() {
    try {
        initPolbanLocalization({
            basePath: './src/locales/',
            autoCreateSwitcher: true
        });
    } catch (error) {
        console.error('Failed to initialize localization:', error);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLocalizationForPage);
} else {
    initLocalizationForPage();
}
