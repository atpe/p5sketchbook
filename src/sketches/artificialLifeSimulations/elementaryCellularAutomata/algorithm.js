export default class Algorithm {
  constructor(width, height, rule) {
    this.width = width
    this.height = height
    this.rule = this.calcBinaryArray(rule)

    this.cells = []
    this.generation = 0
  }

  calcBinaryArray(decimalValue) {
    const bits = new Array(8).fill(0)
    let pow = 7
    let minuend = decimalValue
    while (minuend > 0) {
      const subtrahend = Math.pow(2, pow)
      if (minuend >= subtrahend) {
        minuend -= subtrahend
        bits[7 - pow] = 1
      }
      pow--
    }
    console.log(bits);
    return bits
  }

  calcDecimalValue(binaryArray) {
    let num = 0
    for (let i = 1; i <= binaryArray.length; i++) {
      const bit = binaryArray[i - 1]
      const pow = binaryArray.length - i
      if (bit === 1) num += Math.pow(2, pow)
    }
    return num
  }

  iterate() {
    const atMaxHeight = this.cells.length >= this.height * this.width
    if (atMaxHeight) this.cells.splice(0, this.width)

    // Calculate center of canvas
    const max = atMaxHeight ? this.height - 1 : this.generation
    const start = this.width * max
    // Loop over width from start point
    for (let i = start; i < start + this.width; i++) {
      // Set all points along width to 0
      this.cells[i] = 0
    }
    if (this.generation === 0) {
      const midpoint = Math.floor(this.width * (max + 1 / 2))
      this.cells[midpoint] = 1
    } else {
      for (let i = start; i < start + this.width; i++) {
        const _i = i - this.width

        const l = this.cells[_i - 1] || 0
        const c = this.cells[_i]
        const r = this.cells[_i + 1] || 0

        const ruleIndex = 7 - this.calcDecimalValue([l, c, r])
        this.cells[i] = this.rule[ruleIndex]
      }
    }

    // Increase generation
    this.generation++
  }

  draw(sketch) {
    sketch.push()
    sketch.loadPixels()
    const numPixels = sketch.pixels.length / 4
    const start = this.cells.length === numPixels
      ? numPixels
      : numPixels - this.cells.length
    let j = 0
    for (let i = start; i < numPixels; i++) {
      const pixelIndex = i * 4
      const color = this.cells[j]
        ? [237, 34, 100, 200]
        : [120, 120, 120, 255]
      sketch.pixels[pixelIndex - 4] = color[0]
      sketch.pixels[pixelIndex - 3] = color[1]
      sketch.pixels[pixelIndex - 2] = color[2]
      sketch.pixels[pixelIndex - 1] = color[3]

      if (j < this.cells.length - 1) j++
      else break
    }
    sketch.updatePixels()
    sketch.pop()

    // if (this.generation === 2) sketch.noLoop()
  }
}