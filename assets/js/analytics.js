/**
 * Corvanta Group — Advanced GA4 Analytics
 * Tracks: CTA clicks, nav clicks, form submissions, scroll depth, outbound links
 *
 * Replace G-XXXXXXXXXX with your real GA4 Measurement ID.
 */

(function () {
    'use strict';

    // ── Guard: bail if gtag is not available ──────────────────────────────────
    function gtag() {
        if (typeof window.gtag === 'function') {
            window.gtag.apply(window, arguments);
        }
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    /**
     * Returns the trimmed visible text of an element, truncated to 60 chars.
     */
    function labelOf(el) {
        return (el.textContent || el.innerText || el.getAttribute('aria-label') || '').trim().slice(0, 60);
    }

    /**
     * Returns the page name derived from the current URL filename.
     * e.g. "blog-detail-ai.html" → "blog-detail-ai"
     *      "/" or "" → "home"
     */
    function pageName() {
        var path = window.location.pathname.split('/').pop().replace('.html', '') || 'home';
        return path;
    }

    // ── 1. CTA Button Clicks ──────────────────────────────────────────────────
    // Captures clicks on all CTA-style anchor/button elements.
    var CTA_SELECTOR = [
        'a[class*="btn--"]',
        'a[class*="link"]',
        'button[class*="btn"]',
        'input[type="submit"]',
        'a.navbar-brand'
    ].join(',');

    document.addEventListener('click', function (e) {
        var el = e.target.closest(CTA_SELECTOR);
        if (!el) return;

        var label = labelOf(el) || el.getAttribute('href') || '(unknown)';
        var href  = el.getAttribute('href') || '';

        gtag('event', 'cta_click', {
            event_category : 'CTA',
            event_label     : label,
            destination_url : href,
            page            : pageName()
        });
    }, true);

    // ── 2. Navigation Link Clicks ─────────────────────────────────────────────
    // Tracks clicks on main-nav and mobile-nav links (injected via includes.js).
    // Uses delegated event on document to work after dynamic header injection.
    document.addEventListener('click', function (e) {
        var el = e.target.closest('#main-menu a, #mobile-menu a');
        if (!el) return;

        gtag('event', 'nav_click', {
            event_category : 'Navigation',
            event_label     : labelOf(el) || el.getAttribute('href'),
            destination_url : el.getAttribute('href') || '',
            page            : pageName()
        });
    }, true);

    // ── 3. Outbound Link Clicks ───────────────────────────────────────────────
    document.addEventListener('click', function (e) {
        var el = e.target.closest('a[href]');
        if (!el) return;

        var href = el.getAttribute('href') || '';
        var isExternal = href.indexOf('http') === 0 && href.indexOf(window.location.hostname) === -1;
        if (!isExternal) return;

        gtag('event', 'outbound_click', {
            event_category : 'Outbound',
            event_label     : labelOf(el) || href,
            destination_url : href,
            page            : pageName()
        });
    }, true);

    // ── 4. Scroll Depth ───────────────────────────────────────────────────────
    var scrollMilestones = [25, 50, 75, 90];
    var firedMilestones  = {};

    function onScroll() {
        var scrollTop    = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight    = Math.max(
            document.body.scrollHeight,
            document.documentElement.scrollHeight
        ) - window.innerHeight;

        if (docHeight <= 0) return;

        var pct = Math.round((scrollTop / docHeight) * 100);

        scrollMilestones.forEach(function (milestone) {
            if (!firedMilestones[milestone] && pct >= milestone) {
                firedMilestones[milestone] = true;

                gtag('event', 'scroll_depth', {
                    event_category : 'Engagement',
                    event_label     : milestone + '%',
                    scroll_percent  : milestone,
                    page            : pageName()
                });
            }
        });
    }

    // Passive scroll listener for performance
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── 5. Form Submission Tracking ───────────────────────────────────────────
    // Hooks into the existing form.js fetch flow by observing DOM changes
    // on the alert/success element, and also listening for the form submit event.

    document.addEventListener('submit', function (e) {
        var form = e.target;
        if (!form || form.id !== 'contact-form') return;

        gtag('event', 'form_submit', {
            event_category : 'Contact Form',
            event_label     : 'Submitted',
            page            : pageName()
        });
    }, true);

    // Observe form success/error messages rendered by form.js
    function observeFormOutcome() {
        var alertWrap = document.querySelector('[class*="alert-wrap"]');
        if (!alertWrap) return;

        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-active') {
                    var isActive  = alertWrap.getAttribute('data-active') === 'true';
                    var isSuccess = alertWrap.classList.contains('success');

                    if (isActive) {
                        gtag('event', isSuccess ? 'form_success' : 'form_error', {
                            event_category : 'Contact Form',
                            event_label     : isSuccess ? 'Success' : 'Error',
                            page            : pageName()
                        });
                    }
                }
            });
        });

        observer.observe(alertWrap, { attributes: true });
    }

    // Run after DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', observeFormOutcome);
    } else {
        observeFormOutcome();
    }

    // ── 6. Blog Post Read Event ───────────────────────────────────────────────
    // Fires once when the user reaches 90% scroll on a blog detail page.
    var isBlogDetail = /blog-detail/.test(window.location.pathname);
    if (isBlogDetail) {
        var blogReadFired = false;
        window.addEventListener('scroll', function () {
            if (blogReadFired) return;

            var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            var docHeight = Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight
            ) - window.innerHeight;

            if (docHeight > 0 && (scrollTop / docHeight) >= 0.9) {
                blogReadFired = true;
                gtag('event', 'blog_post_read', {
                    event_category : 'Content',
                    event_label     : document.title,
                    page            : pageName()
                });
            }
        }, { passive: true });
    }

}());
