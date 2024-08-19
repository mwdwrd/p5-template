export function sketch(p, canvasWidth, canvasHeight, params, generator) {
  let seed = params.seed;
  let onFrameUpdate;
  let onFinish;
  let canvas;

  p.setup = () => {
    canvas = p.createCanvas(canvasWidth, canvasHeight);
    p.frameRate(60);
    p.pixelDensity(2);
    p.background(255);
    // Initialize your artwork here
    // You can use generator methods like:
    // let randomValue = generator.random();
    // let rangeValue = generator.randomInRange(0, 100);
  };

  p.draw = () => {
    // Your drawing logic here
    // p.ellipse(p.width / 2, p.height / 2, generator.randomInRange(10, 50), generator.randomInRange(10, 50));

    if (onFrameUpdate) onFrameUpdate(p.frameCount, 100); // Update with your total frames
    
    // Check if artwork is complete
    if (p.frameCount >= 100) {
      p.noLoop();
      if (onFinish) onFinish();
    }
  };

  p.reDraw = (newParams) => {
    p.clear();
    p.background(255);
    p.frameCount = 0;
    seed = newParams.seed;
    // Reset your artwork with new parameters
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
    // Implement high-res saving logic here
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