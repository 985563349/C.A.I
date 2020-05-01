<template>
  <span :class="[
    'fold',
    {
      'fold--active': value
    }
  ]" @click="handleClick">
    <svg-icon iconClass="indent" />
  </span>
</template>

<script>
export default {
  name: 'Fold',
  model: {
    event: 'change'
  },
  props: {
    value: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    handleClick () {
      this.$emit('change', !this.value)
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
  transform: rotateY(180deg);
  &:hover {
    color: #409EFF;
  }
  &--active {
    transform: rotateY(0);
  }
}
</style>
