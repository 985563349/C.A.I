<template>
  <div class="page-table">
    <div class="el-card is-always-shadow">
      <el-easy-table
        ref="table"
        v-bind="tableOptions"
        :pageSize.sync="tableOptions.pageSize"
        :currentPage.sync="tableOptions.currentPage" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuManage',
  data () {
    return {
      tableOptions: {
        bindComponentName: 'MenuManage',
        rowKey: 'id',
        total: 1000,
        pageSize: 10,
        currentPage: 1,
        data: [
          {
            id: 1,
            title: '系统管理',
            parentMenu: '',
            icon: '',
            type: 0,
            url: '/system',
            limitMark: '/system',
            children: [
              {
                id: 3,
                title: '菜单管理',
                parentMenu: '系统管理',
                icon: '',
                type: 1,
                url: '/system/menu-manage',
                limitMark: '/system/menu-manage',
                children: [
                  {
                    id: 6,
                    title: '添加',
                    parentMenu: '菜单管理',
                    icon: '',
                    type: 2,
                    url: '',
                    limitMark: 'add'
                  },
                  {
                    id: 7,
                    title: '编辑',
                    parentMenu: '菜单管理',
                    icon: '',
                    type: 2,
                    url: '',
                    limitMark: 'update'
                  },
                  {
                    id: 8,
                    title: '删除',
                    parentMenu: '菜单管理',
                    icon: '',
                    type: 2,
                    url: '',
                    limitMark: 'delete'
                  }
                ]
              }
            ]
          },
          {
            id: 2,
            title: '权限测试页',
            parentMenu: '',
            icon: '',
            type: 0,
            url: '/permission',
            children: [
              {
                id: 4,
                title: '页面权限',
                parentMenu: '权限测试页',
                icon: '',
                url: '/permission/page',
                type: 1
              },
              {
                id: 5,
                title: '指令权限',
                parentMenu: '权限测试页',
                icon: '',
                url: '/permission/directive',
                type: 1
              }
            ]
          }
        ],
        columns: [
          { title: '名称', key: 'title' },
          { title: '上级菜单', key: 'parentMenu' },
          { title: '图标', key: 'icon' },
          { title: '类型', key: 'type' },
          { title: '菜单URL', key: 'url' },
          { title: '授权标识', key: 'limitMark' },
          {
            title: '操作',
            type: 'operate',
            buttonMax: 8,
            buttons: [
              { text: '编辑', handle: 'userOperate', param: { type: 'edit' } },
              { text: '删除' }
            ]
          }
        ],
        defaultExpandAll: true,
        size: 'small'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.page-table {
  display: flex;
  width: 100%;
  min-height: 100%;
  .el-card {
    width: 100%;
    padding: 20px;
  }
}
</style>
