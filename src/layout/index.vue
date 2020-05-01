<template>
  <el-container :class="{'is-collapse': isCollapse}">
    <el-aside :width="sidebarWidth">
      <sidebar
        :data="menuList"
        :default-active="activePath"
        :collapse="isCollapse"
        router />
    </el-aside>

    <el-container class="is-vertical">
      <Header height="64px">
        <Fold
          :value="isCollapse"
          @change="handleChange" />

        <template #tool>
          <Fullscreen />
          <Fullscreen />
          <Fullscreen />
        </template>
      </Header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Header from './components/Header'
import sidebar from './components/Sidebar'
import { mapGetters } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Header,
    sidebar
  },
  computed: {
    ...mapGetters([
      'isCollapse',
      'menuList'
    ]),
    activePath () {
      return this.$route.path
    },
    sidebarWidth () {
      return this.isCollapse ? '64px' : '200px'
    }
  },
  methods: {
    handleChange (status) {
      this.$store.dispatch('app/setIsCollapse', status)
    }
  }
}
</script>

<style scoped lang="scss">
  .el-container {
    height: 100vh;
    .el-aside {
      transition: width .3s;
    }
    .el-main {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #E9EEF3;
      color: #333;
    }
  }
</style>
