<!-- menu -->
<template>
  <a-menu
  :mode="mode"
  :theme="theme"
  :defaultOpenKeys="openKeys"
  :selectedKeys="selectKeys"
  @select="select"
  :style="{'border-right-color': 'transparent'}"
  >
    <template v-for="item in menuList">
      <a-menu-item :key="item.key" v-if="!item.children">
        <a-icon :type="item.type" v-if="item.type"></a-icon>
        <span>{{item.title}}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menuInfo="item"></sub-menu>
    </template>
  </a-menu>
</template>

<script>
import subMenu from './subMenu'
export default {
  props: {
    mode: {
      type: String,
      default: 'inline'
    },
    theme: {
      type: String,
      default: 'dark'
    },
    menuList: {
      type: Array,
      default: () => []
    }
  },
  components: {
    subMenu
  },
  data () {
    return {
      openKeys: [],
      selectKeys: []
    }
  },
  mounted () {
    this.setOpenKeys(this.menuList)
    this.updateMenu()
  },
  methods: {
    select (val) {
      this.$router.push({ path: val.key })
    },
    setOpenKeys (list) {
      const pathArr = this.$route.path.split('/')
      list.forEach(val => {
        if ('children' in val && val.children.length) {
          if (pathArr.includes(val.key.substr(1))) {
            this.openKeys.push(val.key)
            this.setOpenKeys(val.children)
          }
        }
      })
    },
    updateMenu () {
      const path = this.$route.path
      this.selectKeys = [path]
    }
  },
  watch: {
    $route () {
      this.updateMenu()
    }
  }
}

</script>
<style lang='scss' rel='stylesheet/scss' scoped>
</style>
