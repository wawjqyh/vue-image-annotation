import { fabric } from 'fabric';
import config from './config';

class Circle {
  isDrawing = false;
  strokeWidth = config.strokeWidth;
  strokeColor = config.strokeColor;
  fillColor = config.fillColor;

  constructor(canvas, history) {
    this.canvas = canvas;
    this.history = history;
  }

  init = () => {
    return this.initEvent();
  };

  initEvent = () => {
    this.canvas.on('mouse:down', this.onMouseDown);
    this.canvas.on('mouse:move', this.onMouseMove);
    this.canvas.on('mouse:up', this.onMouseUp);

    return () => {
      this.canvas.off('mouse:down', this.onMouseDown);
      this.canvas.off('mouse:move', this.onMouseMove);
      this.canvas.off('mouse:up', this.onMouseUp);
    };
  };

  onMouseDown = e => {
    if (e.target) return;

    this.isDrawing = true;

    let pointer = this.canvas.getPointer(e.e);
    this.startX = pointer.x;
    this.startY = pointer.y;

    let curCircle = new fabric.Ellipse({
      ...config.circle,
      ...config.controls,

      left: this.startX,
      top: this.startY,
      originX: 'left',
      originY: 'top',
      rx: pointer.x - this.startX,
      ry: pointer.y - this.startY,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      fill: this.fillColor
    });
    curCircle.setControlVisible('mtr', false);

    this.canvas.add(curCircle);
    this.curCircle = curCircle;
  };

  onMouseMove = e => {
    if (!this.isDrawing) return;

    let pointer = this.canvas.getPointer(e.e);

    if (this.startX > pointer.x) {
      this.curCircle.set({ left: Math.abs(pointer.x) });
    }
    if (this.startY > pointer.y) {
      this.curCircle.set({ top: Math.abs(pointer.y) });
    }
    this.curCircle.set({ rx: Math.abs(this.startX - pointer.x) / 2 });
    this.curCircle.set({ ry: Math.abs(this.startY - pointer.y) / 2 });
    this.curCircle.setCoords();

    this.canvas.renderAll();
  };

  onMouseUp = () => {
    if (this.isDrawing) {
      this.history.record();
    }

    this.isDrawing = false;
  };
}

export default Circle;
