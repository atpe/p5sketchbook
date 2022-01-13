/**
 * @module List
 * @author Adam Evans
 */

export default class List {
  /**
   * @static Number of items in list
   */
  static max = 64

  /**
   * Creates a list
   * 
   * @param {Number} width Width of the canvas
   * @param {Number} height Height of the canvas
   */
  constructor(width, height) {
    this.width = width
    this.height = height
    this.spacing = this.width / List.max
    this.items = []

    this.init()
    this.shuffle()
  }

  /**
   * Iterates over list objects and executes the given callback
   * @param {Function} callback 
   */
  iterate(callback) {
    for (let x = 0; x < List.max; x++) callback(x)
  }

  /** Creates list items */
  init() {
    this.iterate(x => {
      // Map x coordinate to height
      const y = x / List.max * this.height
      // Add to item array
      this.items[x] = y
    })
  }

  /** Shuffles list items */
  shuffle() {
    const items = []
    this.iterate(x => {
      const i = Math.floor(Math.random() * this.items.length)
      items.push(this.items[i])
      this.items.splice(i, 1)
    })
    this.items = items
  }

  /**
   * Draws the list to the given sketch
   * 
   * @param {p5} sketch The p5 sketch
   */
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