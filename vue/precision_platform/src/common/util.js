import Vue from 'vue'
const hasOwnProperty = Object.prototype.hasOwnProperty

const basicHelper = {
  hasOwn (obj, key) {
    return hasOwnProperty.call(obj, key)
  },
  isArray (val) {
    return Object.prototype.toString.call(val) === '[object Array]'
  },
  isPlainObject (val) {
    return Object.prototype.toString.call(val) === '[object Object]'
  }
}

const _localStorage = {
  setItem (key, value) {
    window.localStorage.setItem(key, value)
  },
  getItem (key) {
    const value = window.localStorage.getItem(key)
    return value
  },
  removeItem (key) {
    window.localStorage.removeItem(key)
  }
}

const localStorageHelper = {
  setItem (key, value) {
    if (basicHelper.isArray(value) || basicHelper.isPlainObject(value)) {
      try {
        value = JSON.stringify(value)
      } catch (e) {}
    }
    window.localStorage.setItem(key, value)
  },
  getItem (key) {
    let value = window.localStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (e) {}
    return value
  },
  removeItem (key) {
    window.localStorage.removeItem(key)
  },
  clear () {
    window.localStorage.clear()
  }
}

const sessionStorageHelper = {
  setItem (key, value) {
    if (basicHelper.isArray(value) || basicHelper.isPlainObject(value)) {
      try {
        value = JSON.stringify(value)
      } catch (e) {}
    }
    window.sessionStorage.setItem(key, value)
  },
  getItem (key) {
    let value = window.sessionStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (e) {}
    return value
  },
  removeItem (key) {
    window.sessionStorage.removeItem(key)
  },
  clear () {
    window.sessionStorage.clear()
  }
}

const download = require('downloadjs')
const downloadHelper = {
  downloadByAction (config) {
    // 使用iframe阻止表单提交时跳转页面
    const iframeId = 'iframe_download'
    let iframe = document.getElementById(iframeId)
    if (!iframe) {
      iframe = document.createElement('iframe')
      iframe.id = iframeId
      iframe.name = iframeId
      iframe.style.display = 'none'
      document.body.appendChild(iframe)
    }
    const form = document.createElement('form')
    form.method = config.method || 'post'
    form.action = config.action
    form.target = iframeId
    if (config.formData) {
      for (const key in config.formData) {
        const value = config.formData[key]
        if (value !== undefined) {
          const input = document.createElement('input')
          input.type = 'hidden'
          input.name = key
          input.value = value
          form.appendChild(input)
        }
      }
    }
    document.body.appendChild(form)
    form.submit()
    document.body.removeChild(form)
  },
  async downloadByApi (config, callback, failCallBack) {
    const { exportUrl, postData } = config
    const getIsExportingURL = `${API_CONFIG.baseURL}satisfactionRateSurveyAction!getIsExporting.action`
    const getIsExportingRes = await Vue.prototype.$axios.get(getIsExportingURL)
    if (getIsExportingRes.status == 100) { // eslint-disable-line
      const exportRes = await Vue.prototype.$axios.get(exportUrl, postData)
      if (exportRes.status == 100) { // eslint-disable-line
        const reg = new RegExp(`${API_CONFIG.origin}.*?(?=/)`)
        const exportBaseUrl = exportUrl.match(reg)
        if (exportBaseUrl) {
          const getFileExportInfoURL = `${exportBaseUrl[0]}/export/getFileExportInfo?key=${exportRes.data}&id=${Math.random()}`
          const timer = setInterval(async () => {
            const getFileExportInfoRes = await Vue.prototype.$axios.get(getFileExportInfoURL)
            if (getFileExportInfoRes.status == 100) { // eslint-disable-line
              const percent = getFileExportInfoRes.data && getFileExportInfoRes.data.percent
              if (percent === '100') {
                clearInterval(timer)
              }
            } else {
              clearInterval(timer)
            }
            callback && callback(getFileExportInfoRes)
          }, 2000)
        }
      } else {
        failCallBack && failCallBack(exportRes)
      }
    }
  },
  downloadFile ({ data, fileName, mimeType }) {
    if (!mimeType) {
      const imageReg = /\.(png|jpe?g|gif|svg)(\?.*)?$/
      if (imageReg.test(data)) {
        mimeType = 'image/jpg'
      } else {
        mimeType = 'application/pdf'
      }
    }
    const x = new XMLHttpRequest()
    x.open('GET', data, true)
    x.responseType = 'blob'
    x.onload = function () {
      download(x.response, fileName, mimeType)
    }
    x.send()
  },
  downloadBySrc (config) {
    const a = document.createElement('a')
    a.href = config.src
    if (config.target) {
      a.target = config.target
    }
    a.download = config.fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  },
  downloadByLocation (filePath) {
    if (filePath.substring(0, 1) === '/') {
      window.location.href = `${location.origin}${location.pathname.substr(0, location.pathname.lastIndexOf('/'))}${filePath}`
    } else {
      window.location.href = filePath
    }
  }
}
const generateMapByOpts = opts => {
  const map = {}
  if (Array.isArray(opts)) {
    opts.forEach(item => {
      if (item.value !== undefined) {
        map[item.value] = item.text
      }
    })
  } else {
    throw new Error('opts must be an array')
  }
  return map
}

