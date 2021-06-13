<template>
  <svg class="imgdw-icon" aria-hidden="true">
    <use :xlink:href="`#${icon}`"></use>
  </svg>
</template>

<script>
import './iconfont';

export default {
  props: {
    icon: String
  }
};
</script>

<style scoped>
.imgdw-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
