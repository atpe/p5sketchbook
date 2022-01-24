export default class Algorithm {
  constructor(image, rule) {
    this.image = image
    this.image.pixelDensity(1)
    this.image.noFill()
    this.image.stroke(255)
    this.image.strokeWeight(2)

    this.width = image.width
    this.height = image.height

    this.ruleDecimal = rule
    this.ruleBinary = this.calcBinaryArray(rule)

    this.cells = []
    this.generation = 0
  }

  reset() {
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
    if (this.atMaxHeight) this.cells.splice(0, this.width)
    else this.atMaxHeight = this.cells.length >= this.height * this.width

    // Calculate center of canvas
    const max = this.atMaxHeight ? this.height - 1 : this.generation
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
        this.cells[i] = this.ruleBinary[ruleIndex]
      }
    }

    // Increase generation
    this.generation++
  }

  draw(sketch, x, y) {
    this.image.background(120)
    this.image.loadPixels()
    const numPixels = this.image.pixels.length / 4
    const start = this.cells.length !== numPixels
      ? numPixels - this.cells.length : 0
    let j = 0
    for (let i = start; i < numPixels; i++) {
      if (this.cells[j]) {
        const pixelIndex = i * 4
        this.image.pixels[pixelIndex - 4] = 237
        this.image.pixels[pixelIndex - 3] = 34
        this.image.pixels[pixelIndex - 2] = 100
        this.image.pixels[pixelIndex - 1] = 200
      }

      if (j < this.cells.length - 1) j++
      else break
    }
    this.image.updatePixels()
    this.image.rect(0, 0, this.width, this.height)
    sketch.image(this.image, x, y)
  }
}