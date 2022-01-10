export default class List {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.items = []
  }

  iterate(callback) {
    for (let x = 0; x < this.width; x++) callback(x)
  }

  init() {
    this.iterate(x => {
      const y = x / this.width * this.height
      this.items[x] = y
    })
  }

  shuffle() {
    const items = []
    this.iterate(x => {
      const i = Math.floor(Math.random() * this.items.length)
      items.push(this.items[i])
      this.items.splice(i, 1)
    })
    this.items = items
  }

  draw(sketch) {
    sketch.push()
    this.iterate(x => {
      const y = this.items[x]
      sketch.stroke([237, 34, 100, 55 + (y / this.height) * 200])
      sketch.line(x, this.height, x, this.height - y)
    })
    sketch.pop()
  }
}