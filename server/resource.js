import findUp from 'find-up'

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
  const path = findUp.sync('resource/resource.map.json', {
    cwd: dir
  })

  let resourceMap = {}

  if (path && path.length) {
    const resourceMapModule = require(path)
    resourceMap = resourceMapModule.default || resourceMapModule
  }

  return resourceMap
}
