<!-- 查询 -->
<template>
  <div class="search-option">
    <a-row>
      <a-col :xs="12" :sm="12" :md="6" :lg="6" :xl="6">
        <a-input v-model="keyWord" :placeholder="placeholder"></a-input>
      </a-col>
      <a-col :span="12">
        <a-button
        type="primary"
        icon="search"
        :style="{ marginRight: '8px', marginLeft: '8px' }"
        @click="onSearch"
        >查询</a-button>
        <a-button
        icon="plus"
        @click="add"
        >新增</a-button>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入关键字'
    }
  },
  data () {
    return {
      keyWord: ''
    }
  },
  methods: {
    onSearch () {
      this.$emit('search', this.keyWord)
    },
    add () {
      this.$emit('add')
    }
  }
}

</script>
<style lang='less' rel='stylesheet/less' scoped>
</style>
