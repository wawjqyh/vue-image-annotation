<template>
  <div
    class="imgdw-draggable"
    ref="draggable"
    :style="{ top: `${position.y}px`, left: `${position.x}px` }"
    @mousedown="handleDragStart"
    @mouseup="handleDragEnd"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'imgdwDraggable',

  data() {
    return {
      position: {
        x: 0,
        y: 0
      }
    };
  },

  methods: {
    initPosition() {
      let width = this.$refs.draggable.clientWidth;
      let height = this.$refs.draggable.clientHeight;
      let windowWidth = window.innerWidth;
      let windowHeight = window.innerHeight;

      this.position.x = windowWidth - width - 50;
      this.position.y = windowHeight - height - 50;
    },

    handleDragStart(e) {
      this.subX = e.pageX - this.$refs.draggable.offsetLeft;
      this.subY = e.pageY - this.$refs.draggable.offsetTop;
      document.addEventListener('mousemove', this.handleMouseMove);
    },

    handleDragEnd() {
      document.removeEventListener('mousemove', this.handleMouseMove);
    },

    handleMouseMove(e) {
      this.position = {
        x: e.pageX - this.subX,
        y: e.pageY - this.subY
      };
    }
  }
};
</script>

<style scoped>
.imgdw-draggable {
  position: absolute;
  cursor: move;
}
</style>
