<template functional>
  <a-sub-menu :key="props.menuInfo.key">
    <span slot="title">
      <a-icon :type="props.menuInfo.type" v-if="props.menuInfo.type" />
      <span>{{props.menuInfo.title}}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item :key="item.key" v-if="!item.children">
        <a-icon :type="item.type" v-if="item.type" />
        <span>{{item.title}}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menuInfo="item"></sub-menu>
    </template>
  </a-sub-menu>
</template>

<script>
export default {
  name: 'subMenu',
  props: {
    menuInfo: {
      type: Object,
      default: () => ({})
    }
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
</style>
