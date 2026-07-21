const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

// Where inquiries go. Update this if the contact address changes.
const CONTACT_EMAIL = 'raymond@raymondtechnical.com';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name    = form.name.value.trim();
  const email   = form.email.value.trim();
  const message = form.message.value.trim();

  status.className = 'form-status';
  status.textContent = '';

  if (!name || !email || !message) {
    status.className = 'form-status error';
    status.textContent = 'Please fill in all fields.';
    return;
  }

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRe.test(email)) {
    status.className = 'form-status error';
    status.textContent = 'Please enter a valid email address.';
    return;
  }

  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Opening email…';

  // GitHub Pages is static and can't send email server-side. Until a form
  // backend (e.g. Formspree) is wired in, we hand off to the user's own
  // email client with everything pre-filled, addressed to Raymond.
  const subject = encodeURIComponent(`Website inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  );
  const mailtoLink = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  window.location.href = mailtoLink;

  status.className = 'form-status success';
  status.textContent = 'Your email app should now be open with this pre-filled — hit send from there.';
  btn.disabled = false;
  btn.textContent = 'Send Message';
});
