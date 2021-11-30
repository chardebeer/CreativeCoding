const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');


const settings = {
  dimensions: [ 1080, 1080 ]
};

/**
 * These functions have been replaced with the canvas-sketch-util lib
 * 
const degToRad = (degrees) => {
  return degrees / 180 * Math.PI;
}
const randomRange = (min, max) => {
return Math.random() * (max - min) + min;
}
 */


const sketch = () => {
  return ({ context, width, height }) => {

    const gradient = context.createLinearGradient(0.5, 0.5, 200, 300)
gradient.addColorStop(0, '#c779d0');
gradient.addColorStop(1, '#4bc0c8');


    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

 

    context.fillStyle = gradient;
const cx = width * 0.5;
const cy = height * 0.5;
const w = width * 0.01;
const h = height * 0.1;
let x, y;



const num = 1000;
const radius = width * 0.3;

for (let i = 0; i < num; i++  ){
const slice = math.degToRad(360 / num);
const angle = slice * i;

x = cx + radius * Math.sin(angle);
y = cy + radius * Math.cos(angle);

  context.save();
  context.translate(x, y);
  context.rotate(-angle);
  context.scale(random.range(0.4, 1), random.range(0.3, 1))

  context.beginPath();
  context.rect(-w * 0.5, random.range(0, -h * 0.3),w, h);
  context.fill();
  context.restore();



  context.strokeStyle = gradient;
  context.save();
  context.translate(cx, cy);
  context.rotate(-angle);

  context.lineWidth = random.range(5, 10);

  context.beginPath();
  context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(1, -8), slice * random.range(1, 5));
  context.stroke();
  context.restore();

}




  };
};

canvasSketch(sketch, settings);
