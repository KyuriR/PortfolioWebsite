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
