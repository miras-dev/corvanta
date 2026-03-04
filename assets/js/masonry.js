var $ = jQuery.noConflict();

(function($) {
    "use strict";

    try {

        var $mainContainerSimple = $('[data-isotope="load-simple"] .row');
        $mainContainerSimple.imagesLoaded(function() {

            var $container = $mainContainerSimple.isotope({ itemSelector: '[data-isotope="load-simple"] [class*="element"]', layoutMode: 'fitRows' });
            var $simpleFilters = $('[data-isotope-filters] ul');

            $simpleFilters.on('click', 'li', function() {
                var $li = $(this);
                $li.closest('ul').find('.is-checked').removeClass('is-checked');
                $li.addClass('is-checked');
                $container.isotope({ filter: $li.attr('data-filter') });
            });

        });

    } catch (err) {

    }

    //masonry
    try {
        var $masonryContainer = $('[data-isotope="masonry"] .row');
        $masonryContainer.imagesLoaded(function() {
            $masonryContainer.isotope({
                itemSelector: '[data-isotope="masonry"] [class*="element"]',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: '[data-isotope="masonry"] [class*="element"]',
                    gutter: 18
                }
            });
            $masonryContainer.isotope('layout');
        });

    } catch (err) {

    }

    try {
        var $masonryContainerF = $('[data-isotope="fmasonry"] .row');
        $masonryContainerF.imagesLoaded(function() {
            $masonryContainerF.isotope({
                itemSelector: '[data-isotope="fmasonry"] [class*="element"]',
                layoutMode: 'masonry',
                masonry: {
                    columnWidth: '[data-isotope="fmasonry"] [class*="element"]',
                    gutter: 18
                }
            });
            var $masonryFiltersF = $('[data-isotope-filters] ul');
            $masonryFiltersF.on('click', 'li', function() {
                var $li = $(this);
                $li.closest('ul').find('.is-checked').removeClass('is-checked');
                $li.addClass('is-checked');
                $masonryContainerF.isotope({ filter: $li.attr('data-filter') });
            });

        });

    } catch (err) {

    }

    //fitRows
    try {
        var $blogContainer = $('[data-isotope="fitRows"] .row');
        $blogContainer.imagesLoaded(function() {
            $blogContainer.isotope({ itemSelector: '[data-isotope="fitRows"] [class*="element"]', layoutMode: 'fitRows' });
            $blogContainer.isotope('layout');
        });
    } catch (err) {

    }

})(jQuery);
