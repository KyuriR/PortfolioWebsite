/* ============================================================
   form-validation.js — Contact form real-time validation
   Validates name, email, subject, and message
   Shows inline error messages and success states
   Simulates form submission with status feedback
   ============================================================ */

(function () {
  function initFormValidation() {
    const form      = document.getElementById('contact-form');
    if (!form) return;

    const nameEl    = document.getElementById('f-name');
    const emailEl   = document.getElementById('f-email');
    const subjectEl = document.getElementById('f-subject');
    const msgEl     = document.getElementById('f-message');
    const charsEl   = document.getElementById('msg-chars');
    const submitBtn = document.getElementById('submit-btn');
    const statusEl  = document.getElementById('submit-status');

    /* ── Helpers ── */
    function setFieldState(groupId, state) {
      const fg = document.getElementById(groupId);
      if (!fg) return;
      fg.classList.remove('error', 'success');
      if (state) fg.classList.add(state);
    }

    /* ── Validators ── */
    function validateName() {
      const val = nameEl.value.trim();
      const errEl = document.getElementById('err-name');
      if (val.length === 0) {
        if (errEl) errEl.textContent = 'Please enter your name.';
        setFieldState('fg-name', 'error');
        return false;
      }
      if (val.length < 2) {
        if (errEl) errEl.textContent = 'Name must be at least 2 characters.';
        setFieldState('fg-name', 'error');
        return false;
      }
      setFieldState('fg-name', 'success');
      return true;
    }

    function validateEmail() {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!re.test(emailEl.value.trim())) {
        setFieldState('fg-email', 'error');
        return false;
      }
      setFieldState('fg-email', 'success');
      return true;
    }

    function validateSubject() {
      if (!subjectEl.value) {
        setFieldState('fg-subject', 'error');
        return false;
      }
      setFieldState('fg-subject', 'success');
      return true;
    }

    function validateMessage() {
      if (msgEl.value.trim().length < 20) {
        setFieldState('fg-message', 'error');
        return false;
      }
      setFieldState('fg-message', 'success');
      return true;
    }

    /* ── Live character count ── */
    msgEl?.addEventListener('input', () => {
      const len = msgEl.value.length;
      if (charsEl) {
        charsEl.textContent = `${len} / 1000`;
        charsEl.className   = 'char-count'
          + (len > 900 ? ' warn' : '')
          + (len >= 1000 ? ' over' : '');
      }
      /* Live validate once user has typed something */
      if (len > 0) validateMessage();
      else setFieldState('fg-message', '');
    });

    /* ── Blur validation ── */
    nameEl?.addEventListener('blur',    validateName);
    emailEl?.addEventListener('blur',   validateEmail);
    subjectEl?.addEventListener('change', validateSubject);
    msgEl?.addEventListener('blur',     validateMessage);

    /* ── Clear error state on input ── */
    [nameEl, emailEl, msgEl].forEach(el => {
      el?.addEventListener('input', () => {
        const fg = el.closest('.form-group');
        if (fg?.classList.contains('error')) fg.classList.remove('error');
      });
    });

    /* ── Submit ── */
    form.addEventListener('submit', e => {
      e.preventDefault();

      const valid = [
        validateName(),
        validateEmail(),
        validateSubject(),
        validateMessage(),
      ].every(Boolean);

      if (!valid) {
        if (statusEl) {
          statusEl.textContent = '⚠ Please fix the errors above before sending.';
          statusEl.className   = 'form-submit-status show';
        }
        return;
      }

      /* Simulate async send */
      submitBtn.disabled    = true;
      submitBtn.textContent = 'Sending…';
      if (statusEl) statusEl.className = 'form-submit-status';

      setTimeout(() => {
        submitBtn.textContent      = 'Message Sent ✓';
        submitBtn.style.background = '#4caf50';

        if (statusEl) {
          statusEl.textContent = "Thank you! I'll get back to you within 2 business days.";
          statusEl.className   = 'form-submit-status show sent';
        }

        form.reset();
        if (charsEl) charsEl.textContent = '0 / 1000';
        ['fg-name', 'fg-email', 'fg-subject', 'fg-message'].forEach(id => {
          const fg = document.getElementById(id);
          fg?.classList.remove('success', 'error');
        });
      }, 1400);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFormValidation);
  } else {
    initFormValidation();
  }
})();
// form-validation.js
// Validates the contact form in real time
// Checks name, email, subject dropdown, and message length
// Shows error messages when fields are invalid
// Shows success state when fields are correctly filled in
// Simulates a form submission with a success message

// Get all the form elements
var form = document.getElementById('contact-form');

