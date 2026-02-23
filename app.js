// ===== STATE =====
let manifests = {};
let currentPage = 'home';
let modalFlipped = false;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', async () => {
  // Load manifests for years that have photos
  for (const [year, data] of Object.entries(YEARS_DATA)) {
    if (data.hasPhotos) {
      try {
        const resp = await fetch(`photos/${year}/manifest.json`);
        if (resp.ok) {
          manifests[year] = await resp.json();
        }
      } catch (e) {
        console.warn(`Could not load manifest for ${year}`, e);
      }
    }
  }

  buildCorkboard();
  buildTimeline();
  setupScrollReveal();
  setupKeyboardNav();

  // Check URL hash for direct navigation
  const hash = window.location.hash.replace('#', '');
  if (hash.startsWith('year-')) {
    const year = hash.replace('year-', '');
    navigateTo('scrapbook', year);
  }
});

// ===== NAVIGATION =====
function navigateTo(page, yearParam) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  if (page === 'home') {
    document.getElementById('page-home').classList.add('active');
    window.scrollTo(0, 0);
    window.location.hash = '';
    currentPage = 'home';
  } else if (page === 'scrapbook' && yearParam) {
    document.getElementById('page-scrapbook').classList.add('active');
    buildScrapbookPage(yearParam);
    window.scrollTo(0, 0);
    window.location.hash = `year-${yearParam}`;
    currentPage = 'scrapbook';
  }
}

// ===== CORKBOARD =====
function buildCorkboard() {
  const board = document.getElementById('corkboard');
  const photos = manifests[CORKBOARD_YEAR];
  if (!photos) return;

  const photoItems = photos.filter(p => p.type === 'photo');

  CORKBOARD_INDICES.forEach((idx, i) => {
    if (idx >= photoItems.length) return;
    const photo = photoItems[idx];
    const pin = document.createElement('div');
    pin.className = 'cork-pin';
    pin.style.setProperty('--rotate', `${CORKBOARD_ROTATIONS[i]}deg`);
    pin.style.animationDelay = `${i * 0.5}s`;

    pin.innerHTML = `
      <div class="push-pin ${CORKBOARD_PINS[i]}"></div>
      <div class="polaroid" onclick="openModal('photos/${CORKBOARD_YEAR}/${photo.filename}', '${photo.orientation}', '${photo.date}')">
        <img src="photos/${CORKBOARD_YEAR}/${photo.filename}" alt="Family photo" loading="lazy">
      </div>
    `;
    board.appendChild(pin);
  });
}

// ===== TIMELINE =====
function buildTimeline() {
  const timeline = document.getElementById('timeline');

  for (const [year, data] of Object.entries(YEARS_DATA)) {
    const entry = document.createElement('div');
    entry.className = `timeline-entry reveal ${!data.hasPhotos ? 'timeline-placeholder' : ''}`;

    // Photos side
    let photosHTML = '';
    if (data.hasPhotos && manifests[year]) {
      const photos = manifests[year].filter(p => p.type === 'photo');
      const heroIndices = data.heroPhotos || [0, 1, 2, 3, 4];
      const heroPhotos = heroIndices.map(i => photos[Math.min(i, photos.length - 1)]);

      photosHTML = `
        <div class="timeline-photos" data-year="${year}">
          <div class="timeline-photo-main">
            ${heroPhotos.map((p, i) => `
              <div class="timeline-photo-slide ${i === 0 ? 'active' : ''}" data-index="${i}">
                <div class="polaroid" onclick="openModal('photos/${year}/${p.filename}', '${p.orientation}', '${p.date}')">
                  <img src="photos/${year}/${p.filename}" alt="Family photo ${year}" loading="lazy">
                </div>
              </div>
            `).join('')}
          </div>
          <div class="timeline-thumbs">
            ${heroPhotos.map((p, i) => `
              <div class="timeline-thumb ${i === 0 ? 'active' : ''}" data-index="${i}" data-year="${year}" onclick="setTimelineSlide('${year}', ${i})">
                <img src="photos/${year}/${p.filename}" alt="" loading="lazy">
              </div>
            `).join('')}
          </div>
        </div>
      `;
    } else {
      photosHTML = `
        <div class="timeline-photos">
          <div class="timeline-photo-main">
            <div class="placeholder-text">📷 photos coming soon</div>
          </div>
        </div>
      `;
    }

    // Content side
    const btnHTML = data.hasPhotos
      ? `<button class="timeline-btn" onclick="navigateTo('scrapbook', '${year}')">Open scrapbook →</button>`
      : `<span class="timeline-btn placeholder">awaiting photos</span>`;

    const contentHTML = `
      <div class="timeline-content">
        <div class="timeline-year">${year}</div>
        <h3 class="timeline-headline">${data.headline}</h3>
        <p class="timeline-summary">${data.summary}</p>
        <p class="timeline-note">${data.note}</p>
        ${btnHTML}
      </div>
    `;

    entry.innerHTML = photosHTML + contentHTML;
    timeline.appendChild(entry);
  }

  // Start auto-rotation for timeline photos
  startTimelineRotation();
}

// Timeline auto-rotation
let timelineIntervals = {};

function startTimelineRotation() {
  for (const [year, data] of Object.entries(YEARS_DATA)) {
    if (!data.hasPhotos) continue;
    const heroCount = (data.heroPhotos || [0,1,2,3,4]).length;
    let currentSlide = 0;

    timelineIntervals[year] = setInterval(() => {
      currentSlide = (currentSlide + 1) % heroCount;
      setTimelineSlide(year, currentSlide, true);
    }, 2000);
  }
}

