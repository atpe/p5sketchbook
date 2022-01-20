// Local component imports
import List from '../list'

export default class Algorithm extends List {
  constructor(width, height) {
    super(width, height)
    this.i = 0
    this.j = 0
    this._i = 0
  }

  // Resets algorithm and reshuffles items
  reset() {
    this.i = 0
    this.j = 0
    this.shuffle()
  }

  // Sorts items by selection sort
  sort() {
    // Iterating over width
    if (this.i < List.max) {
      // Keeping or setting the minimum index
      this._i = this._i || this.i
      // Keeping or setting the comparison index
      this.j = this.j || this.i + 1
      // Iterating over width
      if (this.j < List.max) {
        // Setting minimum to lower value if found
        if (this.items[this.j] < this.items[this._i]) {
          this._i = this.j
        }
        // Increment comparison index
        this.j++
      } else {
        // Swap current index with minimum index
        if (this._i !== this.i) {
          [this.items[this.i], this.items[this._i]] = [this.items[this._i], this.items[this.i]]
        }
        // Increment current index
        this.i++
        // Reset other variables
        this.j = undefined
        this._i = undefined
      }
    }
  }

  // Highlights key points of algorithm on given sketch
  highlight(sketch) {
    if (this.i === List.max) return
    sketch.push()
    sketch.strokeWeight(2)
    sketch.stroke([100, 255, 100, 100])
    sketch.line(this.i * this.spacing, 0, this.i * this.spacing, this.height)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this.j * this.spacing, 0, this.j * this.spacing, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this._i * this.spacing, 0, this._i * this.spacing, this.height)
    sketch.pop()
  }
}