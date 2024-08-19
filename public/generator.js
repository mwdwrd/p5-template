export class Generator {
  constructor(p5) {
    this.p5Instance = p5;
    this.currentSeed = null;
  }

  initializeGenerator(seed) {
    this.currentSeed = seed;
    this.p5Instance.randomSeed(seed);
    this.p5Instance.noiseSeed(seed);
  }

  generateArtworkParams(seedOverride = null, canvasWidth, canvasHeight) {
    const seed = seedOverride ?? Math.floor(this.p5Instance.random() * 100000);
    this.initializeGenerator(seed);
    
    return {
      seed,
      palette: randomColor({ seed: seed, count: 4, hue: 'random', random: this.p5Instance.random }),
      gridSize: Math.floor(this.p5Instance.random(2, 24)),
      // Add your artwork parameters here
    };
  }

  random() {
    return this.p5Instance.random();
  }

  randomInRange(min, max) {
    return this.p5Instance.random(min, max);
  }

  getCurrentSeed() {
    return this.currentSeed;
  }
}