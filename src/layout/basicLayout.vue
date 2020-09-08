<template>
  <a-layout id="components-layout-demo-side" style="min-height: 100vh">
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :closable="false"
      :drawerStyle="theme === 'dark' ? { background: '#001529', padding: '0' } : { background : '#fff', padding: '0' }"
      :visible="collapsed"
      @close="drawerClose"
    >
    <div class="logo"/>
      <ant-menu
      :menuList="menuList"
      :theme="theme"
      :mode="'inline'"
      />
    </a-drawer>
    <a-layout-sider
      v-if="mode==='inline' && !isMobile()"
      collapsible
      v-model="collapsed"
      width="256px"
      :trigger="null"
      :theme="theme"
      :style="{'box-shadow': '2px 0 8px 0 rgba(29,35,41,.05)'}"
    >
      <div class="logo"/>
      <ant-menu
      :menuList="menuList"
      :theme="theme"
      :mode="mode"
      />
    </a-layout-sider>
    <a-layout-sider
      v-if="mode==='inline' && !isMobile() && sideFixed"
      class="side-fixed"
      collapsible
      v-model="collapsed"
      width="256px"
      :trigger="null"
      :theme="theme"
      :style="{'box-shadow': '2px 0 8px 0 rgba(29,35,41,.05)'}"
    >
      <div class="logo"/>
      <ant-menu
      :menuList="menuList"
      :theme="theme"
      :mode="mode"
      />
    </a-layout-sider>
    <a-layout>
      <a-layout-header
      class="header"
      :class="headerSetting()"
      :style="mode === 'horizontal' && theme === 'dark' && !isMobile() ? { background: '#000', padding: '0' } : { background:'#fff', padding: '0' }"
      >
        <span class="toggle" v-if="mode==='inline' || isMobile()" @click="toggleCollapsed">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </span>
        <div
        :class="mode === 'inline' || isMobile()? 'inline-header': 'horizontal-header'"
        v-if="mode==='horizontal' && !isMobile()"
        >
          <div class="horizontal-logo"/>
          <ant-menu
            :menuList="menuList"
            :theme="theme"
            :mode="mode"
            :style="{ lineHeight: '64px',  flex: '1' }"
            v-if="mode==='horizontal' && !isMobile()"
          />
          <user-menu class="user-top"></user-menu>
        </div>
        <user-menu class="user-inline" v-if="mode==='inline' || isMobile()"></user-menu>
      </a-layout-header>
      <a-layout-content
      :class="mode==='inline' || isMobile()? 'inline-content': 'horizontal-content'"
      :style="headerFixed? { marginTop: '80px'}: {}"
      >
        <transition name="slide-fade">
          <router-view :style="mode === 'horizontal' ? { minWidth: '1200px'} : {}"></router-view>
        </transition>
      </a-layout-content>
      <a-layout-footer style="text-align: center">
        ©2020 Created by Einolda
      </a-layout-footer>
      <div>
        <a-back-top />
        <strong style="color: rgba(64, 64, 64, 0.6)"></strong>
      </div>
    </a-layout>
  </a-layout>
</template>
<script>
import antMenu from '@/components/menu'
import userMenu from '@/components/userMenu'
import { mapGetters } from 'vuex'
import { mixinDevice, AppDeviceEnquire } from '@/util/mixin'
export default {
  mixins: [mixinDevice, AppDeviceEnquire],
  data () {
    return {
      collapsed: false
    }
  },
  components: {
    antMenu,
    userMenu
  },
  computed: {
    ...mapGetters({
      theme: 'getTheme',
      menuList: 'menuList',
      mode: 'getLayoutMode',
      sideFixed: 'getSideFixed',
      headerFixed: 'getHeaderFixed'
    })
  },
  methods: {
    toggleCollapsed () {
      this.collapsed = !this.collapsed
    },
    drawerClose () {
      this.collapsed = false
    },
    headerSetting () {
      if (this.headerFixed && this.mode === 'horizontal') {
        return 'header-fixed-horizontal'
      } else if (this.headerFixed && this.mode === 'inline' && this.isDesktop() && !this.collapsed) {
        return 'header-fixed'
      } else if (this.headerFixed && this.mode === 'inline' && this.isDesktop() && this.collapsed) {
        return 'header-fixed-inline-collapsed'
      } else if (this.headerFixed && this.mode === 'inline' && this.isTablet() && !this.collapsed) {
        return 'header-fixed'
      } else if (this.headerFixed && this.mode === 'inline' && this.isTablet() && this.collapsed) {
        return 'header-fixed-inline-collapsed'
      } else if (this.headerFixed && this.isMobile()) {
        return 'header-fixed-horizontal'
      } else {
        return ''
      }
    }
  },
  watch: {
    device () {
      if (this.isTablet()) {
        this.collapsed = true
      }
      if (this.isDesktop() || this.isMobile()) {
        this.collapsed = false
      }
    }
  }
}
</script>

<style>
.logo {
  height: 32px;
  background: rgba(255,255,255,.2);
  margin: 16px;
}
.horizontal-logo{
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 24px 16px 0;
  float: left;
}
.slide-fade-enter-active {
  transition: all 1s ease;
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateX(50px);
  opacity: 0;
}
.inline-header {
  background: #fff;
  padding: 0
}
.inline-content{
  margin: 16px 0;
  background-color: #fff;
}
.horizontal-header{
  max-width: 1200px;
  margin: 0 auto;
  width:100%;
  display: flex;
  overflow: hidden;
}
.horizontal-content{
  max-width: 1200px;
  margin: 0 auto;
  margin-top:16px;
  background-color: #fff;
  overflow: auto;
}
.drawer-sider-light {
  background-color: #fff;
  padding:0;
}
.drawer-sider-dark {
  background-color: #000;
  padding:0;
}
.ant-pro-global-header-trigger {
  height: 64px;
  padding: 19px 24px;
  font-size: 20px;
  cursor: pointer;
}
.toggle{
  cursor: pointer;
  padding: 19px 24px;
  font-size: 20px;
}
.toggle:hover{
  background-color: #f0f2f5;
}
.user-inline {
  float:right;
  margin-right:60px;
}
.user-top{
  justify-self: self-end;
}
.side-fixed{
  position:fixed;
  left:0;
  top:0;
  height:100vh;
}
.header-fixed {
  transition: all .2s;
  position: fixed;
  top:0;
  padding: 0px;
  width: calc(100% - 256px);
  z-index: 9;
  right: 0px;
}
.header-fixed-horizontal{
  transition: all .2s;
  position: fixed;
  top:0;
  padding: 0px;
  width: 100vw;
  z-index: 9;
  right: 0px;
}
.header-fixed-inline-collapsed{
  transition: all .2s;
  position: fixed;
  top:0;
  padding: 0px;
  width: calc(100% - 80px);
  z-index: 9;
  right: 0px;
}
</style>
