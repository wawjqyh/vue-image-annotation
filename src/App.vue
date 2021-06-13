<template>
  <div id="app">
    <button @click="handleOpenDrawer">打开图片</button>
    <ImageDrawer ref="refImageDrawer" @onSave="handleSave" />
  </div>
</template>

<script>
import ImageDrawer from './components/index.vue';

export default {
  name: 'App',

  components: { ImageDrawer },

  methods: {
    handleOpenDrawer() {
      this.$refs.refImageDrawer.openUrl('./img.png');
    },

    handleSave(base64) {
      console.log(base64);
    }
  }
};
</script>

<style></style>
