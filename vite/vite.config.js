import { defineConfig } from 'vite'
import viteBaseConfig from './vite.base.config'
import viteDevConfig from './vite.dev.config'
import viteProConfig from './vite.prod.config'
// 策略模式
const envResolver = {
    "build": () => {
        console.log('生产环境')
        return Object.assign(viteBaseConfig, viteProConfig)
    },
    "serve": () => {
        console.log('开发环境')
        return Object.assign(viteBaseConfig, viteDevConfig)
    }
}
export default defineConfig((command, mode) => {
    const env = loadEnv(mode, process.cwd(), "")
    console.log(env)
    return envResolver[command]()
})