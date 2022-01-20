// Local component imports
import List from '../list'

export default class Algorithm extends List {
  constructor(width, height) {
    super(width, height)
    this.i = 1
    this.j = 0
    this._i = 1
  }

  // Resets algorithm and reshuffles items
  reset() {
    this.i = 1
    this._i = this.i
    this.j = this.i - 1
    this.shuffle()
  }

  // Sorts items by insertion sort
  sort() {
    // Iterating over width
    if (this._i < List.max) {
      // Check if current index is less than previous index
      if (this.items[this._i] < this.items[this.j]) {
        // Swap previous index with current index
        [this.items[this._i], this.items[this.j]] = [this.items[this.j], this.items[this._i]]
        // Decrease indices to check previous
        this._i--
        this.j--
        // Keep decreaaing until current is in correct position
        if (this.j >= 0) return
      }
      // Increase max index and reset other indices
      this.i++
      this._i = this.i
      this.j = this.i - 1
    }
  }

  // Highlights key points of algorithm on given sketch
  highlight(sketch) {
    if (this._i === List.max) return
    sketch.push()
    sketch.strokeWeight(2)
    sketch.stroke([100, 255, 100, 100])
    sketch.line(this.i * this.spacing, 0, this.i * this.spacing, this.height)
    sketch.stroke([255, 100, 100, 100])
    sketch.line(this._i * this.spacing, 0, this._i * this.spacing, this.height)
    sketch.stroke([100, 100, 255, 100])
    sketch.line(this.j * this.spacing, 0, this.j * this.spacing, this.height)
    sketch.pop()
  }
}