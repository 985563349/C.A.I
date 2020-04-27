<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>

    <el-container class="is-vertical">
      <Header height="64px">
        <Fullscreen />
        <Fullscreen />
        <Fullscreen />
      </Header>

      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
  .el-container {
    height: 100vh;
    .el-aside {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #D3DCE6;
      color: #333;
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
