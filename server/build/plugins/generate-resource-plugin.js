import { extname, join } from 'path'

import {
  IS_BUNDLED_PAGE
} from '../../utils'

export default class GernerateResource {
  apply (compiler) {
    // 数据处理 用于生成 webpackMap
    compiler.plugin('after-compile', function (compilation, callback) {
      const pages = compilation
        .chunks
        .filter(chunk => IS_BUNDLED_PAGE.test(chunk.name))

      const webpackMap = {}
      const destPath = compilation.options.output.path
      const destResourcePath = join(destPath, 'resource')

      pages.forEach((chunk) => {
        let name = chunk.name

        // 如果入口路径不包含 / 则不输出 例如 入口  name == 'project'
        if (name.indexOf('/') < 0) {
          return
        }

        // 页面名
        const rule = /^bundles[/\\]pages[/\\].*[/\\]index\.js$/
        if (rule.test(name)) {
          name = name.replace(/[/\\]index\.js$/, `.js`)
        }

        const pageName = name.replace(/bundles[/\\]pages[/\\](.*)[/\\]?\.js/, `$1`)

        webpackMap[pageName] = {}
        webpackMap[pageName].js = []
        webpackMap[pageName].css = [];

        // 页面级别资源 (映射) 处理
        [].concat(chunk.files).forEach(mapAsset)

        /**
         * 根据资源类型，将其映射(map)到对应的数组中
         * @param assetsPath  资源路径
         */
        function mapAsset (assetsPath) {
          if (assetsPath) {
            const truePath = (compilation.options.output.publicPath + assetsPath).replace(/([^:])\/{2,}/g, '$1/')

            if (extname(assetsPath) === '.js') {
              // 绝对路径 = publicPath +  assetsPath
              webpackMap[pageName].js.push(truePath)
            } else if (extname(assetsPath) === '.css') {
              webpackMap[pageName].css.push(truePath)
            }
          }
        }

        const newContent = JSON.stringify(webpackMap)
        // Replace the exisiting chunk with the new content
        compilation.assets[join(destResourcePath, 'resource.map.json')] = {
          source: () => newContent,
          size: () => newContent.length
        }
      })

      callback()
    })
  }
}
