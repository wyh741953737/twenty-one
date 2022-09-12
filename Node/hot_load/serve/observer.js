const fse = require('fs-extra');
const path = require('path');
const spawn = require('child_process').spawn;

const resolve = (...file) => path.resolve(__dirname, ...file);

const readFile = async (filePath) => {
  return await fse.readFile(filePath, 'utf-8');
};

const writeFile = async (filePath, content) => {
  await fse.outputFile(filePath, content);
};

const remove = async (path) => {
  await fse.remove(path);
};

const copy = async (sourcePath, targetPath) => {
  await fse.copy(sourcePath, targetPath);
};

const moduleSync = async (moduleName, sourcePath, targetPath, callback) => {
  console.log(`[${moduleName}]: loading...`);
  await copy(sourcePath, targetPath);
  callback && callback();
};

const spawnServe = () => {
  spawn('vue-cli-service serve', {
    stdio: 'inherit',
    shell: true
  });
};

// 根目录
const rootDir = resolve('../../../');

// 配置文件
const configFilePath = rootDir + '/hmr.config.js';
const hasConfigFile = fs.existsSync(configFilePath);

if (hasConfigFile) {

  // 读取配置文件信息
  const hmrConfig = require(configFilePath);
  const { rootPath, modules, sourceDir } = hmrConfig;

  if (modules && modules.length) {

    // 检查版本
    const errorModules = []
    for (var i = 0; i < modules.length; i++) {
      const moduleName = modules[i];

      const sourcePackageFilePath = resolve(rootDir, rootPath || '../', moduleName, 'package.json');
      const hasSourcePackageFilePath = fs.existsSync(sourcePackageFilePath);
      if (hasSourcePackageFilePath) {
        const packageFileContent = require(sourcePackageFilePath);
        const sourcePackageVersion = packageFileContent.version;

        const packageFilePath = resolve(`${rootDir}/node_modules/${moduleName}/package.json`);
        const hasPackageFile = fs.existsSync(packageFilePath);
        if (hasPackageFile) {
          const packageFileContent = require(packageFilePath);
          const packageVersion = packageFileContent.version;

          if (sourcePackageVersion !== packageVersion) {
            errorModules.push(moduleName);
            console.error(`[${moduleName}]: please check package.json version`);
          }
        } else {
          errorModules.push(moduleName);
          console.error(`[${moduleName}]: unable to read package.json in ${packageFilePath}`);
        }
      } else {
        errorModules.push(moduleName);
        console.error(`[${moduleName}]: unable to read package.json in ${sourcePackageFilePath}`);
      }
    }

    if (errorModules.length > 0) {
      return;
    }
  
    let count = 0
    for (var i = 0; i < modules.length; i++) {
      const moduleName = modules[i];

      const modulePath = resolve(rootDir, rootPath || '../', moduleName, sourceDir || 'package');
      const targetModulePath = resolve(`${rootDir}/node_modules/${moduleName}/${sourceDir || 'package'}`);
      moduleSync(moduleName, modulePath, targetModulePath, () => {
        console.log(`${moduleName} ready`);
        // 监听源码目录
        fse.watch(modulePath, {
          recursive: true
        }, async (eventType, filename) => {
          const sourceFilePath = `${modulePath}/${filename}`;
          const targetFilePath = resolve(`${rootDir}/node_modules/${moduleName}/${sourceDir || 'package'}/${filename}`);
          const hasSourceFilePath = fse.existsSync(sourceFilePath);
          const hasTargetFilePath = fse.existsSync(targetFilePath);

          if (eventType === 'rename') {
            if (hasSourceFilePath) {
              copy(sourceFilePath, targetFilePath); // 新增
            } else {
              if (hasTargetFilePath) {
                remove(targetFilePath); // 删除
              }
            }
          } else if (eventType === 'change') {
            const stat = fse.lstatSync(sourceFilePath);
            if (stat.isFile() && !sourceFilePath.match(/\.(png|jpg|gif|bmp|tif|svg|jpeg)$/)) { // 修改文件内容
              const fileContent = await readFile(sourceFilePath, 'utf-8');
              writeFile(targetFilePath, fileContent);
            }
          }
        });
        count++;
        if (count === modules.length) {
          spawnServe();
        }
      });
    }
    return;
  }
}

spawnServe();
