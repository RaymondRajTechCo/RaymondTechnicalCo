const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

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
  btn.textContent = 'Sending…';

  // Replace the action URL below with your form backend (e.g. Formspree, Netlify Forms, etc.)
  // For now, we simulate a successful submission after a short delay.
  await new Promise(r => setTimeout(r, 900));

  status.className = 'form-status success';
  status.textContent = 'Message sent! We\'ll be in touch soon.';
  form.reset();
  btn.disabled = false;
  btn.textContent = 'Send Message';
});
