export function sketch(p, canvasWidth, canvasHeight, params, generator) {
  let seed = params.seed;
  let palette = params.palette;
  let gridSize = params.gridSize;
  let frameEnd = 100;
  let onFrameUpdate;
  let onFinish;
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(60);
    p.pixelDensity(2);
  };

  p.draw = () => {
    let cellWidth = canvasWidth / gridSize;
    let cellHeight = canvasHeight / gridSize;

    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        let noiseVal = p.noise(x * 0.1, y * 0.1, p.frameCount * 0.02);
        let colorIndex = Math.floor(p.map(noiseVal, 0, 1, 1, palette.length - 1));
        p.fill(palette[colorIndex]);
        p.rect(x * cellWidth, y * cellHeight, cellWidth, cellHeight);
      }
    }

    if (onFrameUpdate) onFrameUpdate(p.frameCount, frameEnd);
    if (p.frameCount >= frameEnd) {
      p.noLoop();
      if (onFinish) onFinish();
    }
  };

  p.reDraw = (newParams) => {
    p.clear();
    p.frameCount = 0;
    seed = newParams.seed;
    palette = newParams.palette;
    gridSize = newParams.gridSize;
    p.noiseSeed(seed);
    p.background(palette[0]);
    p.loop();
  };

  p.saveLowRes = () => {
    return new Promise((resolve, reject) => {
      let filename = `Artwork_${seed}`; 
      try {
        p.saveCanvas(canvas, filename, 'png');
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  };

  p.saveHighRes = (scale) => {
    return Promise.resolve();
  };

  return {
    setCallbacks: (frameUpdateCallback, finishCallback) => {
      onFrameUpdate = frameUpdateCallback;
      onFinish = finishCallback;
    },
    reDraw: p.reDraw,
    saveLowRes: p.saveLowRes,
    saveHighRes: p.saveHighRes
  };
}