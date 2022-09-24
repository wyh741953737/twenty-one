import { defineConfig } from 'vite'

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@assets': path.resolve(__dirname, './src/assets')
        } // 配置别名
    },
    optimizeDeps: {
        exclude: []
    },
    envPrefix: 'ENV_',
    css: { // 对css配置
        // modules配置最终会丢给postcss module
        modules: {
            localsConvention: "cameCase", // 修改生成的配置对象的key展示形式cameCaseOnly：只展示驼峰式cancelBtn，cameCase：可以有-也可以有cancelBtn，dashOnly：只展示-
            scopeBehavior: 'local',// 配置当前的模块化行为是模块化还是全局化,默认local模块化，有hash就是开启模块化标识），另一个值不咋用global
            generateScopeName: '[name]_[local]_[hash:5]',// 定义整个类名展示形式
            hashPrefix: 'hello', // 一般生成hash会根据你类名生成。如果想独特的hash，配置hashPrefix。 
            globalModulePaths: [] // 代表你不想参与到css模块化的路径
        },
        preprocessorOptions: { // css预处理器的配置
            less: { // 整个配置对象都会最终给到less的执行参数中去
                math: 'always', // 对样式中的()内容表示要计算的
                globalVars: { // 配置全局变量,主题色啥的
                    mainColor: 'red' // 样式中不需要@import url(./variable.less)
                }
            }
        },
        devSourceMap: true, // 开启css的sourceMap映射 编译完成后会在文件末尾加// #sourceMappingURL=data:application/json;base64,xxxxxxxxx
        postcss: {}, // 配置postcss相关的
        build: {
            rollupOptions: { // 配置rollup一些构建策略。vite在构建生产环境的时候要降级，线上的要考虑到兼容性问题，将任务交给rollup
                input: { // 多入口，多入口不分包的时候，就会在多尔入口文件中引入相同的模块。 
                    main: path.resolve(__dirname, './main.html'),
                    product: path.resolve(__dirname, './product.html')
                },
                output: {
                    assetFileNames: '[hash].[name].[txt]',
                    manualChunks: (id) => {
                        if(id.includes('node_modules')) {
                            return 'vendor'
                        }
                    }
                }
            },
            assetsInlineLimit: 4096, // 4kb, 对小于4kb的图片转base64
            outDir: 'distDir', // 修改打包后的文件目录为distDir，默认为dist
            assetDir: 'static', // 修改打包后的静态资源目录名字
            emptyOutDir: true, // 清除输出目录所有文件
        },
        plugins: [
            viteAlias()
            createHtmlPlugin({
                inject: {
                    data: {
                        title: '首页'
                    }
                }
            })
        ]
    }
})