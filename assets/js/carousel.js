var $ = jQuery.noConflict();

(function($) {
    "use strict";

    try {
        var owlPortfolio = $('.portfolio-carousel');

        owlPortfolio.owlCarousel({
            items: 3,
            lazyLoad: true,
            loop: true,
            margin: 30,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                415: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        });
        $('.portfolio-wrap .navigation .nav--prev').on('click', function() {
            owlPortfolio.trigger('prev.owl.carousel', [800]);
        });
        $('.portfolio-wrap .navigation .nav--next').on('click', function() {
            owlPortfolio.trigger('next.owl.carousel', [800]);
        });

    } catch (err) {

    };

    try {
        var owlTestimonials = $('.testimonials-carousel');
        owlTestimonials.owlCarousel({
            items: 2,
            lazyLoad: true,
            loop: true,
            margin: 30,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                415: {
                    items: 1
                },
                768: {
                    items: 1
                },
                992: {
                    items: 2
                }
            }
        });
        $('.testimonials-wrap .navigation .nav--prev').on('click', function() {
            owlTestimonials.trigger('prev.owl.carousel', [800]);
        });
        $('.testimonials-wrap .navigation .nav--next').on('click', function() {
            owlTestimonials.trigger('next.owl.carousel', [800]);
        });
    } catch (err) {

    };

    try {
        var owlTeam = $('.team-carousel');
        owlTeam.owlCarousel({
            items: 4,
            lazyLoad: true,
            loop: true,
            margin: 30,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                415: {
                    items: 2
                },
                768: {
                    items: 3
                },
                992: {
                    items: 4
                }
            }
        });
        $('.team-wrap .navigation .nav--prev').on('click', function() {
            owlTeam.trigger('prev.owl.carousel', [800]);
        });
        $('.team-wrap .navigation .nav--next').on('click', function() {
            owlTeam.trigger('next.owl.carousel', [800]);
        });
    } catch (err) {

    };
    try {
        var owlGallery = $('.gallery-carousel');
        owlGallery.owlCarousel({
            items: 2,
            lazyLoad: true,
            loop: true,
            margin: 30,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                415: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 2
                }
            }
        });
        $('.gallery-wrap .navigation .nav--prev').on('click', function() {
            owlGallery.trigger('prev.owl.carousel', [800]);
        });
        $('.gallery-wrap .navigation .nav--next').on('click', function() {
            owlGallery.trigger('next.owl.carousel', [800]);
        });
    } catch (err) {

    };
    try {
        var owlArticles = $('.articles-carousel');
        owlArticles.owlCarousel({
            items: 3,
            lazyLoad: true,
            loop: true,
            margin: 30,
            dots: false,
            responsive: {
                0: {
                    items: 1
                },
                415: {
                    items: 2
                },
                768: {
                    items: 3
                }
            }
        });
        $('.articles-wrap .navigation .nav--prev').on('click', function() {
            owlArticles.trigger('prev.owl.carousel', [800]);
        });
        $('.articles-wrap .navigation .nav--next').on('click', function() {
            owlArticles.trigger('next.owl.carousel', [800]);
        });
    } catch (err) {

    };

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

        // Click-zone navigation: left half = prev, right half = next
        // Ignored when clicking on links, buttons, or pagination dots
        var $slider = $('.slider-pageheader');

        $slider.on('click', function(e) {
            if ($(e.target).closest('a, button, .swiper-pagination, .swiper-pagination-bullet').length) {
                return;
            }
            var halfWidth = $slider.outerWidth() / 2;
            var clickX   = e.pageX - $slider.offset().left;
            if (clickX < halfWidth) {
                mySwiper.slidePrev();
            } else {
                mySwiper.slideNext();
            }
        });

        // Show directional cursor as the mouse moves across the banner
        $slider.on('mousemove', function(e) {
            if ($(e.target).closest('a, button, .swiper-pagination').length) {
                $slider.css('cursor', 'default');
                return;
            }
            var halfWidth = $slider.outerWidth() / 2;
            var mouseX   = e.pageX - $slider.offset().left;
            $slider.css('cursor', mouseX < halfWidth ? 'w-resize' : 'e-resize');
        });

        $slider.on('mouseleave', function() {
            $slider.css('cursor', '');
        });

    } catch (err) {

    };
})(jQuery);