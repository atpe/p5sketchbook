import { Vector } from "p5"

export default class JuliaSet {
  constructor(size, min, max) {
    this.size = size
    this.min = min
    this.max = max
    this.slope = Vector.sub(max, min).div(size.x, size.y)
    this.maxIndex = size.x * size.y

    this.zValues = []
    this.nValues = []

    this.iterating = false
    this.iterations = 0

    this.hue = 340
    this.saturation = 84
    this.brightness = 200

    this.init()
  }

  get text() {
    return `(${this.c.a.toFixed(5)} + ${this.c.b.toFixed(5)}i)`
  }

  start() {
    this.iterating = true
  }

  pause() {
    this.iterating = false
  }

  reset() {
    this.iterating = false
    this.iterations = 0
    this.init()
  }

  init() {
    this.point = Vector.div(this.size, 2)
    const _c = Vector.add(this.min, Vector.mult(this.slope, this.point))
    this.c = { a: _c.x, b: _c.y }

    let index = 0
    for (let _y = 0; _y < this.size.y; _y++) {
      for (let _x = 0; _x < this.size.x; _x++) {
        const { x, y } = Vector.add(this.min, Vector.mult(this.slope, [_x, _y]))
        this.zValues[index] = { a: x, b: y }
        this.nValues[index] = 0
        index++
      }
    }
  }

  movePoint(sketch) {
    const move = sketch.createVector()
    if (this.point.y > 0 && sketch.keyIsDown(87)) { // W
      move.add(0, -1)
    }
    if (this.point.x > 0 && sketch.keyIsDown(65)) { // A
      move.add(-1, 0)
    }
    if (this.point.y < this.size.y && sketch.keyIsDown(83)) { // S
      move.add(0, +1)
    }
    if (this.point.x < this.size.x && sketch.keyIsDown(68)) { // D
      move.add(+1, 0)
    }

    this.point.add(move)
    const _c = Vector.add(this.min, Vector.mult(this.slope, this.point))
    this.c = { a: _c.x, b: _c.y }
  }

  iterate(sketch) {
    this.iterations++

    sketch.loadPixels()
    for (let index = 0; index < this.maxIndex; index++) {
      const { a, b } = this.zValues[index]

      const aSquared = a * a - b * b
      const bSquared = 2 * a * b

      const _a = aSquared + this.c.a
      const _b = bSquared + this.c.b

      this.zValues[index] = { a: _a, b: _b, }

      if (a * a + b * b < 16) this.nValues[index]++

      let brightness = this.brightness * Math.sqrt(this.nValues[index] / this.iterations)
      if (this.nValues[index] === this.iterations) brightness = 0
      const color = sketch.color(this.hue, this.saturation, brightness)

      const pixelIndex = index * 4
      sketch.pixels[pixelIndex + 0] = sketch.red(color)
      sketch.pixels[pixelIndex + 1] = sketch.green(color)
      sketch.pixels[pixelIndex + 2] = sketch.blue(color)
      sketch.pixels[pixelIndex + 3] = 255
    }
    sketch.updatePixels()
  }
}