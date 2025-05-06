window.addEventListener('message', function (event) {
  if (event.data.action === 'show') {
    const locationEl = document.getElementById('location');
    const datetimeEl = document.getElementById('datetime');
    const overlay = document.querySelector('.overlay');

    const now = new Date();
    const month = now.toLocaleString('default', { month: 'long' });
    const day = String(now.getDate()).padStart(2, '0');
    const year = now.getFullYear();

    const hour = String(event.data.hour).padStart(2, '0');
    const minute = String(event.data.minute).padStart(2, '0');

    const datetime = `${month} ${day}, ${year} — ${hour}:${minute} Hours`;

    overlay.classList.remove('fade-out');
    overlay.style.display = 'block';

    typeText(locationEl, event.data.location, 75);
    setTimeout(() => {
      typeText(datetimeEl, datetime, 40);
    }, event.data.location.length * 75 + 500);

    setTimeout(() => {
      overlay.classList.add('fade-out');
    }, 6000);

    setTimeout(() => {
      overlay.style.display = 'none';
    }, 11000);
  }
});

function typeText(element, text, speed = 50) {
  element.textContent = '';
  let i = 0;
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}
