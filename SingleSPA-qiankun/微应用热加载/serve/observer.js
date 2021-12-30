const fs = require('fs');
// fs-extra是fs模块的扩展，比fs更强
// copy(src, dest, [option], callback)
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

      // 获取package.json文件
      const sourcePackageFilePath = resolve(rootDir, rootPath || '../', moduleName, 'package.json');
      // 判断package.sjon文件是否存在
      const hasSourcePackageFilePath = fs.existsSync(sourcePackageFilePath);
      // 存在处理，不存在添加到错误模块列表中
      if (hasSourcePackageFilePath) {
        // 读取模块包中对应的模块配置内容来得到版本
        const packageFileContent = require(sourcePackageFilePath);
        const sourcePackageVersion = packageFileContent.version;

        // 获取模块包中该模块的package.json判断存不存在，存在处理，不存在添加到错误模块列表
        const packageFilePath = resolve(`${rootDir}/node_modules/${moduleName}/package.json`);
        const hasPackageFile = fs.existsSync(packageFilePath);
        if (hasPackageFile) {
          // 读取模块包中对应的模块配置内容来得到版本
          const packageFileContent = require(packageFilePath);
          const packageVersion = packageFileContent.version;
          // 版本不同也加入到错误模块包中
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

    // 有出错的模块直接终止
    if (errorModules.length > 0) {
      return;
    }
  
    let count = 0
    for (var i = 0; i < modules.length; i++) {
      const moduleName = modules[i];

      const modulePath = resolve(rootDir, rootPath || '../', moduleName, sourceDir || 'package');
      const targetModulePath = resolve(`${rootDir}/node_modules/${moduleName}/${sourceDir || 'package'}`);

      // 拷贝模块资源
      moduleSync(moduleName, modulePath, targetModulePath, () => {
        console.log(`${moduleName} ready`);
        // 监听
        fs.watch(modulePath, {
          recursive: true
        }, async (eventType, filename) => {
          // 拼接路径
          const sourceFilePath = `${modulePath}/${filename}`;
          // 获取目标文件路径
          const targetFilePath = resolve(`${rootDir}/node_modules/${moduleName}/${sourceDir || 'package'}/${filename}`);
          // 判断路径是否存在
          const hasSourceFilePath = fs.existsSync(sourceFilePath);
          const hasTargetFilePath = fs.existsSync(targetFilePath);

          // 移动文件或者目录
          if (eventType === 'rename') {
            if (hasSourceFilePath) {
              // 复制
              copy(sourceFilePath, targetFilePath); // 新增
            } else {
              // 将目标文件移除
              if (hasTargetFilePath) {
                remove(targetFilePath); // 删除
              }
            }
          } else if (eventType === 'change') {
            // stat和lstat是查看文件或者目录的信息，当查看符号链接文件的信息必须用lstat
            // 获取文件信息
            const stat = fs.lstatSync(sourceFilePath); 
            if (stat.isFile()) { // isFiled判断被查看对象是否是一个文件
              // 是文件就读取并写入
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
