<template>
  <div class="sidebar" :style="{ backgroundColor }">
    <div class="sidebar-logo">
      <div id="logo"></div>
    </div>

    <el-menu
      :default-active="defaultActive"
      :router="router"
      :collapse="collapse"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor"
    >
    <sidebar-item v-for="item of data" :item="item" :key="item.title"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  name: 'Sidebar',
  components: {
    SidebarItem
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    props: {
      type: Object,
      default () {
        return {
          title: 'title',
          icon: 'icon',
          path: 'path',
          children: 'children'
        }
      }
    },
    defaultActive: {
      type: String
    },
    router: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: Boolean,
      default: false
    },
    backgroundColor: {
      type: String,
      default: '#001529'
    },
    textColor: {
      type: String,
      default: '#9ea6ad'
    },
    activeTextColor: {
      type: String,
      default: '#1890ff'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  min-height: 100%;
  &-logo {
    box-sizing: border-box;
    padding: 16px;
    height: 64px;
    #logo {
      display: block;
      height: 100%;
      background-color: #334454;
    }
  }
  .el-menu {
    border: none;
  }
}
</style>
