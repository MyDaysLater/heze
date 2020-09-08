<!-- 终端管理 -->
<template>
  <div class="clientManagement">
    <div class="search">
      <a-form :form="searchForm" labelAlign='left' :selfUpdate="true">
        <a-row>
          <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-form-item label="模糊查询" :label-col="searchLableCol" :wrapper-col="wrapperCol">
              <a-input v-decorator="['vague']"/>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-form-item label="关键字" :label-col="searchLableCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['keyWord']">
                  <a-select-option v-for="(item, index) in keyWordList" :key="index" :value="item.value">{{item.name}}</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-form-item label="终端状态" :label-col="searchLableCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['status']">
                  <a-select-option :value="1">停用</a-select-option>
                  <a-select-option :value="0">启用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row>
          <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-form-item label="银行名称" :label-col="searchLableCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['bankName']" @change="bankChange">
                <a-select-option v-for="(item, index) in bankList" :key="index" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-form-item label="支行" :label-col="searchLableCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['branch']" @change="branchChange"
              :disabled="!searchForm.getFieldValue('bankName') || !branchList.length"
              >
                <a-select-option v-for="(item, index) in branchList" :key="index" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
           <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-form-item label="网点" :label-col="searchLableCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['port']" :disabled="!searchForm.getFieldValue('branch') || !portList.length">
                <a-select-option v-for="(item, index) in portList" :key="index" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
         <a-row>
        <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button
            icon="search"
            type="primary"
            :style="{ marginRight: '8px' }"
            @click="onSearch"
            >
              查询
            </a-button>
            <a-button
            icon="plus"
            :style="{ marginRight: '8px' }"
            @click="addClient"
            >新增</a-button>
            <a-button
            type="danger"
            icon="delete"
            :style="{ marginRight: '8px' }"
            @click="clear('searchForm')"
            >
              清空
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="tabel-wrapper">
      <a-table
      :scroll="{ x: 2600 }"
      :data-source="clientManageList"
      :columns="columns"
      :loading="loading"
      :pagination="pagination"
      :rowKey="(row, index) => index"
      >
        <template slot="state" slot-scope="text">
          <a-badge status="success"  v-if="text==0" text="启动" />
          <a-badge status="error" v-else text="停用"/>
        </template>
        <template slot="action" slot-scope="record">
          <a-button
          type="primary"
          icon="edit"
          :style="{ marginRight: '8px' }"
          @click="editClient(record)"
          >编辑</a-button>
          <a-popconfirm
            title="要删除当前数据么"
            ok-text="确认"
            cancel-text="取消"
            @confirm="delbank(record)"
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
      :title="isEdit ? '编辑终端': '新增终端'"
      :visible="visible"
      :confirm-loading="confirmLoading"
      @ok="handleOk"
      @cancel="handleCancel"
      >
      <a-form :form="form" :selfUpdate="true">
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="终端编号">
          <a-input v-decorator="['clientid',{ rules: [{ required: true, message: '请输入终端编号' }] }]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="银行">
          <a-select v-decorator="['bankName',{ rules: [{ required: true, message: '请选择银行' }] }]" @change="bankChange">
            <a-select-option v-for="(item, index) in bankList" :key="index" :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="支行" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-select v-decorator="['branch', { rules: [{ required: true, message: '请选择支行' }] }]"
          @change="branchChange"
          :disabled="!form.getFieldValue('bankName') || !branchList.length">
            <a-select-option v-for="(item, index) in branchList" :key="index" :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="网点" :label-col="labelCol" :wrapper-col="wrapperCol">
          <a-select v-decorator="['port', { rules: [{ required: true, message: '请选择网点' }] }]" :disabled="!form.getFieldValue('branch') || !portList.length">
            <a-select-option v-for="(item, index) in portList" :key="index" :value="item.id">
              {{item.name}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="部署地址">
          <a-input v-decorator="['addres',{ rules: [{ required: true, message: '请输入部署地址' }] }]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="终端类型">
          <a-input v-decorator="['type',{ rules: [{ required: true, message: '请选择终端类型' }] }]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="备注">
          <a-input v-decorator="['remarks']"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="设备码">
           <a-input v-decorator="['equipment',{ rules: [{ required: true, message: '请输入设备码' }] }]"/>
        </a-form-item>
         <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="PASM卡号">
          <a-input v-decorator="['pcard',{ rules: [{ required: true, message: '请输入PASM卡号' }] }]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="经办人编号">
          <a-input v-decorator="['handing',{ rules: [{ required: true, message: '请输入经办人编号' }] }]"/>
        </a-form-item>
         <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="IP地址">
          <a-input v-decorator="['ipadress',{ rules: [{ required: true, message: '请输入IP地址' }] }]"/>
        </a-form-item>
         <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="终端功能配置">
          <a-input v-decorator="['configuration',{ rules: [{ required: true, message: '请输入终端配置' }] }]"/>
        </a-form-item>
         <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="联系人">
          <a-input v-decorator="['contact',{ rules: [{ required: true, message: '请输入联系人' }] }]"/>
        </a-form-item>
         <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="联系人电话">
         <a-input :maxLength="11" v-decorator="['phone',{ rules: [{ required: true, message: '请输入联系电话' }, { pattern: /[0-9]{11}/, message: '请输入11位手机号码'}] }]"/>
        </a-form-item>
        <a-form-item :label-col="labelCol" :wrapper-col="wrapperCol" label="终端状态">
          <a-switch v-decorator="['status', { valuePropName: 'checked' }]" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { crud, bankClass, pageControler } from '@/util/mixin'
export default {
  mixins: [crud, bankClass, pageControler],
  data () {
    return {
      searchForm: this.$form.createForm(this),
      searchLableCol: { span: 5 },
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      visible: false,
      clientManageList: [],
      addclientManageList: [],
      editclientManageList: [],
      deletclientManageList: [],
      listApi: 'clientInfo',
      oldClient: '',
      columns: [
        {
          dataIndex: 'CLIENTID',
          title: '终端编号',
          align: 'center'
        },
        {
          dataIndex: 'ADDRESS',
          title: '部署地址',
          align: 'center'
        },
        {
          dataIndex: 'TYPE',
          title: '终端类型',
          align: 'center'
        },
        {
          dataIndex: 'REMARK',
          title: '备注',
          align: 'center'
        },
        {
          dataIndex: 'STATUS',
          title: '终端状态',
          align: 'center',
          scopedSlots: { customRender: 'state' }
        },
        {
          dataIndex: 'SBM',
          title: '设备码',
          align: 'center'
        },
        {
          dataIndex: 'PSAMKH',
          title: 'PASM卡号',
          align: 'center'
        },
        {
          dataIndex: 'JBR',
          title: '经办人编号',
          align: 'center'
        },
        {
          dataIndex: 'BANKID',
          title: '所属银行ID',
          align: 'center'
        },
        {
          dataIndex: 'IP_ADDR',
          title: 'IP地址',
          align: 'center'
        },
        {
          dataIndex: 'CLIENT_FUNCTION',
          title: '终端功能配置',
          align: 'center'
        },
        {
          dataIndex: 'CONTACTS',
          title: '联系人',
          align: 'center'
        },
        {
          dataIndex: 'PHONE',
          title: '联系人电话',
          align: 'center'
        },
        {
          key: 'action',
          title: '操作',
          align: 'center',
          fixed: 'right',
          scopedSlots: { customRender: 'action' }
        }
      ],
      keyWordList: [
        {
          name: '终端编号',
          value: 'CLIENTID'
        },
        {
          name: '所属银行ID',
          value: 'BANKID'
        },
        {
          name: '部署地址',
          value: 'ADDRESS'
        },
        {
          name: '终端类型',
          value: 'TYPE'
        },
        {
          name: '备注',
          value: 'REMARK'
        },
        {
          name: '设备码',
          value: 'SBM'
        },
        {
          name: 'PASM卡号',
          value: 'PSAMKH'
        },
        {
          name: '经办人编号',
          value: 'JBR'
        },
        {
          name: 'IP地址',
          value: 'IP_ADDR'
        },
        {
          name: '终端功能配置',
          value: 'CLIENT_FUNCTION'
        },
        {
          name: '联系人',
          value: 'CONTACTS'
        },
        {
          name: '联系人电话',
          value: 'PHONE'
        }
      ]
    }
  },
  mounted () {
    this.clientInfo()
  },
  methods: {
    // 获取表单的数据
    getFormValue () {
      var bankId = ''
      const { vague, keyWord, status, bankName, branch, port } = this.searchForm.getFieldsValue()
      if (port) {
        bankId = port
      } else if (branch) {
        bankId = branch
      } else {
        bankId = bankName
      }
      const param = {
        VAGUE_DATA: vague || '',
        VAGUE_NAME: keyWord || '',
        BANKID: bankId || '',
        STATUS: status === 0 || status === 1 ? status : ''
      }
      return param
    },
    // 点击新增对应的列表事件
    addClient (rowData) {
      this.visible = true
    },
    // 查询事件
    onSearch () {
      this.clientInfo()
    },
    addlist () {

    },
    // 自定义函数事件
    clientInfo (data = {}) {
      this.loading = true
      const param = this.getFormValue()
      this.$api.clientManageList(param).then((res) => {
        this.loading = false
        this.clientManageList = res
      }, () => {
        this.loading = false
      })
    },
    // 编辑事件
    editClient (rowData) {
      this.visible = true
      this.isEdit = true
      this.$nextTick(() => {
        this.oldClient = rowData.CLIENTID
        this.form.setFieldsValue({
          bankName: rowData.PARENT,
          clientid: rowData.CLIENTID,
          type: rowData.TYPE,
          remarks: rowData.REMARK,
          equipment: rowData.SBM,
          pcard: rowData.PSAMKH,
          handing: rowData.JBR,
          ipadress: rowData.IP_ADDR,
          configuration: rowData.CLIENT_FUNCTION,
          contact: rowData.CONTACTS,
          phone: rowData.PHONE,
          addres: rowData.ADDRESS,
          status: rowData.STATUS ? false : true
        })
        this.bankChange(rowData.PARENT).then(() => {
          this.form.setFieldsValue({
            branch: rowData.PREBANKID
          })
          return this.branchChange(rowData.PREBANKID)
        }).then(() => {
          this.form.setFieldsValue({
            port: parseInt(rowData.BANKID)
          })
        })
      })
    },
    handleOk () {
      const {
        clientid,
        port,
        bankName,
        branch,
        type,
        remarks,
        equipment,
        pcard,
        handing,
        ipadress,
        status,
        addres,
        configuration,
        contact,
        phone
      } = this.form.getFieldsValue()
      const param = {
        OLD_CLIENTID: this.oldClient,
        NEW_CLIENTID: clientid === this.oldClient ? '' : clientid,
        ADDRESS: addres,
        TYPE: type,
        REMARK: remarks || '',
        STATUS: status ? 0 : 1,
        SBM: equipment,
        PSAMKH: pcard,
        JBR: handing,
        BANKID: port,
        IP_ADDR: ipadress,
        CLIENT_FUNCTION: configuration,
        CONTACTS: contact,
        PHONE: phone
      }
      this.add({
        editApi: 'editclientManageList',
        addApi: 'addclientManageList',
        param,
        callback: () => {
          this.clientInfo()
        }
      })
    },
    delbank (rowData) {
      console.log(rowData)
      this.del({
        delApi: 'deletclientManageList',
        param: {
          CLIENTID: rowData.CLIENTID
        },
        callback: () => {
          this.clientInfo()
        }
      })
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
.clientManagement{
  padding: 50px;
  .tabel-wrapper{
    margin-top: 20px;
  }
}
</style>
