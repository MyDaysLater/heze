<template>
  <div class="mainBoard">
    <div class="search">
      <a-form :form="form">
         <a-row type="flex" jusity="space-between">
          <a-col :span="8">
            <a-form-item label="终端编号" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input v-decorator="['clientid']"/>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="联网状态" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['networkStatus']">
                  <a-select-option :value="2">离线</a-select-option>
                  <a-select-option :value="1">在线</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item label="外设状态" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['deviceStatus']">
                  <a-select-option :value="1">异常</a-select-option>
                  <a-select-option :value="0">正常</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
        </a-row>
        <a-row type="flex" jusity="space-between">
           <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-form-item label="银行名称" :label-col="{ span: 6}" :wrapper-col="wrapperCol">
              <a-select v-decorator="['bankName']" @change="bankChange">
                <a-select-option v-for="(item, index) in bankList" :key="index" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
           <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-form-item label="支行" :label-col="{ span: 6}" :wrapper-col="wrapperCol">
              <a-select v-decorator="['branch']" @change="branchChange"
              :disabled="!branchList.length && !form.getFieldValue('bankName')">
                <a-select-option v-for="(item, index) in branchList" :key="index" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <a-form-item label="网点" :label-col="{ span: 6}" :wrapper-col="wrapperCol">
              <a-select v-decorator="['port']" :disabled="!portList.length && !form.getFieldValue('branch')">
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
            @click="getList"
             >
             查询
            </a-button>
            <a-button
            icon="delete"
            type="danger"
            :style="{ marginRight: '8px' }"
            @click="reset"
             >
             清空
              </a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
    <div class="list">
      <div class="client-list">
        <a-table
        :customRow="customRow"
        :columns ="columns"
        :data-source="list"
        :loading="loading"
        :rowKey="(row, index) => index"
        >
          <template slot="clientOnLine" slot-scope="record">
            <a-badge :status="record === 1 ? 'success' : 'error'" :text="record === 1 ? '在线' : '离线'"/>
          </template>
          <template slot="status" slot-scope="record">
            <a-icon type="bell" :class="record === 0 ? 'success' : 'error'" />
          </template>
        </a-table>
      </div>
    </div>
    <a-modal :visible="visible" @cancel="cancel" :footer="null"   :width="'80vw'" :title="'设备状态'">
      <a-table
      :columns ="innerColumns"
      :data-source="innerData"
      :loading="innerLoading"
      :pagination="false"
      :rowKey="(row, index) => index"
      >
        <template slot="deviceStatus" slot-scope="state">
          <a-badge :status="state === 0 ? 'success' : 'error' " :text="state == 0 ? '正常' : '异常'" />
        </template>
      </a-table>
    </a-modal>
  </div>
</template>

<script>
import { bankClass } from '@/util/mixin'
import { mapMutations } from 'vuex'
export default {
  mixins: [bankClass],
  data () {
    return {
      visible: false,
      form: this.$form.createForm(this),
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      loading: false,
      columns: [
        {
          dataIndex: 'CLIENTID',
          title: '终端编号',
          align: 'center'
        },
        {
          dataIndex: 'clientStatus',
          title: '在线状态',
          align: 'center',
          scopedSlots: { customRender: 'clientOnLine' }
        },
        {
          dataIndex: 'clientVersion',
          title: '软件版本',
          align: 'center'
        },
        {
          dataIndex: 'BANK_SITE',
          title: '网点名称',
          align: 'center'
        },
        {
          dataIndex: 'clientWSStatus',
          title: '外设预警',
          align: 'center',
          scopedSlots: { customRender: 'status' }
        }
      ],
      list: [],
      innerColumns: [
        {
          dataIndex: 'devName',
          align: 'center',
          title: '外设名称'
        },
        {
          dataIndex: 'devId',
          align: 'center',
          title: '外设状态',
          scopedSlots: { customRender: 'deviceStatus' }
        },
        {
          dataIndex: 'errorInfo',
          align: 'center',
          title: '预警'
        }
      ],
      innerData: [],
      innerLoading: false
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    ...mapMutations(['clearToken']),
    getList () {
      this.loading = true
      var bankId = ''
      const { bankName, branch, clientid, deviceStatus, networkStatus, port } = this.form.getFieldsValue()
      if (port) {
        bankId = port
      } else if (branch) {
        bankId = branch
      } else {
        bankId = bankName
      }
      const param = {
        BANKID: bankId || '',
        CLIENTID: clientid || '',
        WSSTATUS: (deviceStatus === 0 || deviceStatus === 1) ? deviceStatus : '',
        SBSTATUS: networkStatus || ''
      }
      this.$api.clientList(param).then((res) => {
        this.loading = false
        this.list = res
      }, () => {
        this.loading = false
      })
    },
    reset () {
      this.branchList = []
      this.portList = []
      this.form.resetFields()
    },
    customRow (rowData) {
      return {
        on: {
          click: () => {
            if (rowData.clientWSStatus === 0) return
            this.visible = true
            this.innerLoading = true
            this.$api.innerData({
              clientid: rowData.CLIENTID
            }).then((res) => {
              console.log(res)
              this.innerLoading = false
              if (!res) return
              this.innerData = res
            }, () => {
              this.innerLoading = false
            })
          }
        }
      }
    },
    cancel () {
      this.clearToken()
      this.visible = false
      this.innerLoading = false
      this.innerData = []
    }
  }
}
</script>

<style lang="less" rel='stylesheet/less' scoped>
@import '../../style/state.less';
.mainBoard{
  padding: 50px;
  .search {
    margin-bottom: 50px;
  }
}
.error{
  color: @error;
}
.success{
  color: @success;
}
</style>
