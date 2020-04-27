<template>
  <span class="fullscreen" @click="handleClick">
    <svg-icon :icon-class="isFullscreen ? 'fullscreen-exit' : 'fullscreen'" />
  </span>
</template>

<script>
import screenfull from 'screenfull'

export default {
  name: 'Fullscreen',
  data () {
    return {
      isFullscreen: false
    }
  },
  methods: {
    handleClick () {
      this.isFullscreen ? screenfull.exit() : screenfull.request()
      this.isFullscreen = !this.isFullscreen
    }
  }
}
</script>

<style lang="scss" scoped>
.fullscreen {
  display: inline-block;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #409EFF;
  }
}
</style>
