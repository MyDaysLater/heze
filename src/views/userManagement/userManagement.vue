<!-- 用户管理 -->i
<template>
<div class="userManagement">
  <div class="search">
    <search-option @search="onSearch" @add="adduserlist" :placeholder="'请输入用户名查询'"></search-option>
  </div>
  <div class="tabel-wrapper">
      <a-table
      bordered
      :data-source="userList"
      :columns="columns"
      :loading="loading"
      :rowKey="(row, index) => index"
      >
        <template slot="state" slot-scope="text">
          <p :class="text? 'success': 'error'">{{text? '启动': '停用'}}</p>
        </template>
        <template slot="action" slot-scope="record">
          <a-row>
            <a-col>
              <a-button
                size="small"
                type="primary"
                icon="edit"
                :style="{ marginBottom: '10px', width: '94px' }"
                @click="editUser(record)"
                >编辑</a-button>
            </a-col>
            <a-col>
              <a-popconfirm
                title="要删除当前数据么"
                ok-text="确认"
                cancel-text="取消"
                @confirm="delUser(record)"
              >
                <a-button
                size="small"
                type="danger"
                icon="delete"
                :style="{ width: '94px' }"
                >删除</a-button>
              </a-popconfirm>
            </a-col>
          </a-row>
        </template>
      </a-table>
  </div>
    <a-modal
    destroyOnClose
      :title="isEdit? '编辑用户': '新增用户'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
     <a-form :form="form" :selfUpdate="true">
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="用户名">
          <a-input v-decorator="['userName',{ rules: [{ required: true, message: '请输入用户名' }] }]"/>
        </a-form-item>
        <a-form-item v-if="!isEdit" :label-col="labelCol" :wrapper-col="wrapperCol" label="密码">
          <a-input type="password" :maxLength="6" v-decorator="['password',{ rules: [{ required: true, message: '请输入密码' }, { pattern: /[0-9]{6}/, message: '请输入6位数字密码'}] }]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="角色">
          <a-select v-decorator="['roleId',{ rules: [{ required: true, message: '请选择角色' }] }]"
          @change="roleChange">
            <a-select-option v-for="(item, index) in roleList" :key="index" :value="item.value">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="银行" v-if="role === 3">
          <a-select v-decorator="['bankName',{ rules: [{ required: true, message: '请选择银行' }] }]" @change="bankChange">
            <a-select-option v-for="(item, index) in bankList" :key="index" :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="支行" :label-col="labelCol" :wrapper-col="wrapperCol" v-if="role === 3">
          <a-select v-decorator="['branch', { rules: [{ required: true, message: '请选择支行' }] }]"
          @change="branchChange"
          :disabled="!form.getFieldValue('bankName') || !branchList.length">
            <a-select-option v-for="(item, index) in branchList" :key="index" :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="网点" :label-col="labelCol" :wrapper-col="wrapperCol" v-if="role === 3">
          <a-select v-decorator="['port', { rules: [{ required: true, message: '请选择网点' }] }]" :disabled="!form.getFieldValue('branch') || !portList.length">
            <a-select-option v-for="(item, index) in portList" :key="index" :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="姓名">
          <a-input v-decorator="['perName',{ rules: [{ required: true, message: '请输入姓名' }] }]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="电话">
          <a-input :maxLength="11" v-decorator="['phone',{ rules: [{ required: true, message: '请输入电话' }, { pattern: /[0-9]{11}/, message: '请输入11位手机号码'}] }]"/>
        </a-form-item>
      </a-form>
    </a-modal>
</div>
</template>

