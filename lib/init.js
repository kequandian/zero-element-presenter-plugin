// https://github.com/webpack/webpack/issues/10722#issuecomment-629619174
var path = require('path');

var fs = require('fs-extra');

var zeroAntdPath = path.resolve(process.cwd(), './node_modules/zero-element-test-presenter/lib/');
var zeroAntdDepPath = path.resolve(process.cwd(), './zero-antd-dep');
var zeroAntdMapJSONPath = path.resolve(zeroAntdDepPath, './map.json');
var baseImportPath = '@/../zero-antd-dep/';
var isRootPath = './package.json';
var depFilePath = path.resolve(process.cwd(), './src/zero-antd-dep.js');

function init() {
  fs.access(isRootPath, fs.constants.F_OK, function (err) {
    if (err) {
      throw new Error(`应当在根目录运行该脚本, 请检查目录 ${isRootPath} 是否为根目录`);
    }
  });
  fs.access(zeroAntdPath, fs.constants.F_OK, function (err) {
    if (err) {
      throw new Error(`未能找到依赖 zero-element-test-presenter, 请检查目录 ${zeroAntdPath}`);
    } else {
      fs.copy(zeroAntdPath, zeroAntdDepPath, {
        overwrite: true
      }).then(_ => fs.readJSON(zeroAntdMapJSONPath)).then(json => fs.writeFile(depFilePath, genFile(json)));
    }
  });

  function genFile(json) {
    var importList = `
    import { set as NamedPresenterSet } from 'zero-element-boot/lib/components/config/NamedPresenterConfig';;

  `;
    var content = '';
    Object.keys(json).forEach(key => {
      var depObj = json[key];
      var importContent = '';
      Object.keys(depObj).forEach(name => {
        var importName = name.replace(/\-\w{1}/gi, s => s.toUpperCase().replace('-', ''));
        importList += `import ${key}_${importName} from '${baseImportPath}${depObj[name]}';\n`;
        importContent += `'${name}': ${key}_${importName},\n`;
      });
      content += `\n${key}({
${importContent}
});\n`;
    });
    return importList + content;
  }
}

module.exports = init;