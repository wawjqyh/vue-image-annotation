import config from './config';

class Line {
  strokeWidth = config.strokeWidth;
  strokeColor = config.strokeColor;

  constructor(canvas, history) {
    this.canvas = canvas;
    this.history = history;
  }

  init = () => {
    this.canvas.isDrawingMode = true;
    this.canvas.freeDrawingBrush.width = this.strokeWidth;
    this.canvas.freeDrawingBrush.color = this.strokeColor;
    this.canvas.on('path:created', this.handleConfigureLine);

    return () => {
      this.canvas.isDrawingMode = false;
      this.canvas.off('path:created', this.handleConfigureLine);
    };
  };

  // 线条配置
  handleConfigureLine = e => {
    let lineConfig = { ...config.controls, ...config.line };

    if (e.path) {
      for (let key in lineConfig) {
        e.path[key] = lineConfig[key];
      }
      e.path.setControlVisible('mtr', false);

      this.history.record();
    }
  };
}

export default Line;
