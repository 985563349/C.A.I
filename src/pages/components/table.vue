<template>
  <div class="page-table">
    <div class="el-card is-always-shadow">
      <el-easy-table
        v-bind="tableOptions"
        :pageSize.sync="tableOptions.pageSize"
        :currentPage.sync="tableOptions.currentPage"
        @request-trigger="getTableData">
        </el-easy-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  data () {
    return {
      tableOptions: {
        bindComponentName: 'Table',
        total: 1000,
        pageSize: 10,
        currentPage: 1,
        data: [
          { name: '王花花', gender: 1, age: '22' },
          { name: '李栓蛋', gender: 1, age: '21' },
          { name: '李栓蛋', gender: 1, age: '21' },
          { name: '李栓蛋', gender: 1, age: '21' }
        ],
        columns: [
          { title: '姓名', key: 'name' },
          { title: '性别', key: 'gender' },
          { title: '年龄', key: 'age' },
          {
            title: '操作',
            type: 'operate',
            buttons: [
              { text: '编辑', handle: 'userOperate' },
              { text: '删除' }
            ]
          }
        ],
        searchs: [
          { type: 'input', label: '姓名：', key: 'name0', placeholder: '请输入姓名' },
          { type: 'input', label: '姓名：', key: 'name1', placeholder: '请输入姓名' },
          { type: 'input', label: '姓名：', key: 'name2', placeholder: '请输入姓名' },
          { type: 'input', label: '姓名：', key: 'name3', placeholder: '请输入姓名' },
          { type: 'input', label: '姓名：', key: 'name4', placeholder: '请输入姓名' },
          { type: 'select', label: '性别：', key: 'gander', placeholder: '请选择性别', options: [{ label: '男', value: 1 }, { label: '女', value: 0 }] },
          { type: 'date', controlType: 'datetimerange', label: '时间范围：', key: 'data', startPlaceholder: '开始日期', endPlaceholder: '结束日期' }
        ],
        buttons: [
          { text: '启用', handle: 'changeStatus' },
          { text: '禁用' },
          { text: '删除' }
        ],
        toolButtons: [
          { text: '启用', handle: 'changeStatus' },
          { text: '禁用' },
          { text: '删除' }
        ],
        searchSplit: 3,
        labelWidth: '100px',
        size: 'small',
        loading: false
      }
    }
  },
  methods: {
    getTableData (param) {
      this.tableOptions.loading = true
      console.log(param)
      setTimeout(() => {
        this.tableOptions.loading = false
      }, 2000)
    },
    userOperate (option, data, index) {
      console.log(option, data, index)
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
    padding: 20px;
  }
}
</style>
