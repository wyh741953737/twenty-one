
const path = require("path");
const { name } = require("./package");

module.exports = {
  webpack: (config) => {
    // 微应用的包名
    config.output.library = `${name}-[name]`;
    // 将 library 暴露为所有的模块定义下都可运行的方式
    config.output.libraryTarget = "umd";
    // 按需加载相关，设置为 webpackJsonp_reactApp 即可
    config.output.jsonpFunction = `webpackJsonp_${name}`;

    // 设置引入别名
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": path.resolve(__dirname, "src"),
    };
    return config;
  },

  devServer: (configFunction) => {
    return (proxy, allowedHost) => {
      const config = configFunction(proxy, allowedHost);
      // 关闭主机检查，使微应用可以被 fetch
      config.disableHostCheck = true;
      // 主应用获取子应用时跨域响应头，必须要开启跨域
      config.headers = {
        "Access-Control-Allow-Origin": "*",
      };
      // 配置 history 模式
      config.historyApiFallback = true;
      return config;
    };
  },
};
