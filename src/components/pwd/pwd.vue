<!-- 密码修改 -->
<template>
  <div id="pwdChange">
    <a-modal title="修改密码" v-model="visible" @ok="changePwd" @cancel="cancelChangePwd"
      @after="cancelChangePwd" :cancelText="cancelText" :okText="okText"
      :okButtonProps="{props:{disabled:hasErrors(form.getFieldsError(['oldPwd,newPwd','checkPwd']))}}">
      <a-form :form="form" @submit="changePwd">
        <a-form-item label="旧密码" :help="getError(form,'oldPwd')||''" :validate-status="getError(form,'oldPwd')?'error':''">
          <a-input type="password" v-decorator="['oldPwd',{ rules: [{required:true,message:'请输入旧密码'}]}
    ]" />
        </a-form-item>
        <a-form-item label="新密码" :help="getError(form,'newPwd')||''" :validate-status="getError(form,'newPwd')?'error':''">
          <a-input :maxLength="16" type="password" v-decorator="['newPwd',{ rules: [{required:true,message:'请输入新密码'},{validator:validateToNextPassword}, { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '请输入6-16位数字或者字母密码'}]}
    ]" />
        </a-form-item>
        <a-form-item label="确认新密码" :help="getError(form,'checkPwd')||''" :validate-status="getError(form,'checkPwd')?'error':''">
          <a-input :maxLength="16" type="password" v-decorator="['checkPwd',{ rules: [{required:true,message:'请输入新密码'},{validator:compareToFirstPassword}, { pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/, message: '请输入6-16位数字或者字母密码'}]}
    ]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      cancelText: '取消',
      okText: '确定',
      form: this.$form.createForm(this, { name: 'pwd' }),
      visible: false
    }
  },
  methods: {
    getError (form, key) {
      const {
        getFieldError,
        isFieldTouched
      } = form
      return isFieldTouched(key) && getFieldError(key)
    },
    hasErrors (fieldsError) {
      return Object.keys(fieldsError).some(field => fieldsError[field])
    },
    compareToFirstPassword  (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('newPwd')) {
        var str = '两次密码输入不一致'
        callback(str)
      } else {
        callback()
      }
    },
    validateToNextPassword  (rule, value, callback) {
      const form = this.form
      form.validateFields(['checkPwd'], { force: true })
      callback()
    },
    changePwd () {
      this.$emit('change', this.form.getFieldsValue())
    },
    open () {
      this.visible = true
      this.$nextTick(() => {
        this.form.validateFields(['oldPwd', 'newPwd', 'checkPwd'])
      })
    },
    cancelChangePwd () {
      this.visible = false
      this.form.resetFields()
    }
  }
}

</script>
<style lang='less' rel='stylesheet/less' scoped>
</style>
