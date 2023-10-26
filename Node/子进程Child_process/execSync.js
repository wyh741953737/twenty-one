const { execSync } = require('child_process')

execSync('ls', ['-c'], (err, stdout, stderr) => {
  if(err) {
    console.log(err)
    return
  }
  console.log(stdout)
})