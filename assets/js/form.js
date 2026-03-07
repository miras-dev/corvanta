var $ = jQuery.noConflict();

(function ($) {
    "use strict";

    // ── CONFIG ────────────────────────────────────────────────────────────────
    // Paste your Google Apps Script web app URL here after deploying.
    // Deploy → New deployment → Web app → Execute as: Me, Access: Anyone
    var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwUMQrR5EPpvGW_KBDJllgGDIWh2s1cT9dv9onBixNsBBew0oL27NJJe_a6kWc90oh6/exec';
    // ─────────────────────────────────────────────────────────────────────────

    var submitContact = $('#contact-form'),
        message = $('[class*="alert-wrap"]');

    if (!submitContact.length) return;

    submitContact.on('submit', function (e) {
        e.preventDefault();

        // Reset any previous error states on all fields
        submitContact.find('input, textarea, select').attr('data-error', 'false');

        // Normalize phone to full E.164 format (+971501234567) via intl-tel-input
        if (window.iti) {
            $('#phone').val(window.iti.getNumber());
        }

        // Collect all named form fields into a plain object
        var payload = {};
        submitContact.serializeArray().forEach(function (field) {
            payload[field.name] = field.value;
        });

        // Disable submit button to prevent double-submit while request is in flight
        var btn = $('#submit');
        btn.val('Sending…').prop('disabled', true);

        // POST to Google Apps Script.
        // Content-Type: text/plain avoids a CORS preflight request entirely.
        // The script receives the body via e.postData.contents and parses it as JSON.
        fetch(SCRIPT_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'text/plain;charset=utf-8' },
            body: JSON.stringify(payload)
        })
            .then(function () {
                // Hide all form fields and the submit button, show success message
                submitContact.find('[class*="field"]').hide();
                btn.hide();
                message.find('p').text('Thank you! We\'ll be in touch shortly.');
                message.attr('data-active', 'true').addClass('success');
            })
            .catch(function () {
                // Network error — re-enable button and show error
                message.find('p').text('Something went wrong. Please try again or email us directly.');
                message.attr('data-active', 'true');
                btn.val('Send Message').prop('disabled', false);
            });
    });

})(jQuery);