function setTimelineSlide(year, index, auto = false) {
  const container = document.querySelector(`.timeline-photos[data-year="${year}"]`);
  if (!container) return;

  // Reset auto timer if manual click
  if (!auto && timelineIntervals[year]) {
    clearInterval(timelineIntervals[year]);
    const heroCount = YEARS_DATA[year].heroPhotos?.length || 5;
    let current = index;
    timelineIntervals[year] = setInterval(() => {
      current = (current + 1) % heroCount;
      setTimelineSlide(year, current, true);
    }, 2000);
  }

  container.querySelectorAll('.timeline-photo-slide').forEach(s => s.classList.remove('active'));
  container.querySelectorAll('.timeline-thumb').forEach(t => t.classList.remove('active'));

  const slide = container.querySelector(`.timeline-photo-slide[data-index="${index}"]`);
  const thumb = container.querySelector(`.timeline-thumb[data-index="${index}"]`);
  if (slide) slide.classList.add('active');
  if (thumb) thumb.classList.add('active');
}

// ===== SCRAPBOOK PAGE =====
function buildScrapbookPage(year) {
  const data = YEARS_DATA[year];
  const photos = manifests[year];
  if (!data || !photos) return;

  document.getElementById('scrapbook-year-bg').textContent = year;
  document.getElementById('scrapbook-headline').textContent = data.headline;
  document.getElementById('scrapbook-description').textContent = data.scrapbookDesc || data.summary;

  const container = document.getElementById('scrapbook-photos');
  container.innerHTML = '';

  // Group by month
  const months = {};
  photos.forEach(p => {
    const m = p.month || 'misc';
    if (!months[m]) months[m] = [];
    months[m].push(p);
  });

  const rotations = [-3, 1.5, -1, 2.5, -2, 0.5, -1.5, 3, -0.5, 2, -2.5, 1];
  const washiClasses = ['washi-blue', 'washi-pink', 'washi-sage', 'washi-yellow', 'washi-lavender'];
  let photoIndex = 0;

  for (const [month, items] of Object.entries(months)) {
    // Month divider
    const divider = document.createElement('div');
    divider.className = 'month-divider';
    divider.textContent = month;
    container.appendChild(divider);

    // Photo grid
    const grid = document.createElement('div');
    grid.className = 'month-grid';

    items.forEach((item, i) => {
      const rot = rotations[photoIndex % rotations.length];
      const showWashi = photoIndex % 3 === 0;
      const washiClass = washiClasses[photoIndex % washiClasses.length];

      const div = document.createElement('div');
      div.className = `scrapbook-item ${item.orientation}`;
      div.style.setProperty('--rotate', `${rot}deg`);

      if (item.type === 'video') {
        const driveUrl = getDrivePlayerUrl(item.driveId);
        div.innerHTML = `
          <div class="polaroid" onclick="window.open('${driveUrl}', '_blank')">
            ${showWashi ? `<div class="washi-tape ${washiClass}"></div>` : ''}
            <div style="background: var(--cream); padding: 3rem 1rem; text-align: center;">
              <span style="font-size: 2rem;">🎬</span>
            </div>
            <div class="polaroid-caption"><span class="video-indicator">▶ play video</span></div>
          </div>
        `;
      } else {
        const imgPath = `photos/${year}/${item.filename}`;
        div.innerHTML = `
          <div class="polaroid" onclick="openModal('${imgPath}', '${item.orientation}', '${item.date}')">
            ${showWashi ? `<div class="washi-tape ${washiClass}"></div>` : ''}
            <img src="${imgPath}" alt="Family photo" loading="lazy">
            <div class="polaroid-caption">${item.caption || ''}</div>
          </div>
        `;
      }

      grid.appendChild(div);
      photoIndex++;
    });

    container.appendChild(grid);
  }
}

// ===== PHOTO MODAL =====
function openModal(src, orientation, date) {
  const modal = document.getElementById('photo-modal');
  const content = document.getElementById('modal-content');
  const img = document.getElementById('modal-img');
  const card = document.getElementById('modal-card');
  const dateEl = document.getElementById('modal-date');

  img.src = src;
  content.className = `modal-content ${orientation}`;
  card.classList.remove('flipped');
  modalFlipped = false;

  // Format date
  if (date && date.length >= 8) {
    const y = date.substring(0, 4);
    const m = parseInt(date.substring(4, 6));
    const d = parseInt(date.substring(6, 8));
    const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    dateEl.textContent = `${monthNames[m]} ${d}, ${y}`;
  } else {
    dateEl.textContent = '';
  }

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Click card to flip
  content.onclick = (e) => {
    e.stopPropagation();
    modalFlipped = !modalFlipped;
    card.classList.toggle('flipped');
  };
}

function closeModal() {
  const modal = document.getElementById('photo-modal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

// ===== KEYBOARD NAV =====
function setupKeyboardNav() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const modal = document.getElementById('photo-modal');
      if (modal.classList.contains('open')) {
        closeModal();
      } else if (currentPage === 'scrapbook') {
        navigateTo('home');
      }
    }
  });
}

// ===== SCROLL REVEAL =====
function setupScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger the animation
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.dataset.delay = (i % 4) * 100;
    observer.observe(el);
  });
}
