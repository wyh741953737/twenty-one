<template>
    <popup
      v-model="show"
      class="orderselect-wrapper"
      closeable
      position="bottom"
      @close="submit"
    >
      <cell-group :border="false" style="background-color: #F0F2F2;">
        <div class="select-top">
          <cell title="分类" :border="false" class="cell"/>
          <ul class="orderStatus-container">
            <li :class="['orderStatus-button',{'active':categoryStatus === type.value}]"
            v-for="(type,index) in categoryStatusList"
            :key="index"
            @click="categoryClick(type)">
              {{type.text}}
            </li>
          </ul>
          <cell title="状态" :border="false" class="cell"/>
          <ul class="orderStatus-container">
            <li :class="['orderStatus-button',{'active':deviceStatus === type.value}]"
            v-for="(type,index) in deviceStatusList"
            :key="index"
            @click="deviceStatusClick(type)">
              {{type.text}}
            </li>
          </ul>
          <cell title="是否有维保负责人" :border="false" class="cell"/>
          <ul class="orderStatus-container">
            <li :class="['orderStatus-button',{'active':chargeStatus === type.value}]"
                v-for="(type,index) in chargeAndInspectionList"
                :key="index"
                @click="hasChargeClick(type)">
            {{type.text}}
            </li>
          </ul>
          <cell title="是否有巡检负责人" :border="false" class="cell"/>
          <ul class="orderStatus-container">
            <li :class="['orderStatus-button',{'active':inspectionStatus === type.value}]"
                v-for="(type,index) in chargeAndInspectionList"
                :key="index"
                @click="inspectionClick(type)">
            {{type.text}}
            </li>
          </ul>
          <cell title="是否正常" :border="false" class="cell"/>
          <ul class="orderStatus-container">
            <li :class="['orderStatus-button',{'active':isNormalStatus === type.value}]"
                v-for="(type,index) in normalList"
                :key="index"
                @click="isNormalClick(type)">
            {{type.text}}
            </li>
          </ul>
        </div>
        <div class="primary-button-config" @click="submit">确定</div>
      </cell-group>
    </popup>
</template>

<script>
import Vue from 'vue'
import { listCategory } from '../api'
const { components } = Vue.prototype.$getMicroAppExternals()
const { Cell, CellGroup, Popup } = components

export default {
  name: 'device-select',
  components: {
    Cell,
    CellGroup,
    Popup
  },
  props: {
    // 双向绑定
    value: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      show: this.value,
      categoryStatus: '',
      deviceStatus: '',
      chargeStatus: '',
      inspectionStatus: '',
      isNormalStatus: '',
      deviceStatusList: [{
        text: '全部',
        value: ''
      }, {
        text: '停用',
        value: '0'
      }, {
        text: '在用',
        value: '1'
      }, {
        text: '已报废',
        value: '2'
      }, {
        text: '已删除',
        value: '3'
      }],
      categoryStatusList: [],
      chargeAndInspectionList: [{
        text: '全部',
        value: ''
      }, {
        text: '无',
        value: '0'
      }, {
        text: '有',
        value: '1'
      }],
      normalList: [{
        text: '全部',
        value: ''
      }, {
        text: '故障',
        value: '0'
      }, {
        text: '正常',
        value: '1'
      }]
    }
  },
  mounted () {
    this.getCategoryData()
  },
  methods: {
    // 获取设备分类数据
    async getCategoryData () {
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: listCategory
        })
        if (status === 100 && data.length > 0) {
          this.categoryStatusList = data.map(item => {
            const result = {}
            result.text = item.caseTypeName
            result.value = item.caseTypeId
            return result
          })
          this.categoryStatusList.unshift({ text: '全部', value: '' })
        }
      } catch (e) {
        return -1
      }
    },
    // 设备台账分类点击
    categoryClick (type) {
      this.categoryStatus = type.value
    },
    // 设备台账状态点击
    deviceStatusClick (type) {
      this.deviceStatus = type.value
    },
    // 是否有维保负责人
    hasChargeClick (type) {
      this.chargeStatus = type.value
    },
    // 是否有巡检负责人
    inspectionClick (type) {
      this.inspectionStatus = type.value
    },
    // 是否正常
    isNormalClick (type) {
      this.isNormalStatus = type.value
    },
    submit () {
      // 点击确定按钮之后即收齐弹窗
      this.show = false
      const data = {
        deviceStatus: this.deviceStatus, // 设备台账状态
        categoryId: this.categoryStatus, // 设备台账分类
        isHaveMaintCharger: this.chargeStatus, // 是否有维保负责人 0无 1有
        isHavePatrolCharger: this.inspectionStatus, // 是否有巡检负责人 0无 1有
        isNormal: this.isNormalStatus // 是否正常 0-故障 1-正常
      }
      this.$emit('click', data, this.show)
    }
  },
  watch: {
    // 监听prop传的checked，如果父级有变化了，将子组件的value也跟着变，达到父变子变的效果
    value (newVal) {
      this.show = newVal
    }
  }

}
</script>

<style lang="scss" scoped>
.orderselect-wrapper {
  width: 100%;
  background: #F0F2F2;
  .select-top {
    max-height: 343px;
    overflow-y: auto;
    padding-bottom: 46px;
  }
  .cell {
    color: #334455;
    background: #F0F2F2;
    margin-top: 8px;
    height: 30px;
  }
  .orderStatus-container {
    display: flex;
    flex-wrap: wrap;
    margin-left: 15px;
    .orderStatus-button {
      width:115px;
      height:35px;
      box-sizing: border-box;
      margin-top: 8px;
      padding: 0 10px;
      font-size: 12px;
      background: #fff;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      color: #334455;
      border-top:1px solid #D8D8E1;
      border-bottom:1px solid #D8D8E1;
      border-left:1px solid #D8D8E1;
      line-height: 35px;
      text-align: center;
    }
    .orderStatus-button:last-child {
      border-right:1px solid #D8D8E1;
    }
    .active {
      color: #FFFFFF;
      background:#00AE08;
      border-color: #00AE08;
    }
  }
  .primary-button-config {
    position: absolute;
    bottom: 15px;
    left: 0;
    width: 345px;
    height: 40px;
    margin: 18px 15px 0 15px;
    line-height: 40px;
    color: #FFFFFF;
    text-align: center;
    background: #6083A5;
    border-radius: 1px;
  }
}
</style>
