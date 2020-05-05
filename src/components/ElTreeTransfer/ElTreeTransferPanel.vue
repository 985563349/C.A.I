<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
       v-model="allChecked"
       :indeterminate="isIndeterminate"
        @change="handleAllCheckedChange">
        {{ title }}
      </el-checkbox>
    </p>

    <div :class="['el-transfer-panel__body', { 'is-with-footer': hasFooter }]">
      <el-input
        class="el-transfer-panel__filter"
        v-model="filterText"
        size="small"
        :placeholder="placeholder"
        @mouseenter.native="inputHover = true"
        @mouseleave.native="inputHover = false"
        v-if="filterable">
        <i slot="prefix"
          :class="['el-input__icon', 'el-icon-' + inputIcon]"
          @click="clearfilterText" />
      </el-input>

      <div :class="['el-transfer-panel__list', { 'is-filterable': filterable }]">
        <el-tree
          :data="data"
          :node-key="nodeKey"
          :props="props"
          show-checkbox
          @check-change="handleCheckChange"
          :filter-node-method="filterNode"
          ref="tree" />
      </div>
    </div>

    <p class="el-transfer-panel__footer" v-if="hasFooter">
      <slot></slot>
    </p>
  </div>
</template>

<script>
import { bfs } from '@/assets/utils/tool'
const dataMap = new Map()

export default {
  name: 'ElTreeTransferPanel',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    nodeKey: {
      type: String,
      default: 'id'
    },
    props: {
      type: Object,
      default () {
        return {
          label: 'label',
          children: 'children',
          disabled: 'disabled'
        }
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    filterable: Boolean,
    filterMethod: Function
  },
  data () {
    return {
      checked: [],
      allChecked: false,
      filterText: '',
      inputHover: false,
      checkChangeLimit: false
    }
  },
  computed: {
    isIndeterminate () {
      const checkedLength = this.checked.length
      return checkedLength > 0 && checkedLength < dataMap.size
    },
    hasFooter () {
      return !!this.$slots.default
    },
    inputIcon () {
      return this.filterText.length > 0 && this.inputHover
        ? 'circle-close'
        : 'search'
    }
  },
  watch: {
    data: {
      handler (val, oldVal) {
        // 遍历生成checkedMap
        bfs(val, item => {
          dataMap.set(item.id, item)
        })
      },
      immediate: true
    },
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    handleAllCheckedChange (value) {
      const checkedNodes = value ? [...dataMap.values()] : []
      this.$refs.tree.setCheckedNodes(checkedNodes)
    },
    updateAllChecked () {
      const checkedLength = this.checked.length
      this.allChecked = checkedLength > 0 && checkedLength === dataMap.size
    },
    handleCheckChange (data, checked, indeterminate) {
      if (!this.checkChangeLimit) {
        this.checkChangeLimit = true
        this.$nextTick(() => {
          this.checked = this.$refs.tree.getCheckedNodes()
          this.updateAllChecked()
          this.$emit('checked-change', this.checked)
          this.checkChangeLimit = false
        })
      }
    },
    filterNode (value, data) {
      if (typeof this.filterMethod === 'function') {
        return this.filterMethod(value, data)
      } else {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      }
    },
    clearfilterText () {
      if (this.inputIcon === 'circle-close') {
        this.filterText = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
