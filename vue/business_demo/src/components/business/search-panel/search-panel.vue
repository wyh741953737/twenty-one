<template>
  <div class="search-panel-container" v-if="showSearchPanel">
    <div class="content">
      <div v-if="controlVisible" class="control-list" ref="control" @keyup.enter="searchClick">
        <slot name="searchSlot"></slot>
      </div>
      <div class="button-list">
        <slot name="btnSlot" :searchDisabled="searchDisabled"></slot>
        <v-button v-if="searchVisible" :text="searchName" type="success" :disabled="searchDisabled" @click="searchClick"></v-button>
        <v-button v-if="resetVisible" :text="resetName" type="warning" :disabled="searchDisabled" @click="resetClick"></v-button>
        <el-dropdown v-if="isMultiExport && isPermission" trigger="click" @command="exportClick">
          <v-button>
            导出<i class="el-icon-arrow-down el-icon--right"></i>
          </v-button>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item v-for="(item, index) in multiExport" :key="index" :command="index">
              <v-button ref="dropdownButton" type="text" :text="item.text" :permission="item.permission"></v-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <v-button v-if="!isMultiExport && isPermission" :text="exportName" :disabled="exportDisabled" @click="exportClick(-1)"></v-button>
      </div>
    </div>
    <div class="footer" v-if="footerVisible">
      <img :src="status ? closeIcon : openIcon" @click="statusChange"/>
    </div>
  </div>
</template>

<script>
import openIcon from './images/open.png'
import closeIcon from './images/close.png'
export default {
  name: 'search-panel',
  props: {
    resetVisible: {
      type: Boolean,
      default: false
    },
    searchVisible: {
      type: Boolean,
      default: true
    },
    resetName: {
      type: String,
      default: '重置'
    },
    searchName: {
      type: String,
      default: '搜索'
    },
    exportName: {
      type: String,
      default: '导出'
    },
    multiExport: Array,
    switchVisible: {
      type: Boolean,
      default: true
    },
    exportPermission: {
      type: [Boolean, String],
      default: false
    }
  },
  data () {
    return {
      showSearchPanel: true,
      controlVisible: true,
      footerVisible: true,
      status: false,
      searchDisabled: false,
      exportDisabled: false,
      openIcon,
      closeIcon
    }
  },
  mounted () {
    if (!this.$slots.searchSlot) {
      this.showSearchPanel = false
    } else {
      if (this.switchVisible) {
        this.$nextTick(() => {
          if (this.$refs.control.offsetHeight === 60) {
            this.footerVisible = false
          } else {
            this.controlChange(false)
          }
        })
      } else {
        this.footerVisible = false
      }
    }
  },
  computed: {
    isMultiExport () {
      return this.multiExport && this.multiExport.length > 0
    },
    isPermission () {
      return this.$store.getters.getPermission(this.exportPermission)
    }
  },
  methods: {
    setSearchDisabled (status) {
      this.searchDisabled = status
    },
    setExportDisabled (status) {
      this.exportDisabled = status
    },
    resetClick () {
      this.$emit('resetData')
    },
    searchClick () {
      this.$emit('searchData')
    },
    exportClick (index) {
      this.$emit('exportData', index)
    },
    controlChange (status) {
      const control = this.$refs.control
      if (status) {
        control.style.height = ''
        control.style.overflow = ''
      } else {
        control.style.height = '60px'
        control.style.overflow = 'hidden'
      }
    },
    handleValue (value) {
      if (typeof value === 'string') {
        value = value.trim()
      }
      if (value === null || value === '') {
        value = undefined
      }
      return value
    },
    handleStyle (element, value) {
      if (this.handleValue(value) === undefined) {
        element.style.borderColor = ''
      } else {
        element.style.borderColor = '#67C23A'
      }
    },
    controlStatusChange () {
      const control = this.$refs.control
      const controlNumber = control && control.children && control.children.length ? control.children.length : 0
      if (controlNumber > 0) {
        const searchSlot = []
        this.$slots.searchSlot.forEach(item => {
          if (item.componentOptions || item.tag !== undefined) {
            searchSlot.push(item)
          }
        })
        for (let i = 0; i < controlNumber; i++) {
          const item = control.children[i]
          const className = item.className
          if (className) {
            const classList = className.split(' ')
            if (classList.includes('v-input-container') || classList.includes('v-input-number-container') || classList.includes('v-select-container')) {
              const element = item.querySelector('input')
              const componentOptions = searchSlot[i].componentOptions
              if (componentOptions) {
                const value = componentOptions.propsData.value
                this.handleStyle(element, value)
              }
            } else if (classList.includes('v-select2-container')) {
              const element = item.querySelector('.dropdown-toggle')
              const componentOptions = searchSlot[i].componentOptions
              if (componentOptions) {
                const value = componentOptions.propsData.value
                this.handleStyle(element, value)
              }
            } else if (classList.includes('v-datepicker-container')) {
              if (classList.includes('single-wrapper')) {
                const timeElement = item.querySelectorAll('input')[0]
                const componentOptions = searchSlot[i].componentOptions
                if (componentOptions) {
                  const { value } = componentOptions.propsData
                  this.handleStyle(timeElement, value)
                }
              } else {
                const startTimeElement = item.querySelectorAll('input')[0]
                const endTimeElement = item.querySelectorAll('input')[1]
                const componentOptions = searchSlot[i].componentOptions
                if (componentOptions) {
                  const { startTime, endTime } = componentOptions.propsData
                  this.handleStyle(startTimeElement, startTime)
                  this.handleStyle(endTimeElement, endTime)
                }
              }
            }
          }
        }
      }
    },
    statusChange () {
      this.status = !this.status
      this.controlChange(this.status)
    },
    reRenderControl () {
      this.controlVisible = false
      this.$nextTick(() => {
        this.controlVisible = true
        if (!this.status) {
          this.$nextTick(() => {
            this.controlChange(this.status)
          })
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .search-panel-container {
    background-color: #FFF;
    .content {
      display: flex;
      justify-content: space-between;
      .control-list {
        max-height: 240px;
        overflow-y: auto;
        margin-right: 5px;
        display: flex;
        align-items: flex-start;
        flex-wrap: wrap;
        font-size: 14px;
        font-weight: 400;
        .v-control {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          min-width: 260px;
          margin-bottom: 20px;
          margin-right: 20px;
        }
      }
      .button-list {
        white-space: nowrap;
        > :not(:last-child) {
          margin-right: 8px;
        }
      }
    }
    .footer {
      display: flex;
      justify-content: center;
      img {
        width: 80px;
        height: 10px;
        cursor: pointer;
      }
    }
  }
</style>
