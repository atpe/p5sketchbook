export default class List {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.items = []
  }

  init() {
    for (let x = 0; x < this.width; x++) {
      const y = x / this.width * this.height
      this.items[x] = y
    }
  }

  drawTo(sketch) {
    sketch.push()
    for (let x = 0; x < this.width; x++) {
      const y = this.items[x]
      sketch.stroke([255, (1 - y / this.height) * 255, 255])
      sketch.line(x, this.height, x, this.height - y)
    }
    sketch.pop()
  }
}