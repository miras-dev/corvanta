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
                delay: 5500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });

        // Click-zone navigation: left half = prev, right half = next.
        // Ignored when clicking on links, buttons, or pagination dots.
        var $slider = $('.slider-pageheader');

        // Cache slider geometry — recomputed only on resize, not on every event.
        var sliderWidth = $slider.outerWidth();
        var sliderLeft  = $slider.offset().left;
        var lastCursor  = '';

        $(window).on('resize.slider', function() {
            sliderWidth = $slider.outerWidth();
            sliderLeft  = $slider.offset().left;
        });

        $slider.on('click', function(e) {
            if ($(e.target).closest('a, button, .swiper-pagination, .swiper-pagination-bullet').length) {
                return;
            }
            if (e.pageX - sliderLeft < sliderWidth / 2) {
                mySwiper.slidePrev();
            } else {
                mySwiper.slideNext();
            }
        });

        // Show directional cursor as the mouse moves across the banner.
        // Only write to the DOM when the cursor value actually changes.
        $slider.on('mousemove', function(e) {
            if ($(e.target).closest('a, button, .swiper-pagination').length) {
                if (lastCursor !== 'default') {
                    $slider.css('cursor', 'default');
                    lastCursor = 'default';
                }
                return;
            }
            var cursor = (e.pageX - sliderLeft) < sliderWidth / 2 ? 'w-resize' : 'e-resize';
            if (cursor !== lastCursor) {
                $slider.css('cursor', cursor);
                lastCursor = cursor;
            }
        });

        $slider.on('mouseleave', function() {
            $slider.css('cursor', '');
            lastCursor = '';
        });

    } catch (err) {

    };
})(jQuery);
