import { sketch } from './sketch.js';
import { Generator } from './generator.js';

let painter, currentParams, generator;
let isRegenerating = false, isInitialLoad = true;
let canvasWidth = 600, canvasHeight = 600;

function getUrlParams() {
  return new URLSearchParams(window.location.search);
}

function updateUI() {
  updateSeedDisplay(currentParams.seed);
  updateUrlWithSeed(currentParams.seed);
}

function updateSeedDisplay(seed) {
  const seedElement = document.getElementById('seed');
  if (seedElement) {
    seedElement.textContent = `Seed: ${seed}`;
  }
}

window.onload = () => {
  const urlParams = getUrlParams();
  const seedFromUrl = urlParams.get('seed');

  painter = new p5(p => {
    generator = new Generator(p);
    currentParams = generator.generateArtworkParams(seedFromUrl ? parseInt(seedFromUrl, 10) : null, canvasWidth, canvasHeight);
    const sketchInstance = sketch(p, canvasWidth, canvasHeight, currentParams, generator);
    sketchInstance.setCallbacks(updateFrameCounter, notifyFinish);
    return sketchInstance;
  }, "canvas-wrapper");

  updateUI();
  setupEventListeners();
  isInitialLoad = false;
};

async function regenerateArtwork() {
  if (isRegenerating) return;
  isRegenerating = true;
  currentParams = generator.generateArtworkParams(null, canvasWidth, canvasHeight);
  await painter.reDraw(currentParams);
  updateUI();
  isRegenerating = false;
}

function rePlayArtwork() {
  if (isRegenerating) return;
  isRegenerating = true;
  painter.rePlay();
  isRegenerating = false;
}

function updateUrlWithSeed(seed) {
  const newUrl = new URL(window.location);
  newUrl.searchParams.set('seed', seed);
  window.history.pushState({}, '', newUrl);
}

function setupEventListeners() {
  document.getElementById('regenerate')?.addEventListener('click', regenerateArtwork);
  document.getElementById('replay')?.addEventListener('click', rePlayArtwork);
  document.getElementById('save')?.addEventListener('click', () => handleSave('save'));
  document.addEventListener('keydown', handleKeyPress);
}

function handleSave(type) {
  const scale = type === 'save-4x' ? 4 : type === 'save-2x' ? 2 : 1;
  const method = scale === 1 ? 'saveLowRes' : 'saveHighRes';
  painter[method](scale).then(() => {
    console.log(`${scale}x image saved`);
  }).catch(error => {
    console.error('Error during save operation:', error);
  });
}

function handleKeyPress(event) {
  if (event.target.tagName === 'INPUT') return;
  const actions = {
    'r': regenerateArtwork,
    'p': rePlayArtwork,
    's': () => painter.saveLowRes(),
    '2': () => painter.saveHighRes(2),
    '4': () => painter.saveHighRes(4)
  };
  if (actions[event.key.toLowerCase()]) actions[event.key.toLowerCase()](event);
}

function updateFrameCounter(currentFrame, totalFrames) {
  const counterElement = document.getElementById('frame-counter');
  if (counterElement) {
    const percentage = Math.round((currentFrame / totalFrames) * 100);
    counterElement.textContent = `Progress: ${percentage}%`;
  }
}

function notifyFinish() {
  console.log('Artwork generation complete');
}