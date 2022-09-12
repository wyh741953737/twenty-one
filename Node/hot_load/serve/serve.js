const spawn = require('child_process').spawn;

const observer = spawn('node node_modules/lm_hot_reload_plugin/serve/observer', {
  shell: true
});
observer.stdout.on('data', (data) => {
  console.log(`${data}`);
});
observer.stderr.on('data', (data) => {
  console.log(`${data}`);
});
