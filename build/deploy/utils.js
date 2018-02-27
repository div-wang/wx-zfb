var fs = require('fs')
var path = require('path')
var colors = require('colors')
var chalk = require('chalk')
var uploadFile = require('./uploadFile')

exports.getStatics = function (type, prefix, path) {
  var dirs = fs.readdirSync(path)
  var result = []
  prefix += type

  dirs.forEach(function (item) {
    if ((type === 'css' || type === 'js') && item.slice(-3) !== 'map') {
      result.push({
        id: item.split('.')[0],
        type: type,
        name: prefix + '/' + item,
        path: path + '/' +item
      })
    }

    var is_Html = type === '_html' && /^_\S*\.html$/.test(item)
    var isHtml = type === 'html' && /^[^_]\S*\.html$/.test(item)
    if (is_Html || isHtml) {
      result.push({
        id: item.split('.')[0],
        type: 'html',
        name: '/' + item,
        path: path + '/' +item
      })
    }

  })
  return result
}

exports.generateTpls = function (distHtmlPath, addresses) {
  return new Promise(function (resolve, reject) {
    var htmlPath = distHtmlPath + '/index.html'
      var content = fs.readFileSync(htmlPath, 'utf8')
      content = _replaceStatics(content, addresses)
      fs.writeFile(htmlPath, content, function (err) {
        if(err) {
          process.exitCode = 1
          reject(err)
          return console.log(err.red)
        }
      })
  })
}

exports.uploadFiles = function (files) {
  return new Promise(function (resolve, reject) {
    if (Object.keys(files).length === 0) {
      return resolve({})
    }
    var datas = []
    console.log('-> 开始上传...'.green)
    for (var file in files) {
      var item = files[file]

      item.css.forEach(function (cssItem) {
        datas.push({
          name: cssItem.name,
          path: cssItem.path
        })
      })
      item.js.forEach(function (jsItem) {
        datas.push({
          name: jsItem.name,
          path: jsItem.path
        })
      })
    }

    uploadFile.mutilUpload(datas, function (res) {
      console.log('-> 上传完毕...\n'.green)
      resolve(res)
    })
  })
}

function _replaceStatics (content, addresses) {
  for (var key in addresses) {
    if (content.indexOf(key) !== -1) {
      content = content.replace(key, _dealProtocol(addresses[key]))
    }
  }
  return content
}

function _dealProtocol (url) {
  var res = url.match(/^(?:[^\/]*)\/\/(.+)/)
  return !!res ? ('//' + res[1]) : ''
}
