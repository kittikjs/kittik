import { Canvas } from 'terminal-canvas';
import { Rectangle } from 'kittik-shape-rectangle';
import { Focus } from '..';

const onTick = (shape: Rectangle): void => {
  cursor.eraseScreen();
  shape.render();
  cursor.flush();
};

const cursor = new Canvas().reset().hideCursor();
const shape = new Rectangle(cursor, { x: 'center', y: 'middle', background: 'white', foreground: 'black', text: 'Bouncing' });
const bounceUp = new Focus({ direction: 'bounceUp' }).on('tick', onTick);
const bounceDown = new Focus({ direction: 'bounceDown' }).on('tick', onTick);
const bounceLeft = new Focus({ direction: 'bounceLeft' }).on('tick', onTick);
const bounceRight = new Focus({ direction: 'bounceRight' }).on('tick', onTick);

(async function animate () {
  shape.render();
  cursor.flush();

  await bounceUp.animate(shape);
  await bounceDown.animate(shape);
  await bounceLeft.animate(shape);
  await bounceRight.animate(shape);

  cursor.showCursor();
})().catch(console.error);
