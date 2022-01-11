export default class List {
  static max = 64

  constructor(width, height) {
    this.width = width
    this.height = height
    this.spacing = this.width / List.max
    this.items = []

    this.init()
    this.shuffle()
  }

  iterate(callback) {
    for (let x = 0; x < List.max; x++) callback(x)
  }

  init() {
    this.iterate(x => {
      const y = x / List.max * this.height
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
      const _y = this.items[x]
      const _x = x * this.spacing
      sketch.noStroke()
      sketch.fill([237, 34, 100, 55 + (_y / this.height) * 200])
      sketch.rect(_x, this.height - _y, this.spacing, _y)
    })
    sketch.pop()
  }
}