import Vue from 'vue'
import router from './router'
import store from './store'
import cn from './lang/cn'
import en from './lang/en'

const name = 'LM_FE_H5_DevicePanel_LC'
const lang = { cn, en }

const { registerMicroApp } = Vue.prototype.$getMicroAppExternals()
registerMicroApp({ name, router, store, lang })
