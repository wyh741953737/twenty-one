const mywebpack = require('../lib/mywebpack');
const config = require('../config/webpack.config');

const compiler = mywebpack(config);
compiler.run();