var $ = jQuery.noConflict();

(function($) {
    "use strict";

    // ── Owl Carousel instances ──────────────────────────────────────────────
    // Each entry: carousel selector, navigation wrapper selector, desktop item
    // count, and responsive breakpoints.  All other options are shared.
    var carouselConfigs = [
        {
            carousel: '.portfolio-carousel',
            nav: '.portfolio-wrap',
            items: 3,
            responsive: { 0: { items: 1 }, 415: { items: 2 }, 768: { items: 3 } }
        },
        {
            carousel: '.testimonials-carousel',
            nav: '.testimonials-wrap',
            items: 2,
            responsive: { 0: { items: 1 }, 415: { items: 1 }, 768: { items: 1 }, 992: { items: 2 } }
        },
        {
            carousel: '.team-carousel',
            nav: '.team-wrap',
            items: 4,
            responsive: { 0: { items: 1 }, 415: { items: 2 }, 768: { items: 3 }, 992: { items: 4 } }
        },
        {
            carousel: '.gallery-carousel',
            nav: '.gallery-wrap',
            items: 2,
            responsive: { 0: { items: 1 }, 415: { items: 1 }, 768: { items: 2 }, 992: { items: 2 } }
        },
        {
            carousel: '.articles-carousel',
            nav: '.articles-wrap',
            items: 3,
            responsive: { 0: { items: 1 }, 415: { items: 2 }, 768: { items: 3 } }
        }
    ];

    carouselConfigs.forEach(function(cfg) {
        var $owl = $(cfg.carousel);
        if (!$owl.length) { return; }
        $owl.owlCarousel({
            items: cfg.items,
            lazyLoad: true,
            loop: true,
            margin: 30,
            dots: false,
            responsive: cfg.responsive
        });
        $(cfg.nav + ' .navigation .nav--prev').on('click', function() { $owl.trigger('prev.owl.carousel', [800]); });
        $(cfg.nav + ' .navigation .nav--next').on('click', function() { $owl.trigger('next.owl.carousel', [800]); });
    });

    // ── Single-image carousel (separate options — not part of the shared loop) ──
    try {
        var owlImages = $('.images-carousel');
        owlImages.owlCarousel({
            items: 1,
            lazyLoad: true,
            loop: true,
            margin: 0,
            autoplay: false,
            autoplayHoverPause: false,
            dots: true,
            nav: true,
            navText: ['<span><i class="feather icon-arrow-left"></i></span>', '<span><i class="feather icon-arrow-right"></i></span>']
        });
    } catch (err) {

    };

    // ── Swiper hero slider ──────────────────────────────────────────────────
    try {
        var mySwiper = new Swiper('.slider-pageheader', {
            direction: 'horizontal',
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            loop: true,
            speed: 1000,
            autoplay: {
                delay: 7500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                prevEl: '.swiper-button-prev',
                nextEl: '.swiper-button-next',
            },
        });

        // Navigation is handled by the Swiper prev/next arrow buttons.

    } catch (err) {

    };

    // ── Clients logo ticker ──────────────────────────────────────────────────
    try {
        new Swiper('.clients-logos-carousel', {
            slidesPerView: 7,
            spaceBetween: 24,
            loop: true,
            speed: 5000,
            autoplay: {
                delay: 0,
                disableOnInteraction: false,
            },
            breakpoints: {
                0:   { slidesPerView: 2, spaceBetween: 16 },
                576: { slidesPerView: 3, spaceBetween: 20 },
                768: { slidesPerView: 4, spaceBetween: 24 },
                992: { slidesPerView: 7, spaceBetween: 24 },
            },
        });
    } catch (err) {

    };

})(jQuery);
