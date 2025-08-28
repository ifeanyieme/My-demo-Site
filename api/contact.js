// Contact form -> POST /api/contact
qs('#contactForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = qs('#email').value.trim();
  const name = qs('#name').value.trim();
  const phone = qs('#phone').value.trim();
  const message = qs('#message').value.trim();

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return alert('Please enter a valid email address.');
  if (name.length < 2) return alert('Please enter your name.');
  if (message.length < 2) return alert('Please write a short message.');

  const btn = e.submitter; btn?.setAttribute('disabled','');
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, message })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');
    qs('#formNote').textContent = data.message || 'Thanks! We\'ll get back to you soon.';
    e.target.reset();
  } catch (err) {
    alert('Sorry, something went wrong. Please try again.\n\n' + err.message);
  } finally {
    btn?.removeAttribute('disabled');
  }
});
