import { extname, join } from 'path'

import {
  IS_BUNDLED_PAGE, MATCH_ROUTE_NAME
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
        let pageName = MATCH_ROUTE_NAME.exec(chunk.name)[1]

        // We need to convert \ into / when we are in windows
        // to get the proper route name
        // Here we need to do windows check because it's possible
        // to have "\" in the filename in unix.
        // Anyway if someone did that, he'll be having issues here.
        // But that's something we cannot avoid.
        if (/^win/.test(process.platform)) {
          pageName = pageName.replace(/\\/g, '/')
        }

        pageName = pageName.replace(/(^|\/)index$/, '')

        if (!pageName) {
          return
        }

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
            if (extname(assetsPath) === '.js') {
              // 绝对路径 = publicPath +  assetsPath
              webpackMap[pageName].js.push(assetsPath)
            } else if (extname(assetsPath) === '.css') {
              webpackMap[pageName].css.push(assetsPath)
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
