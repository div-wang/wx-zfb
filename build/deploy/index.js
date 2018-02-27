var fs = require('fs')
var path = require('path')
var async = require('asyncawait/async')
var await = require('asyncawait/await')
var utils = require('./utils.js')

var distJsPath = path.resolve(__dirname, '../../dist/static/js')
var distCssPath = path.resolve(__dirname, '../../dist/static/css')
var distHtmlPath = path.resolve(__dirname, '../../dist')

async(function () {
  var distJsInfos = utils.getStatics('js', '/static/', distJsPath)
  var distCssInfos = utils.getStatics('css', '/static/', distCssPath)
  var distHtmlInfos = utils.getStatics('html', '/', distHtmlPath)

  // 上传文件
  var addresses = await(utils.uploadFiles({
    'main': {
      html: distHtmlInfos[0].path,
      js: distJsInfos,
      css: distCssInfos
    }
  }))

  for (var key in addresses) {
    console.log(('　　' + key + ': ').green, (addresses[key]).blue)
  }

  await(utils.generateTpls(distHtmlPath, addresses))

  console.log(('\n-> 替换完毕...').green)
  console.log('-> 准备发布...'.green)
})()
