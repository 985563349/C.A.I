<template>
  <div class="page-table">
    <div class="el-card is-always-shadow">
      <el-easy-table
        ref="table"
        v-bind="tableOptions"
        :pageSize.sync="tableOptions.pageSize"
        :currentPage.sync="tableOptions.currentPage"
        @request-trigger="getTableData">
        </el-easy-table>
    </div>
  </div>
</template>

<script>
import { getTableList } from '@/api/modules/component'

export default {
  name: 'Table',
  data () {
    return {
      tableOptions: {
        bindComponentName: 'Table',
        total: 1000,
        pageSize: 10,
        currentPage: 1,
        data: [],
        columns: [
          { title: '姓名', key: 'name' },
          { title: '性别', key: 'gender' },
          { title: '年龄', key: 'age' },
          { type: 'image', title: '头像', key: 'avatar', alt: '头像', style: { width: '50px', height: '50px', verticalAlign: 'middle' } },
          { title: '地址', key: 'address' },
          { title: '注册时间', key: 'date' },
          {
            title: '操作',
            type: 'operate',
            buttons: [
              { text: '编辑', handle: 'userOperate', param: { type: 'edit' } },
              { text: '删除' }
            ]
          }
        ],
        searchs: [
          { type: 'input', label: '姓名：', key: 'name', placeholder: '请输入姓名' },
          { type: 'input', label: '年龄：', key: 'age', placeholder: '请输入年龄' },
          { type: 'input', label: '地址：', key: 'address', placeholder: '请输入地址' },
          { type: 'select', label: '性别：', key: 'gander', placeholder: '请选择性别', options: [{ label: '男', value: 1 }, { label: '女', value: 0 }] },
          { type: 'date', controlType: 'datetimerange', label: '注册时间：', key: 'data', startPlaceholder: '开始日期', endPlaceholder: '结束日期' }
        ],
        buttons: [
          { text: '启用', handle: 'changeStatus' },
          { text: '禁用' },
          { text: '删除' }
        ],
        toolButtons: [
          { text: '添加用户', handle: 'userOperate', param: { type: 'add' } }
        ],
        searchSplit: 3,
        labelWidth: '100px',
        size: 'small',
        loading: false
      }
    }
  },
  methods: {
    async getTableData (param) {
      console.log(param)
      this.tableOptions.loading = true
      try {
        this.tableOptions.data = await getTableList()
      } catch (e) {
        console.log(e)
      } finally {
        this.tableOptions.loading = false
      }
    },
    userOperate (option, data, index) {
      const { type } = option.param
      this.$refs.table.refreshTable(null, type === 'add')
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
