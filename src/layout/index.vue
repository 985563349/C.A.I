<template>
  <el-container>
    <el-aside width="200px">Aside</el-aside>

    <el-container>
      <el-header>Header</el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<style scoped lang="scss">
  .el-container {
    height: 100%;
    .el-header, .el-footer {
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
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
