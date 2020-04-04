import { Canvas } from 'terminal-canvas';
import { Shape } from './Shape';

export interface ShapeRenderable extends Shape {
  render: <T extends Canvas>(cursor: T) => void
}