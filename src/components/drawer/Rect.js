import { fabric } from 'fabric';
import config from './config';

class Rect {
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

    let curRect = new fabric.Rect({
      ...config.rect,
      ...config.controls,

      left: this.startX,
      top: this.startY,
      originX: 'left',
      originY: 'top',
      width: pointer.x - this.startX,
      height: pointer.y - this.startY,
      stroke: this.strokeColor,
      strokeWidth: this.strokeWidth,
      fill: this.fillColor
    });
    curRect.setControlVisible('mtr', false);

    this.canvas.add(curRect);
    this.curRect = curRect;
  };

  onMouseMove = e => {
    if (!this.isDrawing) return;

    let pointer = this.canvas.getPointer(e.e);

    if (this.startX > pointer.x) {
      this.curRect.set({ left: Math.abs(pointer.x) });
    }
    if (this.startY > pointer.y) {
      this.curRect.set({ top: Math.abs(pointer.y) });
    }
    this.curRect.set({ width: Math.abs(this.startX - pointer.x) });
    this.curRect.set({ height: Math.abs(this.startY - pointer.y) });
    this.curRect.setCoords();

    this.canvas.renderAll();
  };

  onMouseUp = () => {
    if (this.isDrawing) {
      this.history.record();
    }

    this.isDrawing = false;
  };
}

export default Rect;
