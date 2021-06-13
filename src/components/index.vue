<template>
  <div class="imgdw-wrapper" v-if="visible">
    <div
      class="imgdw-canvas-wrapper"
      v-if="size"
      :style="{
        width: `${size.width}px`,
        height: `${size.height}px`,
        transform: `translate(-50%, -50%) scale(${canvasScale})`
      }"
    >
      <img class="imgdw-imgbg" :src="imgBase64" />
      <canvas ref="canvas" :width="size.width" :height="size.height"></canvas>
    </div>

    <Toolbar
      ref="toolbar"
      :curBrush="curBrush"
      :canvasScale="canvasScale"
      @onSelectBrush="handleSelectBrush"
      @onUndo="handleUndo"
      @onScale="handleScale"
      @onCancel="handleCancel"
      @onConfirm="handleConfirm"
    />
  </div>
</template>

<script>
import Drawer from './drawer/Drawer';
import Toolbar from './components/toolbar/toolbar.vue';
import { getImg, blobToBase64, getImgSize, base64ToBlob } from './drawer/utils';

export default {
  name: 'vueImageAnnotation',

  components: {
    Toolbar
  },

  data() {
    return {
      visible: false,
      saving: false,
      size: null,
      drawer: null,
      curBrush: '',
      canvasScale: 1,
      imgBase64: ''
    };
  },

  methods: {
    async openUrl(url) {
      this.size = null;
      this.curBrush = '';
      this.canvasScale = 1;
      this.visible = true;
      this.saving = false;
      this.$nextTick(() => {
        this.$refs.toolbar.initPosition();
      });

      const imgBlob = await getImg(url);
      const imgBase64 = await blobToBase64(imgBlob);
      this.size = await getImgSize(imgBase64);
      this.imgBase64 = imgBase64;

      this.$nextTick(() => {
        this.drawer = new Drawer(this.$refs.canvas, imgBase64);
      });
    },

    handleSelectBrush(brush) {
      switch (brush) {
        case 'rect':
          this.drawer.drawRect();
          break;
        case 'circle':
          this.drawer.drawCircle();
          break;
        case 'text':
          this.drawer.drawText();
          break;
        case 'line':
          this.drawer.drawLine();
          break;
      }

      this.curBrush = brush;
    },

    handleUndo() {
      this.drawer.history.undo();
    },

    handleScale(size) {
      this.canvasScale = size;
    },

    handleCancel() {
      this.visible = false;
    },

    async handleConfirm() {
      if (this.saving) return;
      this.saving = true;

      let base64 = await this.drawer.getImage(this.size.scale);
      let imgBlob = await base64ToBlob(base64);

      this.visible = false;

      this.$emit('onSave', base64, imgBlob);
    }
  }
};
</script>

<style lang="less" scoped>
.imgdw-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
}

.imgdw-canvas-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
}

.imgdw-imgbg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
}
</style>
