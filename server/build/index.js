import { tmpdir } from 'os'
import { join, extname } from 'path'
import fs from 'mz/fs'
import uuid from 'uuid'
import del from 'del'
import webpack from './webpack'
import replaceCurrentBuild from './replace'
import md5File from 'md5-file/promise'
import {mkdirp, writeJsonSync} from 'fs-extra'

export default async function build (dir, conf = null) {
  const buildId = uuid.v4()
  const buildDir = join(tmpdir(), uuid.v4())
  const compiler = await webpack(dir, { buildId, buildDir, conf })

  try {
    const stats = await runCompiler(compiler)
    await writeBuildStats(buildDir, stats)
    await writeBuildId(buildDir, buildId)
    writeResourceMap(buildDir, stats)
  } catch (err) {
    console.error(`> Failed to build on ${buildDir}`)
    throw err
  }

  await replaceCurrentBuild(dir, buildDir)

  // no need to wait
  del(buildDir, { force: true })
}

function runCompiler (compiler) {
  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err) return reject(err)

      const jsonStats = stats.toJson()

      if (jsonStats.errors.length > 0) {
        const error = new Error(jsonStats.errors[0])
        error.errors = jsonStats.errors
        error.warnings = jsonStats.warnings
        return reject(error)
      }

      resolve(jsonStats)
    })
  })
}

async function writeBuildStats (dir, stats) {
  // Here we can't use hashes in webpack chunks.
  // That's because the "app.js" is not tied to a chunk.
  // It's created by merging a few assets. (commons.js and main.js)
  // So, we need to generate the hash ourself.
  const assetHashMap = {
    'app.js': {
      hash: await md5File(join(dir, '.next', 'app.js'))
    }
  }
  const buildStatsPath = join(dir, '.next', 'build-stats.json')
  await fs.writeFile(buildStatsPath, JSON.stringify(assetHashMap), 'utf8')
}

async function writeBuildId (dir, buildId) {
  const buildIdPath = join(dir, '.next', 'BUILD_ID')
  await fs.writeFile(buildIdPath, buildId, 'utf8')
}

function writeResourceMap (dir, stats) {
  const webpackMap = {}
  const destPath = join(dir, '.next')
  const destResourcePath = join(destPath, 'resource')

  // 调用 webpack map toJson 生成 jsonMap
  let map = stats.toJson()

  Object.keys(map.entrypoints).forEach(function (item) {
    // 如果入口路径不包含 / 则不输出 例如 入口  name == 'project'
    if (item.indexOf('/') < 0) {
      return ''
    }

    // 页面名
    const rule = /^bundles[/\\]pages[/\\].*[/\\]index\.js$/
    if (rule.test(item)) {
      item = item.replace(/[/\\]index\.js$/, `.js`)
    }

    const pageName = item.replace(/bundles[/\\]pages[/\\](.*)[/\\]?\.js/, `$1`)

    webpackMap[pageName] = {};
    webpackMap[pageName].js = [];
    webpackMap[pageName].css = [];

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
    function mapAsset (assetsPath) {
      if (assetsPath) {
        const truePath = (map.publicPath + assetsPath).replace(/([^\:])\/{2,}/g, '$1/')

        if (extname(assetsPath) === '.js') {
          // 绝对路径 = publicPath +  assetsPath
          webpackMap[pageName].js.push(truePath)
        } else if (extname(assetsPath) === '.css') {
          webpackMap[pageName].css.push(truePath)
        }
      }
    }
  })

  mkdirp(destResourcePath)

  // webpackMap 写入 config.json
  writeJsonSync(
    join(destResourcePath, 'resource.map.json'),
    webpackMap)
}
