const surpriseBtn = document.getElementById('surpriseBtn');
const hiddenMessage = document.getElementById('hiddenMessage');
const yearSpan = document.getElementById('year');
const galleryGrid = document.getElementById('galleryGrid');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

const galleryImages = [
  '20260119_172910.jpg',
  'IMG_1069.JPG',
  'IMG_1223.png',
  'IMG_2037_Original.jpg',
  'IMG_4787.jpg',
  'IMG_5196.jpg',
  'IMG_5210.jpg',
  'IMG_5551.jpg',
  'IMG_5750.jpg',
  'IMG_6291.jpg',
  'IMG_6513.jpg',
  'IMG_6517.jpg',
  'IMG_7057.jpg',
  'IMG_7159.jpg',
  'IMG_7340.jpg',
  'IMG_7742.jpg',
  'IMG_7925.jpg',
  'IMG_9332.jpg',
  'IMG_9343.jpg',
  'IMG_9357.jpg'
];

let currentImageIndex = 0;

if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}

if (galleryGrid) {
  galleryImages.forEach((imageName, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'gallery-item';
    button.setAttribute('aria-label', `Open birthday memory ${index + 1}`);

    const image = document.createElement('img');
    image.src = imageName;
    image.alt = `Birthday memory ${index + 1}`;

    button.addEventListener('click', () => {
      currentImageIndex = index;
      openLightbox(imageName);
    });

    button.appendChild(image);
    galleryGrid.appendChild(button);
  });
}

function openLightbox(imageName) {
  if (!lightbox || !lightboxImage) return;

  lightboxImage.src = imageName;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
}

function closeLightbox() {
  if (!lightbox) return;

  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
}

function showPreviousImage() {
  currentImageIndex = (currentImageIndex - 1 + galleryImages.length) % galleryImages.length;
  openLightbox(galleryImages[currentImageIndex]);
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % galleryImages.length;
  openLightbox(galleryImages[currentImageIndex]);
}

if (lightboxClose) {
  lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxPrev) {
  lightboxPrev.addEventListener('click', showPreviousImage);
}

if (lightboxNext) {
  lightboxNext.addEventListener('click', showNextImage);
}

if (lightbox) {
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });
}

window.addEventListener('keydown', (event) => {
  if (!lightbox || !lightbox.classList.contains('open')) return;

  if (event.key === 'Escape') {
    closeLightbox();
  } else if (event.key === 'ArrowLeft') {
    showPreviousImage();
  } else if (event.key === 'ArrowRight') {
    showNextImage();
  }
});

if (surpriseBtn && hiddenMessage) {
  surpriseBtn.addEventListener('click', () => {
    hiddenMessage.classList.toggle('visible');
    surpriseBtn.textContent = hiddenMessage.classList.contains('visible')
      ? 'Hide Birthday Surprise'
      : 'Open Birthday Surprise';
  });
}

function createConfettiBurst() {
  const confettiLayer = document.getElementById('confettiLayer');
  if (!confettiLayer) return;

  const colors = ['#ffd166', '#ff7eb6', '#7bdff2', '#c7f9cc', '#ff9f1c', '#ffffff'];

  for (let i = 0; i < 60; i += 1) {
    const piece = document.createElement('span');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty('--x', `${(Math.random() - 0.5) * 220}px`);
    piece.style.animationDuration = `${5 + Math.random() * 4}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    confettiLayer.appendChild(piece);

    setTimeout(() => piece.remove(), 9000);
  }
}

window.addEventListener('load', () => {
  createConfettiBurst();
  setTimeout(createConfettiBurst, 900);
});
