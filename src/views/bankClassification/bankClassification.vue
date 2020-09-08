<!-- 银行分类 -->
<template>
  <div class="bankClassification">
    <search-option  @search="onSearch" @add="addBank" :placeholder="'输入银行名称查询'"></search-option>
    <div class="tabel-wrapper">
      <a-table
      bordered
      :data-source="list"
      :columns="columns"
      :loading="loading"
      :rowKey="(row, index) => index"
      >
        <template slot="action" slot-scope="record">
          <a-button
          type="primary"
          icon="edit"
          :style="{ marginRight: '8px' }"
          @click="editBank(record)"
          >编辑</a-button>
          <a-popconfirm
            title="要删除当前数据么"
            ok-text="确认"
            cancel-text="取消"
            @confirm="delBank(record)"
          >
            <a-button
            type="danger"
            icon="delete"
            >删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <a-modal
      destroyOnClose
      :title="isEdit? '编辑银行' : '新增银行'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <div class="radio-wrapper">
         <a-radio-group v-model="type" @change="form.resetFields()">
           <a-radio-button :value="item.value" :disabled="item.disabled" v-for="(item, index) in bankType" :key="index">{{item.name}}</a-radio-button>
        </a-radio-group>
      </div>
      <a-form :form="form" :selfUpdate="true" v-if="type===1">
        <a-form-item label="银行编码" :label-col="labelCol" :wrapper-col="wrapperCol">
           <a-input v-decorator="['bankCode',{ rules: [{ required: true, message: '请输入银行编码' }]}]"/>
        </a-form-item>
        <a-form-item label="银行名称" :label-col="labelCol" :wrapper-col="wrapperCol">
           <a-input v-decorator="['bankName',{ rules: [{ required: true, message: '请输入银行名称' }]}]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="心跳地址">
          <a-input v-decorator="['heartbeat',{ rules: [{ required: true, message: '请输入心跳地址' }]}]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="更新地址">
          <a-input v-decorator="['toupdate',{ rules: [{ required: true, message: '请输入更新地址' }]}]"/>
        </a-form-item>
      </a-form>
      <a-form :form="form" :selfUpdate="true" v-if="type===2">
        <a-form-item label="银行名称" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-select v-decorator="['bankName', { rules: [{ required: true, message: '请选择银行' }]}]">
            <a-select-option v-for="(item, index) in bankList" :key="index" :value="item.BANKID">
              {{item.BANKHEAD}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="支行">
          <a-input v-decorator="['branch',{ rules: [{ required: true, message: '请输入支行名称' }]}]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="心跳地址">
          <a-input v-decorator="['heartbeat',{ rules: [{ required: true, message: '请输入心跳地址' }]}]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="更新地址">
          <a-input v-decorator="['toupdate',{ rules: [{ required: true, message: '请输入更新地址' }]}]"/>
        </a-form-item>
      </a-form>
      <a-form :form="form" :selfUpdate="true" v-if="type===3">
        <a-form-item label="银行名称" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-select v-decorator="['bankName', { rules: [{ required: true, message: '请选择银行编号' }]}]" @change="bankChange">
            <a-select-option v-for="(item, index) in bankList" :key="index" :value="item.BANKID">
              {{item.BANKHEAD}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="支行">
          <a-select v-decorator="['branch', { rules: [{ required: true, message: '请选择支行' }]}]"
              :disabled="!form.getFieldValue('bankName') || !branchList.length">
            <a-select-option v-for="(item, index) in branchList" :key="index" :value="item.BANKID">
              {{item.BANK_RAMIFY}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="网点">
          <a-input v-decorator="['port',{ rules: [{ required: true, message: '请输入网点名称' }]}]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="心跳地址">
          <a-input v-decorator="['heartbeat',{ rules: [{ required: true, message: '请输入心跳地址' }]}]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="更新地址">
          <a-input v-decorator="['toupdate',{ rules: [{ required: true, message: '请输入更新地址' }]}]"/>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import searchOption from '@/components/searchOption'
import { crud, bankControler } from '@/util/mixin'
import clientManagementVue from '../clientManagement/clientManagement.vue'
export default {
  mixins: [crud, bankControler],
  data () {
    return {
      type: 1,
      list: [],
      bankList: [],
      branchList: [],
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
      columns: [
        {
          dataIndex: 'BANKCODE',
          title: '银行编号',
          align: 'center'
        },
        {
          dataIndex: 'BANKHEAD',
          title: '银行名称',
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
          dataIndex: 'HEARTBEAT',
          title: '心跳地址',
          align: 'center'
        },
        {
          dataIndex: 'UPDATE_STIE',
          title: '更新地址',
          align: 'center'
        },
        {
          key: 'action',
          title: '操作',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      bankType: [
        {
          name: '银行',
          value: 1,
          disabled: false
        },
        {
          name: '支行',
          value: 2,
          disabled: false
        },
        {
          name: '网点',
          value: 3,
          disabled: false
        }
      ],
      keyWord: ''
    }
  },
  components: {
    searchOption
  },
  mounted () {
    this.getBankList()
  },
  methods: {
    getBankList () {
      this.loading = true
      this.$api.bankClassifyList({
        FUZZY_DATA: this.keyWord
      }).then((res) => {
        this.loading = false
        this.list = res
      }, () => {
        this.loading = false
      })
    },
    onSearch (val) {
      this.keyWord = val
      this.getBankList()
    },
    addBank () {
      this.visible = true
    },
    editBank (rowData) {
      this.isEdit = true
      this.visible = true
      this.id = rowData.BANKID
      this.type = rowData.BANK_TYPE
      this.$nextTick(() => {
        this.bankType.forEach(item => {
          item.disabled = true
        })
        const current = this.bankType.find(item => item.value === this.type)
        current.disabled = false
        if (this.type === 1) {
          this.form.setFieldsValue({
            bankCode: rowData.BANKCODE,
            bankName: rowData.BANKHEAD,
            heartbeat: rowData.HEARTBEAT,
            toupdate: rowData.UPDATE_STIE
          })
        } else if (this.type === 2) {
          this.form.setFieldsValue({
            bankName: rowData.PREBANKID,
            branch: rowData.BANK_RAMIFY,
            heartbeat: rowData.HEARTBEAT,
            toupdate: rowData.UPDATE_STIE
          })
        } else {
          const currentBank = this.bankList.find(item => item.BANKCODE === rowData.BANKCODE)
          this.form.setFieldsValue({
            bankName: currentBank.BANKID
          })
          this.bankChange().then(() => {
            this.form.setFieldsValue({
              branch: rowData.PREBANKID,
              port: rowData.BANK_SITE,
              heartbeat: rowData.HEARTBEAT,
              toupdate: rowData.UPDATE_STIE
            })
          })
        }
      })
    },
    delBank (rowData) {
      this.del({
        delApi: 'delBank',
        param: {
          BANKID: rowData.BANKID
        },
        callback: () => {
          this.getBankList()
        }
      })
    },
    handleOk () {
      var values = this.form.getFieldsValue()
      var param = {}
      if (this.type === 1) {
        param = {
          BANKHEAD: values.bankName,
          BANKCODE: values.bankCode,
          BANK_TYPE: this.type,
          HEARTBEAT: values.heartbeat,
          UPDATE_STIE: values.toupdate
        }
      } else if (this.type === 2) {
        const currentBank = this.bankList.find(item => item.BANKID === values.bankName)
        param = {
          BANKHEAD: currentBank.BANKHEAD,
          PREBANKID: currentBank.BANKID,
          BANKCODE: currentBank.BANKCODE,
          BANK_RAMIFY: values.branch,
          BANK_TYPE: this.type,
          HEARTBEAT: values.heartbeat,
          UPDATE_STIE: values.toupdate
        }
      } else {
        const currentBank = this.bankList.find(item => item.BANKID === values.bankName)
        const currentBranch = this.branchList.find(item => item.BANKID === values.branch)
        param = {
          BANKHEAD: currentBank.BANKHEAD,
          PREBANKID: currentBranch.BANKID,
          BANKCODE: currentBank.BANKCODE,
          BANK_RAMIFY: currentBranch.BANK_RAMIFY,
          BANK_TYPE: this.type,
          BANK_SITE: values.port,
          HEARTBEAT: values.heartbeat,
          UPDATE_STIE: values.toupdate
        }
      }
      if (this.isEdit) param.BANKID = this.id
      this.add({
        editApi: 'updateBank',
        addApi: 'addBank',
        param,
        callback: () => {
          this.getBankList()
        }
      })
    },
    handleCancel () {
      this.visible = false
      this.id = ''
      this.isEdit = false
      this.form.resetFields()
      this.bankType.forEach(item => {
        item.disabled = false
      })
    }
  }
}
</script>

<style lang='scss' rel='stylesheet/scss' scoped>
.bankClassification{
  padding: 50px;
  .tabel-wrapper{
    margin-top:20px;
  }
}
.radio-wrapper{
  text-align: center;
  margin-bottom:30px;
}
</style>
