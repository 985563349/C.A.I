<template>
  <span class="fold">
    <i class="el-icon-s-fold"></i>
  </span>
</template>

<script>
export default {
  name: 'Fold'
}
</script>

<style lang="scss" scoped>
.fold {
  display: inline-block;
  padding: 10px;
  font-size: 22px;
  cursor: pointer;
  &:hover {
    color: #409EFF;
  }
}
</style>
