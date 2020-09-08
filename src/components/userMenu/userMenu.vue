<template>
  <div id="user">
    <a-dropdown>
      <div
      class="user-view"
      :class="theme === 'dark' && mode === 'horizontal' && !isMobile() ? 'userMenu-dark' : ''"
      >
        <a-avatar class="avatar" icon="user" shape="square" />
        <span>{{userInfo.USER_NAME}}</span>
      </div>
      <a-menu slot="overlay">
        <a-menu-item key="1">
          <div class="menu-item" @click="openModal">
            <a-icon type="setting"/>
            <span>密码修改</span>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item key="3">
          <div @click ="logout" class="menu-item">
            <a-icon type="logout"/>
            <span>退出登录</span>
          </div>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
    <pwd ref="pwd" @change="change"></pwd>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import { mapGetters } from 'vuex'
import pwd from '../pwd'
import { mixinDevice } from '@/util/mixin'
export default {
  mixins: [mixinDevice],
  computed: {
    ...mapGetters({
      userInfo: 'getUserInfo',
      theme: 'getTheme',
      mode: 'getLayoutMode'
    })
  },
  components: {
    pwd
  },
  methods: {
    logout () {
      Cookie.remove('token')
      window.location.reload()
    },
    openModal () {
      this.$refs.pwd.open()
    },
    change (val) {
      this.$api.updatePwd({
        USER_ID: this.userInfo.USER_ID,
        oldPwd: val.oldPwd,
        newPwd: val.newPwd
      }).then(() => {
        this.$message.success('密码修改成功')
        this.$refs.pwd.cancelChangePwd()
      }, () => {})
    }
  }
}

</script>
<style lang='less' rel='stylesheet/less' scoped>
.user-view{
  cursor: pointer;
  padding: 0 20px;
  &:hover{
    background-color: #e9e9e9;
  }
  .avatar{
    margin-right:8px;
  }
}
.userMenu-dark {
  color:#fff;
  &:hover {
    background-color: #000;
  }
}
.menu-item{
  span{
    margin-left:20px;
  }
}
</style>
