function Viewport(){
  this.ranges = []
  this.activeRanges = {}
}

function getWindowWidth(){
  var innerWidth = window.innerWidth
  if(typeof innerWidth == "number") {
    return innerWidth
  }
  return document.documentElement.offsetWidth || document.body.offsetWidth || 0
}


Viewport.prototype.init = function(){
  var viewport = this
  var timeout
  this.onResize = function(){
    if(timeout) clearTimeout(timeout)
    timeout = setTimeout(function(){
      timeout = null
      viewport.update(getWindowWidth())
    }, 50)
  }
  if(window.addEventListener) {
    window.addEventListener("resize", this.onResize, false)
  } else {
    window.attachEvent("onresize", this.onResize)
  }
  viewport.update(getWindowWidth())
  return this
}

Viewport.prototype.destroy = function(){
  this.ranges.length = 0
  if(window.addEventListener) {
    window.removeEventListener("resize", this.onResize, false)
  } else {
    window.detachEvent("onresize", this.onResize)
  }
}

Viewport.prototype.use = function(object){
  if(object == null) {
    throw new TypeError("use() object must be defined")
  }
  if(object.range == null) {
    throw new TypeError("range must be defined")
  }
  if(typeof object.range[0] != "number" || typeof object.range[1] != "number") {
    throw new TypeError("range items must be numbers")
  }
  this.ranges.push(object)
  return this
}

Viewport.prototype.update = function(viewportWidth){
  var index = -1
  var item
  var isInRange
  while(++index < this.ranges.length) {
    item = this.ranges[index]
    isInRange = viewportWidth >= item.range[0] && viewportWidth <= item.range[1]
    if(isInRange) {
      if(this.activeRanges[index]) {
        continue
      }
      this.activeRanges[index] = true
      if(typeof item.on == "function") {
        item.on()
      }
      continue
    }
    if(this.activeRanges[index]) {
      if(typeof item.off == "function") {
        item.off()
      }
      this.activeRanges[index] = false
    }
  }
  return this
}

module.exports = function(){
  return new Viewport()
}
