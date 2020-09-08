import { deviceEnquire, DEVICE_TYPE } from '@/util/device'
import { mapGetters } from 'vuex'

export const mixinDevice = {
  computed: {
    ...mapGetters({
      device: 'getDeviceType'
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}
export const AppDeviceEnquire = {
  mounted () {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('SET_DEVICE', 'desktop')
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('SET_DEVICE', 'tablet')
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('SET_DEVICE', 'mobile')
          break
      }
    })
  }
}

export const crud = {
  data () {
    return {
      form: this.$form.createForm(this),
      confirmLoading: false,
      isEdit: false,
      visible: false,
      loading: false
    }
  },
  methods: {
    add ({ editApi, addApi, param, callback }) {
      this.confirmLoading = true
      this.form.validateFields((error, values) => {
        if (!error) {
          const API = this.isEdit ? editApi : addApi
          const success = this.isEdit ? '编辑成功' : '添加成功'
          this.$api[API](param).then(() => {
            this.handleCancel()
            this.$message.success(success)
            this.confirmLoading = false
            callback()
          }, () => {
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    del ({ delApi, param, callback }) {
      this.loading = true
      this.$api[delApi](param).then(() => {
        this.$message.success('删除成功')
        callback()
      }, () => {
        this.loading = false
      })
    },
    handleCancel () {
      this.form.resetFields()
      this.visible = false
      this.isEdit = false
      this.oldClient = ''
      this.id = ''
    }
  }
}
export const bankControler = {
  data () {
    return {
      bankList: [],
      branchList: [],
      portList: []
    }
  },
  mounted () {
    this.$api.bankClassifyList({
      BANK_TYPE: 1
    }).then((res) => {
      var arr = res.map(item => {
        var obj = {
          BANKHEAD: item.BANKHEAD,
          BANKID: item.BANKID,
          BANKCODE: item.BANKCODE
        }
        return obj
      })
      this.bankList = arr
    })
  },
  methods: {
    clear () {
      this.branchList = []
      this.portList = []
      this.searchForm.resetFields()
    },
    async bankChange (val) {
      const result = await this.$api.bankClassifyList({
        BANKID: val,
        BANK_TYPE: 2
      })
      this.branchList = result.map(item => {
        var obj = {
          BANKID: item.BANKID,
          BANK_RAMIFY: item.BANK_RAMIFY
        }
        return obj
      })
    }
  }
}
export const pageControler = {
  data () {
    return {
      orderby: '',
      pagination: {
        current: 1,
        onChange: this.pageChange,
        onShowSizeChange: this.sizeChange,
        pageSize: 10, // 每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '50'], // 每页中显示的数据
        showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
      }
    }
  },
  methods: {
    handleTableChange (pagination, filters, sorter) {
      if (!Object.entries(sorter).length) {
        return
      }
      if (sorter.order) {
        this.orderby = sorter.order === 'ascend' ? 'Y' : ''
      } else {
        this.orderby = ''
      }
      this[this.listApi]()
    },
    pageChange (val) {
      this.$set(this.pagination, 'current', val)
      this[this.listApi]()
    },
    sizeChange (current, size) {
      this.$set(this.pagination, 'current', 1)
      this.$set(this.pagination, 'pageSize', size)
      this[this.listApi]()
    }
  }
}
export const bankClass = {
  data () {
    return {
      bankList: [],
      branchList: [],
      portList: []
    }
  },
  mounted () {
    this.$api.bankClassifyList({
      BANK_TYPE: 1
    }).then((res) => {
      var arr = res.map(item => {
        var obj = {
          name: item.BANKHEAD,
          id: item.BANKID
        }
        return obj
      })
      this.bankList = arr
    })
  },
  methods: {
    clear (form = 'form') {
      this.branchList = []
      this.portList = []
      this[form].resetFields()
    },
    cleared () {
      this.branchList = []
      this.portList = []
      this.form.resetFields()
    },
    async bankChange (val) {
      this.form.resetFields(['branch', 'port'])
      const result = await this.$api.bankClassifyList({
        BANKID: val,
        BANK_TYPE: 2
      })
      this.branchList = result.map(item => {
        var obj = {
          id: item.BANKID,
          name: item.BANK_RAMIFY
        }
        return obj
      })
    },
    async branchChange (val) {
      this.form.resetFields(['port'])
      const result = await this.$api.bankClassifyList({
        BANKID: val,
        BANK_TYPE: 3
      })
      this.portList = result.map(item => {
        var obj = {
          id: item.BANKID,
          name: item.BANK_SITE
        }
        return obj
      })
    }
  }
}
