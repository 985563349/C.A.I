<template>
  <div :class="['el-easy-table', `el-easy-table--${size}`]">
    <div class="el-easy-table-head">
      <div class="el-easy-table-search">
        <el-form :size="size" :label-width="labelWidth">
          <el-row :gutter="searchGutter">
            <template v-for="search of filteredSearchs">
              <el-col :span="search.span || columnSpan" :key="search.key">
                <el-form-item :label="search.label">
                  <el-input v-if="search.type === 'input'" v-bind="search" v-model="searchParam[search.key]" />

                  <el-select v-if="search.type === 'select'" v-bind="search" v-model="searchParam[search.key]">
                    <template v-for="option of search.options">
                      <el-option v-bind="option" :key="option.value" />
                    </template>
                  </el-select>

                  <el-date-picker v-if="search.type === 'date'" v-bind="search" :type="search.controlType" />
                </el-form-item>
              </el-col>
            </template>

            <el-col v-if="searchMode !== 'immediate'" :span="columnSpan">
              <el-form-item>
                <el-button type="primary" :size="size" @click="refreshTable({ currentPage: 1 })">查询</el-button>
                <el-button type="warning" :size="size" @click="updateSearchParam(searchParamSnap)">重置</el-button>
                <el-button
                  :class="[
                    'button-extension',
                    { 'button-extension--active': searchExtension }
                  ]"
                  type="text"
                  :size="size"
                  @click="searchExtension = !searchExtension">
                  <i class="el-icon-arrow-down" />
                  {{ searchExtension ? '收起' : '展开' }}
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="el-easy-table-toolbar">
        <div class="toolbar__title">{{ title }}</div>

        <div class="toolbar-option">
          <div class="toolbar-buttons">
            <template v-for="button of toolButtons">
              <el-button
              v-bind="button"
              :size="button.size || size"
              :key="button.text"
              @click="triggerCallback(button)">
              {{ button.text }}
              </el-button>
            </template>
          </div>
          <div class="toolbar-tools"></div>
        </div>
      </div>

      <div class="el-easy-table-alert">
        <el-alert
          title="成功提示的文案"
          type="success"
          show-icon>
        </el-alert>
      </div>
    </div>

    <div class="el-easy-table-body">
      <el-table :data="data" :size="size" v-loading="loading">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>

        <template v-for="column of columns">
          <el-table-column
            v-if="!column.type || column.type === 'text'"
            :key="column.title"
            :prop="column.key"
            :label="column.title"
            align="center">
          </el-table-column>

          <el-table-column
            v-if="column.type === 'image'"
            :key="column.title"
            :prop="column.key"
            :label="column.title"
            align="center">
            <template v-slot="{ row }">
              <img
                :src="row[column.key]"
                :style="column.style"
                :alt="column.alt">
            </template>
          </el-table-column>

          <el-table-column
            v-if="column.type === 'operate'"
            :key="column.title"
            :prop="column.key"
            :label="column.title"
            align="center">
            <template v-slot="{ row, $index }">
              <template v-for="button of column.buttons">
                <el-button
                  v-bind="button"
                  :size="button.size || size"
                  :key="button.text"
                  @click="triggerCallback(button, row, $index)">
                  {{ button.text }}
                </el-button>
              </template>
            </template>
          </el-table-column>
        </template>
      </el-table>

      <div class="el-easy-table-pagination">
        <div class="el-east-table-buttons">
          <template v-for="button of buttons">
            <el-button
              v-bind="button"
              :size="button.size || size"
              :key="button.text"
              @click="triggerCallback(button, [])">
              {{ button.text }}
              </el-button>
          </template>
        </div>

        <el-pagination
          :total="total"
          :page-size="internalPageSize"
          :current-page="internalCurrentPage"
          :page-sizes="pageSizes"
          :layout="paginationLayout"
          :background="paginationBackground"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import {
  isObject,
  findComponentMethodUpward,
  findComponentUpward,
  debounce
} from '@/assets/utils/tool'

const depClone = data => JSON.parse(JSON.stringify(data))

