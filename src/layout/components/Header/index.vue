<template>
  <header class="header">
    <slot class="fold"></slot>

    <div class="header-tool">
      <slot name="tool"></slot>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.header {
  height: 64px;
  .fold {
    padding: 0 22px;
    line-height: 64px;
  }
  .header-tool {
    display: flex;
    align-items: center;
    float: right;
    padding: 0 20px;
    line-height: 64px;
    & > * {
      padding: 0 12px;
      &:hover {
        background-color: rgba(0, 0, 0, .025);
      }
    }
  }
}
</style>
