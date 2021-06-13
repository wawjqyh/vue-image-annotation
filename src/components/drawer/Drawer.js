import { fabric } from 'fabric';
import config from './config';
import Rect from './Rect';
import Circle from './Circle';
import Text from './Text';
import Freedraw from './Freedraw';
import History from './History';

class Drawer {
  constructor(el, imgBase64) {
    this.canvas = new fabric.Canvas(el, {
      ...config.canvas
    });
    this.imgBase64 = imgBase64;
    this.history = new History(this.canvas);

    this.rect = new Rect(this.canvas, this.history);
    this.circle = new Circle(this.canvas, this.history);
    this.text = new Text(this.canvas, this.history);
    this.freedraw = new Freedraw(this.canvas, this.history);

    this.initEvent();
  }

  initEvent = () => {
    // loadFromJSON 后部分配置会丢失，需要选中的时候重新设置
    this.canvas.on('selection:created', e => {
      if (e.target) {
        e.target.setControlVisible('mtr', false);
      }
    });
  };

  clearPrevBrush() {
    // 清除文字聚焦
    this.text.blur();
    // 清除上一个画笔的事件
    if (this.fnClearPrevBrush) this.fnClearPrevBrush();
  }

  drawRect() {
    this.clearPrevBrush();
    this.fnClearPrevBrush = this.rect.init();
  }

  drawCircle() {
    this.clearPrevBrush();
    this.fnClearPrevBrush = this.circle.init();
  }

  drawText() {
    this.clearPrevBrush();
    this.fnClearPrevBrush = this.text.init();
  }

  drawLine() {
    this.clearPrevBrush();
    this.fnClearPrevBrush = this.freedraw.init();
  }

  getImage = scale => {
    return new Promise(resolve => {
      let img = new Image();
      img.src = this.imgBase64;

      let bgImg = new fabric.Image(img);
      bgImg.set({ scaleX: scale, scaleY: scale, originX: 'left', originY: 'top' });

      this.canvas.setBackgroundImage(bgImg, () => {
        let base64 = this.canvas.toDataURL();
        resolve(base64);
      });
    });
  };
}

export default Drawer;
