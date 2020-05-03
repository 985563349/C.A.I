<template>
  <div class="el-transfer">
    <div class="el-transfer-panel">
      <el-tree-transfer-panel
        v-bind="$props"
        :data="sourceData"
        :title="titles[0] || '列表1'"
        :placeholder="filterPlaceholder" />
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
        :placeholder="filterPlaceholder" />
    </div>
  </div>
</template>

<script>
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
    filterMethod: Function,
    filterPlaceholder: {
      type: String,
      default: ''
    }
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
    addToLeft () {},
    addToRight () {}
  }
}
</script>

<style lang="scss" scoped></style>
