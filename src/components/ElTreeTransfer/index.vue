<template>
  <div class="el-transfer">
    <div class="el-transfer-panel">
      <el-tree-transfer-panel
        v-bind="$props"
        :data="sourceData"
        :title="titles[0] || '列表1'"
        :placeholder="filterPlaceholder"
        @checked-change="onSourceCheckedChange" />
    </div>

    <div class="el-transfer__buttons">
      <el-button
        type="primary"
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToLeft"
        :disabled="rightChecked.length === 0">
        <i class="el-icon-arrow-left"></i>
        <span v-if="buttonTexts[0] !== undefined">{{ buttonTexts[0] }}</span>
      </el-button>
      <el-button
        type="primary"
        :class="['el-transfer__button', hasButtonTexts ? 'is-with-texts' : '']"
        @click.native="addToRight"
        :disabled="leftChecked.length === 0">
        <span v-if="buttonTexts[1] !== undefined">{{ buttonTexts[1] }}</span>
        <i class="el-icon-arrow-right"></i>
      </el-button>
    </div>

    <div class="el-transfer-panel">
      <el-tree-transfer-panel
        v-bind="$props"
        :data="targetData"
        :title="titles[1] || '列表2'"
        :placeholder="filterPlaceholder"
        @checked-change="onTargetCheckedChange" />
    </div>
  </div>
</template>

<script>
import { list2Tree } from '@/assets/utils/tool'
import ElTreeTransferPanel from './ElTreeTransferPanel'

export default {
  name: 'ElTreeTransfer',
  components: {
    ElTreeTransferPanel
  },
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
    titles: {
      type: Array,
      default () {
        return []
      }
    },
    buttonTexts: {
      type: Array,
      default () {
        return []
      }
    },
    filterable: Boolean,
    filterPlaceholder: {
      type: String,
      default: ''
    },
    filterMethod: Function
  },
  data () {
    return {
      leftChecked: [],
      rightChecked: []
    }
  },
  computed: {
    hasButtonTexts () {
      return this.buttonTexts.length === 2
    },
    sourceData () {
      return this.data
    },
    targetData () {
      return []
    }
  },
  methods: {
    onSourceCheckedChange (val) {
      this.leftChecked = val
    },
    onTargetCheckedChange (val) {
      this.rightChecked = val
    },
    addToLeft () {
      // TODO list2Tree
      // TODO 删除右侧tree节点
      // TODO 数据合并至左侧tree
      console.log('去左侧')
      console.log(this.rightChecked)
    },
    addToRight () {
      // TODO list2Tree
      console.log(list2Tree(JSON.parse(JSON.stringify(this.leftChecked))))
      // TODO 删除左侧tree节点
      // TODO 数据合并至右侧tree
      console.log('去右侧')
    }
  }
}
</script>

<style lang="scss" scoped></style>