export default {
  name: 'ElEasyTable',
  props: {
    bindComponentName: {
      type: String
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    data: {
      type: Array,
      required: true
    },
    columns: {
      type: Array,
      required: true
    },
    searchs: {
      type: Array,
      default () {
        return []
      }
    },
    buttons: {
      type: Array,
      default () {
        return []
      }
    },
    paginationLayout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    pageSizes: {
      type: Array,
      default () {
        return [10, 20, 50, 100]
      }
    },
    title: {
      type: String,
      default: '综合表格'
    },
    size: {
      type: String,
      validator (val) {
        return ['medium', 'small', 'mini'].includes(val)
      }
    },
    labelWidth: {
      type: String,
      default: '80px'
    },
    searchSplit: {
      type: Number,
      default: 3,
      validator (val) {
        return [1, 2, 3, 4].includes(val)
      }
    },
    searchGutter: {
      type: Number,
      default: 10
    },
    searchMode: {
      type: String,
      default: 'click'
    },
    toolButtons: {
      type: Array,
      default () {
        return []
      }
    },
    loading: Boolean
  },
  data () {
    this.bindComponent = null
    this.pageSizeSnap = -1
    this.currentPageSnap = -1
    this.searchParamSnap = null

    return {
      internalPageSize: 10,
      internalCurrentPage: 1,
      searchParam: {},
      searchExtension: false
    }
  },
  computed: {
    filteredSearchs () {
      // TODO 截取数修改为动态配置
      const end = this.searchExtension ? this.searchs.length : 4
      return this.searchs.slice(0, end)
    },
    columnSpan () {
      const col = Math.min(this.searchSplit, 4)
      return 24 / col
    },
    paginationBackground () {
      return this.size !== 'mini'
    }
  },
  created () {
    this.defineSearchParam()
    this.syncProp()
    this.notifyRequest()
    this.createPropSnap()
    this.findBindComponent()

    // 即时搜索监听searchParam
    if (this.searchMode === 'immediate') {
      this.defineWatch('searchParam', this.refreshTable, { deep: true }, 1000)
    }
  },
  methods: {
    /** *
     * defineSearchParam 定义searchParam
     */
    defineSearchParam () {
      this.searchParam = this.searchs.reduce((prev, item) => {
        prev[item.key] = item.value ?? ''
        return prev
      }, {})
    },
    /** *
     * syncProp 同步prop数据
     */
    syncProp () {
      const { pageSize, currentPage } = this
      this.internalPageSize = pageSize
      this.internalCurrentPage = currentPage
    },
    /** *
     * createPropSnap 创建prop快照
     */
    createPropSnap () {
      const { searchParam, pageSize, currentPage } = this
      this.searchParamSnap = depClone(searchParam)
      this.pageSizeSnap = pageSize
      this.currentPageSnap = currentPage
    },
    /** * 定义数据观察 defineWatch
     * @param {Stirng|Function} expOrFn 监听字段
     */
    defineWatch (expOrFn, cb, option, wait) {
      this.$watch(expOrFn, debounce(cb, wait), option)
    },
    /** *
     * updatePageSize 更新pageSize
     * @param {Number} pageSize
     */
    updatePageSize (pageSize) {
      if (pageSize > 0) {
        this.internalPageSize = pageSize
        this.$emit('update:pageSize', pageSize)
      }
    },
    /** *
     * updateCurrentPage 更新currentPage
     * @param {Number} currentPage
     */
    updateCurrentPage (currentPage) {
      if (currentPage > 0) {
        this.internalCurrentPage = currentPage
        this.$emit('update:currentPage', currentPage)
      }
    },
    /** *
     * handleSizeChange 处理pageSize变化
     * @param {Number} val 当前pageSize
     */
    handleSizeChange (val) {
      this.updatePageSize(val)
      this.refreshTable()
    },
    /** *
     * handleCurrentChange 处理currentPage变化
     * @param {Number} val 当前currentPage
     */
    handleCurrentChange (val) {
      this.updateCurrentPage(val)
      this.refreshTable()
    },
    /** *
     * updateSearchParam 重置searchs查询参数
     * @param {Object} searchParam 更新查询字段
     */
    updateSearchParam (searchParam) {
      Object.assign(this.searchParam, searchParam)
    },
    /** *
     * findBindComponent 查找绑定组件
     */
    findBindComponent () {
      const componentName = this.bindComponentName
      if (componentName) { this.bindComponent = findComponentUpward(this, componentName) }
    },
    /** *
     * notifyRequest 通知请求
     */
    notifyRequest () {
      const param = depClone(this.searchParam)
      param.pageSize = this.internalPageSize
      param.currentPage = this.internalCurrentPage

      this.$emit('request-trigger', param)
    },
    /** *
     * triggerCallback 事件触发器
     * @param {Object} option 按钮配置项
     * @param {Object|Array} data 列表数据
     * @param {Number|Undefined} index 当前操作数据索引
     */
    triggerCallback (option, data, index) {
      const cb = this.bindComponent?.[option.handle] ?? findComponentMethodUpward(this, option.handle)
      if (!cb) { return }
      cb(option, data ? depClone(data) : data, index)
    },
    /** *
     * refreshTable 刷新table，可供外部调用
     * @param {Object} param 合并参数
     * @param {Boolean} isReset 是否重置参数
     */
    refreshTable (param, isReset) {
      param = isObject(param) ? param : {}
      let { pageSize, currentPage, ...searchParam } = param
      searchParam = isReset ? { ...this.searchParamSnap, searchParam } : searchParam
      pageSize = pageSize || (isReset ? this.pageSizeSnap : undefined)
      currentPage = currentPage || (isReset ? this.currentPageSnap : undefined)

      this.updateSearchParam(searchParam)
      this.updatePageSize(pageSize)
      this.updateCurrentPage(currentPage)

      this.notifyRequest()
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-easy-table {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: #fff;
    &-head {
      margin-bottom: 18px;
    }
    &-search {
      .el-select, .el-date-editor {
        width: 100%;
      }
      .button-extension {
        i {
          transition: .3s;
        }
        &--active {
          i {
            transform: rotate(180deg);
          }
        }
      }
    }
    &-toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 18px;
    }
    .el-table {
      margin-bottom: 18px;
    }
    &-pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
