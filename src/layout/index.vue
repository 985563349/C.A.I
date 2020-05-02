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

          <el-dropdown size="small">
            <el-avatar :src="userInfo.avatar"/>
            <el-dropdown-menu slot="dropdown">
              <router-link to="/profile/index">
                <el-dropdown-item>个人中心</el-dropdown-item>
              </router-link>
              <router-link to="/">
                <el-dropdown-item>首页</el-dropdown-item>
              </router-link>
              <a target="_blank" href="https://github.com/985563349/C.A.I">
                <el-dropdown-item>项目地址</el-dropdown-item>
              </a>
              <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
      'userInfo',
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
    },
    async logout () {
      await this.$store.dispatch('user/logout')
      this.$router.push('/sign-in')
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
