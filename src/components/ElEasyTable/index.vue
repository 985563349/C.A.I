<template>
  <div :class="['el-easy-table', `el-easy-table--${size}`]">
    <div class="table-search">
      <el-form :size="size" :label-width="labelWidth">
        <el-row :gutter="searchGutter">
          <template v-for="search of filteredSearchs">
            <el-col :span="search.span || columnSpan" :key="search.key">
              <el-form-item :label="search.label">
                <el-input v-if="search.type === 'input'" v-bind="search" />

                <el-select v-if="search.type === 'select'" v-bind="search">
                  <template v-for="option of search.options">
                    <el-option :key="option.value" v-bind="option"/>
                  </template>
                </el-select>

                <el-date-picker v-if="search.type === 'date'" :type="search.controlType" v-bind="search" />
              </el-form-item>
            </el-col>
          </template>

          <el-col :span="columnSpan">
            <el-form-item>
              <el-button type="primary" :size="size">查询</el-button>
              <el-button type="warning" :size="size">重置</el-button>
              <el-button :class="['button-extension', { 'button-extension--active': searchExtension }]" :size="size" type="text" @click="extensionHandle">
                <i class="el-icon-arrow-down" />
                {{ searchExtension ? '收起' : '展开' }}
              </el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="table-toolbar">
      <div class="table-toolbar-title">{{ title }}</div>

      <div class="table-toolbar-option">
        <el-button :size="size">添加</el-button>
      </div>
    </div>

    <div class="table-alert">
      <el-alert
        title="成功提示的文案"
        type="success"
        show-icon>
      </el-alert>
    </div>

    <div class="table-content">
      <el-table :data="data" :size="size">
        <el-table-column
          type="selection"
          align="center"
          width="55">
        </el-table-column>

        <template v-for="column of columns">
          <el-table-column
            :key="column.key"
            :prop="column.key"
            :label="column.title"
            align="center">
          </el-table-column>
        </template>
      </el-table>

      <div class="table-footer">
        <div>
          <el-button :size="size">启用</el-button>
          <el-button :size="size">禁用</el-button>
          <el-button :size="size">删除</el-button>
        </div>

        <el-pagination
          :total="total"
          :page-size="pageSize"
          :current-page="currentPage"
          :page-sizes="pageSizes"
          :layout="layout"
          :background="paginationBackground">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ElEasyTable',
  props: {
    title: {
      type: String,
      default: '综合表格'
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
    pageSizes: {
      type: Array,
      default () {
        return [100, 200, 300, 400]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
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
      type: String,
      default: '80px'
    },
    size: {
      type: String,
      validator (val) {
        return ['medium', 'small', 'mini'].includes(val)
      }
    }
  },
  data () {
    return {
      searchExtension: false
    }
  },
  computed: {
    filteredSearchs () {
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
  methods: {
    extensionHandle () {
      this.searchExtension = !this.searchExtension
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-easy-table {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background-color: #fff;
    .table {
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
      }
      &-content {
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      &-footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    &--medium {
      .table {
        &-toolbar, &-alert {
          margin-bottom: 22px;
        }
        &-content {
          .el-table {
            margin-bottom: 22px;
          }
        }
      }
    }
    &--small, &--mini {
      .table {
        &-toolbar, &-alert {
          margin-bottom: 18px;
        }
        &-content {
          .el-table {
            margin-bottom: 18px;
          }
        }
      }
    }
  }
</style>
