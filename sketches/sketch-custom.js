const canvasSketch = require('canvas-sketch');
import {Compass} from "./compass"

const settings = {
  dimensions: [ 400, 400 ]
};

const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

   let compass = new Compass(context, 25, 25, 8);
     const flower = [
          { x:  0.00, y:  0 },
          { x: -0.00, y: -2 },
          { x: -1.75, y: -1 },
          { x: -1.75, y: +1 },
          { x: +0.00, y: +2 },
          { x: +1.75, y: +1 },
          { x: +1.75, y: -1 }
        ];

    for (let i = 0; i < 7; ++i) (function (i) {
      let x = flower[i].x,
          y = flower[i].y,
          compass = new Compass(context, 6*x + 25, 6*y + 25, 8);

      setTimeout(function () {
        for (let i = 0; i < 7; ++i) (function (i) {
          let x = flower[i].x,
              y = flower[i].y;

          setTimeout(function () {
            compass.draw(3*x, 3*y, 6);
          }, 100*i);
        }) (i);
      }, 700*i + 700);
    }) (i);

    setTimeout(function () { compass.draw(0, 0, 6*3); }, 6*1000);
  };
};

canvasSketch(sketch, settings);
