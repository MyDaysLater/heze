<!-- 制卡记录 -->
<template>
  <div class="cardPrintingRecord">
    <div class="search-options">
      <a-form :form="form">
      <a-row>
         <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
           <a-form-item label="银行名称" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['bankName']" @change="bankChange">
                <a-select-option v-for="(item, index) in bankList" :key="index" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
           <a-form-item label="支行" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['branch']" @change="branchChange"
              :disabled="!form.getFieldValue('bankName') || !branchList.length"
              >
                <a-select-option v-for="(item, index) in branchList" :key="index" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
           <a-form-item label="网点" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-select v-decorator="['port']" :disabled="!form.getFieldValue('branch') || !portList.length">
                 <a-select-option v-for="(item, index) in portList" :key="index" :value="item.id">
                  {{item.name}}
                </a-select-option>
              </a-select>
            </a-form-item>
         </a-col>
      </a-row>
      <a-row>
          <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
           <a-form-item label="终端编号" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-input v-decorator="['clientid']"/>
            </a-form-item>
         </a-col>
          <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
           <a-form-item label="制卡时间" :label-col="labelCol" :wrapper-col="wrapperCol">
              <a-date-picker v-decorator="['date', { type: 'object' }]" />
            </a-form-item>
         </a-col>
         <a-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
           <a-form-item label="身份证号码" :label-col="labelCol" :wrapper-col="wrapperCol">
            <a-input v-decorator="['perCard']"/>
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
            type="danger"
            icon="delete"
            :style="{ marginRight: '8px' }"
            @click="cleared"
            >
              清空
            </a-button>
              <a-button icon="download" @click="download">下载</a-button>
          </a-col>
        </a-row>
      </a-form>
    </div>
     <a-row type="flex" class="detail">
      <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <p>办卡总数量{{total}}</p>
      </a-col>
      <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <p class="success">出卡数量{{dispend}}</p>
      </a-col>
      <a-col :xs="24" :sm="24" :md="4" :lg="4" :xl="4">
        <p class="error">卡损数量{{loss}}</p>
      </a-col>
    </a-row>
    <div class="table">
      <a-table
      bordered
      :data-source="cardList"
      :pagination="pagination"
      :columns="columns"
      :loading="loading"
      @change="handleTableChange"
      :rowKey="(row, index) => index"
      >
        <template slot="time" slot-scope="time">
          <p>{{format(time)}}</p>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { bankClass, pageControler } from '@/util/mixin'
export default {
  mixins: [bankClass, pageControler],
  data () {
    return {
      form: this.$form.createForm(this),
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
      total: 0,
      dispend: 0,
      loss: 0,
      down: [],
      panelOpen: false,
      loading: false,
      cardList: [],
      listApi: 'detailInfo',
      columns: [
        {
          dataIndex: 'ROW_ID',
          title: '序号',
          align: 'center'
        },
        {
          dataIndex: 'xm',
          title: '姓名',
          align: 'center'
        },
        {
          dataIndex: 'SJHM',
          title: '手机号码',
          align: 'center'
        },
        {
          dataIndex: 'SBKH',
          title: '社保卡号',
          align: 'center'
        },
        {
          dataIndex: 'SBKCTZH',
          title: '社保卡磁条账号',
          align: 'center',
          width: 100
        },
        {
          dataIndex: 'CARD_TIME',
          title: '时间',
          sorter: true,
          align: 'center',
          width: 200,
          scopedSlots: { customRender: 'time' }
        }
      ]
    }
  },
  mounted () {
    this.detailInfo()
  },
  methods: {
    getFormValue () {
      var bankId = ''
      const { bankName, port, branch, clientid, date, month, perCard } = this.form.getFieldsValue()
      if (port) {
        bankId = port
      } else if (branch) {
        bankId = branch
      } else {
        bankId = bankName
      }
      const param = {
        BANKID: bankId || '',
        CARD_TIME: date ? date.format('YYYY-MM-DD') : '',
        CLIENTID: clientid || '',
        SFZHM: perCard || '',
        pageSize: this.pagination.pageSize,
        pageNo: this.pagination.current,
        SORT: this.orderby
      }
      return param
    },
    onSearch () {
      this.detailInfo()
    },
    download () {
      const param = this.getFormValue()
      var ret = ''
      for (var k in param) {
        if (ret !== '') {
          ret += '&'
        }
        ret += encodeURIComponent(k) + '=' + encodeURIComponent(param[k])
      }
      window.location.href = this.baseURL + '/data/dataExport?' + ret
    },
    // 定义一个函数
    detailInfo () {
      this.loading = true
      const param = this.getFormValue()
      this.$api.cardState(param).then((res) => {
        this.loading = false
        this.$set(this.pagination, 'total', res.total)
        this.cardList = res.list
        this.dispend = res.WIN
        this.loss = res.FAIL
        this.total = res.AMOUNT
      }, () => {
        this.loading = false
      })
    },
    format (val) {
      var reg = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(.*)/
      return val.replace(reg, '$1-$2-$3 $4:$5:$6')
    }
  }
}
</script>

<style lang='less' rel='stylesheet/less' scoped>
@import '../../style/state.less';
.cardPrintingRecord {
  padding:50px;
  .detail {
    margin: 15px 0;
  }
}
.ant-form-item-children > span{
  width:100%;
}
.error {
  color: @error;
}
.success{
  color: @success;
}
</style>
