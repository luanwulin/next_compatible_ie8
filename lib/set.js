/* eslint-disable*/

export default function mySet() {
  const self = this

  this.size = 0
  this.items = {}

  this.items.__proto__.has = function (value) {
    self.items.hasOwnProperty(value)
  }
  this.items.__proto__.add = function (value) {
    if (value && !this.has(value)) {
      self.items[value] = value
      self.size += 1
      return true
    }
    return false
  }
  this.items.__proto__.keys = function () {
    return Object.keys(self.items)
  }
  this.items.__proto__.values = function () {
    return Object.values(self.items)
  }
  this.items.__proto__.clear = function () {
    self.items = {}
    self.size = 0
  }
  this.items.__proto__.delete = function (value) {
    if (this.has(value)) {
      delete self.items[value]
      self.size -= 1
      return true
    }
    return false
  }
  this.items.__proto__.union = function (B) {
    let unionSet = new mySet()
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
  this.items.__proto__.overlap = function (B) {
    let overlapSet = new mySet()
    let values = this.values()
    let overlapArr = values.filter(v => B.has(v))

    for (let i = 0; i < overlapArr.length; i++) {
      overlapSet.add(overlapArr[i])
    }
    return overlapSet
  }
  this.items.__proto__.intersection = function (otherSet) {
    let intersection = new mySet()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (otherSet.has(values[i])) {
        intersection.add(values[i])
      }
    }
    return intersection
  }
  this.items.__proto__.difference = function (otherSet) {
    let difference = new mySet()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (!otherSet.has(values[i])) {
        difference.add(values[i])
      }
    }
    return difference
  }
  this.items.__proto__.diffSet = function (B) {
    let diffSet = new mySet()
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (!B.has(values[i])) {
        diffSet.add(values[i])
      }
    }
    return diffSet
  }
  this.items.__proto__.subset = function (B) {
    if (self.size > B.size) {
      return false
    }
    let values = this.values()
    for (let i = 0; i < values.length; i++) {
      if (!B.has(values[i])) {
        return false
      }
    }
    return true
  }

  Object.defineProperty(this.items, 'size', {
    get () {
      return Object.keys(self.items).length;
    }
  })

  return this.items
}

/* eslint-disable*/
