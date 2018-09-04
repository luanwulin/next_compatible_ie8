import {mkdirp, writeJsonSync, removeSync} from 'fs-extra'
import {extname, resolve, join} from 'path'

export default class GernerateResource {
    apply(compiler) {
        // 数据处理 用于生成 webpackMap
        compiler.plugin('done', function (map) {
            const webpackMap = {},
                destPath = map.compilation.options.output.path,
                destResourcePath = join(destPath, 'resource');

            // 调用 webpack map toJson 生成 jsonMap
            map = map.toJson();

            Object.keys(map.entrypoints).forEach(function (item) {
                // 如果入口路径不包含 / 则不输出 例如 入口  name == 'project'
                if (item.indexOf('/') < 0) {
                    return;
                }

                // 页面名
                const rule = /^bundles[/\\]pages[/\\].*[/\\]index\.js$/
                if (rule.test(item)) {
                    item = item.replace(/^bundles[/\\]pages[/\\](.*)[/\\]index\.js$/, `$1.js`)
                }

                const pageName = item

                webpackMap[item] = {};
                webpackMap[item].js = [];
                webpackMap[item].css = [];

                // webpack资源 (映射) 处理
                [].concat(map.assetsByChunkName['manifest']).forEach(mapAsset);

                // 公共资源 (映射) 处理
                [].concat(map.assetsByChunkName['common']).forEach(mapAsset);

                // 项目公共资源 (映射) 处理
                [].concat(map.assetsByChunkName['main']).forEach(mapAsset);

                // 页面级别资源 (映射) 处理
                [].concat(map.assetsByChunkName[item]).forEach(mapAsset);

                /**
                 * 根据资源类型，将其映射(map)到对应的数组中
                 * @param assetsPath  资源路径
                 */
                function mapAsset(assetsPath) {
                    if (assetsPath) {
                        if (extname(assetsPath) === '.js') {
                            // 绝对路径 = publicPath +  assetsPath
                            webpackMap[pageName].js.push(map.publicPath + assetsPath);
                        } else if (extname(assetsPath) === '.css') {
                            webpackMap[pageName].css.push(map.publicPath + assetsPath);
                        }
                    }
                }
            });

            mkdirp(destResourcePath);

            // webpackMap 写入 config.json
            writeJsonSync(
                join(destResourcePath, 'resource.map.json'),
                webpackMap);
        });
    }
}