<script>
import searchOption from '@/components/searchOption'
import { crud, bankClass, pageControler } from '@/util/mixin'
export default {
  mixins: [crud, bankClass, pageControler],
  data () {
    return {
      searchForm: this.$form.createForm(this),
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
      userList: [],
      roleList: [
        {
          value: 1,
          name: '管理员'
        },
        {
          value: 2,
          name: '运维人员'
        },
        {
          value: 3,
          name: '终端工作人员'
        }
      ],
      role: '',
      keyWord: '',
      columns: [
        {
          dataIndex: 'USER_NAME',
          title: '用户名',
          key: '1',
          align: 'center'
        },
        {
          dataIndex: 'ROLE_NAME',
          title: '角色',
          key: '2',
          align: 'center'
        },
        {
          dataIndex: 'BANKHEAD',
          title: '银行',
          align: 'center'
        },
        {
          dataIndex: 'BANK_RAMIFY',
          title: '支行',
          align: 'center'
        },
        {
          dataIndex: 'BANK_SITE',
          title: '网点',
          align: 'center'
        },
        {
          dataIndex: 'XM',
          title: '姓名',
          align: 'center'
        },
        {
          dataIndex: 'PHONE',
          title: '联系电话',
          align: 'center'
        },
        {
          key: '5',
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ]
    }
  },
  components: {
    searchOption
  },
  mounted () {
    this.userInfoList()
  },
  methods: {
    onSearch (val) {
      this.keyWord = val
      this.userInfoList()
    },
    // 获取表单的数据
    getFormValue () {
      const { userName, roleId, perName, bankName, branch, port, phone } = this.searchForm.getFieldsValue()
      const param = {
        USER_NAME: userName || '',
        USER_ROLE: roleId || '',
        PHONE: phone || '',
        XM: perName || '',
        BANKHEAD: bankName || '',
        BANK_RAMIFY: branch || '',
        BANK_SITE: port || ''
      }
      return param
    },
    adduserlist () {
      this.visible = true
    },
    userInfoList () {
      this.loading = true
      const param = this.getFormValue()
      this.$api.userList({
        USER_NAME: this.keyWord
      }).then((res) => {
        this.loading = false
        this.userList = res
      }, () => {
        this.loading = false
      })
    },
    editUser (rowData) {
      this.isEdit = true
      this.visible = true
      this.id = rowData.USER_ID
      this.role = rowData.USER_ROLE
      this.$nextTick(() => {
        this.form.setFieldsValue({
          userName: rowData.USER_NAME,
          roleId: rowData.USER_ROLE,
          perName: rowData.XM,
          phone: rowData.PHONE,
          bankName: rowData.ZONGHID
        })
        this.$nextTick(() => {
          this.bankChange(rowData.BANKHEAD).then(() => {
            this.form.setFieldsValue({
              branch: rowData.ZHIHID
            })
            return this.branchChange(rowData.BANK_RAMIFY)
          }).then(() => {
            this.form.setFieldsValue({
              port: parseInt(rowData.WDID)
            })
          })
        })
      })
    },
    delUser (rowData) {
      this.searchForm.resetFields()
      this.del({
        delApi: 'deluserList',
        param: {
          USER_ID: rowData.USER_ID
        },
        callback: () => {
          this.userInfoList()
        }
      })
    },
    handleOk () {
      const { userName, roleId, perName, phone, bankName, branch, port, password } = this.form.getFieldsValue()
      const param = {
        USER_NAME: userName,
        USER_ROLE: roleId,
        PHONE: phone,
        PASSWORD: password,
        XM: perName,
        ZONGHID: bankName || '',
        ZHIHID: branch || '',
        WDID: port || ''
      }
      if (this.isEdit) param.USER_ID = this.id
      this.add({
        editApi: 'edituserList',
        addApi: 'adduserList',
        param,
        callback: () => {
          this.userInfoList()
        }
      })
    },
    roleChange (role) {
      this.role = role
      this.form.resetFields(['bankName', 'branch', 'port'])
    }
  },
  watch: {
    visible (val) {
      if (!val) {
        this.role = ''
      }
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.userManagement{
  padding: 50px;
  .search{
    margin-bottom:20px;
  }
}
</style>
