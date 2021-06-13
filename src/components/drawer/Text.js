import { fabric } from 'fabric';
import config from './config';

class Text {
  fontsize = config.fontsize;
  fontcolor = config.strokeColor;

  constructor(canvas, history) {
    this.canvas = canvas;
    this.history = history;
  }

  init = () => {
    return this.initEvent();
  };

  initEvent = () => {
    this.canvas.on('mouse:down', this.onMouseDown);

    return () => {
      this.canvas.off('mouse:down', this.onMouseDown);
    };
  };

  // 让当前编辑中的输入框矢焦
  blur = () => {
    if (this.curText) {
      this.curText.exitEditing();
      this.curText.hiddenTextarea && this.curText.hiddenTextarea.blur();
    }

    if (this.activeText) {
      this.activeText.exitEditing();
      this.activeText.hiddenTextarea && this.activeText.hiddenTextarea.blur();
    }
  };

  onMouseDown = e => {
    let self = this;

    // 创建新的输入框时，让上一个矢焦
    if (this.curText && this.curText !== e.target) {
      this.curText.exitEditing();
      this.curText.hiddenTextarea && this.curText.hiddenTextarea.blur();
    }

    // 第一次创建时，点击文字无法定位光标，需要在这里手动定位
    if (this.curText === e.target) {
      this.curText.setCursorByClick(e);
      this.curText.restartCursorIfNeeded();
    }

    if (!e.target) {
      let pointer = this.canvas.getPointer(e.e);
      this.startX = pointer.x;
      this.startY = pointer.y;

      let curText = new fabric.IText('', {
        ...config.text,
        ...config.controls,

        left: this.startX,
        top: this.startY,
        originX: 'left',
        originY: 'top',
        fontSize: this.fontsize,
        fill: this.fontcolor
      });

      this.canvas.add(curText);

      curText.setControlVisible('mtr', false);
      curText.enterEditing();
      curText.hiddenTextarea.focus();

      // 聚焦
      curText.on('editing:entered', function() {
        self.activeText = this;
      });

      // 矢焦
      curText.on('editing:exited', () => {
        this.history.record();
      });

      this.curText = curText;
    }
  };
}

export default Text;
