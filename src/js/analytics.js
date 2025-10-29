/**
 * Google Analytics Integration
 * Centralized analytics configuration for Polban Landing Page
 */

// Configuration
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // Replace with actual ID
const IS_PRODUCTION = window.location.hostname !== 'localhost';
const RESPECT_DNT = true; // Respect Do Not Track

// Check if analytics should be enabled
function shouldEnableAnalytics() {
  // Respect Do Not Track
  if (RESPECT_DNT && navigator.doNotTrack === '1') {
    return false;
  }
  
  // Only in production (optional)
  if (!IS_PRODUCTION) {
    return false;
  }
  
  return true;
}

// Initialize Google Analytics
function initializeAnalytics() {
  if (!shouldEnableAnalytics()) {
    console.log('Analytics disabled');
    return;
  }
  
  // Load gtag.js dynamically
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);
  
  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  window.gtag = gtag;
  
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    'anonymize_ip': true, // GDPR compliance
    'cookie_flags': 'SameSite=None;Secure'
  });
}

// Helper: Track custom events
function trackEvent(eventName, eventParams = {}) {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
}

// Helper: Track page views (for SPAs)
function trackPageView(pagePath, pageTitle) {
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      'page_path': pagePath,
      'page_title': pageTitle
    });
  }
}

// Auto-initialize on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeAnalytics);
} else {
  initializeAnalytics();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { trackEvent, trackPageView };
}