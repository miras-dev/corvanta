var $ = jQuery.noConflict();

(function ($) {
    "use strict";

    // ── CONFIG ────────────────────────────────────────────────────────────────
    // Paste your Google Apps Script web app URL here after deploying.
    // Deploy → New deployment → Web app → Execute as: Me, Access: Anyone
    var SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwUMQrR5EPpvGW_KBDJllgGDIWh2s1cT9dv9onBixNsBBew0oL27NJJe_a6kWc90oh6/exec';
    // ─────────────────────────────────────────────────────────────────────────

    var submitContact = $('#contact-form'),
        alertWrap = $('[class*="alert-wrap"]');

    if (!submitContact.length) return;

    // ── HELPERS ───────────────────────────────────────────────────────────────

    function setFieldError(id, msg) {
        var input = $('#' + id);
        input.attr('data-error', 'true');
        input.siblings('span.error').text(msg).attr('data-active', 'true');
    }

    function clearFieldError(id) {
        var input = $('#' + id);
        input.attr('data-error', 'false');
        input.siblings('span.error').attr('data-active', 'false');
    }

    function isValidEmail(val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val);
    }

    // ── VALIDATION ────────────────────────────────────────────────────────────

    function validate() {
        var ok = true;

        // Name: required, max 100 chars
        var nameVal = $('#name').val().trim();
        if (!nameVal) {
            setFieldError('name', 'Please enter your name.');
            ok = false;
        } else {
            clearFieldError('name');
        }

        // Email: required, valid format, max 254 chars (RFC 5321)
        var mailVal = $('#mail').val().trim();
        if (!mailVal) {
            setFieldError('mail', 'Please enter your email address.');
            ok = false;
        } else if (!isValidEmail(mailVal)) {
            setFieldError('mail', 'Please enter a valid email address.');
            ok = false;
        } else {
            clearFieldError('mail');
        }

        // Message: required, min 10 chars, max 1000 chars
        var msgVal = $('#message').val().trim();
        if (!msgVal) {
            setFieldError('message', 'Please enter a message.');
            ok = false;
        } else if (msgVal.length < 10) {
            setFieldError('message', 'Message must be at least 10 characters.');
            ok = false;
        } else {
            clearFieldError('message');
        }

        return ok;
    }

    // ── LIVE FEEDBACK ─────────────────────────────────────────────────────────

    // Clear field error as soon as the user starts correcting it
    $('#name, #mail, #message').on('input', function () {
        if ($(this).attr('data-error') === 'true') {
            clearFieldError(this.id);
        }
    });

    // Message character counter
    $('#message').on('input', function () {
        var len = $(this).val().length;
        $('#msg-counter').text(len + ' / 1000');
    });

    // ── SUBMIT ────────────────────────────────────────────────────────────────

    submitContact.on('submit', function (e) {
        e.preventDefault();

        // Dismiss any previous alert
        alertWrap.attr('data-active', 'false').removeClass('success');

        // Stop if required fields are invalid
        if (!validate()) return;

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
                alertWrap.find('p').text('Thank you! We\'ll be in touch shortly.');
                alertWrap.attr('data-active', 'true').addClass('success');
            })
            .catch(function () {
                // Network error — re-enable button and show error
                alertWrap.find('p').text('Something went wrong. Please try again or email us directly.');
                alertWrap.attr('data-active', 'true');
                btn.val('Send Message').prop('disabled', false);
            });
    });

})(jQuery);
