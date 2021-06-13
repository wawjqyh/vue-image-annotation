<template>
  <div class="imgdw-brush">
    <icon
      class="imgdw-brush-btn"
      v-for="item in brushList"
      :key="item.name"
      :icon="item.icon"
      :class="{ 'imgdw-brush-btn-active': curBrush === item.name }"
      @click.native.stop="handleSelectBrush(item.name)"
    />
  </div>
</template>

<script>
import icon from '../icon/icon.vue';
import brushList from './brush-config';

export default {
  name: 'imgdwBrush',

  components: {
    icon
  },

  props: {
    curBrush: String
  },

  data() {
    return {
      brushList
    };
  },

  methods: {
    handleSelectBrush(brush) {
      if (this.curBrush === brush) return;
      this.$emit('onSelectBrush', brush);
    }
  }
};
</script>

<style scoped>
.imgdw-brush {
  display: flex;
  align-items: center;
}

.imgdw-brush-btn {
  font-size: 26px;
  margin-right: 20px;
  cursor: pointer;
  color: #fff;
}

.imgdw-brush-btn-active {
  color: rgb(7, 201, 23);
}
</style>
