export default {
  strokeWidth: 3,
  strokeColor: '#f00',
  fillColor: 'transparent',
  fontsize: 30,

  canvas: {
    selectionColor: 'transparent',
    selectionFullyContained: true
  },

  rect: {
    selectable: true,
    strokeUniform: true
  },

  circle: {
    selectable: true,
    strokeUniform: true
  },

  text: {
    selectable: true,
    strokeUniform: true
  },

  line: {
    selectable: true,
    strokeUniform: true
  },

  controls: {
    transparentCorners: false,
    hasBorders: false,
    cornerStyle: 'circle',
    padding: -2,
    cornerSize: 8,
    cornerColor: '#fff',
    cornerStrokeColor: '#f00',
    borderOpacityWhenMoving: 1
  }
};
