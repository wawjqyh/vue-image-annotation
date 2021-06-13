<template>
  <draggable class="imgdw-toolbar" ref="draggable">
    <brush :curBrush="curBrush" @onSelectBrush="handleSelectBrush" />

    <div class="imgdw-split-line" />

    <icon class="imgdw-btn imgdw-btn-undo" icon="icon-chexiao" @click.native.stop="handleUndo" />
    <icon class="imgdw-btn imgdw-btn-narrow" icon="icon-suoxiao" @click.native.stop="handleScale('narrow')" />
    <icon class="imgdw-btn imgdw-btn-enlarge" icon="icon-fangda" @click.native.stop="handleScale('enlarge')" />
    <!-- <span class="imgdw-scale-percent">{{ parseInt(canvasScale * 100) }}%</span> -->

    <icon class="imgdw-btn imgdw-btn-cancel" icon="icon-guanbi" @click.native.stop="handleCancel" />
    <icon class="imgdw-btn imgdw-btn-confirm" icon="icon-duigou" @click.native.stop="handleConfirm" />
  </draggable>
</template>

<script>
import icon from '../icon/icon.vue';
import draggable from '../draggable/draggable.vue';
import brush from '../brush/brush.vue';

export default {
  name: 'imgdwToolbar',

  components: {
    icon,
    draggable,
    brush
  },

  props: {
    canvasScale: Number,
    curBrush: String
  },

  methods: {
    initPosition() {
      this.$refs.draggable.initPosition();
    },

    handleSelectBrush(brush) {
      this.$emit('onSelectBrush', brush);
    },

    handleUndo() {
      this.$emit('onUndo');
    },

    handleScale(type) {
      if (type === 'enlarge' && this.canvasScale < 2) {
        this.$emit('onScale', parseFloat((this.canvasScale + 0.1).toFixed(1)));
      }

      if (type === 'narrow' && this.canvasScale > 0.1) {
        this.$emit('onScale', parseFloat((this.canvasScale - 0.1).toFixed(1)));
      }
    },

    handleCancel() {
      this.$emit('onCancel');
    },

    handleConfirm() {
      this.$emit('onConfirm');
    }
  }
};
</script>

<style lang="less" scoped>
.imgdw-toolbar {
  position: absolute;
  height: 42px;
  background-color: rgb(162, 163, 175);
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-radius: 2px;
  box-shadow: 0 0 3px 0 #333;

  * {
    user-select: none;
  }
}

.imgdw-btn {
  font-size: 26px;
  cursor: pointer;
  color: #fff;
}

.imgdw-split-line {
  height: 24px;
  border-right: 1px solid #ddd;
  margin-right: 20px;
}

.imgdw-scale-percent {
  width: 60px;
}

.imgdw-btn-undo {
  margin-right: 20px;
}

.imgdw-btn-narrow {
  margin-right: 10px;
}

.imgdw-btn-cancel {
  margin-left: 20px;
  color: rgb(250, 58, 44);
  margin-right: 10px;
}

.imgdw-btn-confirm {
  color: #2bc96a;
}
</style>
