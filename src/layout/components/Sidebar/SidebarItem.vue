<template>
  <el-submenu v-if="item.children" :index="item.path">
    <template slot="title">
      <svg-icon v-if="item.icon" :iconClass="item.icon" />
      <span>{{ item.title }}</span>
    </template>

    <sidebar-item v-for="child of item.children" :item="child" :key="child.title" />
  </el-submenu>

  <el-menu-item v-else :index="item.path">
    <svg-icon v-if="item.icon" :iconClass="item.icon" />
    <span slot="title">{{ item.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.el-submenu, .el-menu-item {
  .svg-icon {
    margin-right: 5px;
    width: 24px;
    text-align: center;
    font-size: 18px;
    vertical-align: middle;
  }
}

.el-menu--collapse {
  & > .el-submenu, .el-menu-item {
    .svg-icon {
      margin: 0;
    }
  }
}
</style>
