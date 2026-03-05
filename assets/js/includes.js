var $ = jQuery.noConflict();

(function ($) {
    'use strict';

    // ── Active nav section lookup ─────────────────────────────────────────
    // Maps each filename to its nav section key.
    // The key must match the data-nav-section attribute on <li> in header.html.
    var navSectionMap = {
        'index.html':          'home',
        '':                    'home',
        'product.html':        'products',
        'product-detail.html': 'products',
        'blog.html':           'blog',
        'blog-detail.html':    'blog',
        'contact.html':        'contact'
    };

    // ── Determine current page filename ──────────────────────────────────
    var currentPage = window.location.pathname.split('/').pop() || '';

    // ── Placeholder elements ─────────────────────────────────────────────
    var $headerPlaceholder = $('#header-placeholder');
    var $footerPlaceholder = $('#footer-placeholder');

    // Read per-page config from data attributes on the placeholder
    var headerClass  = $headerPlaceholder.data('header-class')  || '';
    var wrapperClass = $headerPlaceholder.data('wrapper-class') || 'wrap-header--padding-lg';

    // ── Load header and footer in parallel ───────────────────────────────
    var headerLoaded = $.get('includes/header.html');
    var footerLoaded = $.get('includes/footer.html');

    $.when(headerLoaded, footerLoaded).done(function (headerResult, footerResult) {
        var headerHtml = headerResult[0];
        var footerHtml = footerResult[0];

        // Inject header
        $headerPlaceholder.replaceWith(headerHtml);

        // Apply per-page header modifier class (e.g. transparent--fixed)
        var $header = $('#header');
        if (headerClass) {
            $header.addClass(headerClass);
        }

        // Apply per-page wrapper class (padding-sm / padding-md / padding-lg)
        $header.find('[class^="wrap-header"]').attr('class', wrapperClass);

        // Inject footer
        $footerPlaceholder.replaceWith(footerHtml);

        // ── Set active nav item ──────────────────────────────────────────
        var section = navSectionMap[currentPage];
        if (section) {
            $('[data-nav-section="' + section + '"] > a').addClass('active');
        }

        // ── Re-apply page transition handler to injected links ───────────
        // elements.js binds this on page load before the header exists,
        // so nav links in the injected header need it applied here.
        $('#header a[href*=".html"], #footer a[href*=".html"]').on('click', function (event) {
            event.preventDefault();
            $('body').removeClass('visible');
            var url = this.href;
            setTimeout(function () {
                window.location.href = url;
            }, 400);
        });

        // ── Reinitialize lazy images in footer ───────────────────────────
        // elements.js ran unveil before the footer existed in the DOM.
        if (typeof $.fn.unveil === 'function') {
            $('img[data-unveil]').unveil(200, function () {
                $(this).on('load', function () {
                    $(this).css('opacity', 1);
                });
            });
        }

        // ── Refresh AOS so the footer fade-in animation fires ────────────
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }

        // ── Reinitialize menu ────────────────────────────────────────────
        // menu.js executed before the header was injected, so its DOM
        // references were empty. We replicate its logic here with the
        // correct references post-injection.
        initMenu();

    }).fail(function () {
        console.error(
            'Corvanta: Failed to load header/footer includes. ' +
            'Make sure the site is served via a local server (not file://) ' +
            'and that includes/header.html and includes/footer.html exist.'
        );
    });

    // ── Load blog related articles header if placeholder exists ───────────
    var $blogRelatedHeaderPlaceholder = $('#blog-related-header-placeholder');
    if ($blogRelatedHeaderPlaceholder.length) {
        $.get('includes/blog-related-header.html').done(function (html) {
            $blogRelatedHeaderPlaceholder.replaceWith(html);

            // Apply page transition handler to injected links
            $('#blog-related-header a[href*=".html"]').on('click', function (event) {
                event.preventDefault();
                $('body').removeClass('visible');
                var url = this.href;
                setTimeout(function () {
                    window.location.href = url;
                }, 400);
            });

            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    }

    // ── Menu initialization ──────────────────────────────────────────────
    function initMenu() {
        try {
            var menuMobile       = $('#mobile-menu');
            var mainMenu         = $('#main-menu');
            var header           = $('#header');
            var headerHeight     = header.outerHeight();
            var headerStickySpace = 100;

            // Hamburger toggle
            mainMenu.on('click', '[class*="menu-button"]', function (e) {
                $('body').toggleClass('no-scroll');
                if (menuMobile.attr('aria-expanded') === 'true') {
                    menuMobile.attr('aria-expanded', 'false');
                    $(this).parent().attr('aria-expanded', 'false');
                    menuMobile.find('[class*="mobile-submenu"]').removeClass('active');
                } else {
                    menuMobile.attr('aria-expanded', 'true');
                    $(this).parent().attr('aria-expanded', 'true');
                }
            });

            // Mobile dropdown items
            menuMobile.on('click', 'li[class*="dropdown-parent"]', function (e) {
                var menuItem = $(e.currentTarget);
                if (menuItem.attr('aria-expanded') === undefined) {
                    var idDropdown = menuItem.data('dropdown');
                    menuMobile.find('#' + idDropdown).toggleClass('active');
                } else {
                    if (menuItem.attr('aria-expanded') === 'true') {
                        $(this).attr('aria-expanded', 'false');
                    } else {
                        $(this).attr('aria-expanded', 'true');
                    }
                }
            });

            menuMobile.on('click', '#backSubmenu', function () {
                $(this).parent().removeClass('active');
            });

            // Sticky header on scroll
            $(window).on('scroll.stickyHeader', function () {
                var scroll = $(window).scrollTop();
                if (scroll >= headerHeight + headerStickySpace) {
                    header.addClass('moove');
                } else {
                    header.removeClass('moove');
                }
            });

        } catch (err) {
            // Silent failure mirrors original menu.js behavior
        }
    }

})(jQuery);
