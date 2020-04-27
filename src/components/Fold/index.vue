<template>
  <span :class="[
    'fold',
    {
      'fold--active': isFold
    }
  ]" @click="handleClick">
    <svg-icon iconClass="indent" />
  </span>
</template>

<script>
export default {
  name: 'Fold',
  data () {
    return {
      isFold: false
    }
  },
  methods: {
    handleClick () {
      this.isFold = !this.isFold
    }
  }
}
</script>

<style lang="scss" scoped>
.fold {
  display: inline-block;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: #409EFF;
  }
  &--active {
    transform: rotateY(180deg);
  }
}
</style>
