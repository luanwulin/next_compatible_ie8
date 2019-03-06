import findUp from 'find-up'
import { join } from 'path'

const cache = new Map()

export default function getResourceMap (dir, dev) {
  if (dev) {
    return loadResourceMap(dir)
  } else if (!cache.has(dir + 'resource')) {
    cache.set(dir + 'resource', loadResourceMap(dir))
  }
  return cache.get(dir + 'resource')
}

function loadResourceMap (dir) {
  const path = findUp.sync('resource.map.json', {
    cwd: join(dir, 'resource')
  })

  let resourceMap = {}

  if (path && path.length) {
    const resourceMapModule = require(path)
    resourceMap = resourceMapModule.default || resourceMapModule
  }

  return resourceMap
}