const optionsGenerator = (options) => {
  return (option) => {
    let _option = []
    if (option) {
      if (option === 1) {
        _option.push({
          text: '全部',
          value: undefined
        })
      } else if (option === 2) {
        _option.push({
          text: '请选择',
          value: undefined
        })
      } else {
        _option = [options]
      }
    }
    Array.isArray(options) && options.forEach((item) => {
      let tempObj = {}
      tempObj = { ...item }
      _option.push(tempObj)
    })
    return _option
  }
}

const mapHelper = {
  setMap (options) {
    const map = generateMapByOpts(options)
    const setOps = optionsGenerator(options)
    return {
      map,
      setOps
    }
  },
  setOptionGroup (list, params) {
    let { valueKey, labelKey, parentIdKey, defaultText, keys } = params
    valueKey = valueKey || 'id'
    labelKey = labelKey || 'name'
    parentIdKey = parentIdKey || 'parentId'

    const optionGroup = []
    if (Array.isArray(list) && list.length) {
      const options = []
      list.forEach(item => {
        const parentId = item[parentIdKey]
        if ([undefined, null, ''].includes(parentId)) {
          optionGroup.push({
            label: item[labelKey],
            value: item[valueKey],
            options: []
          })
        } else {
          options.push(item)
        }
      })
      options.forEach(option => {
        const parentId = option[parentIdKey]
        const parentItem = optionGroup.find((item) => {
          return item.value === parentId
        })
        const _option = {
          label: option[labelKey],
          value: option[valueKey]
        }
        if (keys && keys.length) {
          keys.forEach(key => {
            _option[key] = option[key]
          })
        }
        parentItem.options.push(_option)
      })
    }

    if (defaultText) {
      optionGroup.unshift({
        label: defaultText,
        value: undefined,
        options: [{
          label: defaultText,
          value: undefined
        }]
      })
    }
    return optionGroup
  }
}

// 根据身份证号获取性别，生日等信息的工具类
const idCardHelper = {

  // 获取生日
  getBirthday (idCard) {
    const carNum = idCard || ''
    let birthday = ''
    if (carNum.length > 0) {
      if (carNum.length === 15) {
        // 15位需要补齐年份
        birthday = '19' + carNum.slice(6, 12)
      } else if (carNum.length === 18) {
        birthday = carNum.slice(6, 14)
      }
      // 通过正则表达式来指定输出格式为:1990-01-01
      birthday = birthday.replace(/(.{4})(.{2})/, '$1-$2-')
    }
    return birthday
  },

  // 获取性别
  getSex (idCard) {
    let sexStr = ''
    const carNum = idCard || ''
    if (carNum.length > 0) {
      let sexNum = -1
      if (carNum.length === 15) {
        /// 15位身份证是最后一位判断性别
        sexNum = parseInt(carNum.slice(-1))
      } else if (carNum.length === 18) {
        /// 18位身份证是第17位判断性别
        sexNum = parseInt(carNum.slice(-2, -1))
      }
      if (sexNum !== -1) {
        if (sexNum % 2 === 1) {
          sexStr = '男'
        } else {
          sexStr = '女'
        }
      }
    }
    return sexStr
  }
}

// 富文本中附件下载
const _ueditorFileClick = function (event, href) {
  const alink = href.getAttribute('href1')
  let fileName = alink.substr(alink.lastIndexOf('/') + 1)
  if (fileName.indexOf('_') > -1) {
    const titleArr = fileName.split('_')
    fileName = titleArr.slice(0, titleArr.length - 1).join('_')
  }
  const pdfReg = /\.(pdf|PDF)(\?.*)?$/
  if (pdfReg.test(alink)) {
    downloadHelper.downloadFile({
      data: alink,
      fileName
    })
  } else {
    location.href = alink
  }
}
export {
  basicHelper,
  _localStorage,
  localStorageHelper,
  sessionStorageHelper,
  downloadHelper,
  generateMapByOpts,
  mapHelper,
  idCardHelper,
  _ueditorFileClick
}
