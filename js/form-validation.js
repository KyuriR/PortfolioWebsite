var form         = document.getElementById('contact-form');
var nameInput    = document.getElementById('f-name');
var emailInput   = document.getElementById('f-email');
var subjectInput = document.getElementById('f-subject');
var messageInput = document.getElementById('f-message');
var charCount    = document.getElementById('msg-chars');
var submitBtn    = document.getElementById('submit-btn');
var statusMsg    = document.getElementById('submit-status');

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

// checks the name field 
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

// checks the email has @
function validateEmail() {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailInput.value.trim())) {
        setFieldState('fg-email', 'error');
        return false;
    }

    setFieldState('fg-email', 'success');
    return true;
}

// checks option is selected
function validateSubject() {
    if (!subjectInput.value) {
        setFieldState('fg-subject', 'error');
        return false;
    }

    setFieldState('fg-subject', 'success');
    return true;
}

// checks message > 20 characters 
function validateMessage() {
    if (messageInput.value.trim().length < 20) {
        setFieldState('fg-message', 'error');
        return false;
    }

    setFieldState('fg-message', 'success');
    return true;
}

// Update the character counter 
messageInput.addEventListener('input', function () {
    var length = messageInput.value.length;

    if (charCount) {
        charCount.textContent = length + ' / 1000';

        charCount.className = 'char-count';
        if (length > 900) charCount.className = 'char-count warn';
        if (length >= 1000) charCount.className = 'char-count over';
    }

    if (length > 0) {
        validateMessage();
    } else {
        setFieldState('fg-message', '');
    }
});

// Validate 
nameInput.addEventListener('blur', validateName);
emailInput.addEventListener('blur', validateEmail);
subjectInput.addEventListener('change', validateSubject);
messageInput.addEventListener('blur', validateMessage);

// Clear the error state when typing
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

form.addEventListener('submit', function (e) {
    e.preventDefault();

    var nameValid    = validateName();
    var emailValid   = validateEmail();
    var subjectValid = validateSubject();
    var messageValid = validateMessage();

    if (!nameValid || !emailValid || !subjectValid || !messageValid) {
        if (statusMsg) {
            statusMsg.textContent = 'Please fix the errors above before sending.';
            statusMsg.className = 'form-submit-status show';
        }
        return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';
    if (statusMsg) statusMsg.className = 'form-submit-status';

    setTimeout(function () {
        submitBtn.textContent = 'Message Sent!';
        submitBtn.style.background = '#4caf50';

        if (statusMsg) {
            statusMsg.textContent = "Thank you! I'll get back to you soon.";
            statusMsg.className = 'form-submit-status show sent';
        }

        form.reset();
        if (charCount) charCount.textContent = '0 / 1000';

        var groups = ['fg-name', 'fg-email', 'fg-subject', 'fg-message'];
        for (var i = 0; i < groups.length; i++) {
            var group = document.getElementById(groups[i]);
            if (group) {
                group.classList.remove('success', 'error');
            }
        }
    }, 1400);
});