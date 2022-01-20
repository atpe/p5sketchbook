import { Vector } from "p5"

export default class Algorithm {
  constructor(size, min, max) {
    this.size = size
    this.min = min
    this.max = max
    this.slope = Vector.sub(max, min).div(size.x, size.y)
    this.maxIndex = size.x * size.y

    this.zValues = []
    this.cValues = []
    this.nValues = []

    this.iterations = 0

    this.hue = 340
    this.saturation = 84
    this.brightness = 200

    this.init()
  }

  reset() {
    this.iterations = 0
    this.init()
  }

  init() {
    let index = 0
    for (let _y = 0; _y < this.size.y; _y++) {
      for (let _x = 0; _x < this.size.x; _x++) {
        const { x, y } = Vector.add(this.min, Vector.mult(this.slope, [_x, _y]))
        this.zValues[index] = { a: x, b: y }
        this.cValues[index] = { a: x, b: y }
        this.nValues[index] = 0
        index++
      }
    }
  }

  iterate(sketch) {
    this.iterations++

    sketch.loadPixels()
    for (let index = 0; index < this.maxIndex; index++) {
      const { a, b } = this.zValues[index]

      const aSquared = a * a - b * b
      const bSquared = 2 * a * b

      const _a = aSquared + this.cValues[index].a
      const _b = bSquared + this.cValues[index].b

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