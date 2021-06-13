class History {
  undoStack = [];

  constructor(canvas) {
    this.canvas = canvas;
    this.initEvent();
  }

  initEvent = () => {
    this.canvas.on('object:modified', this.record);
  };

  record = () => {
    this.undoStack.push(
      this.canvas.toJSON([
        'transparentCorners',
        'hasBorders',
        'cornerStyle',
        'padding',
        'cornerSize',
        'cornerColor',
        'cornerStrokeColor',
        'borderOpacityWhenMoving'
      ])
    );
    this.prevAction = 'record';

    if (this.watchCb) this.watchCb(this.canUndo());
  };

  undo = () => {
    if (this.prevAction === 'record') this.undoStack.pop();

    if (this.undoStack.length) {
      let json = this.undoStack.pop();
      this.canvas.loadFromJSON(json);
    } else {
      this.canvas.clear();
    }

    this.prevAction = 'undo';

    if (this.watchCb) this.watchCb(this.canUndo());
  };

  canUndo = () => {
    return this.undoStack.length > 0;
  };

  watch = cb => {
    this.watchCb = cb;
  };
}

export default History;
