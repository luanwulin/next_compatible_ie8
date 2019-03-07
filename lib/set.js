/* eslint-disable*/

let items = {}

const mySet = function () {
  items.__proto__.has = function (value) {
    items.hasOwnProperty(value)
  }
  items.__proto__.add = function (value) {
    if (!this.has[value]) {
      items[value] = value
      return true
    }
    return false
  }
  items.__proto__.keys = function () {
    return Object.keys(items)
  }
  items.__proto__.values = function () {
    return Object.values(items)
  }
  items.__proto__.clear = function () {
    items = {}
  }
  items.__proto__.delete = function (value) {
    if (this.has(value)) {
      delete items[value]
      return true
    }
    return false
  }
  items.__proto__.union = function (B) {
    let unionSet = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }
    values = B.values()
    for (let i = 0; i < values.length; i++) {
      unionSet.add(values[i])
    }
    return unionSet
  }
  items.__proto__.overlap = function (B) {
    let overlapSet = new Set()
    let values = this.values()
    let overlapArr = values.filter(v => B.has(v))

    for (let i = 0; i < overlapArr.length; i++) {
      overlapSet.add(overlapArr[i])
    }
    return overlapSet
  }
  items.__proto__.intersection = function (otherSet) {
    let intersection = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersection.add(values[i])
      }
    }
    return intersection
  }
  items.__proto__.difference = function (otherSet) {
    let difference = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        difference.add(values[i])
      }
    }
    return difference
  }
  items.__proto__.diffSet = function (B) {
    let diffSet = new Set()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (!B.has(values[i])) {
        diffSet.add(values[i])
      }
    }
    return diffSet
  }
  items.__proto__.subset = function (B) {
    if (this.size > B.size) {
      return false
    }
    let values = this.values
    for (let i = 0; i < values.length; i++) {
      if (!B.has(values[i])) {
        return false
      }
    }
    return true
  }

  return items
}

Object.defineProperty(items, 'size', {
  get () {
    return Object.keys(items).length
  }
})

export default mySet

/* eslint-disable*/
