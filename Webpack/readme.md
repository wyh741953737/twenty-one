###
webpack默认会生成源代码，不想的话可以再package.json中配置
"build": "cross-env GENERATE_SOURCEMAP=false node script/build.js"