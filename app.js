document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem('token', data.token);
      alert('Login berhasil!');
    } else {
      alert(data.error || 'Login gagal.');
    }
  } catch (err) {
    console.error('Error:', err);
  }
});
document.getElementById('schedule-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const day = document.getElementById('day').value;
  const subject = document.getElementById('subject').value;
  const time = document.getElementById('time').value;

  try {
    const res = await fetch('/schedule', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({ day, subject, time }),
    });

    if (res.ok) {
      alert('Jadwal berhasil ditambahkan!');
      loadSchedule();
    } else {
      const data = await res.json();
      alert(data.error || 'Gagal menambahkan jadwal.');
    }
  } catch (err) {
    console.error('Error:', err);
  }
});

async function loadSchedule() {
  const res = await fetch('/schedule', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
  const schedules = await res.json();
  const list = document.getElementById('schedule-list').querySelector('ul');
  list.innerHTML = schedules
    .map((s) => `<li>${s.day} - ${s.subject} (${s.time})</li>`)
    .join('');
}

loadSchedule();