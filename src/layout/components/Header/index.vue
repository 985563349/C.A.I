<template>
  <header class="header">
    <div class="header-trigger">
      <slot></slot>
    </div>

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
  display: flex;
  justify-content: space-between;
  height: 64px;
  .header-trigger {
    display: flex;
    & > * {
      display: inline-flex;
      align-items: center;
      padding: 0 20px;
    }
  }
  .header-tool {
    display: flex;
    padding: 0 20px;
    & > * {
      display: inline-flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
      &:hover {
        background-color: rgba(0, 0, 0, .025);
      }
    }
  }
}
</style>
