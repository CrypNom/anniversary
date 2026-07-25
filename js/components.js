/* ==========================================================================
   components.js — small self-contained widgets used on specific pages:
     - Gallery lightbox (Gallery page)
     - Audio playlist player (Songs/Playlist page)
     - Video play-badge hide-on-play (Videos page)
   Each function checks for its markup before running, so this one file can
   be safely included on every page.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initLightbox();
  initPlaylist();
  initVideoBadges();
  initWishForm();
});

/* --------------------------------- Gallery ---------------------------------*/
function initLightbox() {
  const items = document.querySelectorAll('.g-item');
  const lightbox = document.getElementById('lightbox');
  if (!items.length || !lightbox) return;

  const imgEl = lightbox.querySelector('.lightbox-img');
  const captionEl = lightbox.querySelector('.lightbox-caption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');

  const list = Array.from(items);
  let index = 0;

  function open(i) {
    index = i;
    const el = list[index];
    imgEl.src = el.querySelector('img').src;
    captionEl.textContent = el.getAttribute('data-caption') || '';
    lightbox.classList.add('open');
  }
  function close() { lightbox.classList.remove('open'); }
  function step(dir) { index = (index + dir + list.length) % list.length; open(index); }

  list.forEach((el, i) => el.addEventListener('click', () => open(i)));
  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', () => step(-1));
  nextBtn.addEventListener('click', () => step(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
}

/* -------------------------------- Playlist ---------------------------------*/
function initPlaylist() {
  const players = document.querySelectorAll('.player');
  if (!players.length) return;

  let currentAudio = null;
  let currentBtn = null;

  players.forEach(p => {
    const audio = p.querySelector('audio');
    const btn = p.querySelector('.play-btn');
    const fill = p.querySelector('.progress-fill');
    if (!audio || !btn) return;

    btn.addEventListener('click', () => {
      // pause whichever track was previously playing
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentBtn.textContent = '▶';
      }
      if (audio.paused) {
        audio.play().catch(() => {
          // Placeholder audio files won't actually play until you add real mp3s —
          // fail silently so the demo doesn't throw console errors.
        });
        btn.textContent = '⏸';
      } else {
        audio.pause();
        btn.textContent = '▶';
      }
      currentAudio = audio;
      currentBtn = btn;
    });

    audio.addEventListener('timeupdate', () => {
      if (!audio.duration) return;
      fill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
    });
    audio.addEventListener('ended', () => { btn.textContent = '▶'; fill.style.width = '0%'; });
  });
}

/* ---------------------------------- Videos ----------------------------------*/
function initVideoBadges() {
  document.querySelectorAll('.video-frame').forEach(frame => {
    const video = frame.querySelector('video');
    const badge = frame.querySelector('.play-badge');
    if (!video || !badge) return;
    video.addEventListener('play', () => badge.style.opacity = '0');
    video.addEventListener('pause', () => badge.style.opacity = '1');
    badge.addEventListener('click', () => video.paused ? video.play() : video.pause());
  });
}

/* --------------------------------- Wishes form -------------------------------*/
function initWishForm() {
  const form = document.getElementById('wish-form');
  if (!form) return;
  const wall = document.getElementById('wishes-wall');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('[name="name"]').value.trim() || 'A friend';
    const message = form.querySelector('[name="message"]').value.trim();
    if (!message) return;

    const card = document.createElement('div');
    card.className = 'glass-card glass-card--pad wish-card reveal is-visible';
    card.innerHTML = `<p>"${escapeHtml(message)}"</p><span class="wish-from">— ${escapeHtml(name)}</span>`;
    wall.prepend(card);
    form.reset();

    // NOTE: this demo only stores new wishes in the current browser session.
    // To persist wishes for real guests, connect this form to a backend
    // (e.g. a simple form service, Google Sheet via Apps Script, or your
    // own API) and POST { name, message } there instead.
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