// Only run this code if the contact form exists on the page
if (form) {
    var nameInput    = document.getElementById('f-name');
    var emailInput   = document.getElementById('f-email');
    var subjectInput = document.getElementById('f-subject');
    var messageInput = document.getElementById('f-message');
    var charCount    = document.getElementById('msg-chars');
    var submitBtn    = document.getElementById('submit-btn');
    var statusMsg    = document.getElementById('submit-status');

    // setFieldState: adds or removes the 'error' or 'success' class on a form group
    function setFieldState(groupId, state) {
        var group = document.getElementById(groupId);
        if (!group) return;

        group.classList.remove('error', 'success');

        if (state === 'error') {
            group.classList.add('error');
        } else if (state === 'success') {
            group.classList.add('success');
        }
    }

    // validateName: checks the name field is filled in and at least 2 characters
    function validateName() {
        var value = nameInput.value.trim();
        var errorEl = document.getElementById('err-name');

        if (value.length === 0) {
            if (errorEl) errorEl.textContent = 'Please enter your name.';
            setFieldState('fg-name', 'error');
            return false;
        }

        if (value.length < 2) {
            if (errorEl) errorEl.textContent = 'Name must be at least 2 characters.';
            setFieldState('fg-name', 'error');
            return false;
        }

        setFieldState('fg-name', 'success');
        return true;
    }

    // validateEmail: checks the email contains an @ symbol and a domain
    function validateEmail() {
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailInput.value.trim())) {
            setFieldState('fg-email', 'error');
            return false;
        }

        setFieldState('fg-email', 'success');
        return true;
    }

    // validateSubject: checks that an option has been selected from the dropdown
    function validateSubject() {
        if (!subjectInput.value) {
            setFieldState('fg-subject', 'error');
            return false;
        }

        setFieldState('fg-subject', 'success');
        return true;
    }

    // validateMessage: checks that the message is at least 20 characters long
    function validateMessage() {
        if (messageInput.value.trim().length < 20) {
            setFieldState('fg-message', 'error');
            return false;
        }

        setFieldState('fg-message', 'success');
        return true;
    }

    // Update the character counter as the user types in the message box
    messageInput.addEventListener('input', function () {
        var length = messageInput.value.length;

        if (charCount) {
            charCount.textContent = length + ' / 1000';

            // Change the counter colour when getting close to the limit
            charCount.className = 'char-count';
            if (length > 900) charCount.className = 'char-count warn';
            if (length >= 1000) charCount.className = 'char-count over';
        }

        // Validate the message field live as the user types
        if (length > 0) {
            validateMessage();
        } else {
            setFieldState('fg-message', '');
        }
    });

    // Validate each field when the user leaves it (on blur)
    nameInput.addEventListener('blur', validateName);
    emailInput.addEventListener('blur', validateEmail);
    subjectInput.addEventListener('change', validateSubject);
    messageInput.addEventListener('blur', validateMessage);

    // Clear the error state as soon as the user starts typing again
    nameInput.addEventListener('input', function () {
        var group = nameInput.closest('.form-group');
        if (group && group.classList.contains('error')) {
            group.classList.remove('error');
        }
    });

    emailInput.addEventListener('input', function () {
        var group = emailInput.closest('.form-group');
        if (group && group.classList.contains('error')) {
            group.classList.remove('error');
        }
    });

    messageInput.addEventListener('input', function () {
        var group = messageInput.closest('.form-group');
        if (group && group.classList.contains('error')) {
            group.classList.remove('error');
        }
    });

    // Handle the form submission
    form.addEventListener('submit', function (e) {
        // Prevent the default browser form submission
        e.preventDefault();

        // Run all validators and check if they all pass
        var nameValid    = validateName();
        var emailValid   = validateEmail();
        var subjectValid = validateSubject();
        var messageValid = validateMessage();

        // If any field is invalid, show an error message and stop
        if (!nameValid || !emailValid || !subjectValid || !messageValid) {
            if (statusMsg) {
                statusMsg.textContent = 'Please fix the errors above before sending.';
                statusMsg.className = 'form-submit-status show';
            }
            return;
        }

        // All fields are valid — simulate sending the message
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';
        if (statusMsg) statusMsg.className = 'form-submit-status';

        // After 1.4 seconds, show a success message
        setTimeout(function () {
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.background = '#4caf50';

            if (statusMsg) {
                statusMsg.textContent = "Thank you! I'll get back to you within 2 business days.";
                statusMsg.className = 'form-submit-status show sent';
            }

            // Reset the form fields
            form.reset();
            if (charCount) charCount.textContent = '0 / 1000';

            // Remove validation state classes from all groups
            var groups = ['fg-name', 'fg-email', 'fg-subject', 'fg-message'];
            for (var i = 0; i < groups.length; i++) {
                var group = document.getElementById(groups[i]);
                if (group) {
                    group.classList.remove('success', 'error');
                }
            }
        }, 1400);
    });
}