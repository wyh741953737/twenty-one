const spawn = require('child_process').spawn
const ls = spawn('ls', ['-lh', '/user'])