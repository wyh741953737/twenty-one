import { basicHelper } from './utils'
import { uploadURL } from 'common/api'

export function isVNode (node) {
  return node !== null && typeof node === 'object' && basicHelper.hasOwn(node, 'componentOptions')
}

/**
 *
 * 生成v-input组件的VNode
 * @export
 * @param {Object} $vue vue实例
 * @param {Object} row  当前行数据
 * @param {String} prop 当前列的prop
 * @returns 返回生成的VNode对象
 */
export function createInputVNode ($vue, row, prop) {
  const VNode = $vue.$createElement('v-input', {
    props: {
      value: row[prop]
    },
    on: {
      input (newValue) {
        row[prop] = newValue
      }
    }
  })
  return VNode
}

/**
 *
 * 生成v-input-number组件的VNode
 * @export
 * @param {Object} $vue vue实例
 * @param {Object} row  当前行数据
 * @param {String} prop 当前列的prop
 * @returns 返回生成的VNode对象
 */
export function createNumberVNode ($vue, row, prop) {
  const VNode = $vue.$createElement('v-input-number', {
    props: {
      value: row[prop]
    },
    on: {
      input (newValue) {
        row[prop] = newValue
      }
    }
  })
  return VNode
}

/**
 *
 * 生成v-select组件的VNode
 * @export
 * @param {Object} $vue vue实例
 * @param {Object} row  当前行数据
 * @param {String} prop 当前列的prop
 * @returns 返回生成的VNode对象
 */
export function createSelectVNode ($vue, row, prop, opts) {
  const VNode = $vue.$createElement('v-select', {
    props: {
      options: opts.options,
      value: row[prop]
    },
    on: {
      input (newValue) {
        row[prop] = newValue
      }
    }
  })
  return VNode
}

/**
 *
 * 生成原生img的VNode
 * @export
 * @param {Object} $vue vue实例
 * @param {Object} row  当前行数据
 * @param {String} prop 当前列的prop
 * @returns 返回生成的VNode对象
 */
export function createImgVNode ($vue, row, prop, opts) {
  if (!opts) {
    opts = {}
  }
  const VNode = $vue.$createElement('img', {
    attrs: {
      src: opts.imgUrl || row[prop]
    },
    style: {
      width: opts.width || '48px',
      height: opts.height || '48px',
      objectFit: 'cover'
    },
    on: {
      click: () => {
        if (opts.cb) {
          opts.cb(row, row[prop])
        } else {
          const imgUrl = opts.imgUrl || row[prop]
          if (imgUrl) {
            $vue.$previewBox([imgUrl])
          }
        }
      }
    }
  })
  return VNode
}

/**
 *
 * 生成v-uploader组件的VNode
 * @export
 * @param {Object} $vue vue实例
 * @param {Object} row  当前行数据
 * @param {String} prop 当前列的prop
 * @returns 返回生成的VNode对象
 */
export function createUploaderVNode ($vue, row, prop, opts) {
  const VNode = $vue.$createElement('v-uploader', {
    props: {
      imgUrls: row[prop],
      fileWidth: 96,
      action: `${uploadURL}?module=${opts.module}`
    }
  })
  return VNode
}

/**
 *
 * 生成html片段的VNode
 * @export
 * @param {Object} $vue vue实例
 * @param {String} innerHTML html片段
 * @returns 返回生成的VNode对象
 */
export function createHTMLVNode ($vue, innerHTML, row, prop, opts) {
  if (!opts) {
    opts = {}
  }
  const VNode = $vue.$createElement('span', {
    domProps: {
      innerHTML: innerHTML
    },
    on: {
      click: () => {
        opts.cb && opts.cb(row, row[prop])
      }
    }
  })
  return VNode
}

/**
 *
 * 生成alink样式的VNode
 * @export
 * @param {Object} $vue vue实例
 * @param {Object} row 当前行数据
 * @param {Object} opts 配置项(目前主要包括颜色及回调配置)
 * @returns 返回生成的VNode对象
 */
export function createAlinkVNode ($vue, row, prop, opts) {
  if (!opts) {
    opts = {}
  }
  // 调用方传值则用调用方opts.text否则取默认的row[prop]
  // 最终处理undefined及空字符串直接返回不带标签的空字符串 （性能比VNode好）
  const innerText = opts.text !== undefined ? opts.text : row[prop]
  if (innerText === '' || innerText === undefined) {
    return ''
  }
  const VNode = $vue.$createElement('span', {
    domProps: {
      innerText
    },
    style: {
      color: opts.color || '#1B8CF2',
      cursor: 'pointer'
    },
    on: {
      click: () => {
        opts.cb && opts.cb(row, row[prop], {
          prop,
          extend: opts.extend
        })
      }
    }
  })
  return VNode
}
