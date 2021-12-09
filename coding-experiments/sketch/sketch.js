const canvasSketch = require('canvas-sketch'); //imports Matt's library using npm
const { lerp } = require('canvas-sketch-util/math'); //{lerp} destructures function from library - used to interpolate between min-max values
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

// random.setSeed(random.getRandomSeed()); //saves seed# temporarily
// console.log(random.getSeed); //Logs randomised seed

const settings = {
  suffix: random.getSeed(), //set seed as suffix to filename when saved.
  dimensions: [ 2048, 2048 ], //A4, A3, Letter or other paper sizes or [2000, 2000] for width & height
  // units: 'cm', //cm, in, ft else defaults to px
  // orientation: 'landscape',
  // pixelsPerInch: 300 //defaults to screen ppi of 72 unless changed
};

const sketch = () => {
  const colorCount = random.rangeFloor(1, 6);
  const palette = random.shuffle(random.pick(palettes))
    .slice(0, colorCount);
  // console.log(palette); //see used colors in console

  const createGrid = () => { //creates a grid using u, v co-ordinate system from 0 all the way to 1.
    const points = [];
    const count = 40;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.2;
        points.push({
          //specified an object with radius & position randomness
          color: random.pick(palette),
          radius,
          rotation: random.noise2D(u, v),
          position: [u, v]
        });
      }
    }
    return points;
  };

  // random.setSeed(512); //deterministic randomness  

  const points = createGrid().filter(() => random.value() > 0.5); //random.value from canvas-sketch-util module
  const margin = 400;

  return ({ context, width, height }) => {
    context.fillStyle = 'whitesmoke';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position,
        radius,
        color,
        rotation
      } = data;

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      // context.beginPath();
      // context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      // context.strokeStyle = 'white';
      // context.lineWidth = 10;
      // context.stroke();

      // context.fillStyle = color;
      // context.fill();

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Helvetica"`;
      context.translate(x, y);
      context.rotate(rotation); //rotation in radian value not degrees!
      context.fillText('-', 0, 0);

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
