const routes = [
  {
    path: '/LM_FE_H5_DevicePanel_LC/home',
    name: '/LM_FE_H5_DevicePanel_LC/home',
    component: () => import(/* webpackChunkName: "microAppDevicePanelHome" */ '../pages/home'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.title'
    }
  },
  { // 分公司或者项目列表页
    path: '/LM_FE_H5_DevicePanel_LC/companyOrProjectList',
    name: '/LM_FE_H5_DevicePanel_LC/companyOrProjectList',
    component: () => import(/* webpackChunkName: "microAppDeviceCompanyOrProjectList" */ '../pages/devicePlane/companyOrProjectList'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.search'
    }
  },
  { // 搜索页
    path: '/LM_FE_H5_DevicePanel_LC/search',
    name: '/LM_FE_H5_DevicePanel_LC/search',
    component: () => import(/* webpackChunkName: "microAppDeviceSearch" */ '../pages/devicePlane/search'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.search'
    }
  },
  { // 设备管理
    path: '/LM_FE_H5_DevicePanel_LC/equipmentManage',
    name: '/LM_FE_H5_DevicePanel_LC/equipmentManage',
    component: () => import(/* webpackChunkName: "microAppDeviceEquipmentManage" */ '../pages/devicePlane/equipmentManage'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.equipmentManage'
    }
  },
  { // 即将进行年检/质保即将到期
    path: '/LM_FE_H5_DevicePanel_LC/dueSoon',
    name: '/LM_FE_H5_DevicePanel_LC/dueSoon',
    component: () => import(/* webpackChunkName: "microAppDeviceDueSoon" */ '../pages/devicePlane/dueSoon'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.protectDueSoon'
    }
  },
  { // 故障发生运输电梯/故障次数前20页面/长时间故障页面
    path: '/LM_FE_H5_DevicePanel_LC/faultPage',
    name: '/LM_FE_H5_DevicePanel_LC/faultPage',
    component: () => import(/* webpackChunkName: "microAppDeviceFaultPage" */ '../pages/devicePlane/faultPage'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.faultHappenPage'
    }
  },
  { // 维保即将到期
    path: '/LM_FE_H5_DevicePanel_LC/maintenance',
    name: '/LM_FE_H5_DevicePanel_LC/maintenance',
    component: () => import(/* webpackChunkName: "microAppDeviceMaintenance" */ '../pages/devicePlane/maintenance'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.maintanceDueSoon'
    }
  },
  { // 故障发生
    path: '/LM_FE_H5_DevicePanel_LC/faultHappen',
    name: '/LM_FE_H5_DevicePanel_LC/faultHappen',
    component: () => import(/* webpackChunkName: "microAppDeviceFaultHappen" */ '../pages/devicePlane/faultHappen'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.faultHappen'
    }
  },
  { // 漏执行任务
    path: '/LM_FE_H5_DevicePanel_LC/missedTask',
    name: '/LM_FE_H5_DevicePanel_LC/missedTask',
    component: () => import(/* webpackChunkName: "microAppDeviceMissedTask" */ '../pages/devicePlane/missedTask'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.missedTask'
    }
  },
  { // 巡检执行率
    path: '/LM_FE_H5_DevicePanel_LC/excuteRatio',
    name: '/LM_FE_H5_DevicePanel_LC/excuteRatio',
    component: () => import(/* webpackChunkName: "microAppDeviceExcuteRatio" */ '../pages/devicePlane/excuteRatio'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.checkExcute'
    }
  },
  { // 设备完好率
    path: '/LM_FE_H5_DevicePanel_LC/equipmentInactRatio',
    name: '/LM_FE_H5_DevicePanel_LC/equipmentInactRatio',
    component: () => import(/* webpackChunkName: "microAppDeviceEquipmentInactRatio" */ '../pages/devicePlane/equipmentInactRatio'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.inactRatio'
    }
  },
  { // 设备台账列表
    path: '/LM_FE_H5_DevicePanel_LC/equipmentAccount',
    name: '/LM_FE_H5_DevicePanel_LC/equipmentAccount',
    component: () => import(/* webpackChunkName: "microAppDeviceEquipmentAccount" */ '../pages/devicePlane/equipmentAccount'),
    meta: {
      title: 'LM_FE_H5_DevicePanel_LC.deviceList'
    }
  }
]

export default routes
