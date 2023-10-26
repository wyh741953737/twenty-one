// 获取设备管理信息
const getDeviceManagementInfo = `${window.API_CONFIG.baseFusionURL}/deviceBase/getDeviceManagementInfo`
// 获取设备完好率列表
const getDeviceInactRateList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getDeviceIntactRateInfolist`
// 获取即将进行年检列表
const getUpComingCheckList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getUpcomingAnnualCheckDeviceList`
// 获取质保即将到期列表
const getMaintenanceIncomingList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getQualityAssuranceIsAboutToExpireDeviceList`
// 获取维保即将到期列表
const getMaintExpireList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getMaintIsAboutToExpireDeviceList`
// 获取故障发生列表
const getDevicefailureInfoList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getDeviceFailureInfoList`
// 获取故障设备信息列表
const getDeviceFailureInfoDetailList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getDeviceFailureInfoDetailList`
// 获取漏执行任务列表
const getMissingExecutionTaskInfoList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getMissingExecutionTaskInfoList`
// 获取巡检执行率列表
const getPatrolExecutionRateInfoList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getPatrolExecutionRateInfoList`
// 获取维保执行率列表
const getMaintExecutionRateInfoList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getMaintExecutionRateInfoList`
// 故障处理时间前20
const getLongTimeFaultList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getLongestDealDeviceFailureInfoList`
// 故障次数前20
const getFrequencyList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getDeviceFailureFrequentlyInfoList`
// 获取分子公司列表
const getCompanyList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getRegionInfoList`
// 获取项目列表
const getProjectList = `${window.API_CONFIG.baseFusionURL}/deviceBase/getCommunityInfoList`
// 获取设备筛选分类菜单
const listCategory = `${window.API_CONFIG.baseFusionURL}/deviceBase/listCategory`
// 获取设备台账列表
const listDeviceInfo = `${window.API_CONFIG.baseFusionURL}/deviceBase/listDeviceInfo`

export {
  getDeviceManagementInfo,
  getDeviceInactRateList,
  getProjectList,
  getCompanyList,
  getLongTimeFaultList,
  getFrequencyList,
  getMissingExecutionTaskInfoList,
  getMaintExpireList,
  getMaintenanceIncomingList,
  getUpComingCheckList,
  getPatrolExecutionRateInfoList,
  getMaintExecutionRateInfoList,
  getDeviceFailureInfoDetailList,
  getDevicefailureInfoList,
  listCategory,
  listDeviceInfo
}
