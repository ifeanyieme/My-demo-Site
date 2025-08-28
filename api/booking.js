// Booking form -> POST /api/booking
qs('#bookingForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const ticketType = qs('#ticketType').value;
  const date = qs('#date').value;
  const time = qs('#time').value;
  const guests = Math.max(1, parseInt(qs('#guests').value || '1', 10));
  const name = qs('#bname').value.trim();
  const email = qs('#bemail').value.trim();

  if (!date || !time || name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return alert('Please fill out all required fields correctly.');
  }

  const btn = e.submitter; btn?.setAttribute('disabled','');
  try {
    const res = await fetch('/api/booking', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ ticketType, date, time, guests, name, email })
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Request failed');

    alert('Reservation received! We\'ll email you shortly.\n\nEstimated Total: ₦' + (data.total || 0).toLocaleString('en-NG'));
    qs('#bookingModal')?.classList.remove('open');
    e.target.reset();
  } catch (err) {
    alert('Sorry, booking failed. Please try again.\n\n' + err.message);
  } finally {
    btn?.removeAttribute('disabled');
  }
});
