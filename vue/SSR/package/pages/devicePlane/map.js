import power from './images/2x/power@2x.png'
import warm from './images/2x/warm@2x.png'
import sun from './images/2x/sun@2x.png'
import drainage from './images/2x/drainage@2x.png'
import fireSystem from './images/2x/fireSystem@2x.png'
import weekPower from './images/2x/weekPower@2x.png'
import internet from './images/2x/internet@2x.png'
import person from './images/2x/person@2x.png'
import elevator from './images/2x/elevator@2x.png'
import other from './images/2x/other@2x.png'

const AccessType = {
  IN: 0,
  OUT: 1
}

const systemIcon = {
  '1': power, // '供配电系统'
  '2': warm, // '暖通系统'
  '3': sun, // '太阳能系统'
  '4': drainage, // '给排水系统'
  '5': fireSystem, // '消防系统'
  '6': weekPower, // '弱电系统'
  '61106': internet, // '物联网系统'
  '7': person, // '人防系统'
  '8': elevator, // '运输（电梯）系统'
  '9': other // '其它公共设施设备'
}

const deviceStatus = {
  '0': '停用',
  '1': '正常',
  '2': '已报废',
  '3': '故障'
}

export {
  AccessType,
  systemIcon,
  deviceStatus
}
