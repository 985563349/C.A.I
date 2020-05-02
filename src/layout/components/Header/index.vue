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
    // display: flex;
    float: right;
    padding: 0 20px;
    height: 100%;
    & > * {
      display: inline-block;
      height: 100%;
      // align-items: center;
      vertical-align: text-bottom;
      line-height: 64px;
      padding: 0 12px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, .025);
      }
    }
  }
}
</style>
