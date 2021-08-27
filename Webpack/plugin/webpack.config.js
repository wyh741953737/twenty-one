const Plugin1 = require("./plugins/plugin1");
const Plugin2 = require("./plugins/plugin2");

module.exports = {
  plugins: [
    new Plugin1(),
    new Plugin2()
  ]
}