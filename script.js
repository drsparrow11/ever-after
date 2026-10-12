const boot = document.querySelector('#boot');
const enterButton = document.querySelector('#enter-button');
const skipButton = document.querySelector('#skip-button');

function closeBoot(target) {
  boot.classList.add('is-hidden');
  document.body.classList.add('archive-open');
  if (target) window.setTimeout(() => document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' }), 180);
}

enterButton?.addEventListener('click', () => closeBoot());
skipButton?.addEventListener('click', () => closeBoot('#tracks'));

const cards = [...document.querySelectorAll('.track')];
const playerImage = document.querySelector('#player-image');
const playerNumber = document.querySelector('#player-number');
const playerPhase = document.querySelector('#player-phase');
const playerTitle = document.querySelector('#player-title');
const playerDescription = document.querySelector('#player-description');
const playerNote = document.querySelector('#player-note');
const playerYoutube = document.querySelector('#player-youtube');
const playerActions = document.querySelector('.player-actions');
const lyricsButton = document.querySelector('#lyrics-button');
const lyricsClose = document.querySelector('#lyrics-close');
const lyricsPanel = document.querySelector('#lyrics-panel');
const lyricsTitle = document.querySelector('#lyrics-title');
const lyricsText = document.querySelector('#lyrics-text');
const audioFiles = [
  '01-the-signal-remains.mp3',
  '02-signal-residue.mp3',
  '03-pain-inside.mp3',
  '04-what-we-carried.mp3',
  '05-angel-return.mp3',
  '06-no-one-voice.mp3',
  '07-wish-answer.mp3',
  '08-archive-of-us.mp3',
  '09-the-shape-we-left.mp3',
  '10-the-link-remains.mp3',
  '11-everything-that-mattered.mp3',
  '12-the-light-passes-through.mp3',
  '13-ever-after.mp3',
  '14-the-song-continues.mp3'
];
const playerAudio = document.createElement('audio');
playerAudio.className = 'archive-audio';
playerAudio.controls = true;
playerAudio.preload = 'metadata';
playerAudio.setAttribute('aria-label', 'Selected track audio player');
playerActions?.before(playerAudio);
let activeIndex = 0;

function selectTrack(index) {
  activeIndex = (index + cards.length) % cards.length;
  const card = cards[activeIndex];
  cards.forEach((item) => item.classList.toggle('active', item === card));
  playerNumber.textContent = card.dataset.track;
  playerPhase.textContent = card.dataset.phase;
  playerTitle.textContent = card.dataset.title;
  playerDescription.textContent = card.dataset.description;
  playerNote.textContent = card.dataset.note;
  playerImage.src = card.dataset.image;
  playerImage.alt = `${card.dataset.title} artwork`;
  playerAudio.src = `./ever-after/audio/${audioFiles[activeIndex]}`;
  playerAudio.load();
  lyricsTitle.textContent = card.dataset.title;
  lyricsText.textContent = window.chapterLyrics?.[card.dataset.track] || 'Lyrics are being restored to the archive.';
  playerYoutube.href = 'https://www.youtube.com/playlist?list=PLYwajpD4yYHw';
}

cards.forEach((card, index) => card.addEventListener('click', () => selectTrack(index)));
document.querySelector('#previous-track')?.addEventListener('click', () => selectTrack(activeIndex - 1));
document.querySelector('#next-track')?.addEventListener('click', () => selectTrack(activeIndex + 1));
lyricsButton?.addEventListener('click', () => {
  lyricsPanel.hidden = !lyricsPanel.hidden;
  lyricsButton.setAttribute('aria-expanded', String(!lyricsPanel.hidden));
  if (!lyricsPanel.hidden) lyricsPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
lyricsClose?.addEventListener('click', () => {
  lyricsPanel.hidden = true;
  lyricsButton.setAttribute('aria-expanded', 'false');
});
selectTrack(0);

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    if (boot && !boot.classList.contains('is-hidden')) closeBoot(link.getAttribute('href'));
  });
});
