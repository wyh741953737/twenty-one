import { emit, debug } from "./base";

class RequestTemplate {
  constructor(config={}) {
    const list = ['eventType', 'eventId', 'url', 'referer', 'action', 'params', 'millisend']
    list.forEach(key => {
      this[key] = config[key] || null
    })
  }
}

class RequestTemplateClick {
  constructor(config={}) {
    const list = ['eventType', 'eventId', 'url', 'params', 'title', 'x', 'y']
    list.forEach(key => {
      this[key] = config[key] || null
    })
  }
}
// 是否为简单标签
const isSimbleTag = (children) => {
  if(children.length > 0) {
    const simbleTag = ['em', 'b', 'strong', 'span', 'img', 'i', 'code']
    const hasSimbleTag = simbleTag.filter(name => simbleTag.indexOf(name.toLocaleLowerCase()) >= 0)
    return hasSimbleTag.length === children.length
  }
  return true
}
// 获取元素到最外层元素组成的数组
const getNodePath = (node, options={}) => {
  if(!node) return []
  const { includeSelf=true, order='asc'} = options
  let parent = includeSelf ? node : node.parentElement
  let result = []
  while(parent) {
    result = order === 'asc' ? result.concat(parent) : [parent].concat(result)
    parent = parent.parentElement
  }
  return result
}
// 获取元素的关系，例如两层div会得到div>div
const getNodeXPath = (node, curPath='') => {
  if(!node) return curPath
  const parent = node.parentElement
  let index = 0
  const { id } = node
  const tagName = node.tagName.toLowerCase()
  const path = curPath ? `>${curPath}` : ''
  const indexBrackets = index ? `.${index}` : ''
  if(!parent || parent === window || parent === document.documentElement || parent === document.body) return `${tagName}${path}`
  if(id) return `#${id}${path}` // 有id就不需要获取上下级关系
  if(parent.children.length > 1) index = Array.prototype.indexOf.call(parent.children, node)
  return getNodePath(parent, `${tagName}${indexBrackets}${path}`)
}

const clickCollection = () => {
  document.addEventListener('click', (e) => {
    console.log('监听到的点击事件',e)
    const _config = new RequestTemplateClick({eventType: 'click'})
    debug('caught click event:', e)
    let { path } = e
    if(path===undefined) path = e.target ? getNodePath(e.target) : [] // 获取被点击元素到最外层元素组成的数组
    const target = path.find(el => {
      el.hasAttribute && el.hasAttribute('data-warden-container')
      || el.hasAttribute('data-warden-event-id')
      || el.hasAttribute('data-warden-title')
    })
    if(!target) return
    _config.title = extractTitleByTarget(target)

  })
}
// 提取数据事件id
const extractDataByPath = (list=[]) => {
    /* data-warden-event-id */
    const hasIdEl = getElByAttr(list, 'data-warden-event-id')
    if(hasIdEl) return hasIdEl.getAttribute('title')
    // title
    const hasTitleEl = getElByAttr(list, 'title')
    if(hasTitleEl) return hasTitleEl.getAttribute('title')
    // container
    const container = getElByAttr(list, 'data-warden-container')
    if(container) {
      const returnContainer = container.getAttribute('data-warden-event-id') || container.getAttribute('title')
      if(returnContainer) return returnContainer
      const id2 = container.getAttribute('data-warden-container')
      if(id2 && typeof id2 === 'string') return id2
    }
    return list[0].tagName.toLocaleLowerCase()
}
// 提取数据参数，如果本身节点没有埋点属性的话会用上一层埋点属性
const extraParamsByPath = (list=[]) => {
  const regex = /^data-warden-/
  let target
  let targetIndex
  try {
    list.forEach((el, index) => {
      const attributes = el && el.attributes && [...el.attributes] || []
      target = attributes.find(item => item.nodeName.match(regex)) ? item.nodeName.match(regex) : (item.nodeName.indexOf('data-warden-container') !== -1)
      if(target) {
        targetIndex = index
        throw Error()
      }
    })
  } catch(err) {}
  if(targetIndex < 0) return {}
  const container = list[targetIndex]
  const attrList = Array.from(container.attributes) || []
  const params = {}
  attrList.forEach(item => {
    // 过滤多结构属性 如 data-warden-event-id width
    // if(item.nodeName.split("-").length != 3 )return;
    // 过滤非标准命名 如 data-v-fbcf7454
    if(item.nodeName.indexOf('data-warden') < 0) return
    const key = item.nodeName.replace(regex, '')
    params[key] = item.nodeValue
  })
  // 过滤sdk自定义属性
  const defaultKey = ['container', 'title', 'event-id']
  defaultKey.forEach(item => {
    delete params[item]
  })
  return params
}
const getElByAttr = (list, key) => {
  return list.find(item => item.hasAttribute && item.hasAttribute(key))
}
// 获取title属性(data-warden-title或title)
const extractTitleByTarget = (target={}) => {
  const selfTitle = getNodeTitle(target)
  if(selfTitle) return selfTitle
}
// 获取元素的data-warden-title属性或者title属性
const getNodeTitle = (node) => {
  if(node) {
    return node.hasAttribute('data-warden-title') ? node.getAttribute('data-warden-title') : node.title
  }
  return null
}

// 叶子节点（不含其他节点也不包含文本内容
const handleLeafNode = (target) => {
  const { tagName, textContent } = target
  if(tagName === 'img') return target.getAttribute('alt') || null
  if(tagName === 'svg') {
    const a = [...target.children].find(item => item.tagName === 'use')
    if(a) return a.getAttribute('xlink:href') || null
  }
  return textContent
}
// 点击非叶子元素
const handleNoLeafNode = (target) => {
  const { tagName, textContent } = target
  if(tagName === 'a') {
    const res = isSimbleTag([...target.children])
    return res ? textContent : target.getAttribute('href') || null
  }
  if(tagName === 'button') {
    const name = target.getAttribute('name')
    const res = isSimbleTag([...tagName.children])
    return name || res ? textContent : target.getAttribute('href') || null
  }
  const { length } = [...target.children].filter(() => target.hasChildNodes())
  return length > 0 ? null : textContent
}

const init = ({ eventCore, eventUnload }) => {
  if(!eventCore && !eventUnload) return
  if(eventCore) clickCollection()
  dwellCollector(eventUnload)
}


const traceCustomEvent = (eventId, title, params={}) => {
  emit({ eventId, title, params, eventType: 'custom', triggerTime: Date.now()})
}
