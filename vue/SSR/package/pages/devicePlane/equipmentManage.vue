<!--设备管理页面---->
<template>
  <div class="equipment-management-wrap">
    <div class="equipment-search">
          <div class="company item" @click="commonJumpMethod({name: 'companyOrProjectList', query: {type: 'company'}})"  v-if="userType === 100 || userType === 106">
            <span>{{selectedCompany ? selectedCompany : '请选择分公司'}}</span>
            <img :src="searchIcon" alt="">
          </div>
          <div class="company project item" @click="commonJumpMethod({name: 'companyOrProjectList', query: {type: 'project'}})" v-if="userType === 100 || userType === 106 || userType === 102">
            <span>{{selectedProject ? selectedProject : '请选择项目'}}</span>
            <img :src="projectIcon" alt="">
          </div>
        </div>
    <empty-view
      v-if="Object.keys(result).length < 1"
      :content="$t('base.noContentForNow')"
      class="empty-view"/>
    <div class="list" v-else>
        <div class="equipment-wrap common-wrap">
          <ul class="top flex van-hairline--bottom">
            <li ref="chart" class="total-top-left"></li>
            <li class="total-top-right">
              <div class="fautly-equipment flex">
                <div class="fautly-left"><span class="icon fautly-color"></span>故障设备</div>
                <span class="count">{{result.deviceFailureNum}}</span>
              </div>
              <div class="fautly-equipment flex inact-bottom" @click="commonJumpMethod({name: 'equipmentInactRatio'})">
                <div class="fautly-left"><span class="icon inact-color"></span>完好率</div>
                <div class="icon-flex"><span class="count">{{result.deviceIntactRate}}</span><img class="right-arrow-rate" :src="rightArrow" /></div>
              </div>
            </li>
          </ul>
          <div class="elevators">
            <div class="elevators-total flex van-hairline--bottom">
              <div class="label icon-flex"><img class="system-icon" src="./images/2x/elevator@2x.png">电梯总数</div>
              <span class="count">{{result.elevatorNum}}</span>
            </div>
            <div class="elevators-cost flex">
              <div class="van-hairline--right flex-inverse half">
                <span class="label-shallow">十年电梯总数</span>
                <span class="count">{{result.tenYearElevatorNum}}</span>
              </div>
              <div class="flex-inverse half">
                <span class="label-shallow">电梯预估维保费(元)</span>
                <span class="count">{{result.elevatorMaintFee}}</span>
              </div>
            </div>
          </div>

          <div class="elevators">
            <div class="elevators-total flex van-hairline--bottom">
              <div class="label icon-flex"><img class="system-icon" src="./images/2x/fireSystem@2x.png">消防主机总数</div>
              <span class="count">{{result.fireHostNum}}</span>
            </div>
            <div class="elevators-cost flex">
              <div v-for="(item, index) in fireSystemData" :key="index" :class="{'van-hairline--right': index!==2, 'flex-inverse': true, 'half': true }">
                <span class="label-shallow">{{item.text}}</span>
                <span class="count">{{result[item.value]}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--故障预防-->
        <div class="fault-prevention common-wrap">
          <div class="fault-prevention-top">
            <img class="fault-icon" :src="leftIcon" />
            <span class="fault-label count">故障预防</span>
            <img class="fautl-prevent-icon" :src="exclamatory" />
          </div>
          <div class="fault-center">
            <div class="fault-center-item flex van-hairline--bottom" v-for="item in faultPreventData" :key="item.text" @click="commonJumpMethod(item.url)">
              <div class="label-thin icon-flex"><img class="fault-center-icon" :src="item.icon" /><span>{{item.text}}</span></div>
              <div class="fault-count icon-flex"><span>{{result[item.value]}}</span><img class="right-arrow" :src="rightArrow" /></div>
            </div>
          </div>
          <!----巡检执行率图表--->
          <div class="fault-bottom flex van-hairline--bottom">
            <div class="half van-hairline--right flex-inverse" @click="commonJumpMethod({name: 'excuteRatio', query: {ratioType: 1}})">
              <div ref="executionRate" class="rate-echart"></div>
              <div  class="rate-text">巡检执行率</div>
            </div>
            <div class="half flex-inverse" @click="commonJumpMethod({name: 'excuteRatio', query: {ratioType: 2}})">
              <div ref="maintenanceRate" class="rate-echart"></div>
              <div class="rate-text label-thin">维保执行率</div>
            </div>
          </div>
          <div class="flex" @click="commonJumpMethod({name: 'missedTask'})">
            <span class="label-thin">漏执行任务</span>
            <div class="icon-flex">
              <span class="label-thin">本月</span>
              <span class="mounth">{{result.missingExecutionTaskNum}}</span>
              <img class="right-arrow" :src="rightArrow" />
            </div>
          </div>
        </div>
        <!---故障发生-->
        <div class="fault-prevention common-wrap">
          <div class="fault-prevention-top">
            <img class="fault-icon" :src="leftIcon" />
            <span class="fault-label count">故障发生</span>
            <img class="fautl-prevent-icon" :src="exclamatory" />
          </div>
          <div class="fault-occurrence-chart" ref="faultOccurce"  @click="commonJumpMethod({name: 'faultHappen'})"></div>
          <div :class="{'fault-jump': index===0, 'van-hairline--top': true, 'flex':true, 'fault-deal-time': index===1}" v-for="(item, index) in faultHappenData" :key="item.text" @click="commonJumpMethod(item.url)">
            <span class="label-thin">{{item.text}}</span>
            <div class="icon-flex"><span class="label-thin">前20</span><img class="right-arrow" :src="rightArrow" /></div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { getDeviceManagementInfo } from './api'
import * as echarts from 'echarts'
import rightArrow from './images/2x/deviceRateArrow@2x.png'
import checkIcon from './images/2x/check@2x.png'
import dueSoonIcon from './images/2x/dueSoon@2x.png'
import editIcon from './images/2x/edit@2x.png'
import exclamatory from './images/2x/exclamatory @2x.png'
import leftIcon from './images/2x/left-icon@2x.png'
import searchIcon from './images/2x/search@2x.png'
import projectIcon from './images/2x/nextblack_icon_place@2x.png'
import { systemIcon } from './map'
import { commonBridge } from 'remain-js-sdk'
const { components } = Vue.prototype.$getMicroAppExternals()
const { EmptyView, Button } = components

export default {
  name: 'EpidemicPreventionIndex',
  components: {
    [Button.name]: Button,
    EmptyView
  },
  data () {
    return {
      result: {},
      chartsArr: [],
      rightArrow,
      checkIcon,
      dueSoonIcon,
      editIcon,
      systemIcon,
      exclamatory,
      leftIcon,
      searchIcon,
      projectIcon,
      selectedCompany: undefined || localStorage.getItem('selectedCompanyName'),
      selectedProject: undefined,
      communityId: undefined,
      regionId: undefined || localStorage.getItem('selectedCompanyId'),
      faultPreventData: [
        {
          text: '维保即将到期',
          icon: editIcon,
          value: 'maintIsAboutToExpireNum',
          url: { name: 'maintenance' }
        },
        {
          text: '质保即将到期',
          icon: dueSoonIcon,
          value: 'qualityAssuranceIsAboutToExpireNum',
          url: { name: 'dueSoon', query: { type: 'dueSoon' } }
        },
        {
          text: '即将进行年检',
          icon: checkIcon,
          value: 'upcomingAnnualCheckNum',
          url: { name: 'dueSoon', query: { type: 'checkSoon' } }
        }
      ],
      faultHappenData: [
        {
          text: '故障次数最多',
          url: { name: 'faultPage', query: { type: 'frequencyMax' } }
        },
        {
          text: '故障处理时长',
          url: { name: 'faultPage', query: { type: 'timeMax' } }
        }
      ],
      fireSystemData: [
        {
          text: '点位数',
          value: 'pointNumbers'
        },
        {
          text: '回路数',
          value: 'systemNumber'
        },
        {
          text: '消防维保费(元)',
          value: 'fireMaintFee'
        }
      ]
    }
  },
  async mounted () {
    commonBridge.commonSetTitle('设备管理')
    if (this.$route.query) {
      const hasName = this.$route.query.name
      const hasType = this.$route.query.type
      if (hasType === 'project' && hasName) {
        this.selectedProject = decodeURIComponent(hasName)
        this.communityId = this.$route.query.id
        localStorage.setItem('selectedCommunityId', this.communityId)
      }
      if (hasType === 'company' && hasName) {
        this.selectedCompany = decodeURIComponent(hasName) // 选择的分公司名称
        this.regionId = this.$route.query.id // 分公司id
        localStorage.setItem('selectedCompanyName', this.selectedCompany)
        localStorage.setItem('selectedCompanyId', this.regionId)
      }
    }
    await this.getData()
    if (Object.keys(this.result).length > 0) {
      this.renderChart()
      this.executionRateChart('executionRate') // 巡检执行率echart
      this.executionRateChart('maintenanceRate') // 维保执行率echart
      this.faultOccurceChart()
      window.addEventListener('resize', this.resizeAllCharts)
    }
  },
  computed: {
    userType () {
      return this.$store.state.userInfo.userType
    }
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resizeAllCharts)
  },
  methods: {
    resizeAllCharts () {
      this.chartsArr.forEach(chart => {
        chart.resize()
      })
    },
    // 跳转方法
    commonJumpMethod ({ name, query }) {
      this.$router.push({
        name: `/LM_FE_H5_DevicePanel_LC/${name}`,
        query
      })
    },
    // 请求数据
    async getData () {
      const params = {
        communityId: this.communityId,
        regionId: this.regionId
      }
      try {
        const { status, data } = await this.$axios({
          method: 'get',
          url: getDeviceManagementInfo,
          params
        })
        if (status === 100 && data) {
          this.result = data || {}
        }
        return status
      } catch (e) {
        return -1
      }
    },
    // 获取设备总数echart图
    renderChart () {
      let chart = echarts.init(this.$refs.chart)
      this.chartsArr.push(chart)
      const options = {
        title: {
          subtext: '设备总数',
          text: this.result.deviceNum || '0',
          top: '36%',
          textStyle: {
            fontSize: 18,
            fontWeight: 600,
            color: '#334455'
          },
          subtextStyle: {
            fontSize: 12,
            fontWeight: 400,
            color: '#334455'
          },
          x: 'center',
          y: 'center'
        },
        series: [
          {
            type: 'pie',
            data: [
              {
                value: this.result.deviceFailureNum || 0,
                itemStyle: {
                  normal: { // 颜色渐变
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 1,
                      [
                        { offset: 0, color: '#F64769' },
                        { offset: 1, color: '#FE7078' }
                      ]
                    )
                  }
                }
              },
              {
                value: this.result.deviceNum || 0,
                itemStyle: {
                  normal: { // 颜色渐变
                    color: new echarts.graphic.LinearGradient(
                      0, 0, 0, 0.86,
                      [
                        { offset: 0, color: '#59D3FF' },
                        { offset: 0.5, color: '#4288FF' }
                      ]
                    )
                  }
                }
              }
            ],
            radius: ['100%', '68.3%'],
            labelLine: {
              show: false
            },
            label: {
              show: false,
              position: 'center',
              emphasis: {
                show: false
              }
            }
          }
        ]
      }
      chart.setOption(options)
    },
    // 巡检/维保执行率获取数据
    getRadioData (type) {
      if (type === 'executionRate') { // executionRate表示巡检执行率
        return [{ value: parseFloat(this.result.patrolExecutionRate) || 0, name: this.result.patrolExecutionRate }]
      } else if (type === 'maintenanceRate') { // maintenanceRate表示维保执行率
        return [{ value: parseFloat(this.result.maintExecutionRate) || 0, name: this.result.maintExecutionRate }]
      }
    },
    // 获取巡检/维保执行率echart图
    executionRateChart (type) {
      let chart = echarts.init(this.$refs[type])
      this.chartsArr.push(chart)
      const options = {
        series: [{
          type: 'gauge',
          startAngle: 215,
          endAngle: -35,
          radius: '100%',
          min: 0,
          max: 100,
          itemStyle: { // 渐变颜色
            color: new echarts.graphic.LinearGradient(1, 1, 0, 1, [{
              offset: 1,
              color: type === 'executionRate' ? '#04B10C' : '#4186FF'
            }, {
              offset: 0,
              color: type === 'executionRate' ? '#23C82B' : '#59D3FF'
            }])
          },
          axisLine: {
            lineStyle: {
              width: 5,
              color: [[1, '#D3D3D3']]
            }
          },
          progress: {
            show: true,
            roundCap: true,
            width: 5 // 显示的环形的宽度
          },
          pointer: { // 不显示仪表指针
            show: false
          },
          axisTick: { // 刻度样式
            show: false
          },
          splitLine: { // 分隔点样式。
            show: false
          },
          axisLabel: { // 里面得刻度数字
            show: false
          },
          title: {
            show: false
          },
          detail: {
            fontSize: 18,
            fontWeight: 600,
            offsetCenter: [0, 0],
            valueAnimation: true,
            color: type === 'executionRate' ? '#00AE08' : '#4186FF',
            formatter: function (value) {
              return value + '%'
            }
          },
          data: this.getRadioData(type)
        }]
      }

      chart.setOption(options)
    },
    // 获取故障发生echart图
    faultOccurceChart () {
      let chart = echarts.init(this.$refs.faultOccurce)
      this.chartsArr.push(chart)
      const options = {
        xAxis: {
          type: 'category',
          boundaryGap: false,
          axisLabel: { // x轴文本的样式
            show: true,
            textStyle: {
              color: '#AAAAAA',
              fontSize: '12',
              left: '20'
            },
            padding: [5, 0, 0, 6]
          },
          axisLine: {
            lineStyle: {
              color: '#D8D8D8FF'
            }
          }
        },
        yAxis: {
          name: '单位：次数',
          nameGap: 30,
          type: 'value',
          boundaryGap: false,
          axisLine: {
            color: '#334455FF',
            lineStyle: {
              color: '#334455FF',
              fontSize: 15
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: '#AAAAAA',
              fontSize: '12'
            }
          },
          splitLine: {
            lineStyle: {
              type: 'dashed',
              color: '#AAAAAA'
            }
          },
          axisTick: {
            show: false
          }
        },
        grid: {
          left: '3.9%',
          right: '2.5%',
          bottom: '1.5%',
          containLabel: true
        },
        series: [
          {
            type: 'line',
            smooth: false, // 折点处圆滑，即折线变为圆滑的曲线
            symbol: 'circle',
            itemStyle: {
              normal: { // 颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
                color: '#4187FFFF',
                borderColor: '#4187FFFF',
                // 折线渐变色
                lineStyle: {
                  color: {
                    type: 'linear',
                    colorStops: [{
                      offset: 0, color: '#4187FF' // 0% 处的颜色
                    }, {
                      offset: 1, color: '#59D3FF' // 100% 处的颜色
                    }],
                    global: false
                  }
                }
              }
            }, // 线条样式
            symbolSize: 4, // 折线点的大小
            label: {
              normal: {
                show: true,
                position: 'top',
                textStyle: {
                  color: '#334455FF'
                }
              }
            },
            areaStyle: {
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: '#4187FFFF' // 0% 处的颜色
                }, {
                  offset: 1, color: '#59D3FFFF' // 100% 处的颜色
                }],
                global: false // 缺省为 false
              }
            },
            data: this.generateData()
          }
        ]
      }
      chart.setOption(options)
    },
    // 获取故障发生数据
    generateData () {
      let result = []
      if (this.result.deviceFailureNumList && this.result.deviceFailureNumList.length > 0) {
        this.result.deviceFailureNumList.forEach(item => {
          result.push([item.month, item.failureNum])
        })
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.equipment-management-wrap {
  position: relative;
   .equipment-search {
     display: flex;
     align-items: center;
     margin: 10px 15px;
     font-size: 15px;
     color: #334455;
     .project {
       margin-left: 10px;
     }
     .item {
       display: flex;
       align-items: center;
     }
     .company {
       padding: 4.5px 12px;
       background: #FFFFFF;
       border-radius: 30px;
       span {
         overflow: hidden;
         text-overflow: ellipsis;
         display: -webkit-box;
         -webkit-line-clamp: 1;
         -webkit-box-orient: vertical;
       }
       img {
         width: 20px;
         height: 20px;
         margin-left: 5px;
       }
     }
  }
  .empty-view {
    position: absolute;
    top: 52px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .list {
      min-height: calc(100vh - 52px);
      box-sizing: border-box;
      padding-bottom: 40px;
      .icon-flex {
        display: flex;
        align-items: center;
      }
      .flex-inverse {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .half {
        flex: 1;
      }
      .system-icon {
        width: 16px;
        height: 16px;
        max-height: 100%;
        max-width: 100%;
        margin-right: 5px;
      }
      .common-wrap {
        margin: 10px 15px;
        padding: 11px 15px 20px 15px;
        background: #fff;
        border-radius: 10px;
      }
      .label {
        font-size: 15px;
        font-weight: 500;
        line-height: 21px;
        color: #334455;
      }
      .label-thin {
        font-size: 15px;
        line-height: 21px;
        color: #334455;
      }
      .label-shallow {
        margin-bottom: 2px;
        font-size: 12px;
        line-height: 16px;
        color: #AAAAAA;
      }
      .count {
        font-size: 18px;
        font-weight: 600;
        line-height: 25px;
        color: #334455;
      }
      .right-arrow {
        display: inline-block;
        width: 16px;
        height: 16px;
        margin-left: 10px;
      }
      .equipment-wrap {
        .top{
          margin-top: 25px;
          margin-bottom: 20px;
          padding-bottom: 25px;
          .total-top-left {
            width: 120px;
            height: 120px;
          }
          .fautly-equipment {
            min-width: 150px;
            padding: 12.5px 15px 12.5px 10px;
            background: #F7F8FA;
            border-radius: 6px;
            .fautly-left {
              font-size: 15px;
              .icon {
                display: inline-block;
                width: 9px;
                height: 9px;
                border-radius: 50%;
                margin-right: 5px;
              }
              .inact-color {
                background: linear-gradient(0deg, #59D3FF 0%, #4186FF 100%);
              }
              .fautly-color {
                background: linear-gradient(0deg, #FE7078 0%, #F64769 100%);
              }
            }
            .right-arrow-rate {
              display: inline-block;
              width: 16px;
              height: 16px;
              margin-left: 5px;
            }
          }
          .inact-bottom {
            margin-top: 20px;
          }
        }
        .elevators {
          margin-top: 10px;
          padding: 15px;
          background: #F7F8FA;
          border-radius: 3px;
          .elevators-total {
            padding-bottom: 13px;
          }
          .elevators-cost {
            padding-top: 14px;
          }
        }
      }
      .fault-prevention {
        position: relative;
        .fault-prevention-top {
          margin-bottom: 12px;
          .fault-icon {
            width: 14px;
            height: 15px;
            position: absolute;
            top: 16px;
            left: 0;
          }
          .fault-label {
            margin-left: 10px;
            margin-right: 5px;
          }
          .fautl-prevent-icon {
            width: 12px;
            height: 12px;
            margin-left: 5px;
          }
        }
        .fault-center {
          .fault-center-item {
            padding: 12.5px 0;
            .fault-center-icon {
              width: 20px;
              height: 20px;
              margin-right: 10px;
            }
            .fault-count {
              font-size: 21px;
              font-weight: 600;
              color: #00AE08;
            }
          }
        }
        .fault-bottom {
          padding: 22px 0;
          margin-bottom: 10px;
          .rate-echart {
            width: 82px;
            height: 82px;
          }
          .rate-text {
            margin-top: 4.5px;
            margin-bottom: 10px;
          }
        }
        .mounth {
          margin-left: 6px;
          font-size: 21px;
          font-weight: 600;
          line-height: 27px;
          color: #C6444C;
        }
      }
      .fault-occurrence-chart {
        height: 205px;
      }
      .fault-jump {
        margin-top: 20px;
        padding: 15px 0;
      }
      .fault-deal-time {
        padding-top: 15px;
      }
  }
}
</style>
