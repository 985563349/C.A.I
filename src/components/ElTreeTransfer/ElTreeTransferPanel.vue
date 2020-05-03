<template>
  <div class="el-transfer-panel">
    <p class="el-transfer-panel__header">
      <el-checkbox
       v-model="allChecked">
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
export default {
  name: 'ElTreeTransferPanel',
  props: {
    data: {
      type: Array,
      default () {
        return []
      }
    },
    placeholder: String,
    title: String,
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
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    handleCheckChange (data, checked, indeterminate) {
      if (!this.checkChangeLimit) {
        this.checkChangeLimit = true
        this.$nextTick(() => {
          this.checked = this.$refs.tree.getCheckedNodes()
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
