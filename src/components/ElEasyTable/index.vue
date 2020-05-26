<template>
  <div :class="['el-easy-table', `el-easy-table--${size}`]">
    <div class="el-easy-table-head">
      <div class="el-easy-table-search">
        <el-form :size="size" :label-width="`${labelWidth}px`">
          <el-row :gutter="searchGutter">
            <template v-for="search of filteredSearchs">
              <el-col :span="search.span || columnSpan" :key="search.key">
                <el-form-item :label="search.label">
                  <el-input
                    v-if="search.type === 'input'"
                    v-model="searchParam[search.key]"
                    v-bind="search" />

                  <el-select
                    v-if="search.type === 'select'"
                    v-model="searchParam[search.key]"
                    v-bind="search">
                    <template v-for="option of search.options">
                      <el-option v-bind="option" :key="option.value" />
                    </template>
                  </el-select>

                  <el-date-picker
                    v-if="search.type === 'date'"
                    v-model="searchParam[search.key]"
                    v-bind="search"
                    :type="search.controlType" />
                </el-form-item>
              </el-col>
            </template>

            <el-col v-if="filteredSearchs.length" :span="columnSpan">
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

          <div class="toolbar-tools">
            <Fullscreen />
          </div>
        </div>
      </div>

      <div class="el-easy-table-alert">
        <slot name="alert"></slot>
      </div>
    </div>

    <div class="el-easy-table-body">
      <el-table
        v-loading="loading"
        :data="data"
        :size="size"
        :row-key="rowKey"
        :default-expand-all="defaultExpandAll"
        @selection-change="handleSelectionChange">
        <!-- 多选框 -->
        <el-table-column
          v-if="check"
          :selectable="selectable"
          :reserve-selection="reserveSelection"
          type="selection"
          width="55"
          align="center" />

        <!-- 单选框 -->
        <el-table-column
          v-else-if="radio"
          width="55"
          align="center">
          <template v-slot="{ row }">
            <el-radio v-model="singleSelection" :label="row"><span/></el-radio>
          </template>
        </el-table-column>

        <template v-for="column of columns">
          <el-table-column
            v-if="!column.type || column.type === 'text'"
            :key="column.title"
            :prop="column.key"
            :label="column.title"
            align="center" />

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
              :disabled="!multipleSelection.length"
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
  findComponentUpward
} from '@/assets/utils/tool'

const depClone = data => JSON.parse(JSON.stringify(data))

export default {
  name: 'ElEasyTable',
  props: {
    bindComponentName: String,
    rowKey: String,
    total: Number,
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
    buttons: {
      type: Array,
      default () {
        return []
      }
    },
    searchs: {
      type: Array,
      default () {
        return []
      }
    },
    searchMode: {
      type: String,
      default: 'click'
    },
    searchWait: {
      type: Number,
      default: 300
    },
    searchMax: Number,
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
    labelWidth: {
      type: Number,
      default: 80
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
    toolBoxLayout: {
      type: String,
      default: ''
    },
    toolButtons: {
      type: Array,
      default () {
        return []
      }
    },
    check: Boolean,
    radio: Boolean,
    defaultExpandAll: Boolean,
    selectable: Function,
    reserveSelection: Boolean,
    title: String,
    size: {
      type: String,
      validator (val) {
        return ['medium', 'small', 'mini'].includes(val)
      },
      default: 'medium'
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
      searchExtension: false,
      multipleSelection: []
    }
  },
  computed: {
    filteredSearchs () {
      const length = this.searchs.length
      const end = this.searchExtension ? length : this.searchMax
      return this.searchs.slice(0, end)
    },
    columnSpan () {
      const col = Math.min(this.searchSplit, 4)
      return 24 / col
    },
    singleSelection: {
      get () {
        return this.multipleSelection[0]
      },
      set (val) {
        this.multipleSelection.splice(0, 1, val)
      }
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
  },
  methods: {
    defineSearchParam () {
      this.searchParam = this.searchs.reduce((prev, item) => {
        prev[item.key] = item.value ?? ''
        return prev
      }, {})
    },
    syncProp () {
      const { pageSize, currentPage } = this
      this.internalPageSize = pageSize
      this.internalCurrentPage = currentPage
    },
    createPropSnap () {
      const { searchParam, pageSize, currentPage } = this
      this.searchParamSnap = depClone(searchParam)
      this.pageSizeSnap = pageSize
      this.currentPageSnap = currentPage
    },
    updateSearchParam (searchParam) {
      Object.assign(this.searchParam, searchParam)
    },
    updatePageSize (pageSize) {
      this.internalPageSize = pageSize
      this.$emit('update:pageSize', pageSize)
    },
    updateCurrentPage (currentPage) {
      this.internalCurrentPage = currentPage
      this.$emit('update:currentPage', currentPage)
    },
    handleSizeChange (val) {
      this.updatePageSize(val)
      this.refreshTable()
    },
    handleCurrentChange (val) {
      this.updateCurrentPage(val)
      this.refreshTable()
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    findBindComponent () {
      const componentName = this.bindComponentName
      if (componentName) { this.bindComponent = findComponentUpward(this, componentName) }
    },
    notifyRequest () {
      const param = depClone(this.searchParam)
      param.pageSize = this.internalPageSize
      param.currentPage = this.internalCurrentPage

      this.$emit('request-trigger', param)
    },
    triggerCallback (option, data, index) {
      const cb = this.bindComponent?.[option.handle] ?? findComponentMethodUpward(this, option.handle)
      if (!cb) { return }
      cb(option, data ? depClone(data) : data, index)
    },
    refreshTable (param, isReset) {
      param = isObject(param) ? param : {}
      let { pageSize, currentPage, ...searchParam } = param
      searchParam = isReset ? { ...this.searchParamSnap, searchParam } : searchParam
      pageSize = pageSize || (isReset ? this.pageSizeSnap : this.internalPageSize)
      currentPage = currentPage || (isReset ? this.currentPageSnap : this.internalCurrentPage)

      this.updateSearchParam(searchParam)
      this.updatePageSize(pageSize)
      this.updateCurrentPage(currentPage)

      this.notifyRequest()
    },
    getChecked () {
      return depClone(this.multipleSelection)
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-easy-table {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    background-color: #fff;
    &-head {
      padding-bottom: 18px;
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
      .toolbar-option {
        display: flex;
        align-items: center;
      }
    }
    &-body {
      flex: 1;
      display: flex;
      flex-direction: column;
    }
    .el-table {
      flex: 1;
      display: flex;
      flex-direction: column;
      margin-bottom: 18px;
      /deep/ .el-radio__label {
        padding-left: 0;
      }
      /deep/ .is-scrolling-none {
        flex: 1;
      }
    }
    &-pagination {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
</style>
