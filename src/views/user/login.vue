<!-- 登录 -->
<template>
  <div class="login">
    <a-form
    :form="form"
    @submit="login"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'userName',
            {rules: [{ required: true, message: '请输入账号' }, { validateTrigger: 'blur' }]}
          ]"
          placeholder="账号"
        >
          <a-icon slot="prefix" type="user" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          type="password"
          v-decorator="[
            'password',
            {rules: [{required: true, message: '请输入密码'}, { validateTrigger: 'blur' }]}
          ]"
          placeholder="密码"
        >
          <a-icon slot="prefix" type="lock" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" block html-type="submit" size="large" :loading="loading">login</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import Cookie from 'js-cookie'
import clientManagementVue from '../clientManagement/clientManagement.vue'
export default {
  data () {
    return {
      form: this.$form.createForm(this),
      loading: false
    }
  },
  methods: {
    login (e) {
      e.preventDefault()
      this.loading = true
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$api.login({
            USER_NAME: values.userName,
            PASSWORD: values.password
          }).then((res) => {
            console.log(res)
            Cookie.set('token', res.token)
            this.loading = false
            this.$router.push({ path: '/' })
          }, () => {
            this.loading = false
          })
        } else {
          this.loading = false
        }
      })
    }
  }
}

</script>
<style lang='less' rel='stylesheet/less' scoped>
.login{
  width:350px;
  margin:0 auto;
}
</style>
